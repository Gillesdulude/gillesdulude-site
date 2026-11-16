// Page d'accueil d'essai : nouveau style « architecture, haut de gamme ».
// Publiée à /essai/ seulement, pour comparer avec le site actuel. Non indexée par Google.

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const prix = (n) => (n ? Math.round(n).toLocaleString("fr-CA").replace(/ | /g, " ") + " $" : "");
const signe = (v) => (v > 0 ? "+" : "") + v;

// Dessins au trait : façades typiques de la Rive-Sud (unifamiliale, duplex, triplex).
const FACADE = {
  maison: `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M10 48 L60 12 L110 48"/><path d="M20 41 V92 H100 V41"/><rect x="30" y="56" width="18" height="16"/><rect x="72" y="56" width="18" height="16"/><path d="M53 92 V68 H67 V92"/><path d="M84 26 V16 H92 V32"/><path d="M4 92 H116"/></svg>`,
  duplex: `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M18 18 H102 V92 H18 Z"/><path d="M14 18 H106"/><path d="M18 55 H102"/><rect x="30" y="28" width="16" height="16"/><rect x="74" y="28" width="16" height="16"/><rect x="30" y="66" width="16" height="16"/><rect x="74" y="66" width="16" height="16"/><path d="M52 92 V68 H68 V92"/><path d="M52 55 V32 H68 V55"/><path d="M4 92 H116"/></svg>`,
  triplex: `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M16 8 H104 V92 H16 Z"/><path d="M12 8 H108"/><path d="M16 36 H104 M16 64 H104"/><rect x="26" y="15" width="14" height="13"/><rect x="80" y="15" width="14" height="13"/><rect x="26" y="43" width="14" height="13"/><rect x="80" y="43" width="14" height="13"/><rect x="26" y="71" width="14" height="13"/><path d="M80 92 V71 H94 V92"/><path d="M50 36 V20 H70 V36 M50 64 V48 H70 V64"/><path d="M44 36 H76 M44 64 H76"/><path d="M58 92 L72 64 M62 92 L76 64"/><path d="M4 92 H116"/></svg>`,
};

// Ligne d'horizon de plex et de maisons, pour le bas de page.
const HORIZON = `<svg class="horizon" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 119 H40 V70 H130 V119 H150 L195 78 L240 119 H260 V52 H360 V119 H380 V84 H450 V60 L490 32 L530 60 V119 H560 V44 H650 V119 H670 L720 74 L770 119 H790 V66 H880 V119 H900 V58 L950 26 L1000 58 V119 H1020 V48 H1110 V119 H1130 L1165 88 L1200 119"/><path d="M285 64 h14 v14 h-14z M321 64 h14 v14 h-14z M285 92 h14 v14 h-14z M321 92 h14 v14 h-14z M585 56 h14 v14 h-14z M611 56 h14 v14 h-14z M585 86 h14 v14 h-14z M611 86 h14 v14 h-14z M1045 60 h14 v14 h-14z M1071 60 h14 v14 h-14z M1045 90 h14 v14 h-14z M1071 90 h14 v14 h-14z"/></svg>`;

