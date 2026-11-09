// Diagnostic 2 : expansions de chaque inscription + exemples de valeurs codées (listes seulement, pas de texte libre).
const API = "https://datadistributionqc.centris.ca/v1/odata";
const KEY = process.env.CENTRIS_API_KEY, MK = process.env.CENTRIS_MEMBER_KEY || "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(u) { const r = await fetch(`${API}/${u}`, { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json", "Accept-Language": "fr" } }); await sleep(300); return r; }
const NAV = ["AdditionalBuildings", "AdditionalSpaces", "Animals", "Equipment", "Expenses", "GreenBuildingVerification", "OpenHouse", "Parkings", "Renovations", "RentedEquipment", "Rooms", "Translations", "UnitTypes", "Units", "Zonings"];
const f = encodeURIComponent(`(ListAgentKey eq '${MK}' or CoListAgentKey eq '${MK}') and StandardStatus eq 'Active'`);
const r = await get(`Property?$filter=${f}&$expand=${NAV.join(",")}`);
console.log("expand tout :", r.status);
let rows = r.ok ? (await r.json()).value : [];
if (!r.ok) { console.log((await r.text()).slice(0, 300)); }
const ex = {};
for (const p of rows) {
  console.log(`\n# Inscription type=${p.PropertyType} sous-type=${p.PropertySubType}`);
  for (const n of NAV) { const v = p[n]; if (Array.isArray(v) && v.length) { console.log(`  ${n}: ${v.length}`); for (const it of v) for (const [k, val] of Object.entries(it)) if (val != null && val !== "" && !/Key$|Timestamp$|ListingId$/.test(k) && (typeof val !== "string" || val.length < 60)) (ex[`${n}.${k}`] ??= new Set()).add(JSON.stringify(val)); } }
  for (const [k, v] of Object.entries(p)) {
    if (Array.isArray(v) && v.length && typeof v[0] !== "object") (ex[k] ??= new Set()).add(JSON.stringify(v));
    else if (["AboveGroundBedroomsTotal","CommonWalls","Levels","Floor","CoOwnershipType","ParkingTotal","LivingAreaSource","ListPriceShort","ListPriceFull","SpecialListingConditions","ZoningDescription","StateRegion","MlsStatus","DaysBeforeAvailability","NeighborhoodName","BuildingSizeDimensions","LotSizeDimensions","LotSizeDimensionsUnits","FoundationArea","StoriesTotal","GrossScheduledIncomeResidential","NumberOfUnitsTotal","TaxYear","RoomsTotal"].includes(k) && v != null) (ex[k] ??= new Set()).add(JSON.stringify(v));
  }
}
console.log("\n=== Exemples de valeurs ===");
for (const k of Object.keys(ex).sort()) console.log(`${k} : ${[...ex[k]].slice(0, 8).join(" | ").slice(0, 400)}`);
