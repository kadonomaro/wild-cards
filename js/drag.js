let drag = {

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

    drop: function (card, cardSlot, cardSlotHoveredClass) {
        cardSlot.classList.remove(cardSlotHoveredClass);

        if (cardSlot.children.length === 0) {

            cardSlot.append(card);

        } else if (cardSlot.children.length > 0) {

            if (cardSlot.previousElementSibling !== null && cardSlot.previousElementSibling.children.length === 0) {

                cardSlot.previousElementSibling.append(card);

            } else if (cardSlot.nextElementSibling !== null && cardSlot.nextElementSibling.children.length === 0) {

                cardSlot.nextElementSibling.append(card);

            }
        }
        
    }
};

export default drag;