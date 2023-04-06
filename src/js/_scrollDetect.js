export function onIntersect(target, options = '') {
  new IntersectionObserver(scrollToggle, options).observe(target);
}

function scrollToggle(entries) { 
  for(const entry of entries) {
    // 特定の要素を通過時に処理する場合
    if(entry.target.id ==  'specified') {
      if(entry.isIntersecting) {
        entry.target.classList.add('is-animated'); 
      }
    } else {
      if(entry.isIntersecting) {
        entry.target.classList.add('is-animated');
      }
    }
  }
}