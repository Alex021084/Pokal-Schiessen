const $ = id => document.getElementById(id);

function makeSheet(verein, mannschaft, telefon, art, start) {
  const n1 = start, n2 = start + 1, n3 = start + 2, teiler = start + 3;
  return `
    <article class="sheet">
      <div class="sheet-header">
        <div class="logo-placeholder">Vereins-<br>logo</div>
        <div>
          <div class="sheet-title">Pokalschießen</div>
          <div class="subtitle">beim Schützenverein Ostereistedt</div>
        </div>
        <div></div>
      </div>

      <div class="info">
        <div>Verein:<br><strong>${escapeHtml(verein || "________________")}</strong></div>
        <div class="center"><strong>${escapeHtml(mannschaft)}</strong></div>
        <div class="right"><strong>${escapeHtml(art)}</strong></div>
      </div>

      <div class="phone">Telefon: &nbsp; ${escapeHtml(telefon || "____________________________")}</div>

      <p style="text-align:center;font-weight:800;text-decoration:underline;">Wertungsschüsse:</p>

      <table>
        <thead>
          <tr>
            <th>Name des Schützen/in</th>
            <th>Schuss 1</th>
            <th>Schuss 2</th>
            <th>Schuss 3</th>
            <th>Gesamt</th>
            <th>Scheiben<br>Nr.</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td></td><td></td><td></td><td><b>0</b></td><td><b>${n1}</b></td></tr>
          <tr><td>2</td><td></td><td></td><td></td><td><b>0</b></td><td><b>${n2}</b></td></tr>
          <tr><td>3</td><td></td><td></td><td></td><td><b>0</b></td><td><b>${n3}</b></td></tr>
        </tbody>
      </table>

      <div class="total"><div class="total-box">Gesamtergebnis: &nbsp; <span style="color:#9a2618">0</span></div></div>

      <div class="footer">
        <div>Startgeld von 8,00 € erhalten<br><br>____________________________</div>
        <div class="right">Teiler:<br><br><b>${teiler}</b></div>
      </div>
    </article>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function createPreview() {
  const verein = $("verein").value.trim();
  const mannschaft = $("mannschaft").value;
  const telefon = $("telefon").value.trim();
  const art = $("schiessart").value;
  const start = Number($("startnummer").value) || 1;
  const anzahl = Math.min(44, Math.max(1, Number($("anzahl").value) || 1));

  let html = "";
  for (let i = 0; i < anzahl; i++) {
    html += makeSheet(verein, mannschaft, telefon, art, start + i * 4);
  }
  $("printArea").innerHTML = html;
}

$("previewBtn").addEventListener("click", createPreview);
$("printBtn").addEventListener("click", () => window.print());
createPreview();
