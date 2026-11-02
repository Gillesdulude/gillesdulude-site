// Génère toutes les pages du site de Gilles Jr. Dulude.
// Les inscriptions viennent de build.mjs (déjà filtrées : seulement les fiches en vigueur).

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const telHref = (t) => "tel:" + String(t || "").replace(/[^0-9+]/g, "");

const PAGES = [
  { file: "index.html", nav: "Accueil" },
  { file: "a-propos.html", nav: "À propos" },
  { file: "vendre.html", nav: "Vendre" },
  { file: "acheter.html", nav: "Acheter" },
  { file: "proprietes.html", nav: "Propriétés" },
  { file: "contact.html", nav: "Contact" },
];

const CSS = `
:root{--nb:#130F0C;--ch:#444444;--gr:#B0ADA6;--be:#E3DDCF;--bc:#F9F6F4;--line:rgba(19,15,12,.14);--r:4px}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font:17px/1.65 Gantari,system-ui,sans-serif;color:var(--nb);background:var(--bc);-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit}button,input,select,textarea{font:inherit;color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.over{font:italic 400 17px/1.3 "Source Serif 4",Georgia,serif;color:var(--ch);margin:0 0 10px}
.dark .over{color:var(--gr)}
h1,h2,h3{font-family:Gantari,system-ui,sans-serif;font-weight:600;line-height:1.1;margin:0 0 18px;letter-spacing:-.01em}
h1{font-size:clamp(38px,6vw,68px);text-transform:uppercase;letter-spacing:.01em}
h2{font-size:clamp(28px,3.6vw,42px)}
h3{font-size:21px;font-weight:600}
p{margin:0 0 16px}
.lead{font-size:clamp(18px,2vw,21px);color:var(--ch);max-width:640px}
.dark{background:var(--nb);color:var(--bc)}.dark .lead,.dark p{color:#d9d4cb}
.beige{background:var(--be)}
section{padding:96px 0}
.rule{border:0;border-top:1px solid var(--line);margin:0}
.dark .rule{border-color:rgba(249,246,244,.18)}
.btn{display:inline-block;padding:15px 26px;border:1px solid var(--nb);background:var(--nb);color:var(--bc);text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-radius:var(--r);cursor:pointer;transition:background .2s,color .2s}
.btn:hover{background:transparent;color:var(--nb)}
.btn.ghost{background:transparent;color:var(--nb)}.btn.ghost:hover{background:var(--nb);color:var(--bc)}
.dark .btn{background:var(--bc);color:var(--nb);border-color:var(--bc)}.dark .btn:hover{background:transparent;color:var(--bc)}
.dark .btn.ghost{background:transparent;color:var(--bc)}.dark .btn.ghost:hover{background:var(--bc);color:var(--nb)}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}

/* En-tête */
.top{position:sticky;top:0;z-index:20;background:rgba(19,15,12,.97);color:var(--bc);border-bottom:1px solid rgba(249,246,244,.1)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;height:76px;gap:20px}
.top .logo img{height:38px;width:auto}
.menu{display:flex;gap:28px;align-items:center}
.menu a{text-decoration:none;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#d9d4cb;padding:6px 0;border-bottom:1px solid transparent}
.menu a:hover,.menu a[aria-current]{color:var(--bc);border-color:var(--be)}
.menu .cta{border:1px solid var(--be);padding:10px 16px;color:var(--bc);border-radius:var(--r)}
.menu .cta:hover{background:var(--be);color:var(--nb)}
.burger{display:none;background:none;border:0;color:var(--bc);padding:8px;cursor:pointer}
@media (max-width:960px){
  .burger{display:block}
  .menu{display:none;position:absolute;top:76px;left:0;right:0;background:var(--nb);flex-direction:column;align-items:stretch;gap:0;padding:8px 24px 24px;border-bottom:1px solid rgba(249,246,244,.1)}
  .menu.open{display:flex}
  .menu a{padding:14px 0;border-bottom:1px solid rgba(249,246,244,.08)}
  .menu .cta{margin-top:14px;text-align:center}
  .top .logo img{height:32px}
}

/* Héros */
.hero{position:relative;overflow:hidden;background:var(--nb);color:var(--bc)}
.hero .wrap{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;align-items:end;gap:40px;min-height:min(88vh,760px);padding-top:64px}
.hero .txt{padding-bottom:96px}
.hero .photo{align-self:end;position:relative}
.hero .photo.detoure img{mask-image:linear-gradient(to bottom,#000 85%,transparent);-webkit-mask-image:linear-gradient(to bottom,#000 85%,transparent);max-height:640px;width:auto;margin:0 auto}
.hero .photo img{width:100%;height:auto;mask-image:radial-gradient(ellipse 62% 75% at 50% 42%,#000 55%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 62% 75% at 50% 42%,#000 55%,transparent 100%)}
.motif{position:absolute;z-index:1;opacity:.13;pointer-events:none;width:720px;right:-160px;top:-90px}
.hero.small .wrap{grid-template-columns:1fr;min-height:0;padding:96px 24px 80px}
.hero.small .txt{padding:0}
@media (max-width:860px){
  .hero .wrap{grid-template-columns:1fr;min-height:0;padding-top:48px}
  .hero .txt{padding-bottom:8px}
  .hero .photo{max-width:420px;margin:0 auto}
  .motif{width:460px;right:-180px;top:-60px}
}

/* Grilles */
.cols{display:grid;gap:48px;grid-template-columns:1fr 1fr;align-items:center}
.cols.top-al{align-items:start}
@media (max-width:860px){.cols{grid-template-columns:1fr;gap:32px}section{padding:72px 0}}
.figure{position:relative}
.figure img{width:100%;aspect-ratio:1/1;object-fit:cover;background:#1d1814}
.figure .tag{position:absolute;left:-1px;bottom:-1px;background:var(--bc);padding:14px 18px;font:italic 16px "Source Serif 4",Georgia,serif}
.stats{display:flex;gap:40px;flex-wrap:wrap;margin-top:28px;padding-top:24px;border-top:1px solid var(--line)}
.stats b{display:block;font-size:40px;line-height:1;font-weight:600}
.stats span{font-size:14px;color:var(--ch);letter-spacing:.04em}

.v8{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(249,246,244,.18);border-left:1px solid rgba(249,246,244,.18);margin-top:48px}
.v8 div{padding:28px 24px 32px;border-right:1px solid rgba(249,246,244,.18);border-bottom:1px solid rgba(249,246,244,.18)}
.v8 b{display:block;font:italic 400 15px "Source Serif 4",Georgia,serif;color:var(--gr);margin-bottom:10px}
.v8 h3{font-size:19px;margin:0 0 8px}
.v8 p{font-size:15px;margin:0;color:#bdb7ad}
@media (max-width:960px){.v8{grid-template-columns:1fr 1fr}}
@media (max-width:520px){.v8{grid-template-columns:1fr}}

.phase{display:grid;grid-template-columns:260px 1fr;gap:40px;padding:48px 0;border-top:1px solid var(--line)}
.phase:last-child{border-bottom:1px solid var(--line)}
.phase .lv{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:32px}
.phase h4{margin:0 0 4px;font-size:19px}
.phase .sub{font:italic 16px "Source Serif 4",Georgia,serif;color:var(--ch);margin-bottom:12px}
ul.lst{list-style:none;margin:0;padding:0}
ul.lst li{position:relative;padding:8px 0 8px 22px;border-top:1px solid var(--line);font-size:16px}
ul.lst li:first-child{border-top:0}
ul.lst li::before{content:"";position:absolute;left:0;top:19px;width:10px;height:1px;background:var(--nb)}
.dark ul.lst li{border-color:rgba(249,246,244,.14)}.dark ul.lst li::before{background:var(--be)}
@media (max-width:860px){.phase{grid-template-columns:1fr;gap:16px}}

.steps{counter-reset:s;display:grid;gap:0}
.steps>div{display:grid;grid-template-columns:90px 1fr;gap:24px;padding:28px 0;border-top:1px solid var(--line)}
.steps>div::before{counter-increment:s;content:"0" counter(s);font-size:40px;font-weight:600;line-height:1;color:var(--gr)}
.steps h3{margin-bottom:6px}.steps p{margin:0;color:var(--ch)}
.steps small{font:italic 15px "Source Serif 4",Georgia,serif;color:var(--ch);display:block;margin-bottom:4px}

.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
@media (max-width:900px){.cards3{grid-template-columns:1fr}}
.quote{background:var(--bc);padding:36px 32px;border:1px solid var(--line);display:flex;flex-direction:column}
.quote p{font:italic 19px/1.55 "Source Serif 4",Georgia,serif;color:var(--nb);flex:1}
.quote .who{font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;margin-top:14px}
.quote .who span{display:block;font-weight:400;letter-spacing:.04em;text-transform:none;color:var(--ch);font-size:14px;margin-top:2px}
.ben{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
.ben div{border-top:1px solid var(--nb);padding-top:18px}
.ben b{font-size:14px;color:var(--ch)}
@media (max-width:900px){.ben{grid-template-columns:1fr 1fr}}

.band{text-align:center}
.band h2{max-width:820px;margin:0 auto 14px}
.band .lead{margin:0 auto}
.band .btns{justify-content:center}

/* Propriétés */
.grid{display:grid;gap:28px;grid-template-columns:repeat(auto-fill,minmax(310px,1fr))}
.card{background:#fff;border:1px solid var(--line);text-align:left;padding:0;color:inherit;cursor:pointer;text-decoration:none;display:block;transition:transform .2s,box-shadow .2s;border-radius:var(--r);overflow:hidden}
.card:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(19,15,12,.12)}
.card .ph{aspect-ratio:3/2;background:var(--be);position:relative;overflow:hidden}
.card .ph img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.card:hover .ph img{transform:scale(1.03)}
.badge{position:absolute;top:14px;left:14px;background:var(--bc);color:var(--nb);font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:6px 10px}
.badge.pending{background:var(--nb);color:var(--bc)}
.nphotos{position:absolute;right:14px;bottom:14px;background:rgba(19,15,12,.7);color:var(--bc);font-size:12px;padding:4px 9px}
.card .body{padding:20px 22px 22px}
.price{font-size:26px;font-weight:600;line-height:1.2}
.addr{margin-top:4px;font-weight:500}
.city{color:var(--ch);font-size:15px}
.facts{display:flex;gap:16px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-size:14px;color:var(--ch)}
.facts b{color:var(--nb);font-weight:600}
.ptype{margin-top:12px;font:italic 15px "Source Serif 4",Georgia,serif;color:var(--ch)}
.filters{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid var(--line);margin-bottom:36px}
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{border:1px solid var(--line);background:transparent;padding:8px 14px;font-size:14px;cursor:pointer;border-radius:var(--r)}
.chip[aria-pressed="true"]{background:var(--nb);color:var(--bc);border-color:var(--nb)}
select{font-size:14px;padding:8px 10px;border:1px solid var(--line);background:#fff;border-radius:var(--r)}
.empty{padding:60px 0;text-align:center;color:var(--ch)}
dialog{border:0;padding:0;width:min(1080px,96vw);max-height:94vh;background:#fff;color:var(--nb);border-radius:var(--r)}
dialog::backdrop{background:rgba(19,15,12,.75)}
.dlg{display:grid;grid-template-columns:1.25fr 1fr;max-height:94vh}
.gal{position:relative;background:var(--nb);min-height:320px}
.gal img{width:100%;height:100%;object-fit:contain;position:absolute;inset:0}
.gal .nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border:0;background:rgba(249,246,244,.92);font-size:24px;line-height:1;cursor:pointer}
.gal .prev{left:12px}.gal .next{right:12px}
.gal .idx{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(19,15,12,.7);color:var(--bc);font-size:13px;padding:4px 10px}
.info{padding:30px 30px 26px;overflow:auto}
.close{position:absolute;top:10px;right:12px;z-index:3;width:40px;height:40px;border:0;background:var(--bc);font-size:24px;cursor:pointer}
.specs{display:grid;grid-template-columns:1fr 1fr;margin:20px 0;border-top:1px solid var(--line)}
.specs div{padding:10px 0;border-bottom:1px solid var(--line);font-size:15px}
.specs span{display:block;color:var(--ch);font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.desc{white-space:pre-line;font-size:15.5px;color:var(--ch)}
.pcta{background:var(--be);padding:20px;margin-top:22px}
.pcta strong{display:block;margin-bottom:4px}
.pcta .btn{margin:12px 8px 0 0;padding:12px 18px}
.mls{margin-top:14px;font-size:13px;color:var(--ch)}
@media (max-width:800px){.dlg{grid-template-columns:1fr;overflow:auto}.gal{min-height:0;aspect-ratio:4/3}}

/* Contact */
.form{display:grid;gap:16px}
.form label{display:grid;gap:6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:600}
.form input,.form select,.form textarea{padding:14px;border:1px solid var(--line);background:#fff;font-size:16px;letter-spacing:0;text-transform:none;font-weight:400;border-radius:var(--r)}
.form textarea{min-height:140px;resize:vertical}
.form .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width:600px){.form .row{grid-template-columns:1fr}}
.note{font-size:14px;color:var(--ch)}
.coord{display:grid;gap:0}
.coord a,.coord div{display:block;padding:18px 0;border-top:1px solid var(--line);text-decoration:none}
.coord span{display:block;font:italic 15px "Source Serif 4",Georgia,serif;color:var(--ch)}
.coord b{font-size:20px;font-weight:600}
.ok{display:none;background:var(--be);padding:14px 16px;font-size:15px}
.docs .ok{background:#fff}
.docs .note{display:block;font-size:14px;color:var(--ch)}

/* Pied */
footer{background:var(--nb);color:#bdb7ad;padding:72px 0 28px;font-size:15px}
footer .g{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:40px}
footer a{text-decoration:none;color:#d9d4cb}footer a:hover{color:var(--bc)}
footer h4{color:var(--bc);font-size:13px;letter-spacing:.14em;text-transform:uppercase;margin:0 0 14px}
footer .logo{height:40px;width:auto;margin-bottom:18px}
footer .rlp{height:58px;width:auto;margin-top:6px}
footer ul{list-style:none;margin:0;padding:0}footer li{padding:4px 0}
footer .legal{margin-top:56px;padding-top:22px;border-top:1px solid rgba(249,246,244,.12);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13px;color:#8f8a82}
@media (max-width:860px){footer .g{grid-template-columns:1fr}}
.apercu{background:var(--be);color:var(--nb);text-align:center;padding:8px 16px;font-size:14px}

/* ---- Touche chaleureuse ---- */
:root{--r:14px;--warm:#EFE9DD}
body{background:var(--bc)}
h1{text-transform:none;letter-spacing:-.02em;font-size:clamp(36px,5.4vw,60px)}
h1 em,h2 em{font-family:"Source Serif 4",Georgia,serif;font-style:italic;font-weight:400}
.btn{border-radius:999px;letter-spacing:.06em;padding:14px 24px}
.menu .cta{border-radius:999px}
.hero.light{background:var(--warm);color:var(--nb)}
.hero.light .lead{color:var(--ch)}
.hero.light .over{color:var(--ch)}
.hero.light .wrap{min-height:0;padding-top:72px;align-items:center}
.hero.light .txt{padding-bottom:72px}
.hero.light .photo{align-self:center;padding:0 0 56px}
.hero.light .photo{position:relative;align-self:center;padding:0 0 56px}
.hero.light .photo .arch{border-radius:220px 220px 24px 24px;background:#DCD3C1;overflow:hidden;aspect-ratio:4/5;display:flex;align-items:flex-end;justify-content:center;box-shadow:0 30px 60px rgba(19,15,12,.14)}
.hero.light .photo img{mask-image:none;-webkit-mask-image:none;width:100%;height:auto;display:block}
.hero.light .txt{padding-bottom:96px}
@media (max-width:860px){.hero.light .txt{padding-bottom:16px}.hero.light .photo{max-width:340px;padding-bottom:40px}}
.hero.light .motif{filter:invert(1);opacity:.06}
.hero.light.small{background:var(--warm)}
.hero.light.small .wrap{padding:72px 24px 56px}
section+section{border-top:1px solid var(--line)}
.beige+section,section[style*=warm]+section{border-top:0}
.figure img{border-radius:24px}
.figure .tag{border-radius:0 14px 0 24px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.tile{background:#fff;border-radius:22px;padding:30px 28px;text-decoration:none;display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);transition:transform .2s,box-shadow .2s}
.tile:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(19,15,12,.10)}
.tile .ic{width:48px;height:48px;border-radius:50%;background:var(--warm);display:grid;place-items:center;margin-bottom:6px}
.tile h3{margin:0;font-size:22px}.tile p{margin:0;color:var(--ch);font-size:16px}
.tile .go{margin-top:auto;padding-top:10px;font-size:14px;font-weight:600}
@media (max-width:860px){.tiles{grid-template-columns:1fr}}
.chipsv8{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.chipsv8 span{background:#fff;border:1px solid var(--line);border-radius:999px;padding:9px 16px;font-size:15px}
.chipsv8 b{font:italic 400 15px "Source Serif 4",Georgia,serif;color:var(--ch);margin-right:6px}
.quote{border-radius:22px;background:#fff}
.card{border-radius:18px}
.steps3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;counter-reset:s}
.steps3>div{background:#fff;border-radius:22px;padding:28px;border:1px solid var(--line)}
.steps3>div::before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--nb);color:var(--bc);font-weight:600;margin-bottom:14px}
.steps3 h3{margin:0 0 6px}.steps3 p{margin:0;color:var(--ch);font-size:16px}
@media (max-width:860px){.steps3{grid-template-columns:1fr}}
.cta-warm{background:var(--warm);border-radius:28px;padding:56px 40px;text-align:center}
.cta-warm h2{max-width:720px;margin:0 auto 10px}
.cta-warm[style*="text-align:left"] h2{margin:0 0 12px}
@media (max-width:860px){.cta-warm[style*="grid"]{grid-template-columns:1fr!important;padding:36px 24px}}.cta-warm .lead{margin:0 auto}.cta-warm .btns{justify-content:center}
.pill{display:inline-block;background:#fff;border-radius:999px;padding:6px 14px;font-size:14px;margin-bottom:16px;border:1px solid var(--line)}
section{padding:80px 0}

/* Fiche : photo en haut, texte en bas */
dialog#dlg{overflow:auto}
#dlg .dlg{display:block;max-height:none}
#dlg .gal{min-height:0;aspect-ratio:16/9;background:var(--nb)}
#dlg .gal img{object-fit:cover}
#dlg .thumbs{display:flex;gap:6px;overflow-x:auto;padding:8px;background:var(--nb);scrollbar-width:thin}
#dlg .thumbs img{width:84px;height:56px;object-fit:cover;border-radius:6px;opacity:.55;cursor:pointer;flex:none;transition:opacity .2s}
#dlg .thumbs img.on,#dlg .thumbs img:hover{opacity:1}
#dlg .info{display:grid;grid-template-columns:1.35fr 1fr;gap:32px;padding:28px 32px 32px;overflow:visible}
#dlg .info .side .pcta:first-child{margin-top:0}
.mlslink{display:inline-block;margin-top:16px;padding:10px 16px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--nb);font-size:14px;transition:background .2s}
.mlslink:hover{background:var(--warm)}
#dlg .close{position:sticky;top:10px;float:right;margin:10px 12px -50px 0;border-radius:50%;box-shadow:0 4px 14px rgba(0,0,0,.2)}
@media (max-width:800px){#dlg .gal{aspect-ratio:4/3}#dlg .info{grid-template-columns:1fr;padding:22px 20px}}
`;

