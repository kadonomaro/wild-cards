let randomCards = {

    data: [
        '#aca', '#bcc', '#ecf', '#4aa'
    ],
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generate: function (cards) {
        cards.forEach(card => {
            card.style.backgroundColor = this.data[this.random(0, this.data.length - 1)];
            console.log(this.data.length);
        });
    }
};

export default randomCards;