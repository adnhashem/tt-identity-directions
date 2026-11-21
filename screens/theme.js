/* Picks the design (line | depth | mark) from ?d= or the last choice, before first paint. */
(function(){
  var ok={line:1,depth:1,mark:1},q=new URLSearchParams(location.search).get('d'),t;
  try{ if(ok[q]) sessionStorage.setItem('tt-design',q); t=sessionStorage.getItem('tt-design'); }catch(e){ t=q; }
  if(!ok[t]) t='line';
  document.documentElement.setAttribute('data-design',t);
  var fonts={line:'Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700',depth:'Onest:wght@400;500;600;700;800',mark:'Albert+Sans:wght@400;500;600;700;800'};
  document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family='+fonts[t]+'&display=swap">');
  if(t!=='line') document.write('<link rel="stylesheet" href="themes/'+t+'.css">');
  window.TT_DESIGN=t;
})();
