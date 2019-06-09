let modal = {
    modalBlock: document.querySelector('.js-modal'),
    modalCloseButton: document.querySelector('.js-modal-close'),
    openClass: '',

    init: function () {
        let _this = this;
        this.modalBlock.classList.add(this.openClass);
        this.modalCloseButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.modalBlock.classList.remove(_this.openClass);
        });

    }
    
};

export default modal;