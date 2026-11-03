(function(){
  // mobile nav
  var t=document.querySelector('.menu-toggle'),n=document.getElementById('site-nav');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});}
  // footer year
  document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
  // highlight today in hours (shop time, America/Phoenix)
  try{var d=new Intl.DateTimeFormat('en-US',{weekday:'long',timeZone:'America/Phoenix'}).format(new Date());
    document.querySelectorAll('.hours tr[data-day="'+d+'"]').forEach(function(r){r.classList.add('today')});}catch(e){}
  // reveal on scroll
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(e){io.observe(e)});}
  else document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});
  // lightbox
  var links=[].slice.call(document.querySelectorAll('.gallery a'));
  if(links.length){
    var lb=document.createElement('div');lb.className='lightbox';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
    lb.innerHTML='<button class="lb-btn lb-close" aria-label="Close">&times;</button><button class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);
    var img=lb.querySelector('img'),cap=lb.querySelector('figcaption'),i=0,last=null;
    function show(k){i=(k+links.length)%links.length;var a=links[i];img.src=a.href;img.alt=a.querySelector('img').alt;cap.textContent=a.querySelector('img').alt+' ('+(i+1)+' / '+links.length+')';}
    function open(k){last=document.activeElement;show(k);lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.lb-close').focus();}
    function close(){lb.classList.remove('open');document.body.style.overflow='';if(last)last.focus();}
    links.forEach(function(a,k){a.addEventListener('click',function(e){e.preventDefault();open(k)})});
    lb.querySelector('.lb-close').onclick=close;lb.querySelector('.lb-prev').onclick=function(){show(i-1)};lb.querySelector('.lb-next').onclick=function(){show(i+1)};
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  }
  // contact form: until a form service is configured, don't pretend to send
  document.querySelectorAll('form[data-form]').forEach(function(f){
    f.addEventListener('submit',function(e){
      var s=f.querySelector('.form-status');
      if(f.action.indexOf('YOUR_FORM_ID')>-1){e.preventDefault();s.innerHTML='Online requests aren&#8217;t connected yet. Please call us at <a href="tel:+14809885066">480-988-5066</a>.';s.classList.add('show');return;}
      if(window.fetch){e.preventDefault();s.textContent='Sending…';s.classList.add('show');
        fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){
          s.textContent=r.ok?'Thanks! We received your request and will be in touch.':'Sorry, something went wrong. Please call 480-988-5066.';if(r.ok)f.reset();
        }).catch(function(){s.textContent='Sorry, something went wrong. Please call 480-988-5066.'});}
    });
  });
  // 2026 Fall Classic car show pop-up: only fetched before the show ends (Sat Nov 7 2026, 1 PM Arizona)
  try{var me=document.currentScript||document.querySelector('script[src$="main.js"]');
    var base=me?me.src.replace(/js\/main\.js(\?.*)?$/,''):'assets/';window.STHR_ASSETS=base;
    if(Date.now()<Date.UTC(2026,10,7,20,0,0)||/[?&]carshow=1\b/.test(location.search)){var cs=document.createElement('script');cs.src=base+'js/carshow.js';cs.async=true;document.head.appendChild(cs);}}catch(e){}
})();
