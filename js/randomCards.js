import getData from "./getData.js";

let randomCards = {

    data: getData('js/data.json'),

    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generate: function (cards) {
        cards.forEach(card => {
            let cardStr = card.querySelector('.card__str');
            let cardDef = card.querySelector('.card__def');
            this.data
                .then((json) => {
                    cardStr.textContent = json.strength[this.random(0, json.strength.length - 1)];
                    cardDef.textContent = json.defence[this.random(0, json.defence.length - 1)];
                });

        });
    }

};

export default randomCards;