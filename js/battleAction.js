function battleAction(friendCards, enemyCards) {
    
    friendCards.forEach(card => {
        card.addEventListener('click', () => {
            let queue = Math.random().toFixed(2);

            let cardNum = card.dataset.id;

            console.log(queue);
            console.log(card);
            console.log(enemyCards[cardNum]);
            
            // if (+card.dataset.str > +enemyCards[cardNum].dataset.def) {
            //     enemyCards[cardNum].classList.add('defeated');
            // }

            switch (true) {
                case (queue < 0.5):
                    enemyCards[cardNum].classList.add('enemy-queue');
                    break;
                case (queue >= 0.5):
                    card.classList.add('friend-queue');
            }

        });
    });


}

export default battleAction;