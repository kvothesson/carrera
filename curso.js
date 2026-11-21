// La carrera que no existía: lo que comparten todas las materias.
// Cada página pone en <body> data-materia, y si hay una materia siguiente, data-sigue y data-sigue-href.
const $ = id => document.getElementById(id);

// Una pantalla por parte. Flechas del teclado o los botones de abajo.
function iniciarCurso(){
  const partes = [...document.querySelectorAll(".paso")], d = document.body.dataset;
  let actual = 0;
  $("nav").innerHTML = partes.map((p,i) => `<button type="button" data-i="${i}" aria-label="${/^\d/.test(p.dataset.n) ? "Unidad " + p.dataset.n + ": " : ""}${p.dataset.t}" title="${p.dataset.t}">${p.dataset.n}</button>`).join("");
  function ir(i, foco){
    if (i >= partes.length && d.sigueHref) { location.href = d.sigueHref; return; }
    actual = Math.max(0, Math.min(partes.length - 1, i));
    partes.forEach((p,k) => p.hidden = k !== actual);
    document.querySelectorAll("#nav button").forEach((b,k) => k === actual ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current"));
    $("ant").disabled = actual === 0;
    const fin = actual === partes.length - 1;
    $("sig").disabled = fin && !d.sigueHref;
    $("sig").innerHTML = fin ? (d.sigue ? `Sigue: ${d.sigue}${d.sigueHref ? '<span aria-hidden="true"> →</span>' : " (pronto)"}` : "Fin")
      : `Siguiente: ${partes[actual + 1].dataset.t}<span aria-hidden="true"> →</span>`;
    document.title = `${partes[actual].dataset.t} · ${d.materia} · La carrera que no existía`;
    if (foco) partes[actual].focus({preventScroll:true});
    try { history.replaceState(null, "", actual ? "#" + actual : location.pathname); } catch(e) {}
    scrollTo(0, 0);
  }
  $("nav").addEventListener("click", ev => { const b = ev.target.closest("[data-i]"); if (b) ir(+b.dataset.i, true); });
  $("ant").addEventListener("click", () => ir(actual - 1, true));
  $("sig").addEventListener("click", () => ir(actual + 1, true));
  addEventListener("keydown", ev => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName)) return;
    if (ev.key === "ArrowRight" && actual < partes.length - 1) ir(actual + 1, true);
    if (ev.key === "ArrowLeft") ir(actual - 1, true);
  });
  if ($("copiar")) $("copiar").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("prompt").textContent); $("copiar").textContent = "Copiado"; }
    catch(e) { $("copiar").textContent = "Seleccioná el texto y copialo"; }
  });
  ir(+location.hash.slice(1) || 0);
}

// Botones donde vale una sola opción a la vez. lista: [[clave, texto], ...]. Arranca en la primera, o en "inicial".
function opciones(id, lista, alElegir, inicial){
  const el = $(id);
  el.innerHTML = lista.map(o => `<button class="tog" type="button" data-o="${o[0]}">${o[1]}</button>`).join("");
  const elegir = k => { el.querySelectorAll("[data-o]").forEach(b => b.setAttribute("aria-pressed", b.dataset.o === String(k))); alElegir(String(k)); };
  el.addEventListener("click", ev => { const b = ev.target.closest("[data-o]"); if (b) elegir(b.dataset.o); });
  elegir(inicial !== undefined ? inicial : lista[0][0]);
}
