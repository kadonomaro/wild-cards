import audio from "./audio.js";
import getData from "./getData.js";

function battleAction(friendCards, enemyCards) {

    let round = 0;
    let endGamePause = 1500;
    
    friendCards.forEach(card => {
        card.addEventListener('click', () => {

            card.classList.remove('card--shadow');
            if (card.classList.contains('card--golden-shadow')) {
                card.classList.remove('card--golden-shadow');
            }
            if (card.classList.contains('card--mage-shadow')) {
                card.classList.remove('card--mage-shadow');
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

    let localization = localStorage.getItem('lang') || 'en';
    let data = getData('js/data.json');
    let endGameBlock = document.querySelector('.js-end-game');
    let endGameModal = endGameBlock.querySelector('.js-end-game-modal');
    let endGameTitle = endGameBlock.querySelector('.js-end-game-title');
    let endGameText = endGameBlock.querySelector('.js-end-game-text');
    let endGameRestartButton = endGameBlock.querySelector('.js-end-game-restart');

    data.then(json => {

        if (enemyDefeated > friendDefeated) {
            //if game victory
            audio.stop(audio.gameSound);
            audio.play(audio.victorySound, 100);
            endGameModal.classList.add('end-game__modal--victory');

            endGameTitle.textContent = json[localization].victoryTitle;
            endGameText.textContent = json[localization].victoryText;
    
        } else if (friendDefeated > enemyDefeated) {
            //if game defeat
            audio.stop(audio.gameSound);
            audio.play(audio.defeatSound, 100);
            endGameModal.classList.add('end-game__modal--defeat');

            endGameTitle.textContent = json[localization].defeatTitle;
            endGameText.textContent = json[localization].defeatText;
    
        } else if (friendDefeated === enemyDefeated) {
            //if game draw
            audio.stop(audio.gameSound);
            audio.play(audio.victorySound, 100);
            endGameModal.classList.add('end-game__modal--draw');

            endGameTitle.textContent = json[localization].drawTitle;
            endGameText.textContent = json[localization].drawText;

        }

        endGameRestartButton.textContent = json[localization].restartButton;
        endGameBlock.style.display = "block";
        setTimeout(() => {
            endGameBlock.classList.add('end-game--active');
        }, 10);
    

        endGameRestartButton.addEventListener('click', () => {
            document.location.reload(true);
        });

    });



    // if (enemyDefeated > friendDefeated) {

    //     audio.stop(audio.gameSound);
    //     audio.play(audio.victorySound, 100);
    //     endGameModal.classList.add('end-game__modal--victory');

    // } else if (friendDefeated > enemyDefeated) {

    //     audio.stop(audio.gameSound);
    //     audio.play(audio.defeatSound, 100);

    //     endGameModal.classList.add('end-game__modal--defeat');
    //     endGameTitle.textContent = 'Defeat!';
    //     endGameText.textContent = 'You played well, but your opponent was stronger.';

    // } else if (friendDefeated === enemyDefeated) {

    //     audio.stop(audio.gameSound);
    //     audio.play(audio.victorySound, 100);

    //     endGameModal.classList.add('end-game__modal--draw');
    //     endGameTitle.textContent = 'Draw!';
    //     endGameText.textContent = 'In this battle, the forces were equal. Maybe you should try again?';

    // }

    // endGameBlock.style.display = "block";
    // setTimeout(() => {
    //     endGameBlock.classList.add('end-game--active');
    // }, 10);


    // endGameRestartButton.addEventListener('click', () => {
    //     document.location.reload(true);
    // });
}

export default battleAction;