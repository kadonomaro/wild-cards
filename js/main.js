import drag from "./drag.js";
import randomCards from "./randomCards.js";

document.addEventListener('DOMContentLoaded', function () {

    let playButton = document.querySelector('.play');

    playButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        for (const slot of cardSlots) {
            slot.classList.add('card-deck__slot--game-active');
        }
        for (const card of cards) {
            card.classList.add('card--hovered');
        }
    });

    const cards = document.querySelectorAll('.js-card');
    const cardSlots = document.querySelectorAll('.js-card-slot');


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
        slot.addEventListener('click', function () {
            console.dir(this); 
        });

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


    


