// import drag from "./drag.js";

document.addEventListener('DOMContentLoaded', function () {

    const card = document.querySelector('.js-card');
    const cardSlots = document.querySelectorAll('.js-card-slot');
    let drag = {

        start: function (cardHoldClass, cardInvisibleClass) {
            this.classList.add('card--hold');
            setTimeout(() => {
                this.classList.add('card--invisible');
            }, 0);
        },
    
        end: function (cardHoldClass, cardInvisibleClass) {
            this.classList.remove('card--hold');
            this.classList.remove('card--invisible');
        },
    
        over: function (evt) {
            evt.preventDefault();
        },
    
        enter: function (evt) {
            evt.preventDefault();
            this.classList.add('card-deck__slot--hovered');
        },
    
        leave: function () {
            this.classList.remove('card-deck__slot--hovered');
        },
    
        drop: function () {
            this.classList.remove('card-deck__slot--hovered');
            this.append(card);
        }
    };


    
    card.addEventListener('dragstart', drag.start);
    card.addEventListener('dragend', drag.end);

    for (const slot of cardSlots) {
        slot.addEventListener('dragover', drag.over);
        slot.addEventListener('dragenter', drag.enter);
        slot.addEventListener('dragleave', drag.leave);
        slot.addEventListener('drop', drag.drop);
    }



});


    