function head(cfg, title, desc) {
  return `<!DOCTYPE html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="assets/gilles-apropos.jpg">
<link rel="icon" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gantari:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>`;
}

function header(cfg, current) {
  const links = PAGES.filter((p) => p.file !== "contact.html")
    .map((p) => `<a href="${p.file}"${p.file === current ? ' aria-current="page"' : ""}>${p.nav}</a>`)
    .join("");
  return `{{APERCU}}
<header class="top"><div class="wrap">
  <a class="logo" href="index.html" aria-label="Accueil"><img src="assets/logo-h-light.png" alt="Gilles Jr. Dulude, courtier immobilier" width="172" height="38"></a>
  <button class="burger" aria-label="Menu" aria-expanded="false" onclick="const m=document.querySelector('.menu');m.classList.toggle('open');this.setAttribute('aria-expanded',m.classList.contains('open'))">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
  <nav class="menu">${links}<a class="cta" href="contact.html"${current === "contact.html" ? ' aria-current="page"' : ""}>Contact</a></nav>
</div></header>`;
}

function footer(cfg) {
  const c = cfg.courtier;
  const modal = cfg.rendezVous ? `<dialog id="rdv" aria-label="Prendre rendez-vous" style="width:min(760px,96vw)"><button class="close" aria-label="Fermer" onclick="this.closest('dialog').close()">×</button><div style="padding:28px 20px 8px"><p class="over" style="margin:0 0 4px">Prendre rendez-vous</p><h3 style="margin:0 0 12px">Choisissez le moment qui vous convient</h3><div id="rdvbox"></div></div></dialog>
<script>(()=>{const d=document.getElementById("rdv"),box=document.getElementById("rdvbox");
document.addEventListener("click",e=>{const a=e.target.closest("a[data-rdv]");if(!a||!d.showModal)return;e.preventDefault();
if(!box.firstChild)box.innerHTML=${JSON.stringify(rdvFrame(cfg.rendezVous, 700))};d.showModal()});
d.addEventListener("click",e=>{if(e.target===d)d.close()})})();</script>
<script src="https://link.avaclient.com/js/form_embed.js" async></script>` : "";
  const y = new Date().getFullYear();
  return modal + `<footer><div class="wrap">
  <div class="g">
    <div>
      <img class="logo" src="assets/logo-h-light.png" alt="Gilles Jr. Dulude, courtier immobilier">
      <p>Courtier immobilier résidentiel et immeubles à revenus.<br>Rive-Sud de Montréal : La Prairie, Carignan, Chambly, Saint-Jean-sur-Richelieu et les environs.</p>
      <img class="rlp" src="assets/rlp-blanc.png" alt="Royal LePage Distinction">
    </div>
    <div><h4>Navigation</h4><ul>${PAGES.map((p) => `<li><a href="${p.file}">${p.nav}</a></li>`).join("")}</ul></div>
    <div><h4>Me joindre</h4><ul>
      ${c.telephone ? `<li><a href="${telHref(c.telephone)}">${esc(c.telephone)}</a></li>` : ""}
      ${c.courriel ? `<li><a href="mailto:${esc(c.courriel)}">${esc(c.courriel)}</a></li>` : ""}
      <li style="margin-top:10px">${esc(c.agence)}<br>${esc(c.adresseAgence || "")}</li>
    </ul></div>
  </div>
  <div class="legal"><span>© ${y} Gilles Jr. Dulude, courtier immobilier. ${esc(c.agence)}.</span><span>Les renseignements sur les propriétés sont fournis à titre indicatif et ne sont pas garantis.</span></div>
</div></footer>`;
}

