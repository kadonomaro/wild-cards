import getData from "./getData.js";

function changeLocalization() {
    let localLang = document.querySelectorAll('.js-lang');
    setBlocksLocalization();
    localLang.forEach(lang => {
        
        if (lang.value === localStorage.getItem('lang')) {
            lang.setAttribute('checked', true);
        }

        lang.addEventListener('change', () => {
            localStorage.setItem('lang', lang.value);
            setBlocksLocalization();
        });
    });
    
    
}


function setBlocksLocalization() {
    let data = getData('js/data.json');
    let localization = localStorage.getItem('lang') || 'en';

    data.then(json => {
        document.querySelector('.js-pre-start').textContent = json[localization].startButton;
        document.querySelector('.preloader__author').childNodes[0].data = json[localization].developed;
        document.querySelector('.js-play').textContent = json[localization].playButton;
        document.querySelector('.js-modal').querySelector('.game-modal__text').textContent = json[localization].playModal;
    });
    
}

export default changeLocalization;