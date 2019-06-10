let modal = {
    
    modalBlock: document.querySelector('.js-modal'),
    modalCloseButton: document.querySelector('.js-modal-close'),
    openClass: '',

    init: function () {
        let _this = this;

        this.modalBlock.style.display = 'block';
        setTimeout(() => {
            this.modalBlock.classList.add(this.openClass);
        }, 10);
        
        this.modalCloseButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.modalBlock.classList.remove(_this.openClass);
            setTimeout(() => {
                _this.modalBlock.style.display = 'none';
            }, 300);
        });
    },

    close: function () {
        if (this.modalBlock.classList.contains(this.openClass)) {
            this.modalBlock.classList.remove(this.openClass);
            setTimeout(() => {
                this.modalBlock.style.display = 'none';
            }, 300);
        }
    }
};

export default modal;