function changeLocalization() {
    let localLang = document.querySelectorAll('.js-lang');
    localLang.forEach(lang => {
        lang.addEventListener('change', () => {
            localStorage.setItem('lang', lang.value);
        });
    });
}

export default changeLocalization;