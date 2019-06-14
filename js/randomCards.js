import getData from "./getData.js";
import separateText from "./separateText.js";

let randomCards = {

    data: getData('js/data.json'),

    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generate: function (cards) {
        cards.forEach(card => {
            let cardTitle;
            let cardCost = card.querySelector('.js-card-cost');
            let cardStr = card.querySelector('.js-card-str');
            let cardDef = card.querySelector('.js-card-def');
            let cardImage = card.querySelector('.js-body');
            this.data
                .then((json) => {
                    cardStr.textContent = json.strength[this.random(0, json.strength.length - 1)];
                    cardDef.textContent = json.defence[this.random(0, json.defence.length - 1)];
                    card.style.backgroundImage = `url('${json.frontImage[this.random(0, json.frontImage.length - 1)]}')`;
                    cardImage.style.backgroundImage = `url('${json.image[this.random(0, json.image.length - 1)]}')`;
                    
                    cardTitle = cardImage.style.backgroundImage;
                    cardTitle = separateText(cardTitle, '/cards/');
                    cardTitle = separateText(cardTitle[1], '.png');
                    cardTitle = cardTitle[0];
                    cardTitle = cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1);


                    

                    switch (true) {
                        case (cardStr.textContent >= 10 && cardDef.textContent >= 8):
                            cardTitle = 'Strong armored ' + cardTitle;
                            card.classList.add('card--golden');
                            cardCost.textContent = 90;
                            break;
                        case (cardStr.textContent <= 6):
                            cardTitle = 'Little ' + cardTitle;
                            cardCost.textContent = 10;
                            break;
                        case (cardStr.textContent > 6):
                            cardTitle = 'Strong ' + cardTitle;
                            cardCost.textContent = 40;
                            break;
                    }
                    cardImage.textContent = cardTitle;

                    if (cardStr.textContent === '0') {
                        cardImage.style.backgroundImage = `url('${json.mage}')`;
                        card.classList.add('card--mage');
                        cardDef.textContent = '0';
                        cardCost.textContent = 50;
                        cardImage.textContent = 'Mage Joe Noname';
                    }

                    
                });

        });
    }

};

export default randomCards;