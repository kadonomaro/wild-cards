let audio = {

    audioBlock: document.querySelector('.js-game-audio'),
    play: function (volume) {
        this.audioBlock.volume = volume / 100;
        this.audioBlock.play();
    }
};

export default audio;