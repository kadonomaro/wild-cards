let audio = {

    gameSound: document.querySelector('.js-game-audio'),
    victorySound: document.querySelector('.js-round-victory'),
    defeatSound: document.querySelector('.js-round-defeat'),
    play: function (audio, volume) {
        audio.volume = volume / 100;
        audio.play();
    }
};

export default audio;