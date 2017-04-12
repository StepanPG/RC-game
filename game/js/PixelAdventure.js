pGame.pixelAdventure = function(game){};

let map,
    layer,
    player,
    controls,
    coins,
    scoreText,
    restartText,
    menuText,

    highScore,

    timer,
    timerText,
    timerTime,
    too,

    jsonData,


    score = 0;


pGame.pixelAdventure.prototype = { // TODO: maybe make class
        preload: function() {
            game.load.tilemap('tilemapLevel', './maps/level_'+selectedLevel+'.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.json('levelJSON', './maps/level_'+selectedLevel+'.json');
        },
    create: function(){
        this.stage.backgroundColor = '#45bae6';
        this.physics.arcade.gravity.y = 1500;

        jsonData = game.cache.getJSON('levelJSON');

        map = this.add.tilemap('tilemapLevel', 80, 80);
        map.addTilesetImage('tileset', 'sprite-map');
        layer = map.createLayer(0);
        layer.resizeWorld();

        map.setCollisionBetween(1, 14);

        map.setTileIndexCallback(15, function(player, tile){
            map.removeTileWorldXY(tile.x*80, tile.y*80, 80, 80);
            layer.dirty = true;

            let coinCollect = game.add.sprite(tile.x*80, tile.y*80, 'sprite-map', 14);
            coinCollect.animations.add('collectCoinAnimation', [15,16,17,18], 10, false);
            coinCollect.animations.play('collectCoinAnimation');
            score += 10;
        }, this);

        scoreText = game.add.text(10, 10, '', {font: "32px monospace", fill: "#fff"});
        scoreText.fixedToCamera = true;
        scoreText.setShadow(3, 3, 'rgba(0,0,0,1)', 1);

        restartText = game.add.text(250, 10, 'Restart', {font: "32px monospace", fill: "#fff"});
        restartText.fixedToCamera = true;
        restartText.inputEnabled = true;

        menuText = game.add.text(425, 10, 'Menu', {font: "32px monospace", fill: "#fff"});
        menuText.fixedToCamera = true;
        menuText.inputEnabled = true;

        restartText.setShadow(3, 3, 'rgba(0,0,0,1)', 1);
        menuText.setShadow(3, 3, 'rgba(0,0,0,1)', 1);

        restartText.events.onInputUp.add(this.restartDown, this);
        menuText.events.onInputUp.add(this.menuDown, this);

        timer = game.time.create();
        timerTime = timer.add(Phaser.Timer.SECOND * jsonData.layers[1].properties.time, this.endTimer, this);

        timerText = game.add.text(590, 10, '00:00', {font: "32px monospace", fill: "#fff"});
        timerText.fixedToCamera = true;
        timerText.setShadow(3, 3, 'rgba(0,0,0,1)', 1);

        timer.start();

        player = this.add.sprite( jsonData.layers[1].properties.playerX, jsonData.layers[1].properties.playerY, 'player');
        player.anchor.setTo(0.5,0.5);

        player.animations.add('jump', [0,1,0], 5, false);
        player.animations.add('run', [1,2,3,2], 10, false);
        this.physics.arcade.enable(player);
        this.camera.follow(player);

        player.body.bounce.set(0.1);

        controls = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        this.physics.arcade.collide(player, layer);

        scoreText.setText('Score: '+ score);

        if (timer.running) {
            timerText.text = this.formatTime(Math.round((timerTime.delay - timer.ms) / 1000));
        }
        else {
            this.state.start('GameOver');
        }

        if((player.y > jsonData.height * jsonData.tileheight) || (player.x > jsonData.width * jsonData.tilewidth)){
            game.state.start('GameOver');
        }

        if(score == jsonData.layers[1].properties.score){
            highScore = Math.round(score / jsonData.layers[1].properties.score * 100) + '%';
            scoreData['level_' + selectedLevel] = highScore;
            score = 0;
            game.state.start('Win');
        }

        player.body.velocity.x = 0;

        if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down)){
            player.animations.play('jump');
            player.body.velocity.y -= 725;
        }

        if(controls.right.isDown){
            player.animations.play('run');
            player.scale.setTo(1,1);
            player.body.velocity.x += 300;
        }

        if(controls.left.isDown){
            player.animations.play('run');
            player.scale.setTo(-1,1);
            player.body.velocity.x -= 300;
        }
    },
    restartDown: function(item){
        score = 0;
        game.state.start('PixelAdventure');
    },
    menuDown: function(item){
        score = 0;
        game.state.start('Menu');
    },
    endTimer: function(){
        highScore = Math.round(score / jsonData.layers[1].properties.score * 100) + '%';
        scoreData['level_' + selectedLevel] = highScore;
        score = 0;
        timer.stop();
        game.state.start('GameOver');
    },
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
};
