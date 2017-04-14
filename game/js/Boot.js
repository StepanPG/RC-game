let pGame = {};

pGame.boot = function(game) {};

let loading;

pGame.boot.prototype = {
    preload: function() {
        game.load.spritesheet('loading', './assets/Boot/coin-loading.png', 44, 40, 10);
    },
    create: function(){
        game.state.start('Preloader');
    },
};
