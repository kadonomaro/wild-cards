let randomCards = {

    data: [
        '#FF6347', '#2E8B57', '#4682B4',
        '#FFE4C4', '#B8860B', '#BDB76B'
    ],
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generate: function (cards) {
        cards.forEach(card => {
            card.style.backgroundColor = this.data[this.random(0, this.data.length - 1)];
        });
    }
};

export default randomCards;