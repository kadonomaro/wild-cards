function changeLocalization() {
    let localLang = document.querySelectorAll('.js-lang');
    localLang.forEach(lang => {
        
        if (lang.value === localStorage.getItem('lang')) {
            lang.setAttribute('checked', true);
        }

        lang.addEventListener('change', () => {
            localStorage.setItem('lang', lang.value);
        });
    });
}

export default changeLocalization;