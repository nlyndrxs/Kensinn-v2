(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('gnav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('is-open');btn.setAttribute('aria-expanded',o?'true':'false');btn.setAttribute('aria-label',o?'メニューを閉じる':'メニューを開く');});}
  var box=document.getElementById('lightbox');if(!box)return;
  var img=box.querySelector('.big-img'),ph=box.querySelector('.big'),cap=box.querySelector('p');
  var all=[].slice.call(document.querySelectorAll('[data-zoom]')),cur=-1;
  function show(i){
    if(i<0||i>=all.length)return; cur=i; var b=all[i];
    var full=b.getAttribute('data-full');
    if(full){img.src=full;img.alt=b.getAttribute('data-zoom');}else{img.removeAttribute('src');ph.textContent=b.getAttribute('data-zoom')+'（拡大画像）';}
    cap.textContent=b.getAttribute('data-zoom');
    box.querySelector('[data-prev]').disabled=(i===0); box.querySelector('[data-next]').disabled=(i===all.length-1);
    if(!box.open){if(box.showModal)box.showModal();else box.setAttribute('open','');}
    var li=b.closest('li[id]');
    // 拡大中はURLに #work-番号 を付ける（共有用）
    if(history.replaceState)history.replaceState(null,'',li?'#'+li.id:location.pathname+location.search);
  }
  all.forEach(function(b,i){b.addEventListener('click',function(){show(i);});});
  box.querySelector('[data-close]').addEventListener('click',function(){box.close();});
  box.querySelector('[data-prev]').addEventListener('click',function(){show(cur-1);});
  box.querySelector('[data-next]').addEventListener('click',function(){show(cur+1);});
  box.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
  box.addEventListener('click',function(e){if(e.target===box)box.close();});
  box.addEventListener('close',function(){if(/^#work-/.test(location.hash)&&history.replaceState)history.replaceState(null,'',location.pathname+location.search);});
  // URLに #work-番号 があれば、その作品を拡大表示した状態で開く
  function fromHash(){var h=location.hash;if(!/^#work-[\w-]+$/.test(h))return;var t=document.querySelector(h+' button');if(t){t.scrollIntoView({block:'center'});show(all.indexOf(t));}}
  window.addEventListener('hashchange',fromHash);fromHash();
})();
