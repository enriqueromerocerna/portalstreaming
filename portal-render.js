/* PORTAL STREAMING – renderizador compartido (web pública + panel admin) */
window.FB_CONFIG = { // <- PEGA AQUÍ la config de tu proyecto Firebase (la misma del gestor sirve)
  apiKey: "TU_API_KEY", authDomain: "TU_PROYECTO.firebaseapp.com", projectId: "TU_PROYECTO", appId: "TU_APP_ID"
};
const P = (n, pl) => ({ name: n, logo: "", plans: pl.map(x => ({ label: x[0], price: x[1] })) });
const M = ["1 mes", "3 meses", "6 meses"];
window.PORTAL_DEFAULT = {
  brand: "PORTAL STREAMING", whatsapp: "51904609346", color: "#e11d2e",
  heroTitle: "Tu acceso directo al entretenimiento digital",
  heroSub: "Netflix, Disney+, Max, Prime Video, Crunchyroll y más",
  heroImg: "", logo: "", footer: "© 2026 Portal Streaming. Todos los derechos reservados.",
  platforms: [
    P("Netflix", [[M[0], 22], [M[1], 50], [M[2], 85]]), P("Disney+", [[M[0], 20], [M[1], 45], [M[2], 75]]),
    P("Max", [[M[0], 12], [M[1], 32], [M[2], 62]]), P("Prime Video", [[M[0], 15], [M[1], 38], [M[2], 78]]),
    P("YouTube Premium", [["1 mes", 12], ["6 meses", 50], ["12 meses", 80]]), P("Spotify", [[M[0], 13], [M[1], 35], [M[2], 65]]),
    P("DGO", [[M[0], 35], [M[1], 90], [M[2], 150]])
  ],
  combos: [
    { name: "Combo Entretenimiento", desc: "Netflix + Disney+ + Max", price: "Consultar precio" },
    { name: "Combo Premium", desc: "Netflix + Disney+ + Max + Prime Video + Spotify", price: "Consultar precio" }
  ],
  pagos: [
    { name: "Yape", number: "+51 906 591 534", holder: "Enrique R.", img: "" },
    { name: "Plin", number: "+51 906 591 534", holder: "Enrique R.", img: "" }
  ]
};
window.PortalRender = {
  parts(c) {
    const e = s => String(s ?? "").replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
    const num = String(c.whatsapp || "").replace(/\D/g, "");
    const wa = t => `https://wa.me/${num}${t ? "?text=" + encodeURIComponent(t) : ""}`;
    const css = `:root{--a:${e(c.color)}}*{box-sizing:border-box}body{margin:0;font-family:system-ui,Segoe UI,sans-serif;background:#0b0b0d;color:#fff;line-height:1.4}
img{max-width:100%}a{color:inherit;text-decoration:none}.w{max-width:1100px;margin:auto;padding:0 16px}
header{position:sticky;top:0;z-index:5;background:#0b0b0dee;backdrop-filter:blur(8px);border-bottom:1px solid #222}
header .w{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:10px;padding-bottom:10px}
.lg{display:flex;align-items:center;gap:8px;font-weight:800;letter-spacing:1px}.lg img{height:34px;border-radius:6px}
.btn{display:inline-block;background:var(--a);color:#fff;padding:10px 18px;border-radius:999px;font-weight:700;font-size:15px}
.hero{padding:70px 0;text-align:center;background:#150608 center/cover}.hero h1{font-size:clamp(26px,6vw,48px);margin:0 0 12px}
.hero p{color:#ddd;margin:0 0 22px}h2{text-align:center;font-size:clamp(22px,4vw,32px);margin:44px 0 20px}
.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}
.c{background:#16161a;border:1px solid #2a2a30;border-radius:16px;padding:16px}.c h3{margin:0 0 4px}.c img.l{height:56px;object-fit:contain;display:block;margin-bottom:8px;border-radius:8px}
.pl{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid #2a2a30;padding:9px 0}.pl b{color:var(--a)}
.pl a{background:var(--a);padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700}.pay img{width:100%;max-height:160px;object-fit:contain;border-radius:10px;margin-bottom:8px}
footer{margin-top:50px;padding:24px 0;text-align:center;color:#888;border-top:1px solid #222;font-size:13px}
.fab{position:fixed;right:14px;bottom:14px;background:#25d366;color:#fff;padding:13px 18px;border-radius:999px;font-weight:700;z-index:9}`;
    const body = `<header><div class=w><a class=lg href=#>${c.logo ? `<img src="${c.logo}">` : ""}${e(c.brand)}</a><a class=btn href="${wa()}">Escríbenos</a></div></header>
<section class=hero style="${c.heroImg ? `background-image:linear-gradient(#000a,#000c),url(${c.heroImg})` : ""}"><div class=w><h1>${e(c.heroTitle)}</h1><p>${e(c.heroSub)}</p><a class=btn href="${wa("Hola, quiero información")}">Comprar ahora</a></div></section>
<div class=w><h2>Plataformas</h2><div class=g>${c.platforms.map(p => `<div class=c>${p.logo ? `<img class=l src="${p.logo}">` : ""}<h3>${e(p.name)}</h3>${p.plans.map(q => `<div class=pl><span>${e(q.label)}</span><b>S/${e(q.price)}</b><a href="${wa(`Hola, quiero el plan ${p.name} ${q.label} S/${q.price}`)}">Comprar</a></div>`).join("")}</div>`).join("")}</div>
<h2>Combos</h2><div class=g>${c.combos.map(x => `<div class=c><h3>${e(x.name)}</h3><p>${e(x.desc)}</p><a class=btn href="${wa("Hola, quiero el " + x.name)}">${e(x.price)}</a></div>`).join("")}</div>
<h2>Métodos de pago</h2><div class=g>${c.pagos.map(x => `<div class="c pay">${x.img ? `<img src="${x.img}">` : ""}<h3>${e(x.name)}</h3><div>${e(x.number)}</div><small>${e(x.holder)}</small></div>`).join("")}</div></div>
<footer>${e(c.footer)}</footer><a class=fab href="${wa()}">WhatsApp</a>`;
    return [css, body];
  },
  doc(c) { const [s, b] = this.parts(c); return `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><style>${s}</style>${b}`; },
  async mount() { // úsalo en la web pública
    let c = window.PORTAL_DEFAULT;
    try {
      firebase.initializeApp(FB_CONFIG);
      const d = await firebase.firestore().doc("portal/config").get();
      if (d.exists) c = { ...c, ...d.data() };
    } catch (x) { console.warn(x); }
    const [s, b] = this.parts(c);
    document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
    document.title = c.brand; document.getElementById("portal-root").innerHTML = b;
  }
};
