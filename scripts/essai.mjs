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
const HORIZON = "";


const ICO_FB = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z"/></svg>';
const ICO_IG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>';
// Pied de page commun à toutes les pages (même look que l'accueil).

// Bande photo pleine largeur (logo sur photo assombrie) et trio de photos
export const bandePhoto = (P, img, phrase, lien = "", href = "") => `<section class="bande-photo">${/^https?:/.test(img) ? `<img class="bp-img" src="${img}" alt="" loading="lazy">` : `<img class="bp-img" src="${P}assets/photos/${img}.jpg" srcset="${P}assets/photos/${img}-m.jpg 900w, ${P}assets/photos/${img}.jpg 2200w" sizes="100vw" alt="" loading="lazy">`}
  <div class="bp-voile"></div><div class="bp-txt">
  <p class="bp-phrase">${phrase}</p>${lien ? `<a class="lien-b" href="${P}${href}">${lien}<span aria-hidden="true">→</span></a>` : ""}</div></section>`;
export const trioPhotos = (P, imgs) => `<section class="trio-photos">${imgs.map((i) => `<figure><img src="${P}assets/photos/${i}-m.jpg" alt="" loading="lazy"></figure>`).join("")}</section>`;
export const PHOTO_CSS = `
h1,h2,h3,.bp-phrase,blockquote,.lead{text-wrap:balance}
.bande-fin .tag{color:rgba(249,246,244,.75)!important;justify-content:center}
.bande-fin .bp-phrase{font-size:clamp(34px,4.2vw,60px)!important;line-height:1.1!important}
.bande-fin .btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:18px}
.bande-fin .btn.trait{color:#F9F6F4;border-color:rgba(249,246,244,.8);background:transparent}
.bande-fin .bp-phrase{max-width:720px}
@media (max-width:600px){.bande-fin .bp-phrase{font-size:27px!important}}
.bande-fin .tag{font-family:Gantari,system-ui,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:14px;margin:0 0 18px}
.bande-fin .tag::after{content:"";height:1px;width:56px;background:currentColor;opacity:.6}
.bande-fin .btn{display:inline-flex;align-items:center;gap:14px;padding:18px 28px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;border:1px solid currentColor;border-radius:0;text-decoration:none;transition:background .25s,color .25s}
.bande-fin .btn.plein{background:#F9F6F4;border-color:#F9F6F4;color:#130F0C}
.bande-fin .btn.plein:hover{background:#B0ADA6;border-color:#B0ADA6}
.bande-fin .btn.trait:hover{background:#F9F6F4;color:#130F0C}
.bande-fin .btn .fl{font-weight:400}

/* Haut de gamme : sans boîtes */
.svc-photos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0!important;background:transparent}
.svc-photos a{position:relative;display:block;height:clamp(420px,40vw,600px);overflow:hidden;color:#F9F6F4;text-decoration:none}
.svc-photos img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.85);transition:transform 1.4s ease}
.svc-photos a:hover img{transform:scale(1.06)}
.svc-photos a:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(19,15,12,0) 35%,rgba(19,15,12,.82))}
.svc-photos span{position:absolute;left:40px;right:40px;bottom:42px;z-index:2;display:flex;flex-direction:column}
.svc-photos em{font:normal 500 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.28em;opacity:.75;margin-bottom:14px}
.svc-photos strong{font:600 clamp(28px,2.6vw,38px)/1.05 Gantari,system-ui,sans-serif;text-transform:uppercase;margin-bottom:12px}
.svc-photos i{font:normal 400 16px/1.5 Gantari,system-ui,sans-serif;opacity:.88;max-width:320px}
.svc-photos u{text-decoration:none;font:600 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;border-bottom:1px solid;padding-bottom:7px;align-self:flex-start;margin-top:22px}
.v8list{display:grid!important;grid-template-columns:1fr 1fr!important;column-gap:90px!important;row-gap:0!important;counter-reset:lev}
.v8list>div{display:grid!important;grid-template-columns:86px 1fr;grid-template-rows:auto 1fr;padding:30px 0!important;border:0!important;border-top:1px solid #d9d4cd!important;background:transparent!important;box-shadow:none!important;border-radius:0!important}
.v8list>div:nth-last-child(-n+2){border-bottom:1px solid #d9d4cd!important}
.v8list>div>b{grid-row:1/3;font:300 44px/1 Gantari,system-ui,sans-serif!important;color:#B0ADA6!important;background:none!important;width:auto!important;height:auto!important;display:block!important;padding:0!important;border:0!important}
.v8list>div>h3{font:500 19px/1.3 Gantari,system-ui,sans-serif!important;text-transform:uppercase;letter-spacing:.06em;margin:4px 0 10px!important}
.v8list>div>p{font:400 16px/1.6 Gantari,system-ui,sans-serif;color:#55504a;margin:0}
.steps3{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:60px!important;border-top:1px solid #130F0C;counter-reset:etape;margin-top:56px}
.steps3>div{position:relative;padding:40px 0 0!important;border:0!important;background:transparent!important;box-shadow:none!important;counter-increment:etape}
.steps3>div:after{content:"";position:absolute;top:-5px;left:0;width:9px;height:9px;border-radius:50%!important;background:#130F0C}
.steps3>div:before,.steps3>div::before{content:"0" counter(etape)!important;display:block!important;width:auto!important;height:auto!important;border-radius:0!important;background:none!important;font:300 80px/1 Gantari,system-ui,sans-serif!important;color:#130F0C!important;margin-bottom:22px!important;place-items:initial!important}
.steps3>div h3{font:500 19px/1.3 Gantari,system-ui,sans-serif!important;text-transform:uppercase;letter-spacing:.06em;margin:0 0 10px!important}
.steps3>div p{font:400 16px/1.6 Gantari,system-ui,sans-serif;color:#55504a;max-width:320px}
.gros-chiffres{display:grid;grid-template-columns:repeat(3,1fr);margin:64px 0 40px}
.gros-chiffres div{padding:0 50px;border-left:1px solid currentColor;border-left-color:rgba(128,120,112,.3)}.gros-chiffres div:first-child{padding-left:0;border:0}
.gros-chiffres b{display:block;font:300 clamp(40px,4.2vw,60px)/1 Gantari,system-ui,sans-serif;white-space:nowrap;color:inherit}
.gros-chiffres span{display:block;font:500 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8a857f;margin:20px 0 8px}
.gros-chiffres i{font:normal 400 15px Gantari,system-ui,sans-serif;color:#8a857f}
section:has(.avis-carrousel) .avis-top{display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px}section:has(.avis-carrousel) .avis-top .over{justify-content:center}section:has(.avis-carrousel) .btns,section:has(.avis-carrousel) p:has(>.btn){justify-content:center;text-align:center;display:flex}
.avis-carrousel{text-align:center;max-width:960px;margin:0 auto;padding:30px 0 10px}
.avis-carrousel figure{margin:0}
.avis-carrousel .et{color:#C9A66B;letter-spacing:.4em;font-size:14px;margin-bottom:34px}
.avis-carrousel blockquote{font:300 clamp(22px,2.4vw,34px)/1.45 Gantari,system-ui,sans-serif;margin:0;color:#130F0C}
.avis-carrousel figcaption{margin-top:36px;font:500 13px/1 Gantari,system-ui,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#130F0C}
.avis-carrousel nav{margin-top:44px;display:flex;justify-content:center;align-items:center;gap:28px;font:400 13px Gantari,system-ui,sans-serif;letter-spacing:.2em;color:#8a857f}
.avis-carrousel button{width:46px;height:46px;border:1px solid #130F0C;background:transparent;color:#130F0C;font-size:16px;cursor:pointer;transition:background .2s,color .2s}
.avis-carrousel button:hover{background:#130F0C;color:#F9F6F4}
@media (max-width:860px){.svc-photos{grid-template-columns:1fr}.svc-photos a{height:420px}.v8list{grid-template-columns:1fr!important}.v8list>div:nth-last-child(2){border-bottom:0!important}.v8list>div{grid-template-columns:64px 1fr}.v8list>div>b{font-size:34px!important}.steps3{grid-template-columns:1fr!important;gap:44px!important;border-top:0;border-left:1px solid #130F0C;padding-left:28px}.steps3>div{padding-top:0!important}.steps3>div:after{top:10px;left:-33px}.steps3>div:before{font-size:56px;margin-bottom:12px}.gros-chiffres{grid-template-columns:1fr;gap:34px}.gros-chiffres div{padding:0;border:0}}
.bande-photo{position:relative;min-height:min(78vh,720px);display:flex;align-items:center;justify-content:center;overflow:hidden;background:#130F0C;padding:0!important;color:#F9F6F4;text-align:center}
.bande-photo .bp-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.62) saturate(.9);transform:scale(1.04);transition:transform 6s ease}
.bande-photo:hover .bp-img{transform:scale(1.1)}
.bande-photo .bp-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(19,15,12,.15),rgba(19,15,12,.45))}
.bande-photo .bp-txt{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:26px;padding:80px 24px}
.bande-photo .bp-logo{width:min(340px,70vw);height:auto}
.bande-photo .bp-rlp{height:46px;width:auto;opacity:.9}
.bande-photo .bp-phrase{font:400 clamp(28px,3.4vw,48px)/1.15 Gantari,system-ui,sans-serif;margin:0 0 10px;max-width:820px;text-shadow:0 1px 24px rgba(0,0,0,.25)}
.bande-photo .lien-b{color:#F9F6F4}
.trio-photos{display:grid;grid-template-columns:1.3fr 1fr 1fr;grid-auto-rows:clamp(220px,27vw,400px);gap:6px;padding:0!important;background:#F9F6F4}
.trio-photos figure{margin:0;overflow:hidden}
.trio-photos img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s ease}
.trio-photos figure:hover img{transform:scale(1.06)}
@media (max-width:860px){.bande-photo{min-height:520px}.trio-photos{grid-template-columns:1fr 1fr}.trio-photos figure:first-child{grid-column:1/-1}}
`;