const end = `</body></html>`;

// ---------- Fragments partagés ----------

const V8 = [
  ["V1", "Vérité brute", "On part avec le vrai, sans filtre. Forces, défauts, ce qui peut nuire à la vente."],
  ["V2", "Vision marché", "Votre rue, votre quartier, vos comparables et les acheteurs actifs en ce moment."],
  ["V3", "Valeur stratégique", "Le bon prix, celui qui crée de la demande plutôt que de la faire fuir."],
  ["V4", "Valorisation intelligente", "Maximiser sans surinvestir. Chaque dollar investi doit rapporter."],
  ["V5", "Visibilité maximale", "Photos, vidéo et campagnes ciblées qui attirent les bons acheteurs."],
  ["V6", "Volume d'acheteurs", "Visiteurs qualifiés, visites bien gérées et pression sur la demande."],
  ["V7", "Verrouillage négociation", "Chaque offre est travaillée : prix, conditions, délais, inclusions."],
  ["V8", "Vendu optimal", "Une transaction sécurisée jusqu'au notaire, sans surprise de dernière minute."],
];

const v8Grid = () => `<div class="v8">${V8.map(([n, t]) => `<div><b>${n}</b><h3 style="margin:0">${t}</h3></div>`).join("")}</div>`;
const RDV = (cfg) => cfg.rendezVous || "contact.html?sujet=evaluation";
const rdvAttrs = (cfg) => (cfg.rendezVous ? ' target="_blank" rel="noopener" data-rdv' : "");
const rdvFrame = (url, h = 760) => `<iframe src="${esc(url)}" title="Prendre rendez-vous avec Gilles Jr. Dulude" style="width:100%;min-height:${h}px;border:0;overflow:hidden;background:#fff" scrolling="no" loading="lazy"></iframe>`;

