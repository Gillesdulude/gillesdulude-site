// Diagnostic 4 : ce que Centris fournit en anglais (noms de champs et longueurs seulement pour les textes).
const API = "https://datadistributionqc.centris.ca/v1/odata";
const KEY = process.env.CENTRIS_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(u, lang = "fr") { const r = await fetch(`${API}/${u}`, { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json", "Accept-Language": lang } }); await sleep(300); return r; }
const r = await get(`Property?$filter=${encodeURIComponent("StandardStatus eq 'Active'")}&$expand=Translations`);
const rows = r.ok ? (await r.json()).value : [];
console.log("fiches :", rows.length);
for (const p of rows) {
  console.log(`\n# ${p.PropertySubType} | PublicRemarks fr ${String(p.PublicRemarks || "").length} car. | Addenda ${String(p.Addenda || "").length} | Inclusions ${String(p.Inclusions || "").length}`);
  for (const t of p.Translations || []) console.log(`  ${t.Locale}: ` + (t.Values || []).map((v) => `${v.FieldName}(${String(v.Value ?? "").length})`).join(", "));
}
const en = await get(`Property?$filter=${encodeURIComponent("StandardStatus eq 'Active'")}&$top=1`, "en");
if (en.ok) { const p = (await en.json()).value[0]; console.log("\nAvec Accept-Language en : ZoningDescription =", p.ZoningDescription, "| PublicRemarks commence par :", String(p.PublicRemarks || "").slice(0, 40)); }
const l = await get(`Lookup?$filter=${encodeURIComponent("LookupName eq 'Heating'")}&$top=3`, "en");
if (l.ok) for (const x of (await l.json()).value || []) console.log("Lookup en :", x.LookupValue, "=>", x.DisplayName);
