// Génère toutes les pages du site de Gilles Jr. Dulude.
// Les inscriptions viennent de build.mjs (déjà filtrées : seulement les fiches en vigueur).

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const telHref = (t) => "tel:" + String(t || "").replace(/[^0-9+]/g, "");

const PAGES = [
  { file: "index.html", nav: "Accueil" },
  { file: "a-propos.html", nav: "À propos", haut: false },
  { file: "vendre.html", nav: "Vendre" },
  { file: "acheter.html", nav: "Acheter" },
  { file: "investir.html", nav: "Investir" },
  { file: "marche.html", nav: "Marché" },
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
.badge.new{left:auto;right:14px;background:#B5532F;color:#fff}
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
.form select{appearance:none;-webkit-appearance:none;padding-right:48px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23130F0C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 18px center}
.form .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width:600px){.form .row{grid-template-columns:1fr}}
.note{font-size:14px;color:var(--ch)}
.coord{display:grid;gap:0}
.coord a,.coord div{display:block;padding:18px 0;border-top:1px solid var(--line);text-decoration:none}
.coord span{display:block;font:italic 15px "Source Serif 4",Georgia,serif;color:var(--ch)}
.coord b{font-size:20px;font-weight:600}
.coord .suivez .socrow{display:flex;gap:28px;flex-wrap:wrap;margin:8px 0 0}
.coord .suivez a.socx{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;font-size:18px;font-weight:600;color:var(--nb)}
.coord .suivez a.socx span{display:inline;font:inherit;color:inherit}
.ok{display:none;background:var(--be);padding:14px 16px;font-size:15px}
.docs .ok{background:#fff}
.docs .note{display:block;font-size:14px;color:var(--ch)}

/* Pied */
footer{background:var(--nb);color:#bdb7ad;padding:72px 0 28px;font-size:15px}
footer .g{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px}
.socs{display:flex;flex-direction:column;gap:10px}
.soc{display:inline-flex;align-items:center;gap:10px}
.follow{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:var(--warm);border-radius:24px;padding:32px 36px}
.suivez-sec{border-top:0!important}
.suivez-sec+section{border-top:0;padding-top:48px}
.follow-btns{display:flex;gap:12px;flex-wrap:wrap}
.soc-btn{display:inline-flex;align-items:center;gap:10px}
footer a{text-decoration:none;color:#d9d4cb}footer a:hover{color:var(--bc)}
footer h4{color:var(--bc);font-size:13px;letter-spacing:.14em;text-transform:uppercase;margin:0 0 14px}
footer .logo{height:40px;width:auto;margin-bottom:18px}
footer .rlp{height:58px;width:auto;margin-top:6px}
footer ul{list-style:none;margin:0;padding:0}footer li{padding:4px 0}
.prose{max-width:760px}
.prose h2{font-size:24px;margin:40px 0 10px}
.prose ul{padding-left:20px}
.prose li{margin:6px 0}
.prose a{color:inherit}
.etoiles{color:#E3A33B;letter-spacing:2px}
.avis-top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:36px}
.note-g{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.note-g b{font-size:34px;line-height:1}.note-g span:last-child{color:var(--ch);font-size:14px}
.avis-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
@media (max-width:800px){.avis-grid{grid-template-columns:1fr}}
.prix{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}
.prix div{background:#fff;border-radius:16px;padding:18px 20px;display:flex;flex-direction:column;gap:4px}
.prix b{font-size:22px}.prix span{color:var(--ch);font-size:14px}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}
.kpi{background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px 22px;display:flex;flex-direction:column;gap:6px}
.kpi span{font-size:13px;color:var(--ch)}.kpi b{font-size:26px;line-height:1.15}
.var{font-size:14px;font-weight:600}.var.up{color:#2F7D4F}.var.dn{color:#B5532F}.var.eq{color:var(--ch)}
.lecture{margin-top:22px;background:var(--warm);border-radius:18px;padding:22px 26px;max-width:860px}
.delais div{background:#fff;border:1px solid var(--line)}
.calc{display:grid;grid-template-columns:1.2fr 1fr;gap:28px;margin-top:28px;align-items:start}
.calc .res{display:grid;gap:12px}
.kpi.big.pos{background:#E7F2EA}.kpi.big.neg{background:#F6E5DD}
@media (max-width:860px){.calc{grid-template-columns:1fr}}
@media (max-width:600px){.kpis{grid-template-columns:1fr 1fr;gap:10px}.kpi{padding:14px 16px}.kpi b{font-size:20px}.delais{grid-template-columns:repeat(3,1fr)!important;gap:8px}.delais div{padding:12px}.delais b{font-size:17px}}
.v8list{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
.v8list div{background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px 22px}
.v8list b{font:italic 400 15px "Source Serif 4",Georgia,serif;color:var(--ch)}
.v8list h3{margin:4px 0 6px;font-size:19px}.v8list p{margin:0;font-size:15px;color:var(--ch)}
@media (max-width:1000px){.v8list{grid-template-columns:1fr 1fr}}@media (max-width:560px){.v8list{grid-template-columns:1fr}}
.faq{max-width:860px;border-top:1px solid var(--line)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{cursor:pointer;list-style:none;padding:20px 40px 20px 0;position:relative;font-size:18px;font-weight:500}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";position:absolute;right:6px;top:14px;font-size:26px;font-weight:400;color:var(--ch)}
.faq details[open] summary::after{content:"–"}
.faq details p{margin:0 0 22px;color:var(--ch);font-size:16px;max-width:760px}
.prem{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}
.prem div{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px 24px}
.prem h3{margin:0 0 6px;font-size:19px}.prem p{margin:0;font-size:15px;color:var(--ch)}
@media (max-width:960px){.prem{grid-template-columns:1fr 1fr}}@media (max-width:560px){.prem{grid-template-columns:1fr}}
.defs{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;max-width:980px}
.defs div{border-top:1px solid var(--line);padding:18px 0}
.defs b{display:block;font-size:17px;margin-bottom:4px}.defs span{color:var(--ch);font-size:15px}
@media (max-width:700px){.defs{grid-template-columns:1fr}}
.menu a{white-space:nowrap}
@media (min-width:961px) and (max-width:1400px){.menu{gap:20px}.menu a{letter-spacing:.1em}}
@media (min-width:961px) and (max-width:1120px){.menu{gap:13px}.menu a{letter-spacing:.04em;font-size:12px}.menu .cta{padding:9px 12px}.top .logo img{width:150px;height:auto}}
.facon .tile h3{font:italic 400 24px/1.25 "Source Serif 4",Georgia,serif}
.evalform{background:#fff;border:1px solid var(--line);border-radius:22px;padding:36px 40px}
.evalform .evh{margin:14px 0 0;font-size:20px;padding-top:14px;border-top:1px solid var(--line)}.evalform .evh:first-child{border:0;padding-top:0;margin-top:0}
.form .row3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.form .row4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.form .row5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.form .span2{grid-column:span 2}
.evalform label{min-width:0}.evalform input:not([type=checkbox]),.evalform select,.evalform textarea{width:100%;min-width:0;box-sizing:border-box}
.grp .glab{display:block;font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:8px}
.chks{display:flex;flex-wrap:wrap;gap:10px}.form .chk{display:inline-flex;align-items:center;gap:8px;text-transform:none;letter-spacing:0;font-weight:400;font-size:15px;border:1px solid var(--line);border-radius:999px;padding:8px 14px;background:var(--bc)}
@media (max-width:900px){.form .row3,.form .row4,.form .row5{grid-template-columns:1fr 1fr}.form .span2{grid-column:span 2}}
@media (max-width:600px){.form .row3,.form .row4{grid-template-columns:1fr}.form .span2{grid-column:auto}.evalform{padding:22px 18px}}
@media (max-width:600px){.evalform{padding:20px}}
.cards3 .quote .etoiles{display:block;margin-bottom:8px}
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
.hero.light.small .wrap{padding:48px 24px 40px}
.hero.dark:not(.small){padding:0}
.hero.dark:not(.small) .wrap{min-height:0;padding-top:40px}
.hero.dark:not(.small) .txt{padding-bottom:72px}
@media (max-width:860px){.hero.dark:not(.small) .txt{padding-bottom:8px}.hero.dark:not(.small) .wrap{padding-top:28px;gap:16px}}
.hero.light.small{padding:0}
.hero.light.small .txt{padding:0}
.hero.light.small h1{margin:.1em 0 .25em}
.hero.light.small .lead{margin:0}
.hero.light.small+section{padding-top:56px}
@media (max-width:860px){.hero.light.small .wrap{padding:32px 20px 28px}.hero.light.small+section{padding-top:40px}}
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
.details{margin-top:24px}
@media (min-width:801px){#dlg .side{position:sticky;top:16px;align-self:start}}
.dsec{border-top:1px solid var(--line);padding:18px 0 6px}
.dsec h4{margin:0 0 12px;font-size:17px;font-weight:600}
.dsec dl{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin:0}
.dsec dl div{display:flex;flex-direction:column}
.dsec dt{font-size:12.5px;color:var(--ch);letter-spacing:.02em}
.dsec dd{margin:0;font-size:15px}
.dtxt{white-space:pre-line;font-size:15px;color:var(--ch);margin:0 0 12px}
.dtab{overflow-x:auto;margin-bottom:12px}
.dtab table{width:100%;border-collapse:collapse;font-size:14.5px}
.dtab th{text-align:left;font-weight:500;font-size:12.5px;color:var(--ch);padding:6px 10px 6px 0;border-bottom:1px solid var(--line)}
.dtab td{padding:7px 10px 7px 0;border-bottom:1px solid var(--line);vertical-align:top}
.dtab tr.lv td{font-weight:600;padding-top:12px;border-bottom:0}
.vac{display:inline-block;font-size:11px;background:#E7F2EA;border-radius:999px;padding:1px 8px;margin-left:4px}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.tags span{background:var(--warm);border-radius:999px;padding:4px 12px;font-size:14px}
@media (max-width:560px){.dsec dl{grid-template-columns:1fr}}
.mlslink{display:inline-block;margin-top:16px;padding:10px 16px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--nb);font-size:14px;transition:background .2s}
.mlslink:hover{background:var(--warm)}
#dlg .close{position:sticky;top:10px;float:right;margin:10px 12px -50px 0;border-radius:50%;box-shadow:0 4px 14px rgba(0,0,0,.2)}
@media (max-width:800px){#dlg .gal{aspect-ratio:4/3}#dlg .info{grid-template-columns:1fr;padding:22px 20px}}
`;


const SECTEURS = ["Chambly", "Carignan", "La Prairie", "Saint-Jean-sur-Richelieu", "Saint-Hubert", "Longueuil", "Brossard", "Mont-Saint-Hilaire", "Beloeil"];
const PRIX = [
  ["Rubis", "2025"], ["Top 5 % national", "2022"], ["Rubis", "2022"], ["Prix Diamant rouge", "2021"],
  ["Attestation Diamant", "2020"], ["Attestation Platine de directeur", "2019"], ["Palme d'or du président", "2018"],
];
function jsonLd(cfg) {
  const c = cfg.courtier, r = cfg.reseaux || {};
  const site = cfg.page?.domainePersonnalise ? "https://" + cfg.page.domainePersonnalise + "/" : (c.siteWeb || "");
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Gilles Jr. Dulude, courtier immobilier",
    alternateName: ["Gilles Dulude", "Gilles Jr Dulude", "Équipe Dulude Immobilier"],
    description: "Courtier immobilier résidentiel et commercial sur la Rive-Sud de Montréal, spécialisé en maisons familiales et en immeubles à revenus (plex). Ancien entrepreneur général avec 10 ans d'expérience en construction et rénovation.",
    url: site, image: site + "assets/gilles-apropos.jpg",
    telephone: c.telephone, email: c.courriel,
    address: { "@type": "PostalAddress", streetAddress: "559, rue Pierre-Caisse", addressLocality: "Saint-Jean-sur-Richelieu", addressRegion: "QC", postalCode: "J3A 1P1", addressCountry: "CA" },
    parentOrganization: { "@type": "RealEstateAgent", name: "Royal LePage Distinction" },
    areaServed: SECTEURS.map((v) => ({ "@type": "City", name: v })),
    knowsAbout: ["Vente de maisons unifamiliales", "Achat de propriété", "Immeubles à revenus", "Duplex, triplex et plex", "Évaluation de propriété", "Construction et rénovation"],
    award: PRIX.map(([n, y]) => `${n} Royal LePage ${y}`),
    knowsLanguage: ["fr", "en"],
    sameAs: [r.facebook, r.instagram, "https://www.royallepage.ca/fr/agent/quebec/st-jean-sur-richelieu/gilles-jr-dulude/53410/"].filter(Boolean),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

const AVIS_GOOGLE = [
  ["Grâce au travail de toute son équipe, notre maison s'est vendue très rapidement. Nous recommandons Gilles Jr. Dulude sans hésitation à toute personne qui cherche un courtier immobilier professionnel, disponible, efficace et humain.", "Laurence L.", "2026"],
  ["Toujours un plaisir de faire affaire avec Junior et ce depuis maintes années. Pour une expérience sans tracas, juste, agréable et sereine, il est vraiment le courtier immobilier à contacter et en plus, il a les plus belles pancartes en ville !", "France A.", "Janvier 2025"],
  ["Super équipe, confiance entière.", "Lise C.", "Décembre 2023"],
  ["Une équipe authentique, efficace et qui travaille pour vous! N'hésitez pas à les contacter.", "YOMA", "Janvier 2023"],
];
const AVIS_URL = "https://www.google.com/search?q=%C3%89quipe+Dulude+-+Immobilier";
const avisGoogle = () => `<section><div class="wrap">
  <div class="avis-top"><div><p class="over">Avis Google</p><h2>Ce que mes clients <em>en disent.</em></h2></div>
  <div class="note-g"><b>5,0</b><span class="etoiles" aria-label="5 étoiles sur 5">★★★★★</span><span>${AVIS_GOOGLE.length} avis sur Google</span></div></div>
  <div class="avis-grid">${AVIS_GOOGLE.map(([q, n, d]) => `<figure class="quote" style="margin:0"><span class="etoiles" aria-hidden="true">★★★★★</span><p>« ${q} »</p><figcaption class="who">${n}<span>${d}</span></figcaption></figure>`).join("")}</div>
  <p style="margin-top:28px"><a class="btn ghost" href="${AVIS_URL}" target="_blank" rel="noopener">Voir les avis sur Google</a></p>
</div></section>`;

const prixSection = () => `<section style="background:var(--warm)"><div class="wrap">
  <p class="over">Distinctions Royal LePage</p>
  <h2 style="margin-bottom:28px">Reconnu <em>année après année.</em></h2>
  <div class="prix">${PRIX.map(([n, y]) => `<div><b>${y}</b><span>${n}</span></div>`).join("")}</div>
</div></section>`;

function head(cfg, title, desc, extra = "") {
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
${jsonLd(cfg)}${extra}
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
  const links = PAGES.filter((p) => p.file !== "contact.html" && p.haut !== false)
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


// ---------- Réseaux sociaux ----------
const ICO_FB = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z"/></svg>';
const ICO_IG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>';
function socialLinks(cfg, cls = "soc") {
  const r = cfg.reseaux || {};
  const a = [];
  if (r.facebook) a.push(`<a class="${cls}" href="${esc(r.facebook)}" target="_blank" rel="noopener">${ICO_FB}<span>Facebook</span></a>`);
  if (r.instagram) a.push(`<a class="${cls}" href="${esc(r.instagram)}" target="_blank" rel="noopener">${ICO_IG}<span>Instagram</span></a>`);
  return a.join("");
}
function suivezMoi(cfg) {
  if (!cfg.reseaux) return "";
  return `<section class="suivez-sec" style="padding:0"><div class="wrap"><div class="follow">
  <div><p class="over" style="margin:0 0 6px">Suivez-moi</p><h3 style="margin:0">Mes nouvelles propriétés et mes conseils immobiliers.</h3></div>
  <div class="follow-btns">${socialLinks(cfg, "btn soc-btn")}</div>
</div></div></section>`;
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
  const chat = cfg.clavardage ? `<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="${esc(cfg.clavardage)}"></script>` : "";
  return modal + chat + `<footer><div class="wrap">
  <div class="g">
    <div>
      <img class="logo" src="assets/logo-h-light.png" alt="Gilles Jr. Dulude, courtier immobilier">
      <p>Courtier immobilier résidentiel et commercial, immeubles à revenus.<br>Rive-Sud de Montréal. Français et anglais.</p>
      <img class="rlp" src="assets/rlp-blanc.png" alt="Royal LePage Distinction">
    </div>
    <div><h4>Navigation</h4><ul>${PAGES.map((p) => `<li><a href="${p.file}">${p.nav}</a></li>`).join("")}</ul></div>
    <div><h4>Me joindre</h4><ul>
      ${c.telephone ? `<li><a href="${telHref(c.telephone)}">${esc(c.telephone)}</a></li>` : ""}
      ${c.courriel ? `<li><a href="mailto:${esc(c.courriel)}">${esc(c.courriel)}</a></li>` : ""}
      <li style="margin-top:10px">${esc(c.agence)}<br>${esc(c.adresseAgence || "")}</li>
    </ul></div>
    ${cfg.reseaux ? `<div><h4>Suivez-moi</h4><div class="socs">${socialLinks(cfg)}</div></div>` : ""}
  </div>
  <div class="legal"><span>© ${y} Gilles Jr. Dulude, courtier immobilier. ${esc(c.agence)}.</span><span>Les renseignements sur les propriétés sont fournis à titre indicatif et ne sont pas garantis. <a href="confidentialite.html" style="text-decoration:underline">Politique de confidentialité</a></span></div>
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
  <div class="avis-top"><div><p class="over">Avis Google</p><h2>Ils m'ont fait <em>confiance.</em></h2></div>
  <div class="note-g"><b>5,0</b><span class="etoiles" aria-label="5 étoiles sur 5">★★★★★</span><span>${AVIS_GOOGLE.length} avis sur Google</span></div></div>
  <div class="cards3">${AVIS_GOOGLE.slice(0, 3).map(([q, n, d]) => `<figure class="quote" style="margin:0"><span class="etoiles" aria-hidden="true">★★★★★</span><p>« ${q} »</p><figcaption class="who">${n}<span>${d}</span></figcaption></figure>`).join("")}</div>
  <div class="btns" style="margin-top:24px"><a class="btn ghost" href="${AVIS_URL}" target="_blank" rel="noopener">Voir tous les avis</a><a class="btn ghost" href="a-propos.html">Qui est Gilles?</a></div>
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
const isNew=(l)=>{const t=Date.parse(l.enVigueurDepuis||"");return t&&Date.now()-t<30*864e5};
const dateOf=(l)=>Date.parse(l.enVigueurDepuis||"")||0;
function facts(l){const f=[];
 if(l.logements)f.push('<span><b>'+l.logements+'</b> logements</span>');
 if(l.chambres)f.push('<span><b>'+l.chambres+'</b> ch.</span>');
 if(l.sallesDeBain)f.push('<span><b>'+l.sallesDeBain+'</b> s.d.b.</span>');
 if(l.superficie)f.push('<span><b>'+esc(l.superficie)+'</b></span>');
 return f.join("")}
function card(l,tag){return '<'+tag+' class="card" '+(tag==="a"?'href="proprietes.html#'+esc(l.id)+'"':'data-id="'+esc(l.id)+'"')+' aria-label="Voir '+esc(l.adresse)+'">'+
 '<div class="ph">'+(l.photos[0]?'<img loading="lazy" src="'+esc(l.photos[0].url)+'" alt="'+esc(l.adresse)+'">':'')+
 '<span class="badge '+(l.statut!=="Active"?"pending":"")+'">'+esc(l.statutTexte)+'</span>'+(isNew(l)?'<span class="badge new">Nouveauté</span>':'')+
 (l.photos.length>1?'<span class="nphotos">'+l.photos.length+' photos</span>':'')+'</div>'+
 '<div class="body"><div class="price">'+priceOf(l)+'</div><div class="addr">'+esc(l.adresse)+'</div><div class="city">'+esc(l.ville)+'</div>'+
 (facts(l)?'<div class="facts">'+facts(l)+'</div>':'')+'<div class="ptype">'+esc(kind(l))+'</div></div></'+tag+'>'}
`;

const dataTag = (obj) => `<script id="data" type="application/json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

// ---------- Pages ----------

// ---------- FAQ ----------
const delai = (cfg, t) => cfg.marche?.delais?.[t]?.[0];
const FAQ = {
  vendre: (cfg) => [
    ["Combien ça coûte de vendre ma maison?", "La rémunération du courtier, convenue avec vous et écrite au contrat de courtage. Prévoyez souvent un certificat de localisation à jour et, si vous remboursez votre prêt avant la fin du terme, une pénalité de votre banque. Les frais de notaire sont habituellement payés par l'acheteur."],
    ["Combien de temps ça prend pour vendre?", delai(cfg, "Unifamiliale") ? `Sur la Rive-Sud, une maison unifamiliale se vend en moyenne en ${delai(cfg, "Unifamiliale")} jours, une copropriété en ${delai(cfg, "Copropriété")} jours (${(cfg.marche.mois || "").toLowerCase()}). Une maison bien préparée et affichée au bon prix part plus vite.` : "Ça dépend du secteur, du type de propriété et du prix demandé. Une maison bien préparée et affichée au bon prix part plus vite."],
    ["Est-ce que je dois rénover avant de vendre?", "Pas forcément. Avec mes années en construction, je vous dis quels petits travaux rapportent et lesquels ne valent pas la dépense."],
    ["Je dois vendre avant d'acheter?", "Les deux se font. On peut rendre votre offre d'achat conditionnelle à la vente de votre maison, ou planifier les dates pour éviter de payer deux hypothèques en même temps."],
  ],
  acheter: () => [
    ["Combien de mise de fonds faut-il?", "Au minimum 5 % jusqu'à 500 000 $, puis 10 % sur la portion au-delà de 500 000 $, pour une propriété de moins de 1,5 M$. Sous 20 %, l'assurance prêt hypothécaire est obligatoire."],
    ["C'est quoi la taxe de bienvenue?", "Ce sont les droits de mutation, payés une fois à la ville après l'achat. En 2026, comptez environ 5 600 $ pour une propriété de 500 000 $. La facture arrive quelques semaines après le notaire : gardez cette somme de côté."],
    ["Ça coûte combien d'avoir un courtier quand j'achète?", "Dans la plupart des cas, rien de votre poche : ma rémunération est habituellement payée à même la vente. On en parle clairement avant de commencer, et c'est écrit au contrat."],
    ["L'inspection est-elle obligatoire?", "Non, mais je la recommande toujours. Je visite avec vous en ancien entrepreneur, et l'inspecteur confirme ce qu'on voit et ce qu'on ne voit pas."],
  ],
  investir: () => [
    ["Combien de mise de fonds pour un plex?", "Si vous habitez un des logements : 5 % pour un duplex (10 % sur la portion au-delà de 500 000 $), 10 % pour un triplex ou un quadruplex. Si vous n'y habitez pas : 20 %. À partir de 5 logements, c'est un financement commercial, avec d'autres règles."],
    ["Qu'est-ce qu'un bon MRB?", "Il n'y a pas de chiffre magique. Un MRB se compare à celui des immeubles semblables vendus dans le même secteur, en tenant compte de l'état de l'immeuble et des loyers par rapport au marché."],
    ["Les locataires restent-ils quand j'achète?", "Oui. Les baux suivent l'immeuble : les locataires restent, aux mêmes conditions. C'est pourquoi on lit chaque bail avant de faire une offre."],
    ["Est-ce le bon moment pour investir?", "Ça dépend moins du marché que de l'immeuble et de votre plan. Les chiffres du mois sont sur la page Marché, et on peut analyser un immeuble précis ensemble."],
  ],
};
const faqSection = (items, titre = "Questions fréquentes", bg = "") => `<section${bg ? ` style="background:${bg}"` : ""}><div class="wrap">
  <p class="over">FAQ</p>
  <h2 style="margin-bottom:28px">${titre}</h2>
  <div class="faq">${items.map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("")}</div>
</div></section>`;
const faqLd = (items) => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } })) }).replace(/</g, "\\u003c")}</script>`;

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
      <h1 style="text-transform:uppercase;letter-spacing:.01em">Vendre, acheter ou investir sur la Rive-Sud.</h1>
      <p class="lead">Un ancien entrepreneur devenu courtier, qui connaît le bâtiment et les chiffres. Je m'adapte à vous, pas l'inverse.</p>
      <div class="btns"><a class="btn" href="${RDV(cfg)}"${rdvAttrs(cfg)}>Réserver un appel</a><a class="btn ghost" href="vendre.html#evaluation">Évaluation gratuite</a></div>
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
    <a class="tile" href="investir.html"><span class="ic">${ICON.plex}</span><h3>Investir</h3><p>Duplex, triplex et plex : on parle chiffres.</p><span class="go">En savoir plus →</span></a>
  </div>
</div></section>

<section style="padding-top:0"><div class="wrap">
  <p class="over">À votre façon</p>
  <h2 style="margin-bottom:32px">Chacun son style. <em>Je m'adapte au vôtre.</em></h2>
  <div class="tiles facon">
    <a class="tile" href="vendre.html#etapes"><h3>« Expliquez-moi simplement. »</h3><p>Je vous explique chaque étape, sans jargon. Vous n'êtes jamais seul avec une question.</p><span class="go">Comment ça se passe →</span></a>
    <a class="tile" href="${RDV(cfg)}"${rdvAttrs(cfg)}><h3>« Allons droit au but. »</h3><p>Combien, combien de temps, quoi faire. En 15 minutes, vous avez l'heure juste.</p><span class="go">Réserver 15 minutes →</span></a>
    <a class="tile" href="marche.html"><h3>« Montrez-moi les chiffres. »</h3><p>Prix médians, délais de vente, MRB, rendement, comparables. Les données d'abord, la décision vous revient.</p><span class="go">Voir le marché →</span></a>
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

${suivezMoi(cfg)}

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
    <p>Courtier résidentiel et commercial, je me spécialise dans les maisons familiales et les immeubles à revenus (duplex, triplex et plex) sur la Rive-Sud, en français comme en anglais : ${SECTEURS.slice(0,-1).join(", ")} et ${SECTEURS.at(-1)}.</p>
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

${prixSection()}
${avisGoogle()}
${band("On se parle ?", "Un appel de 15 minutes, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageVendre(cfg) {
  const faq = FAQ.vendre(cfg);
  return head(cfg, "Vendre | Gilles Jr. Dulude, courtier immobilier", "Vendre votre maison au meilleur prix avec la Méthode V8. Réservez un appel avec Gilles Jr. Dulude.", faqLd(faq)) +
    header(cfg, "vendre.html") +
    pageHero("Vendre", "Vendre <em>autrement.</em>", "Ce n'est pas compliqué de vendre. C'est difficile de vendre au maximum.") + `
<section><div class="wrap cols">
  <div>
    <p class="over">La Méthode V8</p>
    <h2>8 leviers pour vendre <em>au meilleur prix.</em></h2>
    <p class="lead">Huit étapes concrètes, adaptées à votre maison et à votre échéancier.</p>
  </div>
  <div></div>
</div>
<div class="wrap"><div class="v8list">${V8.map(([n, t, d]) => `<div><b>${n}</b><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div>
</section>

<section id="etapes" style="background:var(--warm)"><div class="wrap">
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
${faqSection(faq, "Les questions <em>qu'on me pose souvent.</em>", "var(--warm)")}
<section id="evaluation"><div class="wrap">
  <div style="max-width:760px;margin-bottom:28px"><p class="over">Évaluation gratuite</p><h2>Combien vaut <em>votre propriété?</em></h2>
  <p class="lead">Quelques questions, et je vous reviens avec une estimation basée sur les ventes récentes de votre secteur. Sans engagement.</p>
  <p class="note">Vous préférez en parler? <a href="${RDV(cfg)}"${rdvAttrs(cfg)} style="text-decoration:underline">Réservez 15 minutes</a> ou appelez au ${esc(cfg.courtier.telephone)}.</p></div>
  <form class="form evalform" id="evalf">
    <h3 class="evh">À propos de votre propriété</h3>
    <div class="row3"><label>Année de construction *<input name="annee" type="number" inputmode="numeric" min="1800" max="2030" required></label>
    <label>Superficie habitable (pc)<input name="superficie" type="number" inputmode="numeric" min="0" placeholder="pc"></label>
    <label>Genre de propriété<select name="genre"><option>Inconnu</option><option>Maison à étage</option><option>Maison à un étage et demi</option><option>Copropriété</option><option>Maison mobile</option><option>Maison à paliers multiples</option><option>Maison de plain-pied</option><option>Duplex</option><option>Triplex</option><option>Quadruplex</option><option>Quintuplex</option><option>Commerciale</option><option>Industrielle</option><option>Entreprise (fonds de commerce)</option><option>Chalet</option><option>Ferme</option><option>Fermette</option><option>Appartement</option><option>Loft/Studio</option><option>Autre</option></select></label></div>
    <label>Avez-vous amélioré ou rénové votre demeure depuis votre acquisition?<textarea name="renovations" style="min-height:90px"></textarea></label>
    <div class="grp"><span class="glab">Caractéristiques qui s'appliquent à la propriété</span><div class="chks"><label class="chk"><input type="checkbox" name="caract" value="Sous-sol aménagé"> Sous-sol aménagé</label><label class="chk"><input type="checkbox" name="caract" value="Piscine hors terre"> Piscine hors terre</label><label class="chk"><input type="checkbox" name="caract" value="Piscine creusée"> Piscine creusée</label><label class="chk"><input type="checkbox" name="caract" value="Stationnement/garage"> Stationnement/garage</label><label class="chk"><input type="checkbox" name="caract" value="Foyer-Poêle"> Foyer-Poêle</label></div></div>
    <div class="row4"><label class="span2">No civique et rue *<input name="adresse" required autocomplete="street-address"></label>
    <label>Ville *<input name="ville" required autocomplete="address-level2" placeholder="Saisissez votre ville"></label>
    <label>Code postal *<input name="codepostal" required autocomplete="postal-code"></label></div>
    <h3 class="evh">Les pièces</h3>
    <div class="row5"><label>Pièce(s) *<input name="pieces" type="number" min="0" required></label>
    <label>Chambre(s) hors-sol *<input name="ch_hs" type="number" min="0" required></label>
    <label>Chambre(s) sous-sol<input name="ch_ss" type="number" min="0"></label>
    <label>Salle(s) de bain<input name="sdb" type="number" min="0"></label>
    <label>Salle(s) d'eau<input name="sde" type="number" min="0"></label></div>
    <h3 class="evh">Contact</h3>
    <div class="row4"><label>Votre prénom *<input name="prenom" required autocomplete="given-name" placeholder="Entrez votre prénom"></label>
    <label>Votre nom *<input name="nomfamille" required autocomplete="family-name" placeholder="Entrez votre nom"></label>
    <label>Votre téléphone *<input name="telephone" type="tel" required autocomplete="tel" placeholder="Ex. : 555-000-0000"></label>
    <label>Votre courriel *<input name="courriel" type="email" required autocomplete="email" placeholder="Ex. : votrenom@domaine.com"></label></div>
    <div class="grp"><span class="glab">Disponibilité d'appel</span><div class="chks"><label class="chk"><input type="checkbox" name="dispo" value="AM"> AM</label><label class="chk"><input type="checkbox" name="dispo" value="PM"> PM</label><label class="chk"><input type="checkbox" name="dispo" value="Soirée"> Soirée</label></div></div>
    <h3 class="evh">Message</h3>
    <label>Avez-vous autre chose à mentionner?<textarea name="autre" style="min-height:90px"></textarea></label>
    <label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:14px"><input type="checkbox" required style="margin-top:4px"><span> J'accepte que Gilles Jr. Dulude utilise ces renseignements pour préparer mon évaluation et faire un suivi. <a href="confidentialite.html" target="_blank" style="text-decoration:underline">Confidentialité</a></span></label>
    <div><button class="btn" type="submit">Recevoir mon évaluation</button></div>
    <div class="ok" id="evalok"></div>
  </form>
  <script>(()=>{const f=document.getElementById("evalf"),AVA=${JSON.stringify(cfg.ava?.webhook || "")};
  f.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(f),d=Object.fromEntries(fd);
   const car=fd.getAll("caract").join(", "),dis=fd.getAll("dispo").join(", ");
   const resume="Évaluation gratuite : "+d.adresse+", "+d.ville+" "+d.codepostal+" | "+d.genre+" | Année "+d.annee+(d.superficie?" | "+d.superficie+" pc":"")+" | "+d.pieces+" pièces, "+d.ch_hs+" ch. hors-sol"+(d.ch_ss?", "+d.ch_ss+" ch. sous-sol":"")+(d.sdb?", "+d.sdb+" sdb":"")+(d.sde?", "+d.sde+" s. d'eau":"")+(car?" | "+car:"")+(d.renovations?" | Rénovations : "+d.renovations:"")+(dis?" | Rappel : "+dis:"")+(d.autre?" | "+d.autre:"");
   const o={prenom:d.prenom,nomfamille:d.nomfamille,nom:d.prenom+" "+d.nomfamille,courriel:d.courriel,telephone:d.telephone,adresse:d.adresse,ville:d.ville,codepostal:d.codepostal,province:"Québec",pays:"Canada",genre:d.genre,annee:d.annee,superficie:d.superficie||"",pieces:d.pieces,chambres_hors_sol:d.ch_hs,chambres_sous_sol:d.ch_ss||"",salles_de_bain:d.sdb||"",salles_eau:d.sde||"",caracteristiques:car,renovations:d.renovations||"",disponibilite:dis,autre:d.autre||"",message:resume,demande:"evaluation gratuite",tag:"évaluation gratuite - site web",source:"site web gillesdulude.com",consentement:true};
   const k=document.getElementById("evalok");
   if(AVA){fetch(AVA+(AVA.includes("?")?"&":"?")+new URLSearchParams(o),{mode:"no-cors"}).then(()=>{k.textContent="Merci! Je prépare votre évaluation et je vous reviens rapidement.";k.style.display="block";f.reset()});return}
   location.href="mailto:info@gillesdulude.com,gilles@gillesdulude.com?subject="+encodeURIComponent("Évaluation gratuite : "+d.adresse)+"&body="+encodeURIComponent(d.prenom+" "+d.nomfamille+" "+d.courriel+" "+d.telephone+" | "+resume)});})();</script>
</div>
</div></section>

` + footer(cfg) + end;
}

function pageAcheter(cfg) {
  const faq = FAQ.acheter(cfg);
  return head(cfg, "Acheter | Gilles Jr. Dulude, courtier immobilier", "Acheter une maison, un condo ou un plex sur la Rive-Sud avec un courtier qui comprend le bâtiment. Mise de fonds, CELIAPP, taxe de bienvenue : l'essentiel du premier achat.", faqLd(faq)) +
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

<section id="premier" style="background:var(--warm)"><div class="wrap">
  <p class="over">Premier achat</p>
  <h2>Votre première maison, <em>sans mauvaise surprise.</em></h2>
  <p class="lead" style="max-width:680px">L'essentiel à savoir avant de commencer les visites.</p>
  <div class="prem">
    <div><h3>La mise de fonds</h3><p>5 % minimum jusqu'à 500 000 $, puis 10 % sur la portion au-delà. Sous 20 %, une assurance prêt hypothécaire s'ajoute au prêt.</p></div>
    <div><h3>Le CELIAPP</h3><p>Jusqu'à 8 000 $ par année, 40 000 $ au total. Déductible d'impôt, et retiré sans impôt pour votre premier achat.</p></div>
    <div><h3>Le RAP</h3><p>Jusqu'à 60 000 $ par personne retirés de vos REER pour la mise de fonds, à rembourser sur 15 ans.</p></div>
    <div><h3>La préapprobation</h3><p>À faire avant de visiter. Vous connaissez votre vrai budget, et votre offre est plus solide face aux autres acheteurs.</p></div>
    <div><h3>La taxe de bienvenue</h3><p>Environ 5 600 $ pour une maison de 500 000 $ en 2026. Elle arrive après le notaire et ne s'ajoute pas au prêt.</p></div>
    <div><h3>Les autres frais</h3><p>Notaire, inspection, ajustement des taxes, déménagement. Comptez quelques milliers de dollars en plus de la mise de fonds.</p></div>
  </div>
  <p class="note" style="margin-top:20px">Montants à titre indicatif. Votre institution financière ou votre courtier hypothécaire confirme ce qui s'applique à votre situation.</p>
</div></section>

<section id="investir"><div class="wrap cols">
  <div><p class="over">Investisseurs</p><h2>Duplex, triplex, plex : <em>on parle chiffres.</em></h2><p class="lead">Revenus, dépenses, baux, état de l'immeuble. Un bon investissement se juge sur du concret.</p></div>
  <div><a class="tile" href="investir.html"><span class="ic">${ICON.plex}</span><h3>Investir avec moi</h3><p>Ce que j'analyse avant chaque offre, les chiffres que je regarde et le calculateur de rendement.</p><span class="go">Voir la page Investir →</span></a></div>
</div></section>

${cfg.marche ? `<section><div class="wrap"><p class="over">Le marché, ${esc(cfg.marche.mois.toLowerCase())}</p><h2 style="margin-bottom:28px">Les chiffres <em>de la Rive-Sud.</em></h2>${marcheStats(cfg)}<div class="btns" style="margin-top:24px"><a class="btn ghost" href="investir.html#calculateur">Calculer le rendement d'un plex</a></div></div></section>` : ""}
${faqSection(faq, "Les questions <em>qu'on me pose souvent.</em>", "var(--warm)")}
${band("Vous cherchez votre prochaine maison ?", "Dites-moi ce que vous cherchez, je m'occupe du reste.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

function pageInvestir(cfg) {
  const faq = FAQ.investir(cfg);
  return head(cfg, "Investir dans un plex sur la Rive-Sud | Gilles Jr. Dulude", "Acheter ou vendre un duplex, triplex ou plex sur la Rive-Sud. Analyse des revenus, des baux et de l'état de l'immeuble par un courtier ancien entrepreneur.", faqLd(faq)) +
    header(cfg, "investir.html") +
    pageHero("Investir", "Un plex, <em>ça se calcule.</em>", "Duplex, triplex, quintuplex : on vérifie que les chiffres tiennent avant que vous signiez.") + `
<section><div class="wrap">
  <p class="over">Avant chaque offre</p>
  <h2 style="margin-bottom:8px">Ce que je vérifie <em>pour vous.</em></h2>
  <div class="v8list">
    <div><b>01</b><h3>Les revenus</h3><p>Je compare chaque loyer au bail signé et aux loyers du secteur. Un loyer bas, c'est du potentiel. Un loyer gonflé, c'est un risque.</p></div>
    <div><b>02</b><h3>Les dépenses</h3><p>Taxes, assurances, chauffage, entretien, logements vacants. Toutes les dépenses, pas seulement celles qu'on vous montre.</p></div>
    <div><b>03</b><h3>Le bâtiment</h3><p>Toiture, fondation, électricité, plomberie, fenêtres. Avec mon œil d'entrepreneur, j'estime les travaux à prévoir. En plus de l'inspection, pas à la place.</p></div>
    <div><b>04</b><h3>Le financement</h3><p>La mise de fonds change selon le nombre de logements et si vous habitez l'immeuble. On monte un plan qui tient avec votre prêteur.</p></div>
  </div>
</div></section>

<section style="background:var(--warm)"><div class="wrap">
  <p class="over">Pour les analytiques</p>
  <h2 style="margin-bottom:28px">Les chiffres <em>que je regarde.</em></h2>
  <div class="defs">
    <div><b>MRB (multiplicateur de revenus bruts)</b><span>Le prix divisé par les loyers d'une année. Plus il est bas, moins vous payez chaque dollar de revenu.</span></div>
    <div><b>Taux de capitalisation</b><span>Le revenu net (loyers moins dépenses) divisé par le prix. Il compare des immeubles sans tenir compte du financement.</span></div>
    <div><b>Cashflow</b><span>Ce qui reste chaque mois une fois les dépenses et l'hypothèque payées. Positif, l'immeuble se paie seul.</span></div>
    <div><b>Prix par porte</b><span>Le prix divisé par le nombre de logements. Utile pour comparer rapidement des immeubles du même secteur.</span></div>
  </div>
  <div class="btns" style="margin-top:28px"><a class="btn" href="#calculateur">Calculer le rendement d'un plex</a><a class="btn ghost" href="marche.html">Voir les chiffres du mois</a></div>
</div></section>

<section id="calculateur"><div class="wrap">
  <p class="over">Calculateur</p>
  <h2>Calculez le rendement <em>d'un plex.</em></h2>
  <p class="lead" style="max-width:640px">Entrez les chiffres de l'immeuble. Le calcul est fait sur votre écran, rien n'est envoyé.</p>
  <div class="calc">
    <form class="form" id="calc" onsubmit="return false">
      <div class="row"><label>Prix de l'immeuble ($)<input name="prix" type="number" inputmode="numeric" value="775000" min="0" step="1000"></label>
      <label>Loyers par mois, tous les logements ($)<input name="loyers" type="number" inputmode="numeric" value="4200" min="0" step="50"></label></div>
      <div class="row"><label>Dépenses par année ($)<input name="depenses" type="number" inputmode="numeric" value="12000" min="0" step="100"></label>
      <label>Mise de fonds (%)<input name="mdf" type="number" inputmode="decimal" value="20" min="0" max="100" step="1"></label></div>
      <div class="row"><label>Taux hypothécaire (%)<input name="taux" type="number" inputmode="decimal" value="4.5" min="0" step="0.05"></label>
      <label>Amortissement (années)<select name="amort"><option>25</option><option selected>30</option><option>40</option></select></label></div>
      <p class="note" style="margin:0">Dépenses : taxes municipales et scolaires, assurances, électricité et chauffage payés par le propriétaire, entretien, vacance.</p>
    </form>
    <div class="res" id="res" aria-live="polite"></div>
  </div>
  <p class="note" style="margin-top:20px">Calcul approximatif, à titre indicatif seulement. Il ne remplace pas l'analyse complète d'un immeuble ni les conseils d'un professionnel du financement.</p>
  <div class="btns" style="margin-top:16px"><a class="btn" ${rdvAttrs(cfg)} href="${RDV(cfg)}">Analyser un immeuble avec moi</a></div>
</div></section>
<script>(()=>{const f=document.getElementById("calc"),r=document.getElementById("res");
const $=(n)=>parseFloat(f.elements[n].value)||0;
const m$=(n)=>(Math.round(n)).toLocaleString("fr-CA")+" $";
function calc(){const prix=$("prix"),rev=$("loyers")*12,dep=$("depenses"),mdf=$("mdf")/100,t=$("taux")/100,n=$("amort")*12;
 const pret=prix*(1-mdf),i=Math.pow(1+t/2,1/6)-1,pmt=i?pret*i/(1-Math.pow(1+i,-n)):pret/n;
 const net=rev-dep,cash=net/12-pmt;
 const mrb=rev?prix/rev:0,brut=prix?rev/prix*100:0,cap=prix?net/prix*100:0;
 r.innerHTML='<div class="kpi"><span>Multiplicateur de revenus (MRB)</span><b>'+(mrb?mrb.toFixed(1).replace(".",","):"–")+'</b></div>'+
 '<div class="kpi"><span>Rendement brut</span><b>'+brut.toFixed(1).replace(".",",")+' %</b></div>'+
 '<div class="kpi"><span>Taux de capitalisation</span><b>'+cap.toFixed(1).replace(".",",")+' %</b></div>'+
 '<div class="kpi"><span>Paiement hypothécaire</span><b>'+m$(pmt)+' / mois</b></div>'+
 '<div class="kpi big '+(cash>=0?"pos":"neg")+'"><span>Cashflow approximatif</span><b>'+(cash>=0?"+":"")+m$(cash)+' / mois</b></div>'}
f.addEventListener("input",calc);calc();})();</script>
</div></section>

<section><div class="wrap"><div class="cta-warm" style="text-align:left;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center">
  <div><p class="over">Vous vendez un immeuble?</p><h2>Un dossier clair <em>vend plus vite.</em></h2>
  <p class="lead" style="margin:0">Je prépare pour les acheteurs un dossier complet : revenus, dépenses, baux et état de l'immeuble. Un investisseur qui comprend les chiffres fait une offre plus vite.</p></div>
  <div class="btns"><a class="btn" href="vendre.html#evaluation">Évaluer mon immeuble</a><a class="btn ghost" href="marche.html#stats">Recevoir les chiffres chaque mois</a></div>
</div></div></section>

${faqSection(faq, "Les questions <em>des investisseurs.</em>", "var(--warm)")}
${band("Un immeuble en vue?", "Envoyez-moi l'annonce ou les chiffres. On regarde ensemble s'il tient la route, 15 minutes, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
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
    <select id="sort" aria-label="Trier"><option value="new">Plus récentes</option><option value="desc">Prix décroissant</option><option value="asc">Prix croissant</option></select>
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
let filter="Toutes",sort="new";
const types=["Toutes",...new Set(listings.map(kind))];
const chips=$("#chips");
if(types.length>2){chips.innerHTML=types.map(t=>'<button class="chip" aria-pressed="'+(t===filter)+'" data-t="'+esc(t)+'">'+esc(t)+'</button>').join("");
 chips.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;filter=b.dataset.t;chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.t===filter));draw()})}
$("#sort").addEventListener("change",e=>{sort=e.target.value;draw()});
function draw(){let rows=listings.filter(l=>filter==="Toutes"||kind(l)===filter);
 rows=rows.slice().sort((a,b)=>sort==="asc"?(a.prix||a.loyer||0)-(b.prix||b.loyer||0):sort==="new"?dateOf(b)-dateOf(a):(b.prix||b.loyer||0)-(a.prix||a.loyer||0));
 $("#grid").innerHTML=rows.length?rows.map(l=>card(l,"button")).join(""):'<div class="empty">Aucune propriété en ce moment. Revenez bientôt, ou contactez-moi pour être avisé des nouveautés.</div>'}
const dlg=$("#dlg");let cur=null,pi=0;
function det(d){if(!d)return"";let h="";
 const grid=(t,l)=>l&&l.length?'<div class="dsec"><h4>'+t+'</h4><dl>'+l.map(([a,b])=>'<div><dt>'+esc(a)+'</dt><dd>'+esc(b)+'</dd></div>').join("")+'</dl></div>':"";
 const txt=(t,v)=>v?'<div class="dsec"><h4>'+t+'</h4><p class="dtxt">'+esc(v)+'</p></div>':"";
 (d.sections||[]).forEach(s=>h+=grid(s.titre,s.lignes));
 if(d.logements){const L=d.logements;h+='<div class="dsec"><h4>Logements</h4>'+(L.resume?'<p class="dtxt" style="margin-bottom:10px">'+esc(L.resume)+'</p>':'')+(L.liste.length?'<div class="dtab"><table><thead><tr><th>Logement</th><th>Ch.</th><th>SdB</th><th>Inclus dans le loyer</th></tr></thead><tbody>'+L.liste.map((u,i)=>'<tr><td>'+(i+1)+'. '+esc(u.type)+(u.vacant?' <span class="vac">Vacant</span>':'')+'</td><td>'+esc(u.chambres)+'</td><td>'+esc(u.sdb)+'</td><td>'+esc(u.inclus||"–")+'</td></tr>').join("")+'</tbody></table></div>':'')+'</div>'}
 if(d.pieces&&d.pieces.length){let lv="";h+='<div class="dsec"><h4>Pièces</h4><div class="dtab"><table><thead><tr><th>Pièce</th><th>Dimensions</th><th>Plancher</th></tr></thead><tbody>'+d.pieces.map(r=>{let x="";if(r.niveau&&r.niveau!==lv){lv=r.niveau;x='<tr class="lv"><td colspan="3">'+esc(lv)+'</td></tr>'}return x+'<tr><td>'+esc(r.piece)+'</td><td>'+esc(r.dim)+'</td><td>'+esc(r.sol)+'</td></tr>'}).join("")+'</tbody></table></div></div>'}
 if(d.espaces&&d.espaces.length)h+='<div class="dsec"><h4>Espaces additionnels</h4><div class="dtab"><table><thead><tr><th>Espace</th><th>Dimensions</th><th>Usage</th></tr></thead><tbody>'+d.espaces.map(e=>'<tr><td>'+esc(e.type)+'</td><td>'+esc(e.dim)+'</td><td>'+esc(e.usage)+'</td></tr>').join("")+'</tbody></table></div></div>';
 h+=grid("Revenus, évaluation et dépenses",d.finances);
 if(d.renovations&&d.renovations.length)h+=grid("Rénovations",d.renovations.map(r=>[r.type,[r.annee,r.detail].filter(Boolean).join(", ")||"Oui"]));
 if(d.proches&&d.proches.length)h+='<div class="dsec"><h4>À proximité</h4><div class="tags">'+d.proches.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div></div>';
 h+=txt("Inclusions",d.inclusions)+txt("Exclusions",d.exclusions)+txt("Addenda",d.addenda);
 return h?'<div class="details">'+h+'</div>':""}
function open(id){cur=listings.find(l=>l.id===id);if(!cur)return;pi=0;
 const spec=(lab,v)=>v?'<div><span>'+lab+'</span>'+esc(v)+'</div>':'';
 const sujet=encodeURIComponent("Propriété "+cur.adresse+", "+cur.ville+" (MLS "+cur.id+")");
 dlg.innerHTML='<button class="close" aria-label="Fermer">×</button><div class="dlg"><div class="gal"><img id="gimg" alt="">'+
 (cur.photos.length>1?'<button class="nav prev" aria-label="Photo précédente">‹</button><button class="nav next" aria-label="Photo suivante">›</button>':'')+
 '<div class="idx" id="gidx"></div></div>'+(cur.photos.length>1?'<div class="thumbs" id="thumbs">'+cur.photos.map((p,i)=>'<img loading="lazy" data-i="'+i+'" src="'+esc(p.url)+'" alt="">').join("")+'</div>':'')+'<div class="info"><div class="main"><p class="over" style="margin:0 0 6px">'+esc(kind(cur))+' · '+esc(cur.statutTexte)+'</p>'+
 '<div class="price">'+priceOf(cur)+'</div><div class="addr">'+esc(cur.adresse)+'</div><div class="city">'+esc([cur.ville,cur.codePostal].filter(Boolean).join(", "))+'</div>'+
 '<div class="specs">'+spec("Logements",cur.logements)+spec("Chambres",cur.chambres)+spec("Salles de bain",cur.sallesDeBain)+spec("Salles d'eau",cur.sallesEau)+spec("Superficie habitable",cur.superficie)+spec("Terrain",cur.terrain)+spec("Année de construction",cur.anneeConstruction)+'</div>'+
 '<div class="desc">'+esc(cur.description)+'</div>'+det(cur.details)+(cur.lien?'<a class="mlslink" target="_blank" rel="noopener" href="'+esc(cur.lien)+'">No MLS '+esc(cur.id)+' · Voir l&#39;annonce complète ↗</a>':'<div class="mls">No MLS '+esc(cur.id)+'</div>')+'</div><div class="side">'+
 '<form class="pcta docs" id="docs"><strong>Recevez tous les documents de cette propriété</strong><span class="note">Fiche descriptive, déclaration du vendeur, certificat, taxes et plus, envoyés par courriel.</span>'+
 '<div class="form" style="margin-top:12px;gap:10px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><input name="prenom" placeholder="Prénom" required autocomplete="given-name"><input name="nomfamille" placeholder="Nom" required autocomplete="family-name"></div><input name="courriel" type="email" placeholder="Courriel" required autocomplete="email"><input name="telephone" type="tel" placeholder="Téléphone" autocomplete="tel">'+
 '<label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:13px"><input type="checkbox" required style="margin-top:3px"><span> J&#39;accepte que Gilles Jr. Dulude utilise ces renseignements pour m&#39;envoyer les documents et faire un suivi au sujet de cette propriété. <a href="confidentialite.html" target="_blank" style="text-decoration:underline">Confidentialité</a></span></label>'+
 '<button class="btn" type="submit">Recevoir les documents</button><div class="ok" id="docsok"></div></div></form>'+
 '<div class="pcta" style="background:transparent;border:1px solid var(--line)"><strong>Cette propriété vous intéresse ?</strong>'+esc(courtier.nom)+', '+esc(courtier.titre)+'<div>'+
 '<a class="btn" href="contact.html?sujet=visite&mls='+encodeURIComponent(cur.id)+'">Demander une visite</a>'+
 (courtier.telephone?'<a class="btn ghost" href="tel:'+courtier.telephone.replace(/[^0-9+]/g,"")+'">'+esc(courtier.telephone)+'</a>':'')+
 (cur.visiteVirtuelle?'<a class="btn ghost" target="_blank" rel="noopener" href="'+esc(cur.visiteVirtuelle)+'">Visite virtuelle</a>':'')+
 '</div></div></div></div></div>';
 showPhoto();dlg.querySelector(".close").onclick=()=>dlg.close();
 dlg.querySelector("#docs").addEventListener("submit",async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));
  const payload={prenom:d.prenom,nomfamille:d.nomfamille,nom:d.prenom+" "+d.nomfamille,courriel:d.courriel,telephone:d.telephone||"",mls:cur.id,tag:"mls: "+cur.id,adresse:cur.adresse+", "+cur.ville,source:"site web gillesdulude.com",demande:"documents",consentement:true};
  const ok=f.querySelector("#docsok");
  if(ava){try{await fetch(ava+(ava.includes("?")?"&":"?")+new URLSearchParams(payload),{mode:"no-cors"});
    ok.textContent="Merci ! Les documents s'en viennent dans votre boîte courriel (vérifiez aussi les indésirables).";ok.style.display="block";f.querySelector("button").disabled=true;return}catch(err){}}
  location.href="mailto:info@gillesdulude.com,gilles@gillesdulude.com?subject="+encodeURIComponent("Documents : "+cur.adresse+" (MLS "+cur.id+")")+"&body="+encodeURIComponent("Nom : "+d.prenom+" "+d.nomfamille+"\\nCourriel : "+d.courriel+"\\nTéléphone : "+(d.telephone||"")+"\\n\\nJ'aimerais recevoir les documents de la propriété No MLS "+cur.id+".");
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
      <div class="row"><label>Prénom<input name="prenom" required autocomplete="given-name"></label><label>Nom<input name="nomfamille" required autocomplete="family-name"></label></div>
      <div class="row"><label>Courriel<input name="courriel" type="email" required autocomplete="email"></label><label>Téléphone<input name="telephone" type="tel" autocomplete="tel"></label></div>
      <label>Votre projet<select name="sujet" id="sujet">
        <option value="evaluation">Évaluation gratuite de ma propriété</option>
        <option value="vente">Vendre ma propriété</option>
        <option value="achat">Acheter une propriété</option>
        <option value="visite">Visiter une propriété</option>
        <option value="autre">Autre question</option>
      </select></label>
      <label>Message<textarea name="message" id="message" placeholder="Adresse de la propriété, délais, questions..."></textarea></label>
      <label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:14px"><input type="checkbox" required style="margin-top:4px"><span> J'accepte que Gilles Jr. Dulude utilise ces renseignements pour répondre à ma demande et faire un suivi. <a href="confidentialite.html" target="_blank" style="text-decoration:underline">Confidentialité</a></span></label>
      <div><button class="btn" type="submit">Envoyer</button></div>
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
      ${cfg.reseaux ? `<div class="suivez"><span>Suivez-moi</span><p class="socrow">${socialLinks(cfg, "socx")}</p></div>` : ""}
      <div><span>Secteurs desservis</span><b>Rive-Sud de Montréal</b><br>${SECTEURS.join(", ")}</div>
      <div><span>Langues</span><b>Français et anglais</b></div>
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
  if(AVA){const o=Object.fromEntries(d);o.nom=(o.prenom||"")+" "+(o.nomfamille||"");o.source="site web gillesdulude.com";o.demande=o.sujet;if(mls){o.mls=mls;o.tag="mls: "+mls}
    fetch(AVA+(AVA.includes("?")?"&":"?")+new URLSearchParams(o),{mode:"no-cors"}).then(()=>{const k=document.getElementById("ok");k.textContent="Merci ! Votre message est envoyé. Je vous réponds rapidement.";k.style.display="block";f.reset()});return}const sujet=f.sujet.options[f.sujet.selectedIndex].text;
  const corps="Nom : "+d.get("prenom")+" "+d.get("nomfamille")+"\\nTéléphone : "+(d.get("telephone")||"")+"\\nCourriel : "+d.get("courriel")+"\\nProjet : "+sujet+"\\n\\n"+(d.get("message")||"");
  location.href="mailto:info@gillesdulude.com,gilles@gillesdulude.com?subject="+encodeURIComponent("Site web : "+sujet)+"&body="+encodeURIComponent(corps);
  document.getElementById("ok").style.display="block";
});})();
</script>
` + footer(cfg) + end;
}


function pageConfidentialite(cfg) {
  const c = cfg.courtier;
  const courriel = esc(c.courriel), tel = esc(c.telephone);
  return head(cfg, "Politique de confidentialité | Gilles Jr. Dulude", "Comment Gilles Jr. Dulude, courtier immobilier, recueille, utilise et protège vos renseignements personnels.") +
    header(cfg, "confidentialite.html") +
    pageHero("Confidentialité", "Vos renseignements, <em>protégés.</em>", "Comment je recueille, j'utilise et je protège vos renseignements personnels.") + `
<section><div class="wrap prose">
  <p class="note">En vigueur depuis le 6 novembre 2026. Dernière mise à jour : 6 novembre 2026.</p>

  <h2>Qui est responsable</h2>
  <p>Gilles Jr. Dulude, courtier immobilier, est responsable de la protection des renseignements personnels recueillis sur ce site.</p>
  <p>Pour toute question ou demande : <a href="mailto:${courriel}">${courriel}</a>, ${tel}.<br>${esc(c.agence)}, ${esc(c.adresseAgence || "")}</p>

  <h2>Ce que je recueille</h2>
  <p>Seulement ce que vous me donnez vous-même, quand vous remplissez un formulaire, écrivez au clavardage ou réservez un rendez-vous :</p>
  <ul>
    <li>votre prénom et votre nom;</li>
    <li>votre courriel et votre numéro de téléphone;</li>
    <li>votre demande ou votre message (par exemple, la propriété qui vous intéresse ou votre projet de vente ou d'achat);</li>
    <li>le moment de votre rendez-vous, si vous en réservez un.</li>
  </ul>
  <p>Le site ne vous demande jamais de renseignements bancaires ni de numéro d'assurance sociale.</p>

  <h2>Pourquoi je les utilise</h2>
  <ul>
    <li>répondre à votre demande et vous envoyer les documents d'une propriété;</li>
    <li>planifier un appel, une visite ou une rencontre;</li>
    <li>faire un suivi au sujet de votre projet immobilier;</li>
    <li>vous envoyer des textos ou des courriels, si vous l'avez accepté.</li>
  </ul>
  <p>Je ne vends jamais vos renseignements et je ne les utilise pas à d'autres fins sans votre consentement.</p>

  <h2>Qui y a accès</h2>
  <p>Seuls Gilles Jr. Dulude et les membres de son équipe qui en ont besoin pour vous servir y ont accès. Certains outils m'aident à faire fonctionner le site :</p>
  <ul>
    <li><strong>Ava Client</strong> (plateforme LeadConnector) : gestion des contacts, formulaires, clavardage, calendrier et envoi des courriels et textos;</li>
    <li><strong>GitHub Pages</strong> : hébergement du site;</li>
    <li><strong>Google Fonts</strong> : affichage des polices de caractères du site.</li>
  </ul>
  <p>Ces fournisseurs peuvent conserver des renseignements sur des serveurs situés à l'extérieur du Québec, notamment aux États-Unis. Je fais affaire avec eux seulement pour les besoins décrits ici.</p>

  <h2>Témoins (cookies) et données techniques</h2>
  <p>Le site lui-même n'utilise pas d'outil de suivi publicitaire ni de statistiques. Comme tout site web, l'hébergeur et les outils ci-dessus peuvent recevoir des données techniques, comme votre adresse IP et le type de navigateur, pour afficher les pages. Le clavardage et le calendrier peuvent utiliser des témoins pour fonctionner. Vous pouvez les refuser ou les effacer dans les réglages de votre navigateur.</p>

  <h2>Combien de temps je les garde</h2>
  <p>Je garde vos renseignements tant qu'ils sont utiles pour votre projet immobilier ou pour respecter mes obligations professionnelles. Ensuite, ils sont détruits.</p>

  <h2>Vos droits</h2>
  <p>Vous pouvez en tout temps :</p>
  <ul>
    <li>demander à voir les renseignements que je détiens sur vous;</li>
    <li>les faire corriger;</li>
    <li>retirer votre consentement ou demander qu'ils soient supprimés;</li>
    <li>vous désabonner des textos en répondant STOP, ou des courriels avec le lien de désabonnement.</li>
  </ul>
  <p>Écrivez-moi simplement à <a href="mailto:${courriel}">${courriel}</a>. Je vous réponds dans un délai de 30 jours.</p>
  <p>Si vous n'êtes pas satisfait de ma réponse, vous pouvez vous adresser à la Commission d'accès à l'information du Québec.</p>

  <h2>Sécurité</h2>
  <p>Vos renseignements sont conservés dans des outils protégés par mot de passe, accessibles seulement aux personnes autorisées. En cas d'incident de confidentialité qui présente un risque sérieux, vous en serez avisé, comme la loi le prévoit.</p>

  <h2>Changements</h2>
  <p>Cette politique peut être mise à jour. La date de la dernière mise à jour est indiquée en haut de la page.</p>
</div></section>
` + footer(cfg) + end;
}


function llmsTxt(cfg) {
  const c = cfg.courtier, r = cfg.reseaux || {};
  return `# Gilles Jr. Dulude, courtier immobilier

> Courtier immobilier résidentiel et commercial chez Royal LePage Distinction, sur la Rive-Sud de Montréal (Québec). Spécialisé dans la vente et l'achat de maisons familiales et d'immeubles à revenus (duplex, triplex, plex). Ancien entrepreneur général avec 10 ans d'expérience en construction et rénovation.

## Secteurs desservis
${SECTEURS.map((v) => "- " + v).join("\n")}

## Distinctions Royal LePage
${PRIX.map(([n, y]) => `- ${n} (${y})`).join("\n")}

## Avis
- Note de 5,0 sur 5 sur Google (fiche « Équipe Dulude - Immobilier »)

## Coordonnées
- Téléphone : ${c.telephone}
- Courriel : ${c.courriel}
- Agence : ${c.agence}, ${c.adresseAgence || ""}
- Facebook : ${r.facebook || ""}
- Instagram : ${r.instagram || ""}

## Pages
- [Accueil](index.html)
- [À propos](a-propos.html)
- [Vendre](vendre.html)
- [Acheter](acheter.html)
- [Investir dans un plex](investir.html)
- [Marché immobilier de la Rive-Sud](marche.html)
- [Propriétés à vendre](proprietes.html)
- [Contact](contact.html)

## Questions fréquentes
${[...FAQ.vendre(cfg), ...FAQ.acheter(cfg), ...FAQ.investir(cfg)].map(([q, r]) => `### ${q}\n${r}`).join("\n\n")}
`;
}


const fmt$ = (n) => Math.round(n).toLocaleString("fr-CA").replace(/ /g, " ") + " $";
const fleche = (v, inverse = false) => { const up = v > 0, dn = v < 0; const cls = !v ? "eq" : (up !== inverse ? "up" : "dn"); return `<span class="var ${cls}">${up ? "▲" : dn ? "▼" : "●"} ${v > 0 ? "+" : ""}${v} %</span>`; };
const flecheJ = (v) => `<span class="var ${v > 0 ? "dn" : v < 0 ? "up" : "eq"}">${v > 0 ? "▲ +" : v < 0 ? "▼ " : "● "}${v} j</span>`;

function marcheStats(cfg) {
  const m = cfg.marche; if (!m) return "";
  const prix = Object.entries(m.prix).map(([t, [v, d]]) => `<div class="kpi"><span>Prix médian · ${t}</span><b>${fmt$(v)}</b>${fleche(d)}</div>`).join("");
  const delais = Object.entries(m.delais).map(([t, [v, d]]) => `<div><b>${v} jours</b><span>${t}</span>${flecheJ(d)}</div>`).join("");
  return `<div class="kpis">
    ${prix}
    <div class="kpi"><span>Ventes du mois</span><b>${m.ventes[0].toLocaleString("fr-CA")}</b>${fleche(m.ventes[1])}</div>
    <div class="kpi"><span>Propriétés à vendre</span><b>${m.inscriptions[0].toLocaleString("fr-CA")}</b>${fleche(m.inscriptions[1])}</div>
  </div>
  <div class="lecture"><p class="over" style="margin:0 0 6px">Ce que ça veut dire</p><p style="margin:0">${esc(m.lecture)}</p></div>
  <h3 style="margin:40px 0 14px">Délai moyen pour vendre</h3>
  <div class="prix delais">${delais}</div>
  <p class="note" style="margin-top:18px">Variations par rapport au même mois l'an dernier. Source : ${esc(m.source)}. ${esc(m.region)}.</p>`;
}

function pageMarche(cfg) {
  const m = cfg.marche || {};
  return head(cfg, "Marché immobilier Rive-Sud | Gilles Jr. Dulude", `Statistiques du marché immobilier de la ${m.region || "Rive-Sud"} (${m.mois || ""}) et calculateur de rendement pour plex.`) +
    header(cfg, "marche.html") +
    pageHero("Marché", "Le marché <em>en chiffres.</em>", `${m.region || "Rive-Sud de Montréal"}, ${(m.mois || "").toLowerCase()}. Pour savoir quand acheter, vendre ou investir.`) + `
<section><div class="wrap">
  ${marcheStats(cfg)}
</div></section>



<section><div class="wrap cols top-al">
  <div><p class="over">Chaque mois</p><h2>Recevez les chiffres <em>de votre secteur.</em></h2>
  <p class="lead">Les prix, les ventes et ce que ça change pour vous, une fois par mois dans votre boîte courriel. Désabonnement en un clic.</p></div>
  <form class="form" id="stats">
    <div class="row"><label>Prénom<input name="prenom" required autocomplete="given-name"></label><label>Nom<input name="nomfamille" required autocomplete="family-name"></label></div>
    <label>Courriel<input name="courriel" type="email" required autocomplete="email"></label>
    <label>Votre secteur<select name="secteur">${SECTEURS.map((v) => `<option>${v}</option>`).join("")}<option>Autre secteur de la Rive-Sud</option></select></label>
    <label>Vous êtes plutôt<select name="profil"><option>Propriétaire qui pense vendre</option><option>Acheteur</option><option>Investisseur (plex)</option><option>Simplement curieux</option></select></label>
    <label style="display:flex;gap:8px;align-items:flex-start;text-transform:none;letter-spacing:0;font-weight:400;font-size:14px"><input type="checkbox" required style="margin-top:4px"><span> J'accepte de recevoir les statistiques et l'infolettre de Gilles Jr. Dulude par courriel. <a href="confidentialite.html" target="_blank" style="text-decoration:underline">Confidentialité</a></span></label>
    <div><button class="btn" type="submit">M'inscrire</button></div>
    <div class="ok" id="statsok"></div>
  </form>
</div></section>
<script>
(()=>{
const s=document.getElementById("stats");const AVA=${JSON.stringify(cfg.ava?.webhook || "")};
s.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(s));
 const o={prenom:d.prenom,nomfamille:d.nomfamille,nom:d.prenom+" "+d.nomfamille,courriel:d.courriel,secteur:d.secteur,profil:d.profil,tag:"infolettre - site web",source:"site web gillesdulude.com",demande:"infolettre statistiques",consentement:true};
 const k=document.getElementById("statsok");
 if(AVA){fetch(AVA+(AVA.includes("?")?"&":"?")+new URLSearchParams(o),{mode:"no-cors"}).then(()=>{k.textContent="Merci! Vous recevrez les prochaines statistiques de votre secteur par courriel.";k.style.display="block";s.reset()});return}
 location.href="mailto:info@gillesdulude.com,gilles@gillesdulude.com?subject="+encodeURIComponent("Inscription infolettre statistiques")+"&body="+encodeURIComponent(d.prenom+" "+d.nomfamille+" ("+d.courriel+"), secteur : "+d.secteur+", "+d.profil)});
})();
</script>
${band("Est-ce le bon moment pour vous ?", "Chaque situation est différente. Parlons de la vôtre, 15 minutes, sans engagement.", "Réserver un appel", RDV(cfg), rdvAttrs(cfg))}
` + footer(cfg) + end;
}

export function renderSite(cfg, listings, { apercu = "" } = {}) {
  const pages = {
    "index.html": pageAccueil(cfg, listings),
    "a-propos.html": pageAPropos(cfg),
    "vendre.html": pageVendre(cfg),
    "acheter.html": pageAcheter(cfg),
    "investir.html": pageInvestir(cfg),
    "proprietes.html": pageProprietes(cfg, listings),
    "marche.html": pageMarche(cfg),
    "contact.html": pageContact(cfg),
    "confidentialite.html": pageConfidentialite(cfg),
    "llms.txt": llmsTxt(cfg),
  };
  const banner = apercu ? `<div class="apercu">${esc(apercu)}</div>` : "";
  for (const k of Object.keys(pages)) if (k.endsWith(".html")) pages[k] = pages[k].replace(/([A-Za-zÀ-ÿ0-9.»]) ([?!])(?=<|")/g, "$1&nbsp;$2").replace("{{APERCU}}", banner);
  return pages;
}
