export let smoothScroll;

let Ease = {
  easeInOut: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

smoothScroll = () => {
  if (document.querySelector('.js-anchor-link')) {
    const duration = 600;
    const pageLinks = document.querySelectorAll('.js-anchor-link');
    const pageLinksLength = pageLinks.length;
    let offsetTop;
    let linktop;
    //const header = document.querySelector('.l-header');

    pageLinks.forEach((pageLink, i) => {
      pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          // adjust margin
          let margin = 0; //header.clientHeight;
          setTimeout(() => {
            let href = pageLink.getAttribute("href"); // gte href value
            let target = href == "#" || href == "" ? "html" : href; // href parameter hash
            let link = document.querySelector(target);
            let rectTop = link.getBoundingClientRect().top; // get element position
            offsetTop = window.pageYOffset; // get current scrolled position
            linktop = rectTop + offsetTop - margin; // distance to link
            let startTime = performance.now(); // define animation loop
            let loop = (nowTime) => {
              
              //get the elapsed time after the animation started
              let time = nowTime - startTime;
              let normalizedTime = time / duration; // duration に経過時間が達していない場合はアニメーションを実行
              if (normalizedTime < 1) {
                window.scrollTo(0, offsetTop + (linktop - offsetTop) * Ease.easeInOut(normalizedTime)); // 経過時間とイージングに応じてスクロール位置を変更
                requestAnimationFrame(loop); // アニメーションを継続
              } else {
                // duration has reach to elapsed time, animation end
                window.scrollTo(0, linktop);
              }
            };
            requestAnimationFrame(loop);
          });
        },
        100
      );
    });
  }
  if ( location.hash ) {
    const tg = jQuery( location.hash );
    const position = Math.floor(tg.offset().top) - 90;

    jQuery("html, body").animate( { scrollTop: position}, 500);
  }
};