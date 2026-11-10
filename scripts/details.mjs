// Prépare les détails publics d'une inscription Centris, en français, prêts à afficher.
// Seulement des champs publics (ceux qu'on voit sur une fiche Centris). Rien sur les propriétaires,
// les acheteurs, la rémunération ou les hypothèques.

const FR = {
  // Valeurs générales
  Other: "Autre", None: "Aucun", Yes: "Oui", No: "Non",
  // Sous-sol
  "Partially Finished": "Partiellement aménagé", Finished: "Aménagé", Unfinished: "Non aménagé",
  "Six feet and higher": "6 pieds et plus", "Less than six feet": "Moins de 6 pieds", "Crawl Space": "Vide sanitaire",
  Full: "Complet", "Walk-Out Access": "Accès extérieur", "Outside access": "Accès extérieur",
  // Mitoyenneté
  "No Common Walls": "Détaché (aucun mur mitoyen)", "1 Common Wall": "Jumelé", "2+ Common Walls": "En rangée",
  "Corner Unit": "Unité de coin", "End Unit": "Unité de bout",
  // Matériaux
  Brick: "Brique", Stone: "Pierre", "Aluminum Siding": "Aluminium", "Wood Siding": "Bois", "Vinyl Siding": "Vinyle",
  Stucco: "Crépi", Concrete: "Béton", "Fiber Cement": "Fibrociment", Wood: "Bois", Vinyl: "Vinyle", Aluminum: "Aluminium",
  Masonite: "Masonite", Steel: "Acier", "Engineered wood": "Bois d'ingénierie", "Pressed wood": "Bois pressé",
  // Climatisation et chauffage
  "Wall-mounted heat pump": "Thermopompe murale", "Wall Unit(s)": "Climatiseur mural", "Central Air": "Climatisation centrale",
  "Heat Pump": "Thermopompe", "Central heat pump": "Thermopompe centrale", Ductless: "Sans conduits", "Window Unit(s)": "Climatiseur de fenêtre",
  Electric: "Électrique", Electricity: "Électricité", "Forced Air": "Air pulsé", Baseboard: "Plinthes électriques",
  "Electric baseboard units": "Plinthes électriques", Radiant: "Radiant", "Radiant floor": "Plancher radiant",
  "Hot Water": "Eau chaude", "Hot water": "Eau chaude", "Natural Gas": "Gaz naturel", Oil: "Mazout", "Fuel oil": "Mazout", Propane: "Propane",
  // Clôture et terrain
  Fenced: "Clôturé", Hedges: "Haie", Landscaped: "Paysager", Level: "Plat", "Corner Lot": "Terrain de coin", Wooded: "Boisé",
  // Planchers
  "Ceramic Tile": "Céramique", Laminate: "Plancher flottant", Carpet: "Tapis", Parquet: "Parquet", "Floating floor": "Plancher flottant",
  // Fondation
  "Concrete Perimeter": "Béton coulé", "Poured Concrete": "Béton coulé", "Concrete Block": "Blocs de béton",
  // Armoires
  Melamine: "Mélamine", Thermoplastic: "Thermoplastique", Polyester: "Polyester", Polymer: "Polymère",
  // Équipements
  "Air exchanger": "Échangeur d'air", Intercom: "Interphone", "Central vacuum cleaner system installation": "Aspirateur central",
  "Alarm system": "Système d'alarme", "Electric garage door": "Porte de garage électrique", "Water softener": "Adoucisseur d'eau",
  "Electric Car Charging Station": "Borne de recharge", "Electric car charging station": "Borne de recharge",
  // Stationnement
  "Other garage": "Garage", "Built-in garage": "Garage intégré", Asphalt: "Asphalte", "Heated Garage": "Garage chauffé",
  "Detached garage": "Garage détaché", Detached: "Détaché", "Paver Block": "Pavé uni", "Wide garage": "Garage double",
  "Attached Garage": "Garage attaché", "Attached garage": "Garage attaché", Gravel: "Gravier", "Double width or more": "Double largeur ou plus",
  "Single width": "Simple largeur", Tandem: "Tandem", Garage: "Garage", Outside: "Extérieur", Driveway: "Allée", Carport: "Abri d'auto",
  Indoor: "Intérieur", Underground: "Souterrain",
  // Piscine
  "In Ground": "Creusée", "Above Ground": "Hors terre", Heated: "Chauffée", Inground: "Creusée",
  // Toiture
  Elastomeric: "Membrane élastomère", Shingle: "Bardeau d'asphalte", Metal: "Tôle", "Asphalt and gravel": "Asphalte et gravier", Membrane: "Membrane",
  // Sécurité et accessibilité
  "Monitored fire alarm": "Alarme incendie reliée", "Fire sprinkler": "Gicleurs", "Security Camera": "Caméra de surveillance",
  "Accessible Approach with Ramp": "Accès avec rampe",
  // Eau, égout, services
  "Public Sewer": "Égout municipal", "Septic Tank": "Fosse septique", "Disposal field": "Champ d'épuration",
  Municipality: "Municipalité", Well: "Puits", "Artesian well": "Puits artésien", "Surface well": "Puits de surface",
  "Water Connected": "Eau", "Sewer Connected": "Égout", "Electricity Connected": "Électricité",
  // Fenêtres
  "Pvc Frames": "Cadres en PVC", "Wood Frames": "Cadres en bois", "Aluminum Frames": "Cadres en aluminium",
  Casement: "À battants", Sliding: "Coulissantes", "Double-hung": "À guillotine", Tilt: "Oscillo-battantes",
  // Immeuble
  "Elevator(s)": "Ascenseur", Pool: "Piscine", "Inside Storage": "Rangement intérieur", Gym: "Salle d'entraînement",
  "Rooftop terrace": "Terrasse sur le toit", "Common terrace": "Terrasse commune",
  Apartment: "Appartement", Residential: "Résidentiel", Commercial: "Commercial", Industrial: "Industriel", Agricultural: "Agricole",
  // Salles de bain, foyers
  "Ensuite bathroom": "Salle de bain attenante", "Separate shower": "Douche séparée", Jacuzzi: "Bain à remous",
  "Wood fireplace": "Foyer au bois", "Gas fireplace": "Foyer au gaz", "Wood stove": "Poêle à bois", "Pellet stove": "Poêle à granules",
  // Copropriété, logements
  Divided: "Divise", Undivided: "Indivise", Partially: "Partiellement meublé", Unfurnished: "Non meublé", Furnished: "Meublé",
  Vacant: "Vacant", Primary: "Principal",
  "Snow removal": "Déneigement", "Water taxes": "Taxe d'eau", Appliances: "Électroménagers", Parking: "Stationnement",
  // Pièces
  "Living Room": "Salon", Kitchen: "Cuisine", "Master Bedroom": "Chambre principale", Bedroom: "Chambre", Bathroom: "Salle de bain",
  "Dining Room": "Salle à manger", "Walkin closet": "Walk-in", "Family Room": "Salle familiale", "Powder Room": "Salle d'eau",
  Washroom: "Salle d'eau", "Laundry Room": "Salle de lavage", Office: "Bureau", Hall: "Hall d'entrée", Foyer: "Hall d'entrée",
  Storage: "Rangement", Workshop: "Atelier", Mudroom: "Vestibule", Playroom: "Salle de jeux", "Recreation Room": "Salle de jeux",
  Den: "Boudoir", Solarium: "Solarium", "Wine Cellar": "Cellier", "Cold Room": "Chambre froide", "Home Theatre": "Cinéma maison",
  "Living/Dining Room": "Salon / salle à manger", "Kitchen/Dining Room": "Cuisine / salle à manger", Hallway: "Corridor",
  Mezzanine: "Mezzanine", Veranda: "Véranda", Basement: "Sous-sol", Loft: "Loft", Library: "Bibliothèque",
  // Niveaux
  First: "Rez-de-chaussée", "Ground Floor": "Rez-de-chaussée", Second: "2e étage", Third: "3e étage", Fourth: "4e étage",
  Fifth: "5e étage", Attic: "Grenier",
  // Espaces additionnels
  Balcony: "Balcon", "Parking storage space": "Rangement au stationnement", Locker: "Casier", Terrace: "Terrasse", Patio: "Patio",
  Private: "Privatif", "Common for restricted use": "Commun à usage restreint", Common: "Commun",
  // Dépenses
  Municipal: "Taxes municipales", School: "Taxes scolaires", "Condominium fees": "Frais de copropriété", "Rental equipment": "Équipement loué",
  Insurance: "Assurances", Heating: "Chauffage", Maintenance: "Entretien", "Common expenses": "Charges communes",
  Water: "Taxe d'eau", Garbage: "Ordures", "Water heater": "Chauffe-eau", Gas: "Gaz", "Energy": "Énergie",
  // Rénovations
  Floor: "Planchers", Plumbing: "Plomberie", "Roof covering": "Toiture", Windows: "Fenêtres", Insulation: "Isolation",
  Foundation: "Fondation", Doors: "Portes", "Exterior siding": "Revêtement extérieur", Painting: "Peinture",
  // Proximité
  "Near highway": "Autoroute", "Near CEGEP": "Cégep", "Near daycare centre": "Garderie", "Near Golf Course": "Golf",
  "Near hospital": "Hôpital", "Near metro": "Métro", "Near bicycle path": "Piste cyclable", "Near elementary school": "École primaire",
  "Near high school": "École secondaire", "Near Public Transit": "Transport en commun", "Near university": "Université",
  "Near park": "Parc", "Near commuter train": "Train de banlieue", "Near Shopping": "Commerces", "Near water": "Plan d'eau",
  "Near ski": "Ski", "Near Ski": "Ski", "Near Marina": "Marina", "Near Shopping Center": "Centre commercial",
};

