/* 2026 Fall Classic Car Show pop-up. Safe to delete this file (and css/carshow.css,
   img/carshow/) after the show; main.js only loads it before the cutoff. */
(function(){
  var END=Date.UTC(2026,10,7,20,0,0); // Sat Nov 7 2026, 1:00 PM Arizona (UTC-7)
  var KEY='sthr-carshow-2026-dismissed', SNOOZE=24*60*60*1000;
  var force=/[?&]carshow=1\b/.test(location.search);
  if(!force && Date.now()>=END) return;
  try{var t=+localStorage.getItem(KEY); if(!force && t && Date.now()-t<SNOOZE) return;}catch(e){}

  var base=(window.STHR_ASSETS||'assets/');
  var fonts=document.createElement('link');fonts.rel='stylesheet';
  fonts.href='https://fonts.googleapis.com/css2?family=Yellowtail&display=swap&text='+encodeURIComponent('Fall Classic');
  var css=document.createElement('link');css.rel='stylesheet';css.href=base+'css/carshow.css';
  document.head.appendChild(fonts);document.head.appendChild(css);

  var MAP='https://www.google.com/maps/search/?api=1&query=18415+E+San+Tan+Blvd+B%2C+Queen+Creek%2C+AZ+85142';
  var img=base+'img/carshow/';
  var wrap=document.createElement('div');wrap.className='cs-backdrop';wrap.hidden=true;
  wrap.innerHTML=
   '<div class="cs-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="cs-title" aria-describedby="cs-desc">'+
    '<button type="button" class="cs-close" aria-label="Close car show announcement">&times;</button>'+
    '<div class="cs-photos">'+
     '<img class="cs-main" src="'+img+'chevy.jpg" width="698" height="465" alt="Maroon classic Chevy">'+
     '<div class="cs-row"><img src="'+img+'nova.jpg" width="698" height="465" alt="Orange classic Chevy" loading="lazy"><img src="'+img+'impala.jpg" width="698" height="459" alt="Red classic with flame paint" loading="lazy"></div>'+
    '</div>'+
    '<div class="cs-body">'+
     '<p class="cs-kicker">San Tan Hot Rods &amp; San Tan Auto Body</p>'+
     '<h2 class="cs-title" id="cs-title"><span class="yr">2026</span><span class="script">Fall Classic</span><span class="cs">Car Show</span></h2>'+
     '<div id="cs-desc">'+
      '<div class="cs-when"><div class="cs-date" aria-hidden="true"><span class="m">NOV</span><span class="d">7</span><span class="w">SATURDAY</span></div>'+
       '<p>Saturday, November 7th<span>9:00 AM – 1:00 PM</span></p></div>'+
      '<a class="cs-addr" href="'+MAP+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><u>18415 E San Tan Blvd B, Queen Creek, AZ 85142</u></a>'+
      '<p class="cs-types">Muscle &bull; Classic &bull; Hot Rod</p>'+
      '<ul class="cs-perks" aria-label="At the show"><li>DJ</li><li>Music</li><li>Food</li><li>Prizes</li></ul>'+
      '<p class="cs-reg"><b>REGISTRATION</b>Limited spots, first come first serve. Register on arrival.</p>'+
     '</div>'+
     '<div class="cs-actions"><a class="btn btn-primary" href="'+MAP+'" target="_blank" rel="noopener">Get Directions</a>'+
      '<a class="btn btn-ghost" href="'+img+'flyer.jpg" target="_blank" rel="noopener">View Flyer</a>'+
      '<button type="button" class="cs-later">Maybe later</button></div>'+
    '</div>'+
   '</div>';

  var modal=wrap.querySelector('.cs-modal'),last=null,hiddenSibs=[];
  function remember(){try{localStorage.setItem(KEY,String(Date.now()))}catch(e){}}
  function focusables(){return [].slice.call(modal.querySelectorAll('a[href],button:not([disabled])'));}
  function onKey(e){
    if(e.key==='Escape'){e.preventDefault();close();return;}
    if(e.key!=='Tab')return;
    var f=focusables(),first=f[0],end=f[f.length-1];
    if(e.shiftKey&&(document.activeElement===first||!modal.contains(document.activeElement))){e.preventDefault();end.focus();}
    else if(!e.shiftKey&&document.activeElement===end){e.preventDefault();first.focus();}
  }
  function open(){
    last=document.activeElement;wrap.hidden=false;
    [].forEach.call(document.body.children,function(el){if(el!==wrap&&el.tagName!=='SCRIPT'&&!el.hasAttribute('aria-hidden')){el.setAttribute('aria-hidden','true');el.inert=true;hiddenSibs.push(el);}});
    document.documentElement.style.overflow='hidden';
    requestAnimationFrame(function(){wrap.classList.add('open');});
    modal.focus({preventScroll:true});
    document.addEventListener('keydown',onKey,true);
  }
  function close(){
    remember();wrap.classList.remove('open');
    document.removeEventListener('keydown',onKey,true);
    hiddenSibs.forEach(function(el){el.removeAttribute('aria-hidden');el.inert=false;});hiddenSibs=[];
    document.documentElement.style.overflow='';
    setTimeout(function(){wrap.hidden=true;},250);
    if(last&&last.focus)last.focus({preventScroll:true});
  }
  wrap.querySelector('.cs-close').addEventListener('click',close);
  wrap.querySelector('.cs-later').addEventListener('click',close);
  wrap.addEventListener('click',function(e){if(e.target===wrap)close();});
  [].forEach.call(modal.querySelectorAll('a'),function(a){a.addEventListener('click',remember);});

  function start(){document.body.appendChild(wrap);
    // wait for the stylesheet so the modal never flashes unstyled
    var go=function(){setTimeout(open,700)};
    if(css.sheet)go();else{css.addEventListener('load',go);css.addEventListener('error',function(){});}
  }
  if(document.readyState==='complete')start();else window.addEventListener('load',start);
})();
