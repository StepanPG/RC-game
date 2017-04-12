pGame.win = function(game){};

let win;

pGame.win.prototype = {
    menuAction: function(){
        game.state.start('Menu');
    },
    create: function(){
        game.add.tileSprite(0, 0, 700, 600, 'menu-back');

        logo = game.add.tileSprite(350, 100, 596, 50, 'big-text', 0);
        logo.anchor.setTo(0.5);

        win = game.add.tileSprite(350, 230, 596, 50, 'big-text', 2);
        win.anchor.setTo(0.5);

        menu = game.add.button(350, 325, 'menu_b', this.menuAction, this);
        menu.anchor.setTo(0.5);
    },
};
