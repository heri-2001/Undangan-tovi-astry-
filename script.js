const $=id=>document.getElementById(id);
const nama=new URLSearchParams(location.search).get('to');
if(nama)$('guest').textContent=nama;
const bgm=$('bgm'),mus=$('music');
$('openBtn').onclick=()=>{
 $('cover').classList.add('out');document.body.classList.remove('locked');
 $('main').hidden=false;
 setTimeout(()=>{$('cover').style.display='none';scrollTo(0,0)},900);
 fetch('musik.mp3',{method:'HEAD'}).then(r=>{if(r.ok){mus.hidden=false;bgm.play().catch(()=>{})}}).catch(()=>{});
 io();
};
mus.onclick=()=>{bgm.paused?bgm.play():bgm.pause();mus.classList.toggle('off',bgm.paused)};
function io(){const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('show')),{threshold:.15});
 document.querySelectorAll('.fade').forEach(el=>o.observe(el))}
function tick(){let t=new Date(CONFIG.tanggalAcara)-new Date();if(t<0)t=0;
 $('d').textContent=Math.floor(t/864e5);$('h').textContent=Math.floor(t/36e5%24);
 $('m').textContent=Math.floor(t/6e4%60);$('s').textContent=Math.floor(t/1e3%60)}
tick();setInterval(tick,1000);
function link(id,url){const a=$(id);url?a.href=url:a.style.display='none'}
link('mapChurch',CONFIG.mapGereja);link('mapRecep',CONFIG.mapResepsi);
if(CONFIG.nomorWA){$('rsvp').href='https://wa.me/'+CONFIG.nomorWA+'?text='+encodeURIComponent(CONFIG.pesanRSVP.replace('{nama}',nama||'...'))}else $('rsvp').style.display='none';
if(CONFIG.galeri.length)CONFIG.galeri.forEach(f=>{const i=new Image();i.src=f;i.loading='lazy';$('gallery').appendChild(i)});else $('galSec').style.display='none';
$('share').onclick=()=>{const u=location.origin+location.pathname;
 if(navigator.share)navigator.share({title:document.title,url:u});
 else location.href='https://wa.me/?text='+encodeURIComponent('Undangan Pernikahan Tovi & Astri: '+u)};