const TEMOIGNAGES = [
  ["Une aventure que nous trouvions intimidante a été grandement simplifiée. Notre maison s'est vendue en 12 jours au prix demandé.", "Patricia D.", "Vendue en 12 jours"],
  ["Attentif, patient et très professionnel. Il nous a guidés à chaque étape et nous avons vendu en toute confiance.", "Nathalie C.", "Prix plein obtenu"],
  ["Son attention, sa disponibilité et son souci du détail font de lui un partenaire fiable. Je recommande sans hésitation !", "Marie-Ève L.", "Recommande fortement"],
];

const temoignages = () => `<section><div class="wrap">
  <p class="over">Ils m'ont fait confiance</p>
  <h2>Des familles <em>bien accompagnées.</em></h2>
  <div class="cards3" style="margin-top:40px">${TEMOIGNAGES.map(([q, n, s]) => `<figure class="quote" style="margin:0"><p>« ${q} »</p><figcaption class="who">${n}<span>${s}</span></figcaption></figure>`).join("")}</div>
</div></section>`;

const band = (titre, texte, bouton = "Réserver un appel", href = "contact.html", attrs = "") => `<section><div class="wrap"><div class="cta-warm">
  <h2>${titre}</h2>
  <p class="lead">${texte}</p>
  <div class="btns"><a class="btn" href="${href}"${attrs}>${bouton}</a></div>
</div></div></section>`;

