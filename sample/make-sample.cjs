// Crée des données et photos fictives pour l'aperçu (node sample/make-sample.cjs)
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
fs.mkdirSync(path.join(root, "dist/exemple"), { recursive: true });
const pal = [["#c9b79c", "#7d6a52"], ["#a9bcc9", "#4f6577"], ["#c4a99b", "#7a5446"], ["#b9c4a6", "#5d6b4a"], ["#d1c3a6", "#8a7651"]];
for (let i = 0; i < 10; i++) {
  const [a, b] = pal[i % 5];
  fs.writeFileSync(path.join(root, `dist/exemple/p${i}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="900" height="600" fill="url(#g)"/><rect y="470" width="900" height="130" fill="#000" opacity=".12"/><g fill="#fff" opacity=".85"><polygon points="250,300 450,160 650,300"/><rect x="290" y="300" width="320" height="190"/></g><g fill="${b}"><rect x="425" y="390" width="50" height="100"/><rect x="320" y="330" width="70" height="55"/><rect x="510" y="330" width="70" height="55"/></g><text x="450" y="560" font-family="sans-serif" font-size="22" fill="#fff" text-anchor="middle" opacity=".8">Photo d'exemple ${i + 1}</text></svg>`);
}
const ph = (ids) => ids.map((i) => ({ url: `exemple/p${i}.svg`, legende: "" }));
const L = [
  { id: "10000001", statut: "Active", statutTexte: "À vendre", prix: 899000, type: "Immeuble à revenus", sousType: "Triplex", adresse: "123 rue Exemple", ville: "Saint-Jean-sur-Richelieu", logements: 3, terrain: "4 500 pi²", anneeConstruction: 1978, description: "Triplex bien entretenu, idéal pour investisseur ou propriétaire occupant.\n\nTexte d'exemple : la vraie description viendra directement de Centris.", photos: ph([0, 1, 2, 3]), modifie: "2026-10-20" },
  { id: "10000002", statut: "Active", statutTexte: "À vendre", prix: 549000, type: "Résidentiel", sousType: "Maison unifamiliale", adresse: "45 avenue Modèle", ville: "Chambly", chambres: 3, sallesDeBain: 2, superficie: "1 450 pi²", terrain: "6 200 pi²", anneeConstruction: 1995, description: "Description d'exemple.", photos: ph([1, 4, 5]), modifie: "2026-10-25" },
  { id: "10000003", statut: "Active Under Contract", statutTexte: "Promesse d'achat acceptée", prix: 1250000, type: "Immeuble à revenus", sousType: "Quintuplex", adresse: "7 boulevard Fictif", ville: "La Prairie", logements: 5, anneeConstruction: 1988, description: "Description d'exemple.", photos: ph([2, 6, 7]), modifie: "2026-10-10" },
  { id: "10000004", statut: "Active", statutTexte: "À vendre", prix: 419000, type: "Résidentiel", sousType: "Condo", adresse: "302-88 rue Démo", ville: "Candiac", chambres: 2, sallesDeBain: 1, superficie: "1 050 pi²", anneeConstruction: 2012, description: "Description d'exemple.", photos: ph([3, 8, 9]), modifie: "2026-10-27" },
];
fs.writeFileSync(path.join(root, "sample/listings.json"), JSON.stringify(L, null, 1));
