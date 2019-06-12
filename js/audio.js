let audio = {

    gameSound: document.querySelector('.js-game-audio'),
    victorySound: document.querySelector('.js-game-victory'),
    defeatSound: document.querySelector('.js-game-defeat'),
    play: function (audio, volume) {
        audio.volume = volume / 100;
        audio.play();
    },

    stop: function (audio) {
        audio.pause();
        audio.currentTime = 0.0;
    }
};

export default audio;