const ICON = {
  maison: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  cle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/></svg>',
  plex: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/></svg>',
};

const pageHero = (over, titre, texte) => `<section class="hero small light">
  <img class="motif" src="assets/motif-contour.png" alt="">
  <div class="wrap"><div class="txt"><p class="over">${over}</p><h1>${titre}</h1><p class="lead">${texte}</p></div></div>
</section>`;

// ---------- Cartes de propriétés ----------

const CARDS_JS = `
const esc=(s)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=(n)=>n?n.toLocaleString("fr-CA",{maximumFractionDigits:0})+" $":"";
const priceOf=(l)=>l.prix?money(l.prix):l.loyer?money(l.loyer)+" / mois":"Prix sur demande";
const kind=(l)=>l.sousType||l.type||"Propriété";
function facts(l){const f=[];
 if(l.logements)f.push('<span><b>'+l.logements+'</b> logements</span>');
 if(l.chambres)f.push('<span><b>'+l.chambres+'</b> ch.</span>');
 if(l.sallesDeBain)f.push('<span><b>'+l.sallesDeBain+'</b> s.d.b.</span>');
 if(l.superficie)f.push('<span><b>'+esc(l.superficie)+'</b></span>');
 return f.join("")}
function card(l,tag){return '<'+tag+' class="card" '+(tag==="a"?'href="proprietes.html#'+esc(l.id)+'"':'data-id="'+esc(l.id)+'"')+' aria-label="Voir '+esc(l.adresse)+'">'+
 '<div class="ph">'+(l.photos[0]?'<img loading="lazy" src="'+esc(l.photos[0].url)+'" alt="'+esc(l.adresse)+'">':'')+
 '<span class="badge '+(l.statut!=="Active"?"pending":"")+'">'+esc(l.statutTexte)+'</span>'+
 (l.photos.length>1?'<span class="nphotos">'+l.photos.length+' photos</span>':'')+'</div>'+
 '<div class="body"><div class="price">'+priceOf(l)+'</div><div class="addr">'+esc(l.adresse)+'</div><div class="city">'+esc(l.ville)+'</div>'+
 (facts(l)?'<div class="facts">'+facts(l)+'</div>':'')+'<div class="ptype">'+esc(kind(l))+'</div></div></'+tag+'>'}
`;

const dataTag = (obj) => `<script id="data" type="application/json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

// ---------- Pages ----------

function pageAccueil(cfg, listings) {
  const c = cfg.courtier;
  const vedette = listings.slice(0, 3);
  return head(cfg, `${c.nom} | Courtier immobilier, Rive-Sud de Montréal`, "Gilles Jr. Dulude, courtier immobilier Royal LePage Distinction sur la Rive-Sud. Vendre, acheter ou investir, accompagné par un ancien entrepreneur en construction.") +
    header(cfg, "index.html") + `
<section class="hero dark">
  <img class="motif" src="assets/motif-contour.png" alt="">
  <div class="wrap">
    <div class="txt">
      <p class="over">Gilles Jr. Dulude, courtier immobilier</p>
      <h1 style="text-transform:uppercase;letter-spacing:.01em">Votre prochain chapitre commence ici.</h1>
      <p class="lead">Vendre la maison familiale ou trouver la prochaine : je vous accompagne à chaque étape, simplement et honnêtement.</p>
      <div class="btns"><a class="btn" href="${RDV(cfg)}"${rdvAttrs(cfg)}>Réserver un appel</a><a class="btn ghost" href="proprietes.html">Voir mes propriétés</a></div>
    </div>
    <div class="photo detoure"><img src="assets/gilles-hero-detoure.webp" alt="Gilles Jr. Dulude" width="870" height="1100"></div>
  </div>
</section>

<section><div class="wrap">
  <p class="over">Comment je peux vous aider</p>
  <h2 style="margin-bottom:32px">Un projet, <em>un seul interlocuteur.</em></h2>
  <div class="tiles">
    <a class="tile" href="vendre.html"><span class="ic">${ICON.maison}</span><h3>Vendre</h3><p>Obtenir le meilleur prix, sans stress inutile.</p><span class="go">En savoir plus →</span></a>
    <a class="tile" href="acheter.html"><span class="ic">${ICON.cle}</span><h3>Acheter</h3><p>Trouver la bonne maison et savoir exactement ce que vous achetez.</p><span class="go">En savoir plus →</span></a>
    <a class="tile" href="acheter.html#investir"><span class="ic">${ICON.plex}</span><h3>Investir</h3><p>Duplex, triplex et plex : on parle chiffres.</p><span class="go">En savoir plus →</span></a>
  </div>
</div></section>

<section style="padding-top:0"><div class="wrap"><div class="cta-warm" style="text-align:left;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center">
  <div>
    <p class="over">Qui je suis</p>
    <h2>Un ancien constructeur <em>devenu courtier.</em></h2>
    <p class="lead" style="margin:0">J'ai passé 10 ans sur les chantiers avant l'immobilier. Je vois ce qui fait la valeur d'une maison, et ce qui peut nuire à sa vente.</p>
  </div>
  <div>
    <div class="stats" style="margin-top:0;border:0;padding:0"><div><b>10+</b><span>ans en construction</span></div><div><b>10+</b><span>ans en courtage</span></div></div>
    <div class="btns"><a class="btn ghost" href="a-propos.html">Mon histoire</a></div>
  </div>
</div></div></section>

${vedette.length ? `<section class="beige" style="background:var(--warm)"><div class="wrap">
  <div class="cols" style="align-items:end;margin-bottom:32px">
    <div><p class="over">À vendre</p><h2 style="margin:0">Mes propriétés <em>en ce moment</em></h2></div>
    <div style="text-align:right"><a class="btn ghost" href="proprietes.html">Tout voir (${listings.length})</a></div>
  </div>
  <div class="grid" id="vedette"></div>
</div></section>
${dataTag({ listings: vedette })}
<script>${CARDS_JS}
const D=JSON.parse(document.getElementById("data").textContent);
document.getElementById("vedette").innerHTML=D.listings.map(l=>card(l,"a")).join("");
</script>` : ""}

${temoignages()}