export const CARROUSEL_JS = `<script>document.querySelectorAll("[data-carrousel]").forEach(function(c){var f=c.querySelectorAll("figure"),p=c.querySelector("[data-pos]"),i=0;function v(n){f[i].hidden=true;i=(n+f.length)%f.length;f[i].hidden=false;p.textContent=(i+1)+" / "+f.length}c.querySelector("[data-prec]").onclick=function(){v(i-1)};c.querySelector("[data-suiv]").onclick=function(){v(i+1)}})</script>`;

export function piedDePage(cfg, P = "", { horizon = false } = {}) {
  const c = cfg.courtier, r = cfg.reseaux || {};
  const tel = c.telephone || "", telHref = "tel:" + tel.replace(/[^\d+]/g, "");
  const socs = [r.facebook ? `<li><a class="soc" href="${esc(r.facebook)}" target="_blank" rel="noopener">${ICO_FB}Facebook</a></li>` : "", r.instagram ? `<li><a class="soc" href="${esc(r.instagram)}" target="_blank" rel="noopener">${ICO_IG}Instagram</a></li>` : ""].join("");
  return `<footer class="pied"><img class="pied-motif" src="${P}assets/motif-contour.png" alt="" aria-hidden="true">
  <div class="wrap">
    <div><div class="logos"><img src="${P}assets/logo-h-light.png" alt="Gilles Jr. Dulude"><span class="sep"></span><img src="${P}assets/rlp-mono.png" alt="Royal LePage Distinction"></div><p>Courtier immobilier résidentiel et commercial. Rive-Sud de Montréal.</p></div>
    <div><h4>Navigation</h4><ul><li><a href="${P}index.html">Accueil</a></li><li><a href="${P}vendre.html">Vendre</a></li><li><a href="${P}acheter.html">Acheter</a></li><li><a href="${P}investir.html">Investir</a></li><li><a href="${P}marche.html">Marché</a></li><li><a href="${P}blogue.html">Blogue</a></li><li><a href="${P}proprietes.html">Propriétés</a></li></ul></div>
    <div><h4>Découvrir</h4><ul><li><a href="${P}evaluation.html">Évaluation gratuite</a></li><li><a href="${P}a-propos.html">À propos</a></li><li><a href="${P}contact.html">Contact</a></li></ul></div>
    <div><h4>Me joindre</h4><ul><li><a href="${telHref}">${esc(tel)}</a></li><li><a href="mailto:${esc(c.courriel)}">${esc(c.courriel)}</a></li></ul>${socs ? `<h4 style="margin-top:28px">Suivez-moi</h4><ul>${socs}</ul>` : ""}</div>
    <div><h4>Agence</h4><ul><li>Royal LePage Distinction</li><li>559, rue Pierre-Caisse</li><li>Saint-Jean-sur-Richelieu (Québec)&nbsp;J3A&nbsp;1P1</li></ul></div>
  </div>
  <div class="bas"><div class="wrap"><span>© ${new Date().getFullYear()} Gilles Jr. Dulude, courtier immobilier résidentiel et commercial. Royal LePage Distinction, agence immobilière.</span><a href="${P}confidentialite.html">Politique de confidentialité</a></div></div>
</footer>`;
}
export const PIED_CSS = `${PHOTO_CSS}
footer.pied .pied-motif{position:absolute;right:-140px;bottom:-220px;width:620px;opacity:.07;pointer-events:none;z-index:0}footer.pied>*:not(.pied-motif){position:relative;z-index:1}footer.pied .pied-motif+.wrap{border-top:0}
@media (max-width:860px){footer.pied .pied-motif{width:380px;right:-120px;bottom:-120px}}
footer.pied{position:relative;overflow:hidden;background:#130F0C;color:rgba(249,246,244,.7);font-size:14px;padding:0}
footer.pied .horizon{max-width:1240px;margin:0 auto;padding:56px 40px 0}footer.pied .horizon svg,.e .horizon svg{display:block;width:100%;height:150px}
footer.pied .horizon .plex,.e .horizon .plex{fill:none;stroke:rgba(249,246,244,.42);stroke-width:.9;stroke-linejoin:round;stroke-linecap:round}
footer.pied>.wrap{display:grid;grid-template-columns:1.75fr .75fr .9fr 1fr 1fr;column-gap:48px;gap:40px;padding-top:60px;padding-bottom:40px;border-top:1px solid rgba(249,246,244,.14)}
footer.pied a{color:rgba(249,246,244,.7);text-decoration:none}footer.pied a:hover{color:#F9F6F4}
footer.pied h4{font-family:Gantari,system-ui,sans-serif;font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(249,246,244,.5);margin:0 0 16px}
footer.pied ul{margin:0;padding:0}footer.pied li{list-style:none;margin-bottom:8px;padding:0}
footer.pied .horizon+.wrap{border-top:0}
@media (max-width:860px){footer.pied .horizon,.e .horizon{padding:40px 0 0;overflow:hidden}footer.pied .horizon svg,.e .horizon svg{width:260%;height:auto;margin-left:-80%}}
footer.pied .logos{display:flex;align-items:center;gap:18px;margin-bottom:22px}footer.pied .logos img{height:26px;width:auto;margin:0}
footer.pied .logos .sep{width:1px;height:26px;background:rgba(249,246,244,.25)}
footer.pied .soc{display:inline-flex;align-items:center;gap:10px}
footer.pied .bas{border-top:1px solid rgba(249,246,244,.14);padding:22px 0;font-size:12px}
footer.pied .bas .wrap{display:flex;justify-content:space-between;gap:20px}
@media (max-width:980px){footer.pied>.wrap{grid-template-columns:1fr 1fr}footer.pied>.wrap>div:first-child{grid-column:1/-1}}
@media (max-width:640px){footer.pied>.wrap{grid-template-columns:1fr}footer.pied .bas .wrap{flex-direction:column;gap:6px}}`;

