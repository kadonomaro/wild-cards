import drag from "./drag.js";
import randomCards from "./randomCards.js";



document.addEventListener('DOMContentLoaded', function () {

    const cards = document.querySelectorAll('.js-card');
    const cardSlots = document.querySelectorAll('.js-card-slot');
    const cardDeck = document.querySelector('.js-card-deck');
    const cardTable = document.querySelector('.js-card-table');
    const playButton = document.querySelector('.play');

    playButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        for (const slot of cardSlots) {
            slot.classList.add('card-deck__slot--game-active');
        }

        cardDeck.classList.add('card-deck--active');
        hoveredCard();
    });

    


    function hoveredCard() {
        drag.cardArray.forEach(card => {
            card.addEventListener('mouseenter', function () {
                drag.cardArray.forEach(card => {
                    card.classList.remove('card--hovered');
                });
                this.classList.add('card--hovered');
            });
        });
    }



    randomCards.generate(cards);


    for (const card of cards) {
        card.addEventListener('dragstart',function () {
            drag.start(this, 'card--hold', 'card--invisible');
         
        });

        card.addEventListener('dragend', function () {
            drag.end(this, 'card--hold', 'card--invisible');
        });

    }

    
    for (const slot of cardSlots) {
        slot.addEventListener('dragover', function(evt){
            drag.over(evt);
        });
        slot.addEventListener('dragenter', function (evt) {
            evt.preventDefault();
            drag.enter(slot, 'card-deck__slot--hovered');
        });
        slot.addEventListener('dragleave', function(){
            drag.leave(slot, 'card-deck__slot--hovered');
        });
        slot.addEventListener('drop', function(){
            drag.drop(drag.currentCard, slot, 'card-deck__slot--hovered');
        });

    }
    

});


    