export function pageEssai(cfg, listings, { avis = [], prixRLP = [], rdv = "#", rdvAttrs = "" } = {}) {
  const c = cfg.courtier, m = cfg.marche || {};
  const tel = c.telephone || "", telHref = "tel:" + tel.replace(/[^\d+]/g, "");
  const actives = listings.filter((l) => !l.vendu).slice(0, 3);
  const nb = listings.filter((l) => !l.vendu).length;
  const rangs = [
    ["Prix médian · unifamiliale", m.prix?.Unifamiliale],
    ["Prix médian · copropriété", m.prix?.["Copropriété"]],
    ["Prix médian · plex 2 à 5 logements", m.prix?.["Plex (2 à 5 logements)"]],
  ].filter(([, v]) => v);
  const delais = m.delais ? Object.entries(m.delais) : [];
  const avis1 = avis.slice(0, 3);

  return `<!DOCTYPE html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Essai | Gilles Jr. Dulude, courtier immobilier</title>
<link rel="icon" href="../assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--ink:#0F0D0B;--ink2:#1A1714;--paper:#F3EFE8;--stone:#E6DFD3;--bronze:#A88A57;--bronze2:#C9AE7C;--mut:#6F675D;--line:rgba(15,13,11,.16);--lineD:rgba(243,239,232,.14);--wrap:1240px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{overflow-x:clip}
body{background:var(--paper);color:var(--ink);font-family:Archivo,Helvetica,Arial,sans-serif;font-stretch:100%;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 40px}
.mono{font-family:"IBM Plex Mono",ui-monospace,monospace;letter-spacing:.04em}
.cap{font-stretch:125%;text-transform:uppercase;letter-spacing:.02em;font-weight:700;line-height:.98}
.tag{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--bronze);display:flex;align-items:center;gap:14px}
.tag::after{content:"";height:1px;width:56px;background:currentColor;opacity:.6}
.btn{display:inline-flex;align-items:center;gap:14px;padding:18px 28px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;border:1px solid currentColor;transition:background .25s,color .25s}
.btn.plein{background:var(--bronze);border-color:var(--bronze);color:var(--ink)}
.btn.plein:hover{background:var(--bronze2);border-color:var(--bronze2)}
.btn.trait:hover{background:var(--paper);color:var(--ink)}
.btn .fl{font-family:"IBM Plex Mono",monospace;font-weight:400}
/* En-tête */
.top{position:fixed;inset:0 0 auto 0;z-index:30;transition:background .3s,border-color .3s;border-bottom:1px solid transparent;color:var(--paper)}
.top.plein{background:rgba(15,13,11,.96);border-color:var(--lineD)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;height:92px}
.logos{display:flex;align-items:center;gap:22px}
.logos .g img{height:40px;width:auto}
.logos .sep{width:1px;height:40px;background:rgba(243,239,232,.35)}
.logos .r img{height:40px;width:auto}
.droite{display:flex;align-items:center;gap:30px}
.droite .appel{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;border-bottom:1px solid var(--bronze);padding-bottom:4px}
.burger{width:48px;height:48px;border:1px solid rgba(243,239,232,.4);background:none;color:inherit;cursor:pointer;display:grid;place-items:center}
.burger span{display:block;width:20px;height:1.5px;background:currentColor;box-shadow:0 -6px 0 currentColor,0 6px 0 currentColor}
/* Menu plein écran */
.menu{position:fixed;inset:0;z-index:40;background:var(--ink);color:var(--paper);display:none;overflow:auto}
.menu.ouvert{display:block}
.menu .grille{position:absolute;inset:0;background-image:linear-gradient(var(--lineD) 1px,transparent 1px),linear-gradient(90deg,var(--lineD) 1px,transparent 1px);background-size:96px 96px;opacity:.5;pointer-events:none}
.menu .wrap{position:relative;min-height:100%;display:grid;grid-template-columns:1.4fr 1fr;gap:60px;padding-top:130px;padding-bottom:60px}
.menu nav a{display:flex;align-items:baseline;gap:22px;padding:12px 0;border-bottom:1px solid var(--lineD);font-size:clamp(30px,4.6vw,58px)}
.menu nav a .mono{font-size:13px;color:var(--bronze)}
.menu nav a:hover .cap{color:var(--bronze2)}
.menu .info{align-self:end;font-size:15px;color:rgba(243,239,232,.75);display:grid;gap:22px}
.menu .info b{display:block;color:var(--paper);font-weight:600}
.fermer{position:absolute;top:22px;right:40px;width:48px;height:48px;border:1px solid rgba(243,239,232,.4);background:none;color:var(--paper);font-size:26px;cursor:pointer;z-index:2}
/* Héros */
.hero{position:relative;background:var(--ink);color:var(--paper);overflow:hidden}
.hero::before{content:"";position:absolute;right:-10%;bottom:-20%;width:70%;height:110%;background:radial-gradient(closest-side,rgba(168,138,87,.22),transparent 70%);pointer-events:none}
.hero .toit{position:absolute;left:0;right:0;top:18%;width:100%;height:60%;pointer-events:none}
.hero .toit path{fill:none;stroke:rgba(168,138,87,.28);stroke-width:1;vector-effect:non-scaling-stroke}
.hero .wrap{position:relative;display:grid;grid-template-columns:1.15fr 1fr;align-items:end;min-height:100vh;padding-top:120px}
.hero .txt{padding-bottom:90px}
.hero h1{font-size:clamp(46px,7vw,104px);margin:26px 0 30px}
.hero h1 span{display:block}
.hero h1 .b{color:var(--bronze)}
.hero p.lead{font-size:20px;max-width:520px;color:rgba(243,239,232,.78);margin-bottom:40px}
.hero .btns{display:flex;gap:14px;flex-wrap:wrap}
.cadre{position:relative;align-self:end;height:min(86vh,780px)}
.cadre img{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:96%;width:auto;-webkit-mask-image:linear-gradient(to top,transparent 0,#000 22%);mask-image:linear-gradient(to top,transparent 0,#000 22%)}
/* Sections */
section{position:relative}
.sec{padding:150px 0}
.sec h2{font-size:clamp(34px,4.4vw,62px);margin:22px 0 0}
.entete{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:70px}
.entete p{color:var(--mut);font-size:18px;max-width:480px}
/* Services */
.services{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink)}
.services a{padding:46px 40px 50px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:20px;transition:background .25s}
.services a:first-child{padding-left:0}.services a:last-child{border-right:0}
.services a:hover{background:var(--stone)}
.services svg{width:120px;height:100px;fill:none;stroke:var(--ink);stroke-width:1.3}
.services .num{font-size:12px;color:var(--mut)}
.services h3{font-size:30px}
.services p{color:var(--mut);font-size:16px}
.services .voir{margin-top:auto;font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;display:flex;gap:10px}
/* Chiffres : fiche technique */
.fiche{background:var(--ink);color:var(--paper)}
.fiche .grille{position:absolute;inset:0;background-image:linear-gradient(90deg,var(--lineD) 1px,transparent 1px);background-size:calc(100%/6) 100%;opacity:.6}
.fiche .wrap{position:relative}
.fiche .entete p{color:rgba(243,239,232,.65)}
.table{border-top:1px solid var(--paper)}
.ligne{display:grid;grid-template-columns:2fr 1fr 1fr;padding:26px 0;border-bottom:1px solid var(--lineD);align-items:baseline;gap:20px}
.ligne .lab{font-size:15px;color:rgba(243,239,232,.75)}
.ligne .val{font-size:clamp(26px,3vw,40px);font-weight:500}
.ligne .var{font-size:14px;text-align:right}
.up{color:#9BC59F}.dn{color:#E39B7B}
.source{margin-top:22px;font-size:12px;color:rgba(243,239,232,.5)}
/* Propriétés */
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.prop{position:relative;display:block;aspect-ratio:3/4;overflow:hidden;background:var(--ink);color:var(--paper)}
.prop img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease,opacity .6s;opacity:.92}
.prop:hover img{transform:scale(1.035);opacity:1}
.prop::after{content:"";position:absolute;inset:45% 0 0 0;background:linear-gradient(to top,rgba(15,13,11,.85),transparent)}
.prop .info{position:absolute;left:34px;right:34px;bottom:30px;z-index:1}
.prop .eti{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--bronze2)}
.prop .px{display:block;font-size:26px;font-weight:500;margin:8px 0 4px}
.prop .ad{font-size:14px;color:rgba(243,239,232,.8)}
.tout{margin-top:50px;display:flex;justify-content:flex-end}
.tout a{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:6px}
/* Gilles */
.gilles{background:var(--stone)}
.gilles{padding:0;overflow:hidden}
.gilles .photo{position:absolute;left:0;top:0;bottom:0;width:48%}
.gilles .photo img{width:100%;height:100%;object-fit:cover;object-position:center 20%;-webkit-mask-image:linear-gradient(to right,#000 55%,transparent);mask-image:linear-gradient(to right,#000 55%,transparent)}
.gilles .wrap{position:relative;display:grid;grid-template-columns:1fr 1.05fr;gap:60px;min-height:760px;align-items:center;padding-top:120px;padding-bottom:120px}
.gilles .wrap>div:last-child{grid-column:2}
.gilles blockquote{font-size:clamp(26px,2.8vw,38px);font-weight:500;line-height:1.25;margin:26px 0 34px}
.gilles p{color:var(--mut);margin-bottom:16px;max-width:560px}
.prix{margin-top:36px;border-top:1px solid var(--ink)}
.prix div{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--line);font-size:15px}
.prix .mono{color:var(--mut)}
/* Avis */
.avis{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink)}
.avis figure{padding:40px 36px 10px 0;border-right:1px solid var(--line)}
.avis figure+figure{padding-left:36px}.avis figure:last-child{border-right:0}
.avis .et{color:var(--bronze);letter-spacing:.3em;font-size:13px}
.avis blockquote{font-size:18px;margin:18px 0 22px}
.avis figcaption{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
/* Appel final */
.final{background:var(--ink);color:var(--paper);text-align:left;padding:120px 0 0}
.final h2{font-size:clamp(40px,6vw,88px);max-width:900px}
.final .btns{display:flex;gap:14px;flex-wrap:wrap;margin:44px 0 90px}
.horizon{display:block;width:100%;height:120px}
.horizon path{fill:none;stroke:var(--bronze);stroke-width:1.2;vector-effect:non-scaling-stroke}
footer{background:var(--ink);color:rgba(243,239,232,.7);font-size:14px;border-top:1px solid var(--lineD)}
footer .wrap{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;padding-top:60px;padding-bottom:40px}
footer h4{font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--bronze);margin-bottom:16px}
footer li{list-style:none;margin-bottom:8px}
footer .bas{border-top:1px solid var(--lineD);padding:22px 0;font-size:12px}
footer .bas .wrap{display:flex;justify-content:space-between;padding:0 40px;grid-template-columns:none}
.essai{position:fixed;left:16px;bottom:16px;z-index:50;background:var(--bronze);color:var(--ink);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:8px 12px}
@media (max-width:980px){
  .wrap{padding:0 24px}
  .droite .appel{display:none}
  .hero .toit{display:none}
  .logos{gap:14px}.logos .g img{height:30px}.logos .r img,.logos .sep{height:30px}
  .hero .wrap{grid-template-columns:1fr;min-height:auto;padding-top:130px}
  .hero .txt{padding-bottom:40px}
  .cadre{height:520px}
  .entete,.gilles .wrap,.menu .wrap{grid-template-columns:1fr;gap:30px}
  .services,.props,.avis{grid-template-columns:1fr}
  .gilles .photo{position:relative;width:100%;height:440px}
  .gilles .photo img{-webkit-mask-image:linear-gradient(to bottom,#000 60%,transparent);mask-image:linear-gradient(to bottom,#000 60%,transparent)}
  .gilles .wrap{min-height:0;padding-top:10px;padding-bottom:80px}.gilles .wrap>div:last-child{grid-column:1}
  .cadre img{height:100%}
  .services a,.services a:first-child{padding:36px 0;border-right:0;border-bottom:1px solid var(--line)}
  .avis figure,.avis figure+figure{padding:30px 0;border-right:0;border-bottom:1px solid var(--line)}
  .ligne{grid-template-columns:1fr auto;}.ligne .lab{grid-column:1/-1}
  footer .wrap{grid-template-columns:1fr 1fr}
  .sec{padding:90px 0}
  .fermer{right:24px}
}
@media (max-width:560px){.logos .g img{height:24px}.logos .r img,.logos .sep{height:26px}.hero h1{font-size:44px}footer .wrap{grid-template-columns:1fr}footer .bas .wrap{flex-direction:column;gap:6px}}
</style>
</head>
<body>
<div class="essai">Version d'essai</div>

<header class="top" id="top"><div class="wrap">
  <div class="logos">
    <a class="g" href="../index.html" aria-label="Accueil"><img src="../assets/logo-h-light.png" alt="Gilles Jr. Dulude, courtier immobilier"></a>
    <span class="sep" aria-hidden="true"></span>
    <a class="r" href="https://distinction.royallepage.ca/" target="_blank" rel="noopener" aria-label="Royal LePage Distinction"><img src="../assets/rlp-mono.png" alt="Royal LePage Distinction"></a>
  </div>
  <div class="droite">
    <a class="appel" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel</a>
    <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false" id="ouvrir"><span></span></button>
  </div>
</div></header>

<div class="menu" id="menu" role="dialog" aria-label="Menu">
  <button class="fermer" id="fermer" aria-label="Fermer le menu">×</button>
  <div class="wrap">
    <nav>
      <a href="../vendre.html"><span class="mono">01</span><span class="cap">Vendre</span></a>
      <a href="../acheter.html"><span class="mono">02</span><span class="cap">Acheter</span></a>
      <a href="../investir.html"><span class="mono">03</span><span class="cap">Investir</span></a>
      <a href="../proprietes.html"><span class="mono">04</span><span class="cap">Propriétés</span></a>
      <a href="../marche.html"><span class="mono">05</span><span class="cap">Marché</span></a>
      <a href="../a-propos.html"><span class="mono">06</span><span class="cap">À propos</span></a>
      <a href="../contact.html"><span class="mono">07</span><span class="cap">Contact</span></a>
    </nav>
    <div class="info">
      <div><b>Téléphone</b><a href="${telHref}">${esc(tel)}</a></div>
      <div><b>Courriel</b><a href="mailto:${esc(c.courriel)}">${esc(c.courriel)}</a></div>
      <div><b>Agence</b>Royal LePage Distinction<br>559, rue Pierre-Caisse<br>Saint-Jean-sur-Richelieu (Québec)&nbsp;J3A&nbsp;1P1</div>
      <div><a class="btn plein" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel <span class="fl">→</span></a></div>
    </div>
  </div>
</div>

<section class="hero">
  <svg class="toit" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 400 L560 40 L1220 400"/></svg>
  <div class="wrap">
    <div class="txt">
      <p class="tag">Rive-Sud de Montréal · Résidentiel et plex</p>
      <h1 class="cap"><span>Vendre.</span><span>Acheter.</span><span class="b">Investir.</span></h1>
      <p class="lead">Un courtier qui a bâti avant de vendre. Dix ans sur les chantiers, puis l'immobilier : je vois ce qui fait la valeur d'une propriété.</p>
      <div class="btns">
        <a class="btn plein" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel <span class="fl">→</span></a>
        <a class="btn trait" href="../vendre.html#evaluation">Évaluation gratuite</a>
      </div>
    </div>
    <div class="cadre">
      <img src="../assets/gilles-hero-detoure.webp" alt="Gilles Jr. Dulude">
    </div>
  </div>
</section>

<section class="sec"><div class="wrap">
  <div class="entete">
    <div><p class="tag">A-01 · Services</p><h2 class="cap">Trois façons<br>de bâtir.</h2></div>
    <p>Une propriété familiale, un premier achat ou un immeuble à revenus : la même rigueur, adaptée à votre projet.</p>
  </div>
  <div class="services">
    <a href="../vendre.html"><span class="num mono">01 / Vendre</span>${FACADE.maison}<h3 class="cap">Vendre</h3><p>La Méthode V8 : le bon prix, une mise en valeur intelligente et une négociation serrée jusqu'au notaire.</p><span class="voir">Voir <span class="mono">→</span></span></a>
    <a href="../acheter.html"><span class="num mono">02 / Acheter</span>${FACADE.duplex}<h3 class="cap">Acheter</h3><p>Je visite avec vous en ancien entrepreneur : structure, travaux à prévoir, vrai potentiel.</p><span class="voir">Voir <span class="mono">→</span></span></a>
    <a href="../investir.html"><span class="num mono">03 / Investir</span>${FACADE.triplex}<h3 class="cap">Investir</h3><p>Duplex, triplex, plex : revenus, baux, dépenses et état de l'immeuble, vérifiés avant l'offre.</p><span class="voir">Voir <span class="mono">→</span></span></a>
  </div>
</div></section>

${rangs.length ? `<section class="sec fiche"><div class="wrap">
  <div class="entete">
    <div><p class="tag">A-02 · Fiche technique</p><h2 class="cap">Le marché,<br>${esc((m.mois || "").toLowerCase())}.</h2></div>
    <p>Les chiffres de la Rive-Sud, sans détour. Pour savoir quand acheter, vendre ou investir.</p>
  </div>
  <div class="table">
    ${rangs.map(([lab, v]) => `<div class="ligne"><span class="lab">${esc(lab)}</span><span class="val mono">${prix(v[0])}</span><span class="var mono ${v[1] > 0 ? "up" : v[1] < 0 ? "dn" : ""}">${signe(v[1])} % / an</span></div>`).join("")}
    ${delais.map(([k, v]) => `<div class="ligne"><span class="lab">Délai de vente · ${esc(k.toLowerCase())}</span><span class="val mono">${v[0]} jours</span><span class="var mono ${v[1] > 0 ? "dn" : v[1] < 0 ? "up" : ""}">${signe(v[1])} j / an</span></div>`).join("")}
  </div>
  <p class="source mono">Source : ${esc(m.source || "")}. ${esc(m.region || "")}.</p>
</div></section>` : ""}

<section class="sec"><div class="wrap">
  <div class="entete">
    <div><p class="tag">A-03 · Inscriptions</p><h2 class="cap">À vendre<br>en ce moment.</h2></div>
    <p>${nb} propriété${nb > 1 ? "s" : ""} inscrite${nb > 1 ? "s" : ""} par Gilles sur la Rive-Sud et ailleurs au Québec.</p>
  </div>
</div>
  <div class="props">
    ${actives.map((l) => `<a class="prop" href="../proprietes.html#${esc(l.id)}">
      ${l.photos?.[0] ? `<img src="${esc(l.photos[0].url || l.photos[0])}" alt="${esc(l.adresse)}" loading="lazy">` : ""}
      <div class="info"><span class="eti">${esc(l.sousType || l.type || "Propriété")} · ${esc(l.ville)}</span><span class="px mono">${l.prix ? prix(l.prix) : "Prix sur demande"}</span><span class="ad">${esc(l.adresse)}</span></div></a>`).join("")}
  </div>
  <div class="wrap"><div class="tout"><a href="../proprietes.html">Toutes les propriétés <span class="mono">→</span></a></div></div>
</section>

<section class="sec gilles"><div class="photo"><img src="../assets/gilles-apropos.jpg" alt="Gilles Jr. Dulude"></div><div class="wrap">
  <div>
    <p class="tag">A-04 · Le courtier</p>
    <blockquote class="cap" style="font-stretch:110%">J'ai passé dix ans sur les chantiers avant l'immobilier.</blockquote>
    <p>Je vois ce qui fait la valeur d'une propriété, et ce qui peut nuire à sa vente. Je suis direct et transparent : mon rôle, c'est de protéger mes clients et de les aider à prendre les bonnes décisions.</p>
    <p>Courtier résidentiel et commercial chez Royal LePage Distinction, en français comme en anglais.</p>
    <div class="prix">${prixRLP.map(([n, a]) => `<div><span>${esc(n)}</span><span class="mono">${esc(a)}</span></div>`).join("")}</div>
  </div>
</div></section>

${avis1.length ? `<section class="sec"><div class="wrap">
  <div class="entete">
    <div><p class="tag">A-05 · Avis Google</p><h2 class="cap">Ce qu'en disent<br>les clients.</h2></div>
    <p>Des avis vérifiés, laissés par de vrais clients sur Google.</p>
  </div>
  <div class="avis">${avis1.map((a) => `<figure><div class="et">★★★★★</div><blockquote>« ${esc(a[0])} »</blockquote><figcaption>${esc(a[1])}</figcaption></figure>`).join("")}</div>
</div></section>` : ""}

<section class="final"><div class="wrap">
  <p class="tag">A-06 · Prochaine étape</p>
  <h2 class="cap" style="margin-top:22px">Parlons de<br>votre projet.</h2>
  <div class="btns"><a class="btn plein" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel <span class="fl">→</span></a><a class="btn trait" href="${telHref}">${esc(tel)}</a></div>
</div>${HORIZON}</section>

<footer>
  <div class="wrap">
    <div><div class="logos" style="margin-bottom:22px"><img src="../assets/logo-h-light.png" alt="Gilles Jr. Dulude" style="height:34px"><span class="sep" style="height:34px"></span><img src="../assets/rlp-mono.png" alt="Royal LePage Distinction" style="height:34px"></div><p>Courtier immobilier résidentiel et commercial. Rive-Sud de Montréal.</p></div>
    <div><h4>Navigation</h4><ul><li><a href="../vendre.html">Vendre</a></li><li><a href="../acheter.html">Acheter</a></li><li><a href="../investir.html">Investir</a></li><li><a href="../proprietes.html">Propriétés</a></li><li><a href="../a-propos.html">À propos</a></li></ul></div>
    <div><h4>Me joindre</h4><ul><li><a href="${telHref}">${esc(tel)}</a></li><li><a href="mailto:${esc(c.courriel)}">${esc(c.courriel)}</a></li></ul></div>
    <div><h4>Agence</h4><ul><li>Royal LePage Distinction</li><li>Agence immobilière</li><li>559, rue Pierre-Caisse</li><li>Saint-Jean-sur-Richelieu (Québec)&nbsp;J3A&nbsp;1P1</li></ul></div>
  </div>
  <div class="bas"><div class="wrap"><span>© ${new Date().getFullYear()} Gilles Jr. Dulude, courtier immobilier</span><a href="../confidentialite.html">Politique de confidentialité</a></div></div>
</footer>

<script>
(()=>{const t=document.getElementById("top"),m=document.getElementById("menu"),o=document.getElementById("ouvrir");
const sc=()=>t.classList.toggle("plein",scrollY>40);addEventListener("scroll",sc,{passive:true});sc();
const ouvrir=v=>{m.classList.toggle("ouvert",v);o.setAttribute("aria-expanded",v);document.body.style.overflow=v?"hidden":""};
o.onclick=()=>ouvrir(true);document.getElementById("fermer").onclick=()=>ouvrir(false);
addEventListener("keydown",e=>{if(e.key==="Escape")ouvrir(false)});})();
</script>
</body>
</html>`;
}
