function battleAction(friendCards, enemyCards) {

    let round = 0;
    let endGamePause = 2000;
    
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
                    round++;
                    enemyCard.classList.add('enemy-queue');

                    cardDef.textContent =
                        card.dataset.def - enemyCard.dataset.str < 0 ? 0 : (card.dataset.def - enemyCard.dataset.str);
                    if (cardDef.textContent <= 0) {
                        card.classList.add('defeated');
                        
                    }
                    break;
                case (queue >= 0.5):
                    round++;
                    card.classList.add('friend-queue');

                    enemyCardDef.textContent =
                        enemyCard.dataset.def - card.dataset.str < 0 ? 0 : (enemyCard.dataset.def - card.dataset.str);
                    if (enemyCardDef.textContent <= 0) {
                        enemyCard.classList.add('defeated');
                    }
                    break;
            }

            if (round === 6) {
                setTimeout(() => {
                    
                    let friendDefeated = friendCards.filter(card => {
                        return card.classList.contains('defeated');
                    }).length;

                    let enemyDefeated = enemyCards.filter(card => {
                        return card.classList.contains('defeated');
                    }).length;
                    

                    endGame(friendDefeated, enemyDefeated);

                }, endGamePause);

                
            }
        }, {once: true});
    });


}


function endGame(friendDefeated, enemyDefeated) {
    let endGameBlock = document.querySelector('.js-end-game');
    let endGameModal = endGameBlock.querySelector('.js-end-game-modal');
    let endGameTitle = endGameBlock.querySelector('.js-end-game-title');
    let endGameText = endGameBlock.querySelector('.js-end-game-text');
    let endGameRestartButton = endGameBlock.querySelector('.js-end-game-restart');

    if (enemyDefeated > friendDefeated) {
        endGameModal.classList.add('end-game__modal--victory');
    } else if (friendDefeated > enemyDefeated) {
        endGameModal.classList.add('end-game__modal--defeat');
        endGameTitle.textContent = 'Defeat!';
        endGameText.textContent = 'You played well, but your opponent was stronger.';
    } else if (friendDefeated === enemyDefeated) {
        endGameModal.classList.add('end-game__modal--draw');
        endGameTitle.textContent = 'Draw!';
        endGameText.textContent = 'In this battle, the forces were equal. Maybe you should try again?';
    }

    endGameBlock.style.display = "block";
    setTimeout(() => {
        endGameBlock.classList.add('end-game--active');
    }, 10);


    endGameRestartButton.addEventListener('click', () => {
        document.location.reload(true);
    });
}

export default battleAction;