export function pageEssai(cfg, listings, { avis = [], prixRLP = [], rdv = "#", rdvAttrs = "", haut = "", cssAncien = "", avisUrl = "#", boucles = "", chat = "", P = "../", tete = "", essai = true } = {}) {
  const c = cfg.courtier, m = cfg.marche || {};
  const tel = c.telephone || "", telHref = "tel:" + tel.replace(/[^\d+]/g, "");
  // Accueil : d'abord les propriétés avec vidéo, puis les autres; dans chaque groupe, la plus récente en premier
  const dateDe = (l) => Date.parse(l.enVigueurDepuis || "") || 0;
  const actives = listings.filter((l) => !l.vendu).sort((a, b) => (b.video ? 1 : 0) - (a.video ? 1 : 0) || dateDe(b) - dateDe(a)).slice(0, 3);
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
${tete || `<meta name="robots" content="noindex, nofollow">
<title>Essai | Gilles Jr. Dulude, courtier immobilier résidentiel et commercial</title>
<link rel="icon" href="${P}assets/favicon.png?v=2">`}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gantari:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap" rel="stylesheet">
<style>
${cssAncien}
.e .btn{border-radius:0}
:root{--ink:#130F0C;--ink2:#444444;--paper:#F9F6F4;--stone:#B0ADA6;--bronze:#130F0C;--bronze2:#000000;--mut:#444444;--line:rgba(19,15,12,.16);--lineD:rgba(249,246,244,.14);--wrap:1240px}
.e *{box-sizing:border-box;margin:0;padding:0}
.e{background:var(--paper);color:var(--ink);font-family:Gantari,system-ui,sans-serif;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
.e a{color:inherit;text-decoration:none}
.e img{display:block;max-width:100%}
.e .wrap{max-width:var(--wrap);margin:0 auto;padding:0 40px}
.e .mono{font-variant-numeric:tabular-nums;font-family:Gantari,system-ui,sans-serif;letter-spacing:.04em}
.e .cap{font-weight:600;letter-spacing:.01em;text-transform:uppercase;letter-spacing:.02em;font-weight:700;line-height:.98}
.e .tag{font-family:Gantari,system-ui,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:14px}
.e .tag::after{content:"";height:1px;width:56px;background:currentColor;opacity:.6}
.e .btn{display:inline-flex;align-items:center;gap:14px;padding:18px 28px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;border:1px solid currentColor;transition:background .25s,color .25s}
.e .btn.plein{background:#F9F6F4;border-color:#F9F6F4;color:#130F0C}
.e .btn.plein:hover{background:#B0ADA6;border-color:#B0ADA6}
.e .sur-clair .btn.plein{background:#130F0C;border-color:#130F0C;color:#F9F6F4}
.e .btn.trait:hover{background:var(--paper);color:var(--ink)}
.e .btn .fl{font-family:Gantari,system-ui,sans-serif;font-weight:400}
.e /* En-tête */
.top{position:fixed;inset:0 0 auto 0;z-index:30;transition:background .3s,border-color .3s;border-bottom:1px solid transparent;color:var(--paper)}
.e .logos{display:flex;align-items:center;gap:22px}
.e .logos .g img{height:40px;width:auto}
.e .logos .sep{width:1px;height:40px;background:rgba(249,246,244,.35)}
.e .logos .r img{height:40px;width:auto}
.e /* Menu plein écran */
.menu{position:fixed;inset:0;z-index:40;background:var(--ink);color:var(--paper);display:none;overflow:auto}
.e /* Héros */
.hero{position:relative;background:var(--ink);color:var(--paper);overflow:hidden}
.e /* Sections */
section{position:relative}
.e .sec{padding:150px 0}
.e .sec h2{font-size:clamp(28px,3vw,42px);margin:22px 0 0}
.e .entete{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:70px}.e .entete>div:only-child{grid-column:1/-1}
.e .entete p{color:var(--mut);font-size:18px;max-width:480px}
.e /* Services */
.services{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink)}
.e .services a{padding:46px 40px 50px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:20px;transition:background .25s}
.e .services a:first-child{margin-left:-40px}
.e .services a:last-child{border-right:0}
.e .services a:hover{background:var(--stone)}
.e .services svg{width:120px;height:100px;fill:none;stroke:var(--ink);stroke-width:1.3}
.e .services .num{font-size:12px;color:var(--mut)}
.e .services h3{font-size:30px}
.e .services p{color:var(--mut);font-size:16px}
.e .services .voir{margin-top:auto;font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;display:flex;gap:10px}
.e /* Chiffres : fiche technique */
.fiche{background:#130F0C;color:var(--paper)}
.e .fiche .grille{position:absolute;inset:0;background-image:linear-gradient(90deg,var(--lineD) 1px,transparent 1px);background-size:calc(100%/6) 100%;opacity:.6}
.e .fiche .wrap{position:relative}
.e .fiche .entete p{color:rgba(249,246,244,.65)}
.e .fiche .tag,.e .final .tag{color:rgba(249,246,244,.6)}
.e .table{border-top:1px solid var(--paper)}
.e .ligne{display:grid;grid-template-columns:2fr 1fr 1fr;padding:26px 0;border-bottom:1px solid var(--lineD);align-items:baseline;gap:20px}
.e .ligne .lab{font-size:15px;color:rgba(249,246,244,.75)}
.e .ligne .val{font-size:clamp(26px,3vw,40px);font-weight:500}
.e .ligne .var{font-size:14px;text-align:right}
.e .up{color:#9BC59F}
.e .dn{color:#E39B7B}
.e .source{margin-top:22px;font-size:12px;color:rgba(249,246,244,.5)}
.e /* Propriétés */
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.e .prop{position:relative;display:block;aspect-ratio:3/4;overflow:hidden;background:var(--ink);color:var(--paper)}
.e .prop img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease,opacity .6s;opacity:.92}
.e .prop:hover img{transform:scale(1.035);opacity:1}
.e .prop::after{content:"";position:absolute;inset:40% 0 0 0;background:linear-gradient(to top,rgba(0,0,0,.8),transparent)}
.e .prop .info{position:absolute;left:34px;right:34px;bottom:30px;z-index:1}
.e .prop .eti{font-family:Gantari,system-ui,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(249,246,244,.75)}
.e .prop .px{display:block;font-size:26px;font-weight:500;margin:8px 0 4px}
.e .prop .ad{font-size:14px;color:rgba(249,246,244,.8)}
.e .tout{margin-top:50px;display:flex;justify-content:flex-end}
.e .tout-grand{margin-top:56px;display:flex;justify-content:center}
.e .tout-grand a{display:inline-flex;align-items:center;gap:18px;background:#130F0C;color:#F9F6F4;padding:24px 48px;font-size:14px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;border:1px solid #130F0C;transition:background .25s,color .25s}
.e .tout-grand a .mono{font-size:20px;transition:transform .25s}
.e .tout-grand a:hover{background:transparent;color:#130F0C}.e .tout-grand a:hover .mono{transform:translateX(6px)}
@media (max-width:600px){.e .tout-grand a{width:100%;justify-content:center;padding:22px 20px;box-sizing:border-box}}
.e .tout a{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:6px}
.e /* Gilles */
.gilles{background:var(--stone)}
.e .gilles{padding:0;overflow:hidden}
.e .gilles .photo{position:absolute;left:0;top:0;bottom:0;width:48%}
.e .gilles .photo img{position:absolute;left:0;top:50%;transform:translateY(-50%);width:100%;height:auto;max-height:100%;object-fit:cover;object-position:50% 20%;-webkit-mask-image:linear-gradient(to right,#000 70%,transparent),linear-gradient(to bottom,transparent,#000 12%,#000 80%,transparent);-webkit-mask-composite:source-in;mask-image:linear-gradient(to right,#000 70%,transparent),linear-gradient(to bottom,transparent,#000 12%,#000 80%,transparent);mask-composite:intersect}
.e .gilles .wrap{position:relative;display:grid;grid-template-columns:1fr 1.05fr;gap:60px;min-height:760px;align-items:center;padding-top:120px;padding-bottom:120px}
.e .gilles .wrap>div:last-child{grid-column:2}
.e .gilles blockquote{font-size:clamp(26px,2.8vw,38px);font-weight:500;line-height:1.25;margin:26px 0 34px}
.e .gilles p{color:rgba(249,246,244,.78);margin-bottom:16px;max-width:560px}
.e .distinctions{margin-top:36px;border-top:1px solid var(--ink)}
.e .distinctions div{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--line);font-size:15px}
.e .distinctions .mono{color:var(--mut)}
.e /* Avis */
.avis{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink)}
.e .avis figure{padding:40px 36px 10px 0;border-right:1px solid var(--line)}
.e .avis figure+figure{padding-left:36px}
.e .avis figure:last-child{border-right:0}
.e .avis .et{color:#130F0C;letter-spacing:.3em;font-size:13px}
.e .avis blockquote{font-size:18px;margin:18px 0 22px}
.e .avis figcaption{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
.e /* Appel final */
.final{background:var(--ink);color:var(--paper);text-align:left;padding:130px 0 120px!important;border-bottom:1px solid rgba(249,246,244,.08)}
.e .final h2{font-size:clamp(32px,4vw,56px);max-width:900px}
.e .final .btns{display:flex;gap:14px;flex-wrap:wrap;margin:44px 0 0}
.e .horizon{max-width:1240px;margin:0 auto;padding:56px 40px 0}

.e footer{background:var(--ink);color:rgba(249,246,244,.7);font-size:14px;border-top:1px solid var(--lineD)}
.e footer .wrap{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;padding-top:60px;padding-bottom:40px}
.e footer h4{font-family:Gantari,system-ui,sans-serif;font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(249,246,244,.5);margin-bottom:16px}
.e footer li{list-style:none;margin-bottom:8px}
.e footer .bas{border-top:1px solid var(--lineD);padding:22px 0;font-size:12px}
.e footer .bas .wrap{display:flex;justify-content:space-between;padding:0 40px;grid-template-columns:none}
.e .sec{padding:130px 0}
.e .entete{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:end;margin-bottom:56px;padding-bottom:40px;border-bottom:1px solid var(--line)}
.e .fiche .entete{border-bottom-color:rgba(128,120,112,.3)}
.e .ent-d{justify-self:end;max-width:420px;display:flex;flex-direction:column;gap:18px;align-items:flex-start}
.e .ent-d p{margin:0;color:var(--mut);font-size:16px;line-height:1.6}
.e .ent-lien{font:600 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:inherit;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:8px;display:inline-flex;gap:12px}
.e .sec-tete{padding-bottom:0!important}.e .sec-tete .entete{margin-bottom:56px}
.e .avis-carrousel{padding-top:20px}
@media (max-width:980px){.e .entete{grid-template-columns:1fr;gap:24px}.e .ent-d{justify-self:start}.e .sec{padding:90px 0}}
/* Continuité services / inscriptions : même système de tuiles photo */
.e .props{gap:8px!important}
.e .prop{aspect-ratio:auto!important;height:clamp(420px,40vw,600px)}
.e .prop img{opacity:1;filter:brightness(.85)}
.e .prop:hover img{transform:scale(1.06)}
.e .prop::after{inset:0!important;background:linear-gradient(180deg,rgba(19,15,12,0) 35%,rgba(19,15,12,.82))!important}
.e .prop .info{left:40px;right:40px;bottom:42px;display:flex;flex-direction:column}
.e .prop .eti{font:500 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.28em;color:rgba(249,246,244,.75)}
.e .prop .px{font:600 clamp(28px,2.6vw,38px)/1.05 Gantari,system-ui,sans-serif;margin:14px 0 10px}
.e .prop .ad{font:400 16px/1.5 Gantari,system-ui,sans-serif;color:rgba(249,246,244,.88)}
.e .prop u{text-decoration:none;font:600 12px/1 Gantari,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;border-bottom:1px solid;padding-bottom:7px;align-self:flex-start;margin-top:22px;color:#F9F6F4}
.e .prop .badge{position:absolute;top:28px;left:40px;z-index:2;font:600 11px/1 Gantari,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#F9F6F4;border:1px solid rgba(249,246,244,.7);padding:9px 14px;background:rgba(19,15,12,.25)}
@media (max-width:860px){.e .prop{height:420px}}
.bande-fin .tag{color:rgba(249,246,244,.75)!important;justify-content:center}
.bande-fin .bp-phrase{font-size:clamp(34px,4.2vw,60px)!important;line-height:1.1!important}
.bande-fin .btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:18px}
.bande-fin .btn.trait{color:#F9F6F4;border-color:rgba(249,246,244,.8);background:transparent}
.bande-fin .bp-phrase{max-width:720px}
@media (max-width:600px){.bande-fin .bp-phrase{font-size:27px!important}}
.bande-fin .tag{font-family:Gantari,system-ui,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:14px;margin:0 0 18px}
.bande-fin .tag::after{content:"";height:1px;width:56px;background:currentColor;opacity:.6}
.bande-fin .btn{display:inline-flex;align-items:center;gap:14px;padding:18px 28px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;border:1px solid currentColor;border-radius:0;text-decoration:none;transition:background .25s,color .25s}
.bande-fin .btn.plein{background:#F9F6F4;border-color:#F9F6F4;color:#130F0C}
.bande-fin .btn.plein:hover{background:#B0ADA6;border-color:#B0ADA6}
.bande-fin .btn.trait:hover{background:#F9F6F4;color:#130F0C}
.bande-fin .btn .fl{font-weight:400}
h1,h2,h3,.bp-phrase,blockquote,.lead{text-wrap:balance}
.e .essai{position:fixed;left:16px;bottom:16px;z-index:50;background:#F9F6F4;color:#130F0C;border:1px solid #130F0C;font-family:Gantari,system-ui,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:8px 12px}
@media (max-width:980px){
.e .wrap{padding:0 24px}
.e .logos{gap:14px}
.e .logos .g img{height:30px}
.e .logos .r img,.e .logos .sep{height:30px}
.e .entete,.e .gilles .wrap{grid-template-columns:1fr;gap:30px}
.e .services,.e .props,.e .avis{grid-template-columns:1fr}
.e .gilles .photo{position:relative;width:100%;height:440px}
.e .gilles .photo img{position:static;transform:none;max-height:none;width:100%;height:100%;object-fit:cover;object-position:50% 15%;-webkit-mask-image:linear-gradient(to bottom,#000 60%,transparent);-webkit-mask-composite:source-over;mask-image:linear-gradient(to bottom,#000 60%,transparent);mask-composite:add}
.e .gilles .wrap{min-height:0;padding-top:10px;padding-bottom:80px}
.e .gilles .wrap>div:last-child{grid-column:1}
.e .services a,.e .services a:first-child{padding:36px 0;margin-left:0;border-right:0;border-bottom:1px solid var(--line)}
.e .avis figure,.e .avis figure+figure{padding:30px 0;border-right:0;border-bottom:1px solid var(--line)}
.e .ligne{grid-template-columns:1fr auto;}
.e .ligne .lab{grid-column:1/-1}
.e footer .wrap{grid-template-columns:1fr 1fr}
.e .sec{padding:90px 0}.e .sec.gilles{padding:0}
}
@media (max-width:560px){
.e .logos .g img{height:24px}
.e .logos .r img,.e .logos .sep{height:26px}
.e footer .wrap{grid-template-columns:1fr}
.e footer .bas .wrap{flex-direction:column;gap:6px}
}

.e .gilles .tag{color:rgba(249,246,244,.6)}
.e .gilles .distinctions div{border-color:rgba(249,246,244,.16)}
.e .gilles .distinctions .mono{color:rgba(249,246,244,.6)}
.e section.gilles{background:#131313;color:#F9F6F4}.e .gilles h2,.e .gilles blockquote{color:#F9F6F4}.e .gilles .distinctions{border-color:rgba(249,246,244,.5)}.e .gilles .over{color:rgba(249,246,244,.6)}.e .gilles .over::after{background:rgba(249,246,244,.4)}
.e .fiche .ligne{border-color:rgba(249,246,244,.18)}

.e .prop video.boucle{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s;z-index:0}.e .prop video.boucle.joue{opacity:1}.e .prop video.boucle.joue~.vidtag{opacity:0}.e .prop .vidtag{transition:opacity .4s;position:absolute;top:18px;right:18px;z-index:2;background:rgba(19,15,12,.8);color:#F9F6F4;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:7px 10px}
${PIED_CSS}
</style>
</head>
<body>

${haut}
<div class="e">
${essai ? `<div class="essai">Version d'essai</div>` : ""}

<section class="sec sec-tete"><div class="wrap">
  <div class="entete">
    <div><p class="tag">Accompagnement</p><h2 class="cap">Mes services.</h2></div>
    <div class="ent-d"><p>Vendre, acheter ou investir : un seul courtier, du premier appel jusqu'au notaire.</p><a class="ent-lien" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel <span class="mono">→</span></a></div>
  </div>
</div></section>
<section class="svc-photos">
  <a href="${P}vendre.html"><img src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=80" alt="" loading="lazy"><span><em>01</em><strong>Vendre</strong><i>Le bon prix et une mise en valeur qui vend.</i><u>Découvrir</u></span></a>
  <a href="${P}acheter.html"><img src="https://images.unsplash.com/photo-1657346088167-b982455bf29a?auto=format&fit=crop&w=1400&q=80" alt="" loading="lazy"><span><em>02</em><strong>Acheter</strong><i>L'œil d'un ancien entrepreneur à chaque visite.</i><u>Découvrir</u></span></a>
  <a href="${P}investir.html"><img src="https://images.unsplash.com/photo-1629933520534-7ba5b4740b3b?auto=format&fit=crop&w=1400&q=80" alt="" loading="lazy"><span><em>03</em><strong>Investir</strong><i>Des immeubles à revenus analysés avant l'offre.</i><u>Découvrir</u></span></a>
</section>


${rangs.length ? `<section class="sec fiche"><div class="wrap">
  <div class="entete">
    <div><p class="tag">Fiche technique</p><h2 class="cap">Le marché,<br>${esc((m.moisTitre || m.mois || "").toLowerCase())}.</h2></div>
    <div class="ent-d"><p>Les prix médians de la Rive-Sud, mis à jour chaque mois.</p><a class="ent-lien" href="${P}marche.html">Voir les chiffres <span class="mono">→</span></a></div>
  </div>
  <div class="gros-chiffres">${Object.entries(m.prix || {}).slice(0, 3).map(([lab, v]) => `<div><b>${prix(v[0])}</b><span>${esc(lab)}</span><i>${signe(v[1])} % sur un an</i></div>`).join("")}</div>
  <p class="source mono">Source : ${esc(m.source || "")}. ${esc(m.region || "")}.</p>
</div></section>` : ""}

<section class="sec"><div class="wrap">
  <div class="entete">
    <div><p class="tag">Propriétés</p><h2 class="cap">Inscriptions<br>vedettes.</h2></div>
    <div class="ent-d"><p>Une sélection de mes propriétés à vendre en ce moment.</p><a class="ent-lien" href="${P}proprietes.html">Voir toutes les propriétés <span class="mono">→</span></a></div>
  </div>
</div>
  <div class="props">
    ${actives.map((l) => `<a class="prop" href="${P}proprietes.html#${esc(l.id)}">
      ${l.photos?.[0] ? `<img src="${esc(l.photos[0].url || l.photos[0])}" alt="${esc(l.adresse)}" loading="lazy">` : ""}${l.boucle ? `<video class="boucle" muted loop playsinline preload="none" src="${esc(l.boucle)}"></video><span class="vidtag">▶ Vidéo</span>` : ""}
      <div class="info"><span class="eti">${esc(l.sousType || l.type || "Propriété")} · ${esc(l.ville)}</span><span class="px mono">${l.prix ? prix(l.prix) : "Prix sur demande"}</span><span class="ad">${esc(l.adresse)}</span><u>Voir la propriété</u></div><span class="badge">À vendre</span></a>`).join("")}
  </div>
</section>


<section class="sec gilles"><div class="photo"><img src="${P}assets/gilles-sourire.webp" alt="Gilles Jr. Dulude"></div><div class="wrap">
  <div>
    <p class="tag">Le courtier</p>
    <blockquote class="cap">J'ai passé dix ans sur les chantiers avant l'immobilier.</blockquote>
    <p>Je vois ce qui fait la valeur d'une propriété, et ce qui peut nuire à sa vente.</p>
    <div class="distinctions">${prixRLP.slice(0, 3).map(([n, a]) => `<div><span>${esc(n)}</span><span class="mono">${esc(a)}</span></div>`).join("")}</div>
    <div class="tout" style="justify-content:flex-start;margin-top:28px"><a href="${P}a-propos.html">À propos de moi <span class="mono">→</span></a></div>
  </div>
</div></section>

${avis1.length ? `<section class="sec"><div class="wrap">
  <div class="entete">
    <div><p class="tag">Avis Google</p><h2 class="cap">Ce qu'en disent<br>les clients.</h2></div>
    <div class="ent-d"><p>Note de 5,0 sur Google. Des clients qui reviennent et qui recommandent.</p><a class="ent-lien" href="${avisUrl}" target="_blank" rel="noopener">Voir les avis sur Google <span class="mono">→</span></a></div>
  </div>
  <div class="avis-carrousel" data-carrousel>${avis1.map((a, i) => `<figure${i ? " hidden" : ""}><div class="et">★★★★★</div><blockquote>« ${esc(a[0])} »</blockquote><figcaption>${esc(a[1])} · Avis Google</figcaption></figure>`).join("")}<nav><button type="button" data-prec aria-label="Avis précédent">←</button><span data-pos>1 / ${avis1.length}</span><button type="button" data-suiv aria-label="Avis suivant">→</button></nav></div>${CARROUSEL_JS}
</div></section>` : ""}

<section class="bande-photo bande-fin"><img class="bp-img" src="${P}assets/photos/salon-lumineux.jpg" srcset="${P}assets/photos/salon-lumineux-m.jpg 900w, ${P}assets/photos/salon-lumineux.jpg 2200w" sizes="100vw" alt="" loading="lazy"><div class="bp-voile"></div><div class="bp-txt">
  <p class="tag">Prochaine étape</p>
  <p class="bp-phrase">Votre prochain chapitre commence ici.</p>
  <div class="btns"><a class="btn plein" href="${esc(rdv)}"${rdvAttrs}>Réserver un appel <span class="fl">→</span></a><a class="btn trait" href="${telHref}">${esc(tel)}</a></div>
</div></section>

${piedDePage(cfg, P)}
${boucles}
${chat}
</div>


</body>
</html>`;
}
