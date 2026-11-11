// Génère la page des propriétés à partir de l'API Centris Data Distribution.
// La clé API est lue dans la variable d'environnement CENTRIS_API_KEY (secret GitHub).
// Elle n'est jamais écrite dans les fichiers produits.
//
// Usage :
//   CENTRIS_API_KEY=... node scripts/build.mjs          -> données réelles
//   node scripts/build.mjs --sample                       -> données d'exemple (aperçu)
//   CENTRIS_API_KEY=... node scripts/build.mjs --trouver-courtier "Dulude"
//                                                          -> affiche le MemberKey du courtier

import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { renderSite } from "./site.mjs";
import { details, valeursInconnues, setLookups } from "./details.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = process.env.CENTRIS_API_ROOT || "https://datadistributionqc.centris.ca/v1/odata";
const KEY = process.env.CENTRIS_API_KEY || "";
const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");
const MAX_RECORDS = 3000; // garde-fou si la clé donne accès à beaucoup plus que nos inscriptions

const config = JSON.parse(await readFile(path.join(ROOT, "config.json"), "utf8"));
const memberKey = process.env.CENTRIS_MEMBER_KEY || config.filtres.memberKey || "";

// ---------- Appels API ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url, { lang = "fr" } = {}) {
  const full = url.startsWith("http") ? url : `${API}/${url}`;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const res = await fetch(full, {
      headers: {
        Authorization: `Bearer ${KEY}`,
        Accept: "application/json",
        "Accept-Language": lang,
      },
    });
    if (res.status === 429 || res.status >= 500) {
      const wait = Number(res.headers.get("Retry-After") || 5) * 1000;
      console.warn(`  ${res.status}, nouvel essai dans ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) {
      const body = (await res.text()).slice(0, 400);
      const err = new Error(`HTTP ${res.status} sur ${full.split("?")[0]} : ${body}`);
      err.status = res.status;
      throw err;
    }
    // Respecte la limite de 5 requêtes/seconde
    await sleep(250);
    return res.json();
  }
  throw new Error(`Échec répété sur ${full.split("?")[0]}`);
}

async function getAll(firstUrl, max = MAX_RECORDS, lang = "fr") {
  const out = [];
  let url = firstUrl;
  while (url) {
    const page = await api(url, { lang });
    out.push(...(page.value || []));
    url = page["@odata.nextLink"] || null;
    if (out.length >= max) {
      console.warn(`  Arrêt à ${out.length} fiches (garde-fou). Configurer memberKey pour filtrer.`);
      break;
    }
  }
  return out;
}

function q(params) {
  return Object.entries(params)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
}

async function fetchProperties() {
  // Annexe II Centris, art. 2.3 : on ne demande ni ne conserve aucune fiche vendue ou expirée.
  const statuses = config.filtres.statutsAffiches.filter((s) => !/closed|expired|withdrawn|canceled/i.test(s));
  const statusFilter = statuses.map((s) => `StandardStatus eq '${s}'`).join(" or ");
  const agentFilter = memberKey ? `ListAgentKey eq '${memberKey}' or CoListAgentKey eq '${memberKey}'` : "";

  // On essaie d'abord la requête la plus précise, puis on simplifie si l'API refuse un filtre ou une expansion.
  const attempts = [
    { $filter: [agentFilter && `(${agentFilter})`, `(${statusFilter})`].filter(Boolean).join(" and "), $expand: "Media,Rooms,Units,UnitTypes,Expenses,Renovations,Parkings,AdditionalSpaces,RentedEquipment,Translations" },
    { $filter: [agentFilter && `(${agentFilter})`, `(${statusFilter})`].filter(Boolean).join(" and "), $expand: "Media,Rooms,Units,UnitTypes,Expenses,Renovations,Parkings,AdditionalSpaces,RentedEquipment" },
    { $filter: [agentFilter && `(${agentFilter})`, `(${statusFilter})`].filter(Boolean).join(" and "), $expand: "Media" },
    { $filter: agentFilter || "", $expand: "Media" },
    { $expand: "Media" },
  ];
  let lastErr;
  for (const p of attempts) {
    try {
      const rows = await getAll(`Property?${q(p)}`);
      console.log(`  Requête OK (${JSON.stringify(p)}) : ${rows.length} fiches`);
      return rows;
    } catch (e) {
      if (e.status !== 400) throw e;
      console.warn(`  Requête refusée, on simplifie. ${e.message.slice(0, 200)}`);
      lastErr = e;
    }
  }
  throw lastErr;
}

// Valeurs de listes (lookups) : on tente de récupérer le libellé français auprès de Centris.
async function fetchLookups(names) {
  const map = {};
  for (const name of names) {
    try {
      const rows = await getAll(`Lookup?${q({ $filter: `LookupName eq '${name}'` })}`);
      for (const r of rows) {
        const label = r.DisplayName || r.LookupValue || r.StandardLookupValue;
        for (const k of [r.LookupKey, r.LegacyODataValue, r.StandardLookupValue, r.LookupValue]) {
          if (k != null && label) map[`${name}|${k}`] = label;
        }
      }
    } catch (e) {
      console.warn(`  Lookup ${name} indisponible (${e.status || e.message}). On utilise les libellés intégrés.`);
    }
  }
  return map;
}

async function findMember(term) {
  const rows = await getAll(
    `Member?${q({ $filter: `contains(MemberFullName,'${term.replace(/'/g, "''")}')`, $select: "MemberKey,MemberFullName,MemberMlsId,OfficeKey" })}`
  );
  console.table(rows.map(({ MemberKey, MemberFullName, MemberMlsId, OfficeKey }) => ({ MemberKey, MemberFullName, MemberMlsId, OfficeKey })));
}

// ---------- Traduction et mise en forme ----------

const FR = {
  // Statuts
  Active: "À vendre",
  "Active Under Contract": "Promesse d'achat acceptée",
  Pending: "Promesse d'achat acceptée",
  Closed: "Vendu",
  // Types
  Residential: "Résidentiel",
  "Residential Income": "Immeuble à revenus",
  Income: "Immeuble à revenus",
  Lease: "À louer",
  "Residential Lease": "À louer",
  Land: "Terrain",
  Farm: "Fermette",
  Mobile: "Maison mobile",
  "Commercial Sale": "Commercial",
  "Commercial Lease": "Commercial à louer",
  "Business Opportunity": "Entreprise",
  // Sous-types
  "Single-Family Residence": "Maison unifamiliale",
  "Single Family Residence": "Maison unifamiliale",
  Condominium: "Condo",
  Townhouse: "Maison de ville",
  Duplex: "Duplex",
  Triplex: "Triplex",
  Quadruplex: "Quadruplex",
  "Manufactured Home": "Maison mobile",
  "Manufactured On Land": "Maison mobile sur terrain",
  Cottage: "Chalet",
  Cabin: "Chalet",
  "Multi Family": "Plex",
};

function tr(lookups, name, value) {
  if (value == null || value === "") return "";
  const resolved = lookups[`${name}|${value}`] || value;
  return FR[resolved] || resolved;
}

function cityName(p) {
  const c = p.CityOrTownship;
  if (c && typeof c === "object") return c.CityOrTownshipName || c.CityOrTownshipShortName || "";
  return p.Township || p.City || "";
}

function adresse(p) {
  const debut = p.StreetNumberStart || p.StreetNumber || "";
  const fin = p.StreetNumberEnd && p.StreetNumberEnd !== debut ? `-${p.StreetNumberEnd}` : "";
  const rue = p.StreetShortName || p.StreetName || "";
  const rueFr = rue.replace(/^(Rue|Avenue|Boulevard|Chemin|Place|Rang|Montée|Route|Croissant|Terrasse|Impasse|Allée|Promenade|Côte)\b/, (m) => m.toLowerCase());
  const unite = p.UnitNumber ? `${p.UnitNumber}-` : "";
  return `${unite}${debut}${fin} ${rueFr}`.trim() || String(p.UnparsedAddress || "").trim();
}

// Adresse publique de l'annonce (format des pages d'annonces : type~a-vendre~ville/numéro)
function slug(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function lienAnnonce(p) {
  const id = p.ListingId || p.ListingKey;
  const st = String(p.PropertySubType || "");
  const t = /duplex/i.test(st) ? "duplex" : /triplex/i.test(st) ? "triplex" : /quadruplex/i.test(st) ? "quadruplex" : /quintuplex/i.test(st) ? "quintuplex"
    : /condo/i.test(st) ? "condo" : /lot|land/i.test(st) || /land/i.test(p.PropertyType || "") ? "terrain" : /income/i.test(p.PropertyType || "") ? "immeuble-a-revenus" : "maison";
  const ville = slug(p.Township || p.City || "quebec");
  return `https://www.centris.ca/fr/${t}~a-vendre~${ville}/${id}`;
}

// Les acheteurs au Québec lisent en pieds carrés : on convertit tout en pi².
function aire(v, unite) {
  const n = num(v);
  if (!n) return "";
  return `${Math.round(n).toLocaleString("fr-CA")} ${/meter/i.test(unite || "") ? "m²" : "pi²"}`;
}

function isPhoto(m) {
  const url = String(m.MediaURL || "");
  if (!url) return false;
  if (/\.pdf(\?|$)/i.test(url)) return false;
  const t = String(m.MediaType || m.MediaCategory || "").toLowerCase();
  if (t && /(document|pdf|video|tour)/.test(t)) return false;
  return true;
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

// On ne garde QUE des champs publics. Aucun champ sur les propriétaires, acheteurs, rémunération, etc.
function toPublic(p, lookups) {
  const media = Array.isArray(p.Media) ? p.Media : [];
  const photos = media
    .filter(isPhoto)
    .sort((a, b) => (a.Order ?? 999) - (b.Order ?? 999))
    .map((m) => ({ url: m.MediaURL, legende: m.ShortDescription || "" }));

  const rawType = p.PropertyType;
  const isLease = /lease/i.test(String(rawType)) || (!num(p.ListPrice) && num(p.RentPrice));

  return {
    id: String(p.ListingId || p.ListingKey),
    statut: p.StandardStatus,
    statutTexte: isLease && p.StandardStatus === "Active" ? "À louer" : FR[p.StandardStatus] || tr(lookups, "StandardStatus", p.StandardStatus),
    prix: num(p.ListPrice),
    loyer: num(p.RentPrice),
    type: tr(lookups, "PropertyType", rawType),
    sousType: p.PropertySubType === "Lot" ? "" : tr(lookups, "PropertySubType", p.PropertySubType),
    adresse: adresse(p),
    ville: cityName(p),
    codePostal: p.PostalCode || "",
    chambres: num(p.BedroomsTotal),
    sallesDeBain: num(p.BathroomsTotalInteger ?? p.BathroomsFull),
    sallesEau: num(p.BathroomsPartial),
    logements: num(p.NumberOfUnitsTotal),
    superficie: aire(p.LivingArea, p.LivingAreaUnits),
    terrain: aire(p.LotSizeArea, p.LotSizeUnits),
    anneeConstruction: num(p.YearBuilt),
    description: p.PublicRemarks || "",
    visiteVirtuelle: p.VirtualTourURLUnbranded || "",
    lat: Number(p.Latitude) || null,
    lng: Number(p.Longitude) || null,
    photos,
    modifie: p.ModificationTimestamp || "",
    enVigueurDepuis: p.OnMarketTimestamp || "",
    lien: lienAnnonce(p),
    vendu: p.StandardStatus === "Closed",
    dateStatut: p.StatusChangeTimestamp || p.CloseDate || "",
    details: details(p),
    en: versionAnglaise(p),
  };
}

// Version anglaise : textes fournis par Centris (Translations) et libellés anglais officiels.
const EN_TYPES = { Residential: "Residential", "Residential Income": "Income property", Land: "Land", "Single Family Residence": "Single-family home", Condominium: "Condo", Lot: "" };
function versionAnglaise(p) {
  const t = (p.Translations || []).find((x) => x.Locale === "en");
  const vals = Object.fromEntries((t?.Values || []).map((v) => [v.FieldName, v.Value]));
  const pe = { ...p, ...vals };
  const st = p.PropertySubType === "Lot" ? "" : (EN_TYPES[p.PropertySubType] ?? p.PropertySubType ?? "");
  return {
    description: vals.PublicRemarks || "",
    type: EN_TYPES[p.PropertyType] ?? p.PropertyType ?? "",
    sousType: st,
    statutTexte: p.StandardStatus === "Active" ? "For sale" : /Pending|Under Contract/.test(p.StandardStatus) ? "Accepted offer" : p.StandardStatus,
    details: details(pe, "en"),
  };
}

// ---------- Page HTML ----------

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function render(listings, { apercu = false, vendus = [] } = {}) {
  const tpl = await readFile(path.join(ROOT, "scripts", "template.html"), "utf8");
  const c = config.courtier;
  const data = JSON.stringify({ listings, vendus, courtier: c, majLe: new Date().toISOString() }).replace(/</g, "\\u003c");
  return tpl
    .replaceAll("{{TITRE}}", esc(config.page.titre))
    .replaceAll("{{SOUS_TITRE}}", esc(config.page.sousTitre))
    .replaceAll("{{NOM}}", esc(c.nom))
    .replaceAll("{{TITRE_COURTIER}}", esc(c.titre))
    .replaceAll("{{AGENCE}}", esc(c.agence))
    .replaceAll("{{SITE}}", esc(c.siteWeb))
    .replaceAll("{{APERCU}}", apercu ? '<div class="apercu">Aperçu avec des propriétés fictives. La vraie page affichera les inscriptions de Centris.</div>' : "")
    .replace("{{DATA}}", data);
}

// ---------- Propriétés vendues : gardées 14 jours avec l'étiquette « Vendu » ----------
// Le site garde en ligne un fichier etat.json. À chaque mise à jour, on compare avec la version précédente :
// une inscription disparue de Centris est vérifiée. Si Centris confirme qu'elle est vendue (Closed),
// elle reste 14 jours à la fin de la liste, sans prix. Expirée ou retirée : elle disparaît tout de suite.
const JOURS_VENDU = 14;
async function etatPrecedent() {
  const urls = [config.page?.domainePersonnalise && `https://${config.page.domainePersonnalise}/etat.json`, "https://gillesdulude.github.io/gillesdulude-site/etat.json"].filter(Boolean);
  for (const u of urls) {
    try { const r = await fetch(u + "?t=" + Date.now()); if (r.ok) return await r.json(); } catch {}
  }
  return null;
}
async function statutCentris(id) {
  try {
    const r = await api(`Property?$filter=${encodeURIComponent(`ListingId eq '${id}' or ListingKey eq '${id}'`)}&$select=ListingKey,StandardStatus,StatusChangeTimestamp`);
    return (r.value || [])[0] || null;
  } catch { return null; }
}
async function suivreVendus(actives) {
  const prev = await etatPrecedent();
  if (!prev) { console.log("  Aucun état précédent, on commence le suivi des ventes."); return []; }
  const ids = new Set(actives.map((l) => l.id));
  const maintenant = Date.now();
  const garde = (prev.vendus || []).filter((v) => !ids.has(v.id) && maintenant - Date.parse(v.venduLe) < JOURS_VENDU * 864e5);
  const dejaVendus = new Set(garde.map((v) => v.id));
  for (const l of prev.actives || []) {
    if (ids.has(l.id) || dejaVendus.has(l.id)) continue;
    const st = await statutCentris(l.id);
    console.log(`  Inscription ${l.id} retirée de Centris : ${st?.StandardStatus || "statut inconnu"}`);
    if (st?.StandardStatus === "Closed") {
      const v = { ...l, vendu: true, statut: "Closed", statutTexte: "Vendu", prix: null, loyer: null, venduLe: new Date().toISOString() };
      if (v.en) v.en = { ...v.en, statutTexte: "Sold" };
      garde.push(v);
    }
  }
  return garde;
}

// ---------- Main ----------

async function main() {
  const dist = path.join(ROOT, "dist");
  await mkdir(dist, { recursive: true });

  if (args.includes("--trouver-courtier")) {
    if (!KEY) throw new Error("CENTRIS_API_KEY manquante");
    await findMember(args[args.indexOf("--trouver-courtier") + 1] || "Dulude");
    return;
  }

  let listings, vendus = [];
  if (SAMPLE) {
    listings = JSON.parse(await readFile(path.join(ROOT, "sample", "listings.json"), "utf8"));
    try {
      const raws = JSON.parse(await readFile(path.join(ROOT, "sample", "details-bruts.json"), "utf8"));
      listings.forEach((l, i) => { if (raws[i]) { l.details = details(raws[i]); l.en = { description: "Sample English description for the preview.", details: details(raws[i], "en") }; } });
    } catch {}
  } else {
    if (!KEY) throw new Error("CENTRIS_API_KEY manquante. Ajoute-la dans les secrets GitHub.");
    console.log("Lecture des valeurs de listes...");
    const lookups = await fetchLookups(["StandardStatus", "PropertyType", "PropertySubType"]);
    try {
      const tous = await getAll("Lookup", 50000);
      setLookups(tous, "fr");
      try { setLookups(await getAll("Lookup", 50000, "en"), "en"); } catch {}
      console.log(`  ${tous.length} libellés officiels Centris chargés.`);
    } catch (e) { console.warn("  Libellés Centris indisponibles, on garde la traduction intégrée.", e.message.slice(0, 120)); }
    console.log("Lecture des inscriptions...");
    const rows = await fetchProperties();

    // Diagnostic sans données personnelles : statuts et types reçus
    const tally = (k) => rows.reduce((a, r) => ((a[r[k]] = (a[r[k]] || 0) + 1), a), {});
    console.log("  Statuts reçus :", tally("StandardStatus"));
    console.log("  Types reçus :", tally("PropertyType"));

    const wanted = new Set(config.filtres.statutsAffiches);
    const mine = rows.filter((r) => !memberKey || r.ListAgentKey === memberKey || r.CoListAgentKey === memberKey || !("ListAgentKey" in r));
    listings = mine
      .filter((r) => wanted.has(r.StandardStatus))
      .map((r) => toPublic(r, lookups))
      .sort((a, b) => (Date.parse(b.enVigueurDepuis) || 0) - (Date.parse(a.enVigueurDepuis) || 0));
    const v = config.filtres.vendus || {};
    if (false && v.afficher) { // désactivé : Annexe II Centris, art. 2.3
      const limite = Date.now() - (v.moisMaximum || 24) * 30.44 * 864e5;
      vendus = mine
        .filter((r) => r.StandardStatus === "Closed")
        .map((r) => toPublic(r, lookups))
        .filter((l) => !l.dateStatut || Date.parse(l.dateStatut) >= limite)
        .sort((a, b) => String(b.dateStatut).localeCompare(String(a.dateStatut)))
        .slice(0, v.maximum || 12)
        .map((l) => (v.afficherPrix ? { ...l, statutTexte: "Vendu" } : { ...l, statutTexte: "Vendu", prix: null, loyer: null }));
    }
    vendus = await suivreVendus(listings);
    if (valeursInconnues().length) console.log("  Valeurs sans traduction :", valeursInconnues().join(" | "));
    console.log(`  ${listings.length} propriétés à vendre et ${vendus.length} vendues publiées.`);
  }

  const pages = renderSite(config, [...listings, ...vendus], { apercu: SAMPLE ? "Aperçu avec des propriétés fictives." : "" });
  if (!SAMPLE) await writeFile(path.join(dist, "etat.json"), JSON.stringify({ genere: new Date().toISOString(), actives: listings, vendus }));
  for (const [f, html] of Object.entries(pages)) { await mkdir(path.dirname(path.join(dist, f)), { recursive: true }); await writeFile(path.join(dist, f), html); }
  await cp(path.join(ROOT, "assets"), path.join(dist, "assets"), { recursive: true });
  if (config.page.domainePersonnalise && !SAMPLE) {
    await writeFile(path.join(dist, "CNAME"), config.page.domainePersonnalise + "\n");
  }
  await writeFile(path.join(dist, ".nojekyll"), "");
  console.log("Site généré dans dist/");
}

main().catch((e) => {
  console.error("ERREUR :", e.message);
  process.exit(1);
});
