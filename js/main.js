import drag from "./drag.js";
import randomCards from "./randomCards.js";
import modal from "./modal.js";
import audio from "./audio.js";


document.addEventListener('DOMContentLoaded', function () {

    const cards = document.querySelectorAll('.js-card');
    const enemyCards = document.querySelectorAll('.js-enemy-card');

    const cardDeck = document.querySelector('.js-card-deck');
    const cardSlots = cardDeck.querySelectorAll('.js-card-slot');

    const cardDeckTable = document.querySelector('.js-card-deck-table');
    const cardDeckTableSlots = cardDeckTable.querySelectorAll('.js-card-slot');

    const cardShop = document.querySelector('.js-card-shop');

    const playButton = document.querySelector('.js-play');
    const gameMoney = document.querySelector('.js-game-money');

    let enemyCardArr = [];
    let friendCardArr = [];

    gameMoney.textContent = 200;

    playButton.addEventListener('click', function (evt) {
        

        if (drag.cardArray.length === 6) {

            evt.preventDefault();

            hideDOMElement(cardShop, 'card-shop--hidden');

            audio.play(20);

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
            
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
            
        } else {

            modal.openClass = 'game-modal--active';
            modal.init();
        }


    });


    function hoveredCard() {
        drag.cardArray.forEach(card => {
            card.addEventListener('mouseenter', AddHoveredClass);
        });
    }

    function AddHoveredClass() {
        drag.cardArray.forEach(card => {
            card.classList.remove('card--hovered');
        });
        this.classList.add('card--hovered');
    }

    function hideDOMElement(element, hideClass) {
        element.classList.add(hideClass);
        cardShop.addEventListener('transitionend', () => {
            element.style.display = 'none';
        });
    }


    randomCards.generate(cards);
    randomCards.generate(enemyCards);





    for (const card of cards) {
        card.addEventListener('dragstart',function () {
            drag.start(this, 'card--hold', 'card--invisible');
            modal.close();
         
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


    for (const slot of cardDeckTableSlots) {
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
        slot.addEventListener('drop', function () {

            drag.dropNoCost(drag.currentCard, slot, 'card-deck__slot--hovered');

            // cardSlots.forEach(slot => {
            //     if (slot.children.length === 0) {
            //         console.log('zero');
            //     }
            // });

        });
    }

    
});


    