// Libellés officiels de Centris (Lookup.DisplayName), chargés par build.mjs
let LK = {}, LKV = {};
export function setLookups(rows) {
  LK = {}; LKV = {};
  for (const r of rows || []) {
    const lab = r.DisplayName; if (!lab) continue;
    for (const k of [r.LookupValue, r.StandardLookupValue, r.LegacyODataValue]) if (k != null) { LK[`${r.LookupName}|${k}`] = lab; LKV[k] ??= lab; }
  }
}
const inconnus = new Set();
export const valeursInconnues = () => [...inconnus];

function fr(v, champ) {
  if (v == null || v === "") return "";
  const s = String(v);
  if (champ && LK[`${champ}|${s}`]) return LK[`${champ}|${s}`];
  if (FR[s]) return FR[s];
  if (LKV[s]) return LKV[s];
  if (/^[\x20-\x7E]+$/.test(s) && /^[A-Z][a-z]/.test(s)) inconnus.add(s);
  return s;
}
const liste = (a, champ) => (Array.isArray(a) ? a.filter((x) => x && x !== "Other").map((x) => fr(x, champ)).filter(Boolean) : []);
const joindre = (a) => [...new Set(a)].join(", ");
const n = (v) => { const x = Number(v); return Number.isFinite(x) && x > 0 ? x : null; };
const argent = (v) => (n(v) ? Math.round(v).toLocaleString("fr-CA").replace(/ | /g, " ") + " $" : "");
const etage = (v) => { const m = String(v || "").match(/^(\d+)(st|nd|rd|th)$/i); return m ? (m[1] === "1" ? "1er" : m[1] + "e") : fr(v); };
const pieds = (s) => String(s || "").trim();

