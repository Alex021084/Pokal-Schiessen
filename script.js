const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

function showStart(selectId, wrapId, inputId) {
  const el = $(selectId);
  const update = () => {
    const active = !!el.value;
    $(wrapId).classList.toggle('hidden', !active);
  };
  el.addEventListener('change', update);
  update();
}

function sheet(data) {
  const {verein, telefon, mannschaft, art1, start1, art2, start2} = data;
  const nums1 = [start1, start1 + 1, start1 + 2];
  const teiler1 = start1 + 3;
  const nums2 = [start2, start2 + 1, start2 + 2];
  const teiler2 = start2 + 3;

  return `
  <article class="sheet">
    <img class="sheet-bg" src="assets/template-clean.png" alt="Druckvorlage">
    <div class="overlay">
      <div class="value verein">${esc(verein)}</div>
      <div class="value telefon">${esc(telefon)}</div>

      <div class="value art1">${esc(mannschaft)} – ${esc(art1)}</div>
      <div class="value art2">${esc(mannschaft)} – ${esc(art2)}</div>

      <div class="value sn1">${nums1[0]}</div>
      <div class="value sn2">${nums1[1]}</div>
      <div class="value sn3">${nums1[2]}</div>
      <div class="value teiler1">${teiler1}</div>

      <div class="value sn4">${nums2[0]}</div>
      <div class="value sn5">${nums2[1]}</div>
      <div class="value sn6">${nums2[2]}</div>
      <div class="value teiler2">${teiler2}</div>
    </div>
  </article>`;
}

function make() {
  const verein = $('verein').value.trim();
  const telefon = $('telefon').value.trim();
  const mannschaft = $('mannschaft').value;
  const art1 = $('art1').value;
  const art2 = $('art2').value;
  const s1 = Number($('start1').value);
  const s2 = Number($('start2').value);

  if (!art1 || !art2 || !Number.isInteger(s1) || s1 < 1 || !Number.isInteger(s2) || s2 < 1) {
    alert('Bitte für beide Sätze die Schießart und die erste Scheibennummer eingeben.');
    return;
  }

  $('out').innerHTML = sheet({verein, telefon, mannschaft, art1, start1:s1, art2, start2:s2});
  const modal = $('previewModal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('preview-open');
}

function closePreview() {
  const modal = $('previewModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('preview-open');
}

document.addEventListener('DOMContentLoaded', () => {
  showStart('art1', 'startWrap1', 'start1');
  showStart('art2', 'startWrap2', 'start2');
  $('make').addEventListener('click', make);
  // Fallback for mobile browsers where delegated/button events can be unreliable.
  $('make').onclick = make;
  $('closePreview').addEventListener('click', closePreview);
  $('previewModal').addEventListener('click', e => { if (e.target === $('previewModal')) closePreview(); });
  $('print').addEventListener('click', () => window.print());
});
