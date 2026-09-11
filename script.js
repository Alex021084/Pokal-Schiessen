const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function showStart(selectId,wrapId,inputId){
  const el=$(selectId);
  if(!el) return;
  el.addEventListener("change",()=>{
    const active=!!el.value;
    $(wrapId).classList.toggle("hidden",!active);
    if(active) $(inputId).focus();
  });
}
function sheet(v,m,t,a,s,n){return `<article class="sheet"><div class="head"><img class="club-logo" src="pokal_logo.png" alt="Vereinswappen"><div><div class="title">Pokalschießen</div><div class="sub">beim Schützenverein Ostereistedt</div></div><div></div></div><div class="info"><div><div>Verein: ${esc(v||"")}</div><div>Telefon: ${esc(t||"")}</div></div><div class="center">${esc(m)}</div><div class="right">Satz ${n}</div></div><div class="art">${esc(a)}</div><p style="text-align:center;font-weight:600">Wertungsschüsse:</p><table><tr><th>Name des Schützen/in</th><th>Schuss 1</th><th>Schuss 2</th><th>Schuss 3</th><th>Gesamt</th><th>Scheiben<br>Nr.</th></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td>${s}</td></tr><tr><td>2</td><td></td><td></td><td></td><td></td><td>${s+1}</td></tr><tr><td>3</td><td></td><td></td><td></td><td></td><td>${s+2}</td></tr></table><div class="total"><span>Gesamtergebnis: &nbsp; ______</span></div><div class="teiler"><div class="teiler-box"><span>Teilerscheibe Nr. ${s+3}</span><span>Teilergebnis: <i class="write-line"></i></span></div></div><div class="foot">Startgeld von 8,00 € erhalten<br><br>____________________________</div></article>`}
function make(){
  const v=$("verein").value.trim();
  const m=$("mannschaft").value;
  const t=$("telefon").value.trim();
  const a1=$("art1").value;
  const a2=$("art2").value;
  const s1=Number($("start1").value);
  const s2=Number($("start2").value);

  if(!a1 || !a2 || !s1 || !s2){
    alert("Bitte für beide Sätze die Schießart und die erste Scheibennummer auswählen.");
    return;
  }

  $("out").innerHTML =
    sheet(v,m,t,a1,s1,1) +
    sheet(v,m,t,a2,s2,2);

  $("previewModal").classList.remove("hidden");
  document.body.classList.add("preview-open");
}

function closePreview(){
  $("previewModal").classList.add("hidden");
  document.body.classList.remove("preview-open");
}

document.addEventListener("DOMContentLoaded",()=>{
  showStart("art1","startWrap1","start1");
  showStart("art2","startWrap2","start2");

  $("make").addEventListener("click",make);
  $("closePreview").addEventListener("click",closePreview);
  $("previewModal").addEventListener("click",e=>{
    if(e.target === $("previewModal")) closePreview();
  });
  $("print").addEventListener("click",()=>window.print());
});
