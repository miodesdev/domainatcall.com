(function(){
var d=document.documentElement;
var ANCH=['webtool'];
function pick(){var l=d.getAttribute('data-lang');return(l==='de'||l==='en'||l==='ru')?l:'en';} /* Erkennung: Inline-Skript im <head> */
function set(l){d.setAttribute('data-lang',l);d.setAttribute('lang',l);
 var a=document.querySelectorAll('a[data-i]');
 for(var i=0;i<a.length;i++){var h=a[i].getAttribute('data-i'),hash='';var k=h.indexOf('#');
  if(k>=0){hash=h.slice(k+1);h=h.slice(0,k);}
  var u=h+'?lang='+l;
  if(hash)u+='#'+(ANCH.indexOf(hash)>=0?hash+'-'+l:hash);
  a[i].setAttribute('href',u);}
 var t=document.body.getAttribute('data-title-'+l);if(t)document.title=t;}
var l0=pick();set(l0);
var h0=location.hash.slice(1);
if(ANCH.indexOf(h0)>=0)h0=h0+'-'+l0;
if(h0){var el=document.getElementById(h0);if(el)setTimeout(function(){el.scrollIntoView();},0);}
var b=document.querySelectorAll('.lang a');
for(var i=0;i<b.length;i++){b[i].addEventListener('click',function(e){e.preventDefault();var l=this.getAttribute('data-l');set(l);
 try{history.replaceState(null,'',location.pathname+'?lang='+l);}catch(x){}});}
})();
(function(){
var h=document.querySelector('header'),b=document.querySelector('.burger');if(!h||!b)return;
function set(o){h.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false');}
b.addEventListener('click',function(){set(!h.classList.contains('open'));});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
var l=h.querySelectorAll('.menu a');for(var i=0;i<l.length;i++)l[i].addEventListener('click',function(){set(false);});
})();
