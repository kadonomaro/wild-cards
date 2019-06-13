function preloader() {
    let preloaderBlock = document.querySelector('.preloader');
    let preloaderLeft = preloaderBlock.querySelector('.js-pre-left');
    let preloaderRight = preloaderBlock.querySelector('.js-pre-right');

    preloaderBlock.addEventListener('click', function () {
        preloaderLeft.classList.add('preloader__left--hidden');
        preloaderRight.classList.add('preloader__right--hidden');
    });

}

export default preloader;