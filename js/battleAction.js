function battleAction(friendCards, enemyCards) {
    
    friendCards.forEach(card => {
        card.addEventListener('click', () => {
            
            card.classList.remove('card--shadow');
            if (card.classList.contains('card--golden-shadow')) {
                card.classList.remove('card--golden-shadow');
            }

            let queue = Math.random().toFixed(2);
            let cardStr = card.querySelector('.js-card-str');
            let cardDef = card.querySelector('.js-card-def');
            let cardNum = card.dataset.id;
            
            let enemyCard = enemyCards[cardNum];
            let enemyCardStr = enemyCard.querySelector('.js-card-def');
            let enemyCardDef = enemyCard.querySelector('.js-card-def');


            switch (true) {
                case (queue < 0.5):
                    enemyCard.classList.add('enemy-queue');

                    cardDef.textContent =
                        card.dataset.def - enemyCard.dataset.str < 0 ? 0 : (card.dataset.def - enemyCard.dataset.str);
                    if (cardDef.textContent <= 0) {
                        card.classList.add('defeated');
                        
                    }
                    break;
                case (queue >= 0.5):
                    card.classList.add('friend-queue');

                    enemyCardDef.textContent =
                        enemyCard.dataset.def - card.dataset.str < 0 ? 0 : (enemyCard.dataset.def - card.dataset.str);
                    if (enemyCardDef.textContent <= 0) {
                        enemyCard.classList.add('defeated');
                    }
                    break;
            }
        }, {once: true});
    });


}

export default battleAction;