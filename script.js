const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function showStart(selectId,wrapId,inputId){$(selectId).addEventListener("change",()=>{const active=!!$(selectId).value;$(wrapId).classList.toggle("hidden",!active);if(active)$(inputId).focus()})}
showStart("art1","startWrap1","start1");showStart("art2","startWrap2","start2");
function sheet(v,m,t,a,s,n){return `<article class="sheet"><div class="head"><img class="club-logo" src="pokal_logo.png" alt="Vereinswappen"><div><div class="title">Pokalschießen</div><div class="sub">beim Schützenverein Ostereistedt</div></div><div></div></div><div class="info"><div><div>Verein: ${esc(v||"")}</div><div>Telefon: ${esc(t||"")}</div></div><div class="center">${esc(m)}</div><div class="right">Satz ${n}</div></div><div class="art">${esc(a)}</div><p style="text-align:center;font-weight:600">Wertungsschüsse:</p><table><tr><th>Name des Schützen/in</th><th>Schuss 1</th><th>Schuss 2</th><th>Schuss 3</th><th>Gesamt</th><th>Scheiben<br>Nr.</th></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td>${s}</td></tr><tr><td>2</td><td></td><td></td><td></td><td></td><td>${s+1}</td></tr><tr><td>3</td><td></td><td></td><td></td><td></td><td>${s+2}</td></tr></table><div class="total"><span>Gesamtergebnis: &nbsp; ______</span></div><div class="teiler"><div class="teiler-box"><span>Teilerscheibe Nr. ${s+3}</span><span>Teilergebnis: <i class="write-line"></i></span></div></div><div class="foot">Startgeld von 8,00 € erhalten<br><br>____________________________</div></article>`}
function make(){let v=$("verein").value,m=$("mannschaft").value,t=$("telefon").value,a1=$("art1").value,a2=$("art2").value,s1=Number($("start1").value),s2=Number($("start2").value);if(!a1||!a2||!s1||!s2){alert("Bitte für beide Sätze die Schießart und die erste Scheibennummer auswählen.");return}$("out").innerHTML=sheet(v,m,t,a1,s1,1)+sheet(v,m,t,a2,s2);
$("openPreview").disabled=false;
$("previewModal").classList.remove("hidden");
document.body.classList.add("preview-open");}
$("make").onclick=make;
$("openPreview").onclick=()=>{$("previewModal").classList.remove("hidden");document.body.classList.add("preview-open")};
$("closePreview").onclick=()=>{$("previewModal").classList.add("hidden");document.body.classList.remove("preview-open")};
$("previewModal").addEventListener("click",e=>{if(e.target===$("previewModal")){$("previewModal").classList.add("hidden");document.body.classList.remove("preview-open")}});
$("print").onclick=()=>print();