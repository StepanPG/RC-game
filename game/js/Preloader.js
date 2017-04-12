pGame.preloader  = function(game) {};

pGame.preloader.prototype = {
    preload: function(){
        loading = this.game.add.sprite(game.world.centerX-21, this.game.world.centerY-20, 'loading');
        loading.animations.add('loadingAnimation');
        loading.animations.play('loadingAnimation', 10, true);

        game.load.spritesheet('sprite-map', './assets/Pixel-Adventure/pixel adventure.png', 80, 80);
        game.load.spritesheet('big-text', './assets/Menu/big_text_2.png', 596, 50);
        game.load.spritesheet('player', './assets/Pixel-Adventure/player_60x60.png', 60, 60, 4);
        game.load.spritesheet('arrows', './assets/Menu/arrows.png', 49, 91);
        game.load.spritesheet('diff', './assets/Menu/difficulty.png', 200, 50);

        game.load.image('menu-back', './assets/Menu/background_700x600.png');
        game.load.image('level_back', './assets/Menu/level Selector_big.png');
        game.load.image('restart_b', './assets/Menu/restart_b.png');
        game.load.image('menu_b', './assets/Menu/manu_b.png');
    },
    create: function(){
        this.state.start('Menu');
    },
};
