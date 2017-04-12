var game = new Phaser.Game(700, 600, Phaser.AUTO, 'pixel-adventure');

game.state.add('Boot', pGame.boot);
game.state.add('Preloader', pGame.preloader);
game.state.add('Menu', pGame.menu);
game.state.add('PixelAdventure', pGame.pixelAdventure);
game.state.add('GameOver', pGame.gameOver);
game.state.add('Win', pGame.win);

game.state.start('Boot');
