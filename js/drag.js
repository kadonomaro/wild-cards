let drag = {
    cardArray: [],
    currentCard: null,

    start: function (card, cardHoldClass, cardInvisibleClass) {
        card.classList.add(cardHoldClass);
		this.currentCard = card;

        setTimeout(() => {
            if (card.classList.contains(cardHoldClass)) {
                card.classList.add(cardInvisibleClass);
            }
        }, 10);
    },

    end: function (card, cardHoldClass, cardInvisibleClass) {
        card.classList.remove(cardHoldClass);
        card.classList.remove(cardInvisibleClass);
    },

    over: function (evt) {
        evt.preventDefault();
    },

    enter: function (cardSlot, cardSlotHoveredClass) {
        cardSlot.classList.add(cardSlotHoveredClass);
    },

    leave: function (cardSlot, cardSlotHoveredClass) {
        cardSlot.classList.remove(cardSlotHoveredClass);
    },

    drop: function (card, cardSlot, cardSlotHoveredClass, money) {
        cardSlot.classList.remove(cardSlotHoveredClass);
        let currentCost = card.querySelector('.js-card-cost').textContent;

        if (cardSlot.children.length === 0 && +money.textContent >= +currentCost) {

            cardSlot.append(card);

            this.cardArray = this.cardArray.filter(item => {
                if (card !== item) {
                    return item;
                }
            });

            this.cardArray.push(card);
            money.textContent = 200;

            this.cardArray.forEach(item => {
                let cardCost = item.querySelector('.js-card-cost').textContent;
                money.textContent -= cardCost;
            });


            console.dir(this.cardArray);

        }
        
    }
};

export default drag;