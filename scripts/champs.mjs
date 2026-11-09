// Diagnostic : liste les NOMS des champs que l'API Centris renvoie pour nos inscriptions.
// N'affiche aucune valeur (le journal GitHub est public).
const API = "https://datadistributionqc.centris.ca/v1/odata";
const KEY = process.env.CENTRIS_API_KEY, MK = process.env.CENTRIS_MEMBER_KEY || "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(u, accept = "application/json") {
  const r = await fetch(u.startsWith("http") ? u : `${API}/${u}`, { headers: { Authorization: `Bearer ${KEY}`, Accept: accept, "Accept-Language": "fr" } });
  await sleep(300);
  return r;
}
const vide = (v) => v == null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length);
function resume(rows, prefix = "") {
  const c = {};
  for (const r of rows) for (const [k, v] of Object.entries(r || {})) {
    const t = Array.isArray(v) ? "liste" : v && typeof v === "object" ? "objet" : typeof v;
    c[k] ??= { n: 0, t }; if (!vide(v)) c[k].n++;
  }
  for (const k of Object.keys(c).sort()) console.log(`${prefix}${k} [${c[k].t}] rempli ${c[k].n}/${rows.length}`);
  for (const k of Object.keys(c).sort()) {
    const sub = rows.flatMap((r) => (Array.isArray(r?.[k]) ? r[k] : r?.[k] && typeof r[k] === "object" ? [r[k]] : [])).filter((x) => x && typeof x === "object");
    if (sub.length) { console.log(`\n--- Sous-champs de ${prefix}${k} (${sub.length} éléments)`); resume(sub, prefix + k + "."); }
  }
}
console.log("=== Ensembles disponibles ===");
let r = await get("");
if (r.ok) { const j = await r.json(); console.log((j.value || []).map((e) => e.name).join(", ")); } else console.log("service :", r.status);
r = await get("$metadata", "application/xml");
if (r.ok) {
  const x = await r.text();
  const m = x.match(/<EntityType Name="Property"[\s\S]*?<\/EntityType>/);
  if (m) console.log("Navigation de Property :", [...m[0].matchAll(/<NavigationProperty Name="([^"]+)"/g)].map((a) => a[1]).join(", ") || "(aucune)");
} else console.log("$metadata :", r.status);
const f = MK ? `&$filter=${encodeURIComponent(`(ListAgentKey eq '${MK}' or CoListAgentKey eq '${MK}') and StandardStatus eq 'Active'`)}` : "&$top=5";
r = await get(`Property?$expand=Media${f}`);
if (!r.ok) { console.log("Property :", r.status, (await r.text()).slice(0, 300)); process.exit(0); }
const rows = (await r.json()).value || [];
console.log(`\n=== Property : ${rows.length} inscriptions ===`);
resume(rows);
// Essaye d'autres expansions possibles
if (rows.length) for (const nav of ["Rooms", "Room", "PropertyRooms", "Units", "UnitTypes", "PropertyUnits", "Features", "PropertyFeatures", "Expenses", "PropertyExpenses", "Inclusions", "Exclusions", "Renovations", "Remarks", "Addenda", "OpenHouse", "Taxes", "PropertyTaxes", "Evaluations"]) {
  const t = await get(`Property?$top=1&$expand=${nav}&$filter=${encodeURIComponent(`ListingKey eq '${rows[0].ListingKey}'`)}`);
  if (t.ok) { const v = (await t.json()).value?.[0]?.[nav]; console.log(`\n=== Expansion ${nav} : OK (${Array.isArray(v) ? v.length + " éléments" : typeof v}) ===`); if (v) resume(Array.isArray(v) ? v : [v], nav + "."); }
}
// Ensembles liés à une inscription (ex. PropertyRooms, PropertyUnitTypes)
if (r.ok && rows.length) {
  const sets = await (await get("")).json().catch(() => ({ value: [] }));
  for (const e of sets.value || []) {
    if (/^(Property|Media|Member|Office|Lookup)$/.test(e.name)) continue;
    const t = await get(`${e.url || e.name}?$top=3&$filter=${encodeURIComponent(`ListingKey eq '${rows[0].ListingKey}'`)}`);
    console.log(`\n=== Ensemble ${e.name} filtré par inscription : ${t.status} ===`);
    if (t.ok) { const v = (await t.json()).value || []; if (v.length) resume(v, e.name + "."); else console.log("(vide)"); }
  }
}
