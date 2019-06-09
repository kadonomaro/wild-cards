import drag from "./drag.js";
import randomCards from "./randomCards.js";


document.addEventListener('DOMContentLoaded', function () {

    const cards = document.querySelectorAll('.js-card');
    const enemyCards = document.querySelectorAll('.js-enemy-card');
    const cardDeck = document.querySelector('.js-card-deck');
    const cardSlots = cardDeck.querySelectorAll('.js-card-slot');
    const cardTable = document.querySelector('.js-card-table');
    const cardDeckTable = document.querySelector('.js-card-deck-table');
    const playButton = document.querySelector('.play');
    const gameMoney = document.querySelector('.js-game-money');
    gameMoney.textContent = 200;

    playButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        for (const slot of cardSlots) {
            slot.classList.add('card-deck__slot--game-active');
        }
        for (const card of enemyCards) {
            card.classList.add('enemy-deck__card--active');
            card.style.transitionDelay = card.dataset.delay;
        }
        cardDeckTable.classList.add('card-deck--table-active');
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
    randomCards.generate(enemyCards);


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
            drag.drop(drag.currentCard, slot, 'card-deck__slot--hovered', gameMoney);
            drag.currentCard.classList.add('card-deck__card');
        });

    }

    

});


    


