pGame.gameOver = function(game){};

var menu, logo;
let restart,
    time_up;

pGame.gameOver.prototype = {
    restartAction: function(){
        game.state.start('PixelAdventure');
    },
    menuAction: function(){
        game.state.start('Menu');
    },
    create: function(){
        game.add.tileSprite(0, 0, 700, 600, 'menu-back');

        logo = game.add.tileSprite(350, 100, 596, 50, 'big-text', 0);
        logo.anchor.setTo(0.5);

        time_up = game.add.tileSprite(350, 230, 596, 50, 'big-text', 1);
        time_up.anchor.setTo(0.5);

        restart = game.add.button(225, 325, 'restart_b', this.restartAction, this);
        restart.anchor.setTo(0.5);

        menu = game.add.button(475, 325, 'menu_b', this.menuAction, this);
        menu.anchor.setTo(0.5);
    },
};
