// Diagnostic 3 : Centris fournit-il les valeurs en français (Translations, Lookup) ?
const API = "https://datadistributionqc.centris.ca/v1/odata";
const KEY = process.env.CENTRIS_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(u, lang = "fr") { const r = await fetch(`${API}/${u}`, { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json", "Accept-Language": lang } }); await sleep(300); return r; }
const r = await get(`Property?$filter=${encodeURIComponent("StandardStatus eq 'Active' and PropertyType eq 'Residential Income'")}&$top=1&$expand=Translations,Rooms,Units`);
const p = r.ok ? (await r.json()).value[0] : null;
console.log("fiche :", r.status, !!p);
if (p) {
  for (const t of p.Translations || []) {
    console.log(`\n=== Translations ${t.Locale} ===`);
    for (const v of t.Values || []) if (!/Remarks|Addenda|Inclusions|Exclusions/.test(v.FieldName)) console.log(`${v.FieldName} = ${JSON.stringify(v.Value).slice(0, 200)}`);
  }
  console.log("\nHeating brut :", JSON.stringify(p.Heating), "| Roof :", JSON.stringify(p.Roof));
  console.log("Pièce brute :", JSON.stringify((p.Rooms || [])[0] || {}).slice(0, 300));
  console.log("Translations dans une pièce ?", Object.keys((p.Rooms || [])[0] || {}).filter((k) => /transl|fr/i.test(k)));
}
for (const lang of ["fr", "fr-CA"]) {
  const l = await get(`Lookup?$filter=${encodeURIComponent("LookupName eq 'Heating'")}&$top=6`, lang);
  console.log(`\n=== Lookup Heating (${lang}) : ${l.status} ===`);
  if (l.ok) for (const x of (await l.json()).value || []) console.log(JSON.stringify(x).slice(0, 300));
}
const names = await get(`Lookup?$select=LookupName&$top=2000`);
if (names.ok) { const v = (await names.json()).value || []; console.log("\nNoms de listes :", [...new Set(v.map((x) => x.LookupName))].join(", ").slice(0, 3000)); }
const tr = await get(`Translation?$top=5`);
console.log("\n=== Ensemble Translation :", tr.status);
if (tr.ok) for (const x of (await tr.json()).value || []) console.log(JSON.stringify(x).slice(0, 300));
