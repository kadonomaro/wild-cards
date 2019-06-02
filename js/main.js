import randomCards from "./randomCards.js";

// import drag from "./drag.js";

document.addEventListener('DOMContentLoaded', function () {

    const cards = document.querySelectorAll('.js-card');
    const cardSlots = document.querySelectorAll('.js-card-slot');

    let drag = {

        currentCard: null,

        start: function (card, cardHoldClass, cardInvisibleClass) {
            card.classList.add(cardHoldClass);

            setTimeout(() => {
                if (card.classList.contains(cardHoldClass)) {
                    card.classList.add(cardInvisibleClass);
                }
            }, 10);
        },
    
        end: function (card, cardHoldClass, cardInvisibleClass) {
            card.classList.remove(cardHoldClass);
            card.classList.remove(cardInvisibleClass);
        },
    
        over: function (evt) {
            evt.preventDefault();
        },
    
        enter: function (cardSlot, cardSlotHoveredClass) {
            cardSlot.classList.add(cardSlotHoveredClass);
        },
    
        leave: function (cardSlot, cardSlotHoveredClass) {
            cardSlot.classList.remove(cardSlotHoveredClass);
        },
    
        drop: function (card, cardSlot, cardSlotHoveredClass) {
            cardSlot.classList.remove(cardSlotHoveredClass);
            cardSlot.append(card);
        }
    };


    for (const card of cards) {
        card.addEventListener('dragstart',function () {
            drag.start(this, 'card--hold', 'card--invisible');
            drag.currentCard = this;
            
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
    

    randomCards.generate(cards);

});


    


