import getData from "./getData.js";

let randomCards = {

    data: getData('js/data.json'),

    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generate: function (cards) {
        cards.forEach(card => {
            let cardStr = card.querySelector('.js-card-str');
            let cardDef = card.querySelector('.js-card-def');
            let cardImage = card.querySelector('.js-body');
            this.data
                .then((json) => {
                    cardStr.textContent = json.strength[this.random(0, json.strength.length - 1)];
                    cardDef.textContent = json.defence[this.random(0, json.defence.length - 1)];
                    card.style.backgroundImage = `url('${json.frontImage[this.random(0, json.frontImage.length - 1)]}')`;
                    cardImage.style.backgroundImage = `url('${json.image[this.random(0, json.image.length - 1)]}')`;
                });

        });
    }

};

export default randomCards;