${band("Parlons de votre projet.", "Un appel de 15 minutes, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageAPropos(cfg) {
  return head(cfg, "À propos | Gilles Jr. Dulude, courtier immobilier", "Ancien entrepreneur en construction devenu courtier immobilier, Gilles Jr. Dulude accompagne les familles et les investisseurs de la Rive-Sud.") +
    header(cfg, "a-propos.html") +
    pageHero("À propos", "Le terrain <em>et le marché.</em>", "Plus de 20 ans d'expérience combinée en construction et en immobilier.") + `
<section><div class="wrap cols">
  <div style="background:var(--warm);border-radius:24px;display:flex;justify-content:center;align-items:flex-end;padding:32px 24px 0;overflow:hidden"><img src="assets/gilles-apropos-detoure.webp" alt="Gilles Jr. Dulude" loading="lazy" style="max-height:520px;width:auto"></div>
  <div>
    <p class="over">Mon parcours</p>
    <h2>Je vois ce que <em>les autres ne voient pas.</em></h2>
    <p>Avant l'immobilier, j'ai passé 10 ans sur les chantiers, jusqu'à devenir entrepreneur général. Aujourd'hui, ça me permet d'évaluer rapidement la vraie valeur d'une maison.</p>
    <p>Je suis direct et transparent. Mon rôle est simple : protéger mes clients et les aider à prendre les bonnes décisions.</p>
    <div class="stats"><div><b>10+</b><span>ans en construction</span></div><div><b>10+</b><span>ans en courtage</span></div></div>
  </div>
</div></section>

<section style="background:var(--warm)"><div class="wrap">
  <p class="over">Mes engagements</p>
  <h2 style="margin-bottom:32px">Ce que vous pouvez <em>attendre de moi.</em></h2>
  <div class="steps3">
    <div><h3>La vérité</h3><p>Même quand elle est moins agréable à entendre.</p></div>
    <div><h3>La disponibilité</h3><p>Une vraie disponibilité, 7 jours sur 7.</p></div>
    <div><h3>L'implication</h3><p>C'est moi qui m'occupe de votre dossier, du début à la fin.</p></div>
  </div>
</div></section>

${temoignages()}
${band("On se parle ?", "Un appel de 15 minutes, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageVendre(cfg) {
  return head(cfg, "Vendre | Gilles Jr. Dulude, courtier immobilier", "Vendre votre maison au meilleur prix avec la Méthode V8. Réservez un appel avec Gilles Jr. Dulude.") +
    header(cfg, "vendre.html") +
    pageHero("Vendre", "Vendre <em>autrement.</em>", "Ce n'est pas compliqué de vendre. C'est difficile de vendre au maximum.") + `
<section><div class="wrap cols">
  <div>
    <p class="over">La Méthode V8</p>
    <h2>8 leviers pour vendre <em>au meilleur prix.</em></h2>
    <p class="lead">La plupart des courtiers en utilisent 2 ou 3. J'en active 8, adaptés à votre maison.</p>
  </div>
  <div class="chipsv8" style="margin-top:0">${V8.map(([n, t]) => `<span><b>${n}</b>${t}</span>`).join("")}</div>
</div></section>

<section style="background:var(--warm)"><div class="wrap">
  <p class="over">Comment ça commence</p>
  <h2 style="margin-bottom:32px">Simple, <em>sans engagement.</em></h2>
  <div class="steps3">
    <div><h3>Un appel</h3><p>15 minutes pour comprendre votre projet.</p></div>
    <div><h3>Une visite</h3><p>Je viens voir votre maison et je vous donne l'heure juste.</p></div>
    <div><h3>Votre plan</h3><p>Une stratégie sur mesure, avec mon guide du vendeur.</p></div>
  </div>
  <div class="btns" style="margin-top:32px"><a class="btn" href="${RDV(cfg)}"${rdvAttrs(cfg)}>Réserver un appel</a></div>
</div></section>

${temoignages()}
${band("Combien vaut votre maison ?", "Parlons-en, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageAcheter(cfg) {
  return head(cfg, "Acheter | Gilles Jr. Dulude, courtier immobilier", "Acheter une maison, un condo ou un plex sur la Rive-Sud avec un courtier qui comprend le bâtiment.") +
    header(cfg, "acheter.html") +
    pageHero("Acheter", "Achetez <em>l'esprit tranquille.</em>", "Avec un ancien entrepreneur à vos côtés pendant les visites.") + `
<section><div class="wrap">
  <p class="over">Comment je vous aide</p>
  <h2 style="margin-bottom:32px">De la recherche <em>jusqu'aux clés.</em></h2>
  <div class="steps3">
    <div><h3>On cible</h3><p>Vos besoins, votre budget, votre secteur. Je vous avise des nouveautés.</p></div>
    <div><h3>On visite</h3><p>Je regarde la maison avec mon œil de constructeur : structure, travaux à prévoir, potentiel.</p></div>
    <div><h3>On négocie</h3><p>Le bon prix, les bonnes conditions, puis je coordonne tout jusqu'au notaire.</p></div>
  </div>
</div></section>

<section id="investir" style="background:var(--warm)"><div class="wrap cols">
  <div><p class="over">Investisseurs</p><h2>Duplex, triplex, plex : <em>on parle chiffres.</em></h2><p class="lead">Revenus, dépenses, baux, état de l'immeuble. Un bon investissement se juge sur du concret.</p></div>
  <div class="tiles" style="grid-template-columns:1fr">
    <div class="tile"><span class="ic">${ICON.plex}</span><h3>Les immeubles à revenus, c'est ma spécialité</h3><p>Accès à mon réseau d'investisseurs et de vendeurs.</p></div>
  </div>
</div></section>

${band("Vous cherchez votre prochaine maison ?", "Dites-moi ce que vous cherchez, je m'occupe du reste.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageProprietes(cfg, listings) {
  const c = cfg.courtier;
  return head(cfg, "Propriétés à vendre | Gilles Jr. Dulude", "Les inscriptions en vigueur de Gilles Jr. Dulude, courtier immobilier : maisons, condos, plex et terrains sur la Rive-Sud de Montréal.") +
    header(cfg, "proprietes.html") +
    pageHero("Propriétés à vendre", "Mes inscriptions.", `${listings.length} propriété${listings.length > 1 ? "s" : ""} à vendre en ce moment. Mises à jour automatiquement plusieurs fois par jour.`) + `
<section style="padding-top:0"><div class="wrap">
  <div class="filters">
    <div class="chips" id="chips" role="group" aria-label="Filtrer par type"></div>
    <select id="sort" aria-label="Trier"><option value="desc">Prix décroissant</option><option value="asc">Prix croissant</option><option value="new">Plus récentes</option></select>
  </div>
  <div class="grid" id="grid"></div>
  <p class="note" id="maj" style="margin-top:40px"></p>
</div></section>
<dialog id="dlg" aria-label="Fiche de la propriété"></dialog>
${band("Vous ne trouvez pas ce que vous cherchez ?", "Je peux vous aviser dès qu'une propriété correspondant à vos critères arrive sur le marché.", "Me faire aviser", "contact.html?sujet=achat")}
${dataTag({ listings, courtier: { nom: c.nom, titre: c.titre, telephone: c.telephone, courriel: c.courriel }, ava: cfg.ava?.webhook || "", majLe: new Date().toISOString() })}
<script>${CARDS_JS}
(()=>{
const {listings,courtier,ava,majLe}=JSON.parse(document.getElementById("data").textContent);
const $=(s)=>document.querySelector(s);
let filter="Toutes",sort="desc";
const types=["Toutes",...new Set(listings.map(kind))];
const chips=$("#chips");
if(types.length>2){chips.innerHTML=types.map(t=>'<button class="chip" aria-pressed="'+(t===filter)+'" data-t="'+esc(t)+'">'+esc(t)+'</button>').join("");
 chips.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;filter=b.dataset.t;chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.t===filter));draw()})}
$("#sort").addEventListener("change",e=>{sort=e.target.value;draw()});
function draw(){let rows=listings.filter(l=>filter==="Toutes"||kind(l)===filter);
 rows=rows.slice().sort((a,b)=>sort==="asc"?(a.prix||a.loyer||0)-(b.prix||b.loyer||0):sort==="new"?String(b.enVigueurDepuis||b.modifie).localeCompare(String(a.enVigueurDepuis||a.modifie)):(b.prix||b.loyer||0)-(a.prix||a.loyer||0));
 $("#grid").innerHTML=rows.length?rows.map(l=>card(l,"button")).join(""):'<div class="empty">Aucune propriété en ce moment. Revenez bientôt, ou contactez-moi pour être avisé des nouveautés.</div>'}
const dlg=$("#dlg");let cur=null,pi=0;
function open(id){cur=listings.find(l=>l.id===id);if(!cur)return;pi=0;
 const spec=(lab,v)=>v?'<div><span>'+lab+'</span>'+esc(v)+'</div>':'';
 const sujet=encodeURIComponent("Propriété "+cur.adresse+", "+cur.ville+" (MLS "+cur.id+")");
 dlg.innerHTML='<button class="close" aria-label="Fermer">×</button><div class="dlg"><div class="gal"><img id="gimg" alt="">'+
 (cur.photos.length>1?'<button class="nav prev" aria-label="Photo précédente">‹</button><button class="nav next" aria-label="Photo suivante">›</button>':'')+
 '<div class="idx" id="gidx"></div></div>'+(cur.photos.length>1?'<div class="thumbs" id="thumbs">'+cur.photos.map((p,i)=>'<img loading="lazy" data-i="'+i+'" src="'+esc(p.url)+'" alt="">').join("")+'</div>':'')+'<div class="info"><div class="main"><p class="over" style="margin:0 0 6px">'+esc(kind(cur))+' · '+esc(cur.statutTexte)+'</p>'+
 '<div class="price">'+priceOf(cur)+'</div><div class="addr">'+esc(cur.adresse)+'</div><div class="city">'+esc([cur.ville,cur.codePostal].filter(Boolean).join(", "))+'</div>'+
 '<div class="specs">'+spec("Logements",cur.logements)+spec("Chambres",cur.chambres)+spec("Salles de bain",cur.sallesDeBain)+spec("Salles d'eau",cur.sallesEau)+spec("Superficie habitable",cur.superficie)+spec("Terrain",cur.terrain)+spec("Année de construction",cur.anneeConstruction)+'</div>'+
 '<div class="desc">'+esc(cur.description)+'</div><div class="mls">No MLS '+esc(cur.id)+'</div></div><div class="side">'+
 '<form class="pcta docs" id="docs"><strong>Recevez tous les documents de cette propriété</strong><span class="note">Fiche descriptive, déclaration du vendeur, certificat, taxes et plus, envoyés par courriel.</span>'+
 '<div class="form" style="margin-top:12px;gap:10px"><input name="nom" placeholder="Nom" required autocomplete="name"><input name="courriel" type="email" placeholder="Courriel" required autocomplete="email"><input name="telephone" type="tel" placeholder="Téléphone" autocomplete="tel">'+
 '<label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:13px"><input type="checkbox" required style="margin-top:3px"> J&#39;accepte que Gilles Jr. Dulude utilise ces renseignements pour m&#39;envoyer les documents et faire un suivi au sujet de cette propriété.</label>'+
 '<button class="btn" type="submit">Recevoir les documents</button><div class="ok" id="docsok"></div></div></form>'+
 '<div class="pcta" style="background:transparent;border:1px solid var(--line)"><strong>Cette propriété vous intéresse ?</strong>'+esc(courtier.nom)+', '+esc(courtier.titre)+'<div>'+
 '<a class="btn" href="contact.html?sujet=visite&mls='+encodeURIComponent(cur.id)+'">Demander une visite</a>'+
 (courtier.telephone?'<a class="btn ghost" href="tel:'+courtier.telephone.replace(/[^0-9+]/g,"")+'">'+esc(courtier.telephone)+'</a>':'')+
 (cur.visiteVirtuelle?'<a class="btn ghost" target="_blank" rel="noopener" href="'+esc(cur.visiteVirtuelle)+'">Visite virtuelle</a>':'')+
 '</div></div></div></div></div>';
 showPhoto();dlg.querySelector(".close").onclick=()=>dlg.close();
 dlg.querySelector("#docs").addEventListener("submit",async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));
  const payload={nom:d.nom,courriel:d.courriel,telephone:d.telephone||"",mls:cur.id,tag:"mls: "+cur.id,adresse:cur.adresse+", "+cur.ville,source:"site web gillesdulude.com",demande:"documents",consentement:true};
  const ok=f.querySelector("#docsok");
  if(ava){try{await fetch(ava,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(payload)});
    ok.textContent="Merci ! Les documents s'en viennent dans votre boîte courriel (vérifiez aussi les indésirables).";ok.style.display="block";f.querySelector("button").disabled=true;return}catch(err){}}
  location.href="mailto:"+courtier.courriel+"?subject="+encodeURIComponent("Documents : "+cur.adresse+" (MLS "+cur.id+")")+"&body="+encodeURIComponent("Nom : "+d.nom+"\\nCourriel : "+d.courriel+"\\nTéléphone : "+(d.telephone||"")+"\\n\\nJ'aimerais recevoir les documents de la propriété No MLS "+cur.id+".");
 });
 dlg.querySelector(".prev")?.addEventListener("click",()=>step(-1));
 document.getElementById("thumbs")?.addEventListener("click",e=>{const t=e.target.closest("img[data-i]");if(t){pi=+t.dataset.i;showPhoto()}});dlg.querySelector(".next")?.addEventListener("click",()=>step(1));
 if(!dlg.open)dlg.showModal();history.replaceState(null,"","#"+encodeURIComponent(cur.id))}
function showPhoto(){const p=cur.photos[pi],img=$("#gimg");if(p){img.src=p.url;img.alt=p.legende||cur.adresse}
 const th=document.getElementById("thumbs");if(th){th.querySelectorAll("img").forEach((t,i)=>t.classList.toggle("on",i===pi));const a=th.children[pi];if(a)a.scrollIntoView({block:"nearest",inline:"center"})}$("#gidx").textContent=cur.photos.length?(pi+1)+" / "+cur.photos.length:""}
function step(d){if(!cur.photos.length)return;pi=(pi+d+cur.photos.length)%cur.photos.length;showPhoto()}
$("#grid").addEventListener("click",e=>{const c=e.target.closest(".card");if(c)open(c.dataset.id)});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener("close",()=>history.replaceState(null,"",location.pathname+location.search));
document.addEventListener("keydown",e=>{if(!dlg.open)return;if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});
const d=new Date(majLe);$("#maj").textContent="Dernière mise à jour : "+d.toLocaleDateString("fr-CA",{day:"numeric",month:"long",year:"numeric"})+" à "+d.toLocaleTimeString("fr-CA",{hour:"2-digit",minute:"2-digit"});
draw();if(location.hash.length>1)open(decodeURIComponent(location.hash.slice(1)));
})();
</script>
` + footer(cfg) + end;
}

function pageContact(cfg) {
  const c = cfg.courtier;
  const action = cfg.formulaire?.action || "";
  return head(cfg, "Contact | Gilles Jr. Dulude, courtier immobilier", "Joindre Gilles Jr. Dulude, courtier immobilier : évaluation gratuite, projet de vente ou d'achat, visite d'une propriété.") +
    header(cfg, "contact.html") +
    pageHero("Contact", "Parlons de votre projet.", "Première rencontre sans engagement. Écrivez-moi ou appelez-moi, je vous réponds rapidement.") + `
