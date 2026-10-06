const $ = (id) => document.getElementById(id);

// Cambia entre versión visual y versión ATS
function setMode(ats) {
  document.body.classList.toggle('ats', ats);
  $('btnAts').classList.toggle('on', ats);
  $('btnVisual').classList.toggle('on', !ats);
  try { localStorage.setItem('cvMode', ats ? 'ats' : 'visual'); } catch (e) {}
}

$('btnVisual').addEventListener('click', () => setMode(false));
$('btnAts').addEventListener('click', () => setMode(true));

// Descargar PDF de una versión concreta (visual o ATS).
// En el diálogo de impresión elige "Guardar como PDF".
const originalTitle = document.title;
let previousAts = false;

function downloadPdf(ats) {
  previousAts = document.body.classList.contains('ats');
  document.body.classList.toggle('ats', ats);
  // El navegador usa el título como nombre del archivo PDF
  document.title = ats ? 'CV_Angie_Daniela_Lopez_ATS' : 'CV_Angie_Daniela_Lopez_Visual';
  window.print();
}

// Al cerrar el diálogo, se restaura la vista y el título anteriores
window.addEventListener('afterprint', () => {
  document.body.classList.toggle('ats', previousAts);
  document.title = originalTitle;
});

$('btnPdfVisual').addEventListener('click', () => downloadPdf(false));
$('btnPdfAts').addEventListener('click', () => downloadPdf(true));

// Recordar la última versión elegida
try { if (localStorage.getItem('cvMode') === 'ats') setMode(true); } catch (e) {}

// Mapa de calor de contribuciones (datos de ejemplo)
(function buildHeatmap() {
  const heat = $('heat');
  let seed = 11;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 26 * 7; i++) {
    const cell = document.createElement('i');
    const r = rand();
    if (r > 0.35) cell.className = 'l' + (r > 0.9 ? 3 : r > 0.65 ? 2 : 1);
    heat.appendChild(cell);
  }
})();