export function details(p) {
  if (p.InternetEntireListingDisplayYN === false) return null;
  const sec = [];
  const add = (titre, lignes) => { const l = lignes.filter(([, v]) => v !== "" && v != null && v !== false); if (l.length) sec.push({ titre, lignes: l.map(([a, b]) => [a, String(b)]) }); };

  const chH = n(p.AboveGroundBedroomsTotal), chS = n(p.BasementBedroomsTotal);
  add("Caractéristiques", [
    ["Année de construction", n(p.YearBuilt) || ""],
    ["Pièces", n(p.RoomsTotal) || ""],
    ["Chambres", chH || chS ? [chH && `${chH} hors-sol`, chS && `${chS} au sous-sol`].filter(Boolean).join(", ") : ""],
    ["Salles de bain", n(p.BathroomsFull) || ""],
    ["Salles d'eau", n(p.BathroomsPartial) || ""],
    ["Étage", p.Floor ? etage(p.Floor) : ""],
    ["Nombre d'étages", n(p.StoriesTotal) || ""],
    ["Type de copropriété", fr(p.CoOwnershipType, "CoOwnershipType")],
    ["Dimensions du terrain", pieds(p.LotSizeDimensionsFeet || p.LotSizeDimensions)],
    ["Dimensions du bâtiment", pieds(p.BuildingSizeDimensionsFeet || p.BuildingSizeDimensions)],
    ["Mitoyenneté", joindre([...liste(p.CommonWalls, "CommonWalls"), ...liste(p.UnitCommonWalls, "UnitCommonWalls")])],
    ["Zonage", p.ZoningDescription || ""],
    ["Quartier", p.NeighborhoodName || ""],
    ["Délai d'occupation", n(p.DaysBeforeAvailability) ? `${p.DaysBeforeAvailability} jours` : ""],
  ]);

  let heat = liste(p.Heating, "Heating");
  if (heat.includes("Électrique") && heat.includes("Électricité")) heat = heat.filter((x) => x !== "Électricité");
  add("Bâtiment", [
    ["Fondation", joindre(liste(p.FoundationDetails, "FoundationDetails"))],
    ["Revêtement extérieur", joindre(liste(p.ConstructionMaterials, "ConstructionMaterials"))],
    ["Toiture", joindre(liste(p.Roof, "Roof"))],
    ["Fenêtres", joindre(liste(p.WindowFeatures, "WindowFeatures"))],
    ["Sous-sol", joindre(liste(p.Basement, "Basement"))],
    ["Chauffage", joindre(heat)],
    ["Climatisation", joindre(liste(p.Cooling, "Cooling"))],
    ["Foyer ou poêle", joindre(liste(p.FireplaceFeatures, "FireplaceFeatures"))],
    ["Armoires de cuisine", joindre(liste(p.KitchenCabinetFeatures, "KitchenCabinetFeatures"))],
    ["Revêtement de sol", joindre(liste(p.Flooring, "Flooring"))],
    ["Salles de bain", joindre(liste(p.BathroomFeatures, "BathroomFeatures"))],
    ["Équipements", joindre(liste(p.OtherEquipment, "OtherEquipment"))],
    ["Sécurité", joindre(liste(p.SecurityFeatures, "SecurityFeatures"))],
    ["Accessibilité", joindre(liste(p.AccessibilityFeatures, "AccessibilityFeatures"))],
    ["Commodités de l'immeuble", joindre(liste(p.AssociationAmenities, "AssociationAmenities"))],
    ["Approvisionnement en eau", joindre(liste(p.WaterSource, "WaterSource"))],
    ["Égout", joindre(liste(p.Sewer, "Sewer"))],
  ]);

  const parks = (Array.isArray(p.Parkings) ? p.Parkings : []).filter((x) => x.ParkingFeatures).map((x) => `${fr(x.ParkingFeatures, "ParkingFeatures")}${n(x.ParkingSpaces) ? ` (${x.ParkingSpaces})` : ""}`);
  const lot = Array.isArray(p.LotFeatures) ? p.LotFeatures : [];
  add("Extérieur et stationnement", [
    ["Stationnement", [n(p.ParkingTotal) && `${p.ParkingTotal} place${p.ParkingTotal > 1 ? "s" : ""}`, joindre(parks)].filter(Boolean).join(" : ")],
    ["Caractéristiques du stationnement", joindre(liste(p.ParkingFeatures, "ParkingFeatures"))],
    ["Piscine", joindre(liste(p.PoolFeatures, "PoolFeatures"))],
    ["Clôture", joindre(liste(p.Fencing, "Fencing"))],
    ["Terrain", joindre(lot.filter((x) => !/^Near/i.test(x)).map((x) => fr(x, "LotFeatures")))],
  ]);
  const proches = lot.filter((x) => /^Near/i.test(x)).map((x) => fr(x, "LotFeatures"));

  // Pièces, par niveau
  const pieces = (Array.isArray(p.Rooms) ? p.Rooms : [])
    .slice().sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .map((r) => ({
      niveau: fr(r.RoomLevel, "RoomLevel"),
      piece: r.RoomType === "Other" && r.RoomTypeOther ? r.RoomTypeOther : fr(r.RoomType, "RoomType"),
      dim: pieds(r.RoomDimensionsFeet || r.RoomDimensions),
      sol: joindre([...liste(r.RoomFlooring, "RoomFlooring"), r.RoomFlooringOther || ""].filter(Boolean)),
    }))
    .filter((r) => r.piece);

  // Logements (plex)
  const types = (Array.isArray(p.UnitTypes) ? p.UnitTypes : []).filter((u) => u.UnitTypeType && u.UnitTypeType !== "Primary")
    .map((u) => `${u.UnitTypeUnitsTotal || 1} × ${u.UnitTypeType}`);
  const units = (Array.isArray(p.Units) ? p.Units : []).slice().sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .filter((u) => u.UnitType && (p.Units.length > 1 || u.UnitType !== "Primary"))
    .map((u) => ({
      type: fr(u.UnitType, "UnitType"),
      chambres: u.UnitBedroomsTotal ?? "",
      sdb: u.UnitBathroomsFullTotal ?? "",
      meuble: fr(u.Furnished, "Furnished"),
      inclus: joindre([...liste(u.RentIncludes, "RentIncludes"), u.RentIncludesOther || ""].filter(Boolean)),
      vacant: Array.isArray(u.UnitLeaseFeatures) && u.UnitLeaseFeatures.includes("Vacant"),
    }));
  const logements = units.length || types.length ? {
    resume: [n(p.NumberOfUnitsTotal) && `${p.NumberOfUnitsTotal} logements`, types.join(", "), n(p.NumberOfUnitsVacant) && `${p.NumberOfUnitsVacant} vacant${p.NumberOfUnitsVacant > 1 ? "s" : ""}`].filter(Boolean).join(" · "),
    liste: units,
  } : null;

  // Espaces additionnels (copropriété)
  const espaces = (Array.isArray(p.AdditionalSpaces) ? p.AdditionalSpaces : []).slice().sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .map((e) => ({ type: e.AdditionalSpaceType === "Other" && e.AdditionalSpaceTypeOther ? e.AdditionalSpaceTypeOther : fr(e.AdditionalSpaceType, "AdditionalSpaceType"), dim: pieds(e.AdditionalSpaceDimensionsFeet || e.AdditionalSpaceDimensions), usage: fr(e.AdditionalSpaceRestrictions, "AdditionalSpaceRestrictions") }))
    .filter((e) => e.type);

  // Revenus, évaluation, taxes et dépenses
  const fin = [];
  if (n(p.GrossScheduledIncomeResidential)) fin.push([`Revenus bruts potentiels${p.GrossScheduledIncomeDate ? ` (${String(p.GrossScheduledIncomeDate).slice(0, 4)})` : ""}`, argent(p.GrossScheduledIncomeResidential)]);
  if (n(p.GrossScheduledIncomeCommercial)) fin.push(["Revenus commerciaux", argent(p.GrossScheduledIncomeCommercial)]);
  if (n(p.GrossScheduledIncomeParking)) fin.push(["Revenus de stationnement", argent(p.GrossScheduledIncomeParking)]);
  const evT = n(p.TaxAssessedLotValue), evB = n(p.TaxAssessedBuildingValue);
  if (evT || evB) {
    const an = p.TaxYear ? ` (${p.TaxYear})` : "";
    if (evT) fin.push([`Évaluation municipale, terrain${an}`, argent(evT)]);
    if (evB) fin.push([`Évaluation municipale, bâtiment${an}`, argent(evB)]);
    if (evT && evB) fin.push([`Évaluation municipale, total${an}`, argent(evT + evB)]);
  }
  for (const e of (Array.isArray(p.Expenses) ? p.Expenses : [])) {
    if (!n(e.ExpenseAmount)) continue;
    const lab = e.ExpenseSubType === "Other" && e.ExpenseSubTypeOther ? e.ExpenseSubTypeOther : fr(e.ExpenseSubType || e.ExpenseType);
    fin.push([`${lab}${e.ExpenseYear ? ` (${e.ExpenseYear})` : ""}`, `${argent(e.ExpenseAmount)} / an`]);
  }
  for (const r of (Array.isArray(p.RentedEquipment) ? p.RentedEquipment : [])) {
    if (!r.RentedEquipmentType) continue;
    fin.push([`Équipement loué : ${fr(r.RentedEquipmentType, "RentedEquipmentType").toLowerCase()}`, n(r.RentedEquipmentPrice) ? `${argent(r.RentedEquipmentPrice)} / mois` : "Oui"]);
  }

  const renos = (Array.isArray(p.Renovations) ? p.Renovations : [])
    .map((r) => ({ type: r.RenovationType === "Other" && r.RenovationTypeOther ? r.RenovationTypeOther : fr(r.RenovationType, "RenovationType"), annee: r.RenovationYear || "", detail: r.RenovationDescription || "" }))
    .filter((r) => r.type)
    .sort((a, b) => String(b.annee).localeCompare(String(a.annee)));

  return {
    sections: sec,
    proches,
    pieces,
    logements,
    espaces,
    finances: fin,
    renovations: renos,
    inclusions: p.Inclusions || "",
    exclusions: p.Exclusions || "",
    addenda: p.Addenda || "",
  };
}