<section><div class="wrap cols top-al">
  <div>
    <p class="over">Écrivez-moi</p>
    <form class="form" id="form" ${action ? `action="${esc(action)}" method="post"` : ""}>
      <div class="row"><label>Nom<input name="nom" required autocomplete="name"></label><label>Téléphone<input name="telephone" type="tel" autocomplete="tel"></label></div>
      <label>Courriel<input name="courriel" type="email" required autocomplete="email"></label>
      <label>Votre projet<select name="sujet" id="sujet">
        <option value="evaluation">Évaluation gratuite de ma propriété</option>
        <option value="vente">Vendre ma propriété</option>
        <option value="achat">Acheter une propriété</option>
        <option value="visite">Visiter une propriété</option>
        <option value="autre">Autre question</option>
      </select></label>
      <label>Message<textarea name="message" id="message" placeholder="Adresse de la propriété, délais, questions..."></textarea></label>
      <div><button class="btn" type="submit">Envoyer</button></div>
      <label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:14px"><input type="checkbox" required style="margin-top:4px"> J'accepte que Gilles Jr. Dulude utilise ces renseignements pour répondre à ma demande et faire un suivi.</label>
      <div class="ok" id="ok">Merci ! Votre message est prêt à être envoyé. Je vous réponds rapidement.</div>
    </form>
  </div>
  <div>
    ${cfg.rendezVous ? `<div style="margin-bottom:32px"><p class="over">Le plus simple</p><h3>Réservez un appel avec moi</h3>${rdvFrame(cfg.rendezVous, 700)}</div>` : ""}
    <p class="over">Me joindre directement</p>
    <div class="coord">
      ${c.telephone ? `<a href="${telHref(c.telephone)}"><span>Téléphone</span><b>${esc(c.telephone)}</b></a>` : ""}
      ${c.courriel ? `<a href="mailto:${esc(c.courriel)}"><span>Courriel</span><b>${esc(c.courriel)}</b></a>` : ""}
      <div><span>Agence</span><b>${esc(c.agence)}</b><br>${esc(c.adresseAgence || "")}</div>
      <div><span>Secteurs desservis</span><b>Rive-Sud de Montréal</b><br>La Prairie, Carignan, Chambly, Saint-Jean-sur-Richelieu et les environs</div>
    </div>
  </div>
</div></section>
<script>
(()=>{const p=new URLSearchParams(location.search);const s=p.get("sujet");if(s&&document.querySelector('#sujet option[value="'+s+'"]'))document.getElementById("sujet").value=s;
const mls=p.get("mls");if(mls)document.getElementById("message").value="Bonjour, j'aimerais visiter la propriété No MLS "+mls+".\\n\\n";
const f=document.getElementById("form");
f.addEventListener("submit",e=>{
  if(f.getAttribute("action"))return;
  e.preventDefault();const d=new FormData(f);
  const AVA=${JSON.stringify(cfg.ava?.webhook || "")};
  if(AVA){const o=Object.fromEntries(d);o.source="site web gillesdulude.com";o.demande=o.sujet;if(mls){o.mls=mls;o.tag="mls: "+mls}
    fetch(AVA,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(o)}).then(()=>{const k=document.getElementById("ok");k.textContent="Merci ! Votre message est envoyé. Je vous réponds rapidement.";k.style.display="block";f.reset()});return}const sujet=f.sujet.options[f.sujet.selectedIndex].text;
  const corps="Nom : "+d.get("nom")+"\\nTéléphone : "+(d.get("telephone")||"")+"\\nCourriel : "+d.get("courriel")+"\\nProjet : "+sujet+"\\n\\n"+(d.get("message")||"");
  location.href="mailto:${esc(c.courriel)}?subject="+encodeURIComponent("Site web : "+sujet)+"&body="+encodeURIComponent(corps);
  document.getElementById("ok").style.display="block";
});})();
</script>
` + footer(cfg) + end;
}

export function renderSite(cfg, listings, { apercu = "" } = {}) {
  const pages = {
    "index.html": pageAccueil(cfg, listings),
    "a-propos.html": pageAPropos(cfg),
    "vendre.html": pageVendre(cfg),
    "acheter.html": pageAcheter(cfg),
    "proprietes.html": pageProprietes(cfg, listings),
    "contact.html": pageContact(cfg),
  };
  const banner = apercu ? `<div class="apercu">${esc(apercu)}</div>` : "";
  for (const k of Object.keys(pages)) pages[k] = pages[k].replace("{{APERCU}}", banner);
  return pages;
}
