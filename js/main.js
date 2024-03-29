import drag from "./drag.js";
import randomCards from "./randomCards.js";
import modal from "./modal.js";
import audio from "./audio.js";
import battleAction from "./battleAction.js";
import preloader from "./preloader.js";


document.addEventListener('DOMContentLoaded', function () {

    preloader();
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
    enemyCards.forEach(card => {
        enemyCardArr.push(card);
    });
    let friendCardArr = [];

    gameMoney.textContent = 200;

    randomCards.generate(cards);
    randomCards.generate(enemyCards);

    playButton.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (drag.cardArray.length === 6) {
            audio.play(audio.gameSound, 100);

            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);

            hideDOMElement(cardShop, 'card-shop--hidden');
            hoveredCard();

            for (const slot of cardSlots) {
                slot.classList.add('card-deck__slot--game-active');
            }
            for (const card of enemyCards) {
                card.classList.add('enemy-deck__card--active');
                card.style.transitionDelay = card.dataset.delay;
            }

            cardDeckTable.classList.add('card-deck--table-active');
            cardDeck.classList.add('card-deck--active');


            enemyCards.forEach((card, index) => {
                //Adding str and def to cards if the deck has a mage
                if (card.classList.contains('card--mage')) {

                    enemyCards.forEach(card => {
                        let cardStr = +card.querySelector('.js-card-str').textContent;
                        let cardDef = +card.querySelector('.js-card-def').textContent;
                        cardStr += 3;
                        cardDef += 3;
                        card.querySelector('.js-card-str').textContent = cardStr;
                        card.querySelector('.js-card-def').textContent = cardDef;
                    });

                }
                card.dataset.str = card.querySelector('.js-card-str').textContent;
                card.dataset.def = card.querySelector('.js-card-def').textContent;
                card.dataset.id = index;
            });

            
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

            drag.currentCard.removeEventListener('mouseenter', AddHoveredClass);
            drag.currentCard.classList.remove('card--hovered');
            drag.dropNoCost(drag.currentCard, slot, 'card-deck__slot--hovered');

            if (cardDeck.querySelectorAll('.js-card').length === 0) {
                

                enemyCardArr.forEach(card => {
                    card.style.transitionDelay = '0s';
                });
                
                cardDeck.classList.remove('card-deck--active');

                let cards = cardDeckTable.querySelectorAll('.js-card');

                cards.forEach((card, index) => {
                    
                    //Adding str and def to cards if the deck has a mage
                    if (card.classList.contains('card--mage')) {

                        cards.forEach(card => {
                            let cardStr = +card.querySelector('.js-card-str').textContent;
                            let cardDef = +card.querySelector('.js-card-def').textContent;
                            cardStr += 3;
                            cardDef += 3;
                            card.querySelector('.js-card-str').textContent = cardStr;
                            card.querySelector('.js-card-def').textContent = cardDef;
                        });
                    }


                    friendCardArr.push(card);

                    friendCardArr.forEach((card, index) => {
                        card.dataset.str = card.querySelector('.js-card-str').textContent;
                        card.dataset.def = card.querySelector('.js-card-def').textContent;
                        card.dataset.id = index;
                    });

                    card.removeEventListener('mouseenter', AddHoveredClass);
                    card.classList.add('card--shadow');
                    if (card.classList.contains('card--hovered')) {
                        card.classList.remove('card--hovered');
                    }
                    if (card.classList.contains('card--golden')) {
                        card.classList.remove('card--shadow');
                        card.classList.add('card--golden-shadow');
                    }
                    if (card.classList.contains('card--mage')) {
                        card.classList.remove('card--shadow');
                        card.classList.add('card--mage-shadow');
                    }
                });

                cardDeckTableSlots.forEach(slot => {
                    slot.classList.add('card-deck__slot--no-bordered');
                });

                battleAction(friendCardArr, enemyCardArr);
                
            }
            
        });
    }
});


    


