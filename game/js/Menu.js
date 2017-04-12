pGame.menu = function(game) {};

let thumbRows = 1,
    thumbCols = 3,
    thumbWidth = 120,
    thumbHeight = 80,
    thumbSpacing = 30,
    pages = 3,
    levelThumbsGroup,
    currentPage = 0,
    leftArrow,
    rightArrow,
    pageT,
    imageDiff,
    selectedLevel,
    scoreData = {
        'level_1': '',
        'level_2': '',
        'level_3': '',
        'level_4': '',
        'level_5': '',
        'level_6': '',
        'level_7': '',
        'level_8': '',
        'level_9': '',
    };

pGame.menu.prototype = {
    create: function() {
        this.stage.backgroundColor = '#45bae6';

        let pix = game.add.text(350, 100,'Pixel Adventure', {font: '40px monospace', fill: '#fff'});
        pix.anchor.setTo(0.5);

        game.add.tileSprite(0, 0, 700, 600, 'menu-back');

        let logo = game.add.tileSprite(350, 100, 596, 50, 'big-text', 0);
        logo.anchor.setTo(0.5);

        levelThumbsGroup = game.add.group();
        var levelLength = thumbWidth * thumbCols + thumbSpacing * (thumbCols-1);
        var levelHeight = thumbWidth * thumbRows + thumbSpacing * (thumbRows-1);

        for(var l = 0; l < pages; l++){
            var offsetX = (game.width-levelLength)/2+game.width*l;
            var offsetY = 300;

            imageDiff = game.add.tileSprite(350 + 700 * l, 225, 200, 50, 'diff', l);
            imageDiff.anchor.setTo(0.5);
            levelThumbsGroup.add(imageDiff);

             for(var i = 0; i < thumbRows; i ++){
                 for(var j = 0; j < thumbCols; j ++){
                    var levelNumber = i*thumbCols+j+l*(thumbRows*thumbCols);
                    var levelThumb = game.add.button(offsetX+j*(thumbWidth+thumbSpacing), offsetY+i*(thumbHeight+thumbSpacing), 'level_back', this.thumbClicked, this);
                    levelThumb.levelNumber = levelNumber+1;
                    levelThumbsGroup.add(levelThumb);
                    var style = {
                        font: "28px monospace",
                        fill: "#ffffff"
                    };
                    var levelText = game.add.text(levelThumb.x+12, levelThumb.y+5, j+1, style);
                    levelText.setShadow(3, 3, 'rgba(0,0,0,1)', 1);
                    levelThumbsGroup.add(levelText);
                    let n = levelNumber + 1;

                    var progress = game.add.text(levelThumb.centerX+20,levelThumb.y+60, scoreData['level_'+n], style);
                    progress.anchor.setTo(0.5);
                    progress.setShadow(3, 3, 'rgba(0,0,0,1)', 1);
                    levelThumbsGroup.add(progress);
                }
            }
        }
        levelThumbsGroup.x = currentPage * game.width * -1;

        leftArrow = game.add.button(50,300,"arrows",this.arrowClicked,this);
        leftArrow.anchor.setTo(0.5);
        leftArrow.frame = 0;
        if(currentPage==0){
            leftArrow.alpha = 0.3;
        }
        rightArrow = game.add.button(650,300,"arrows",this.arrowClicked,this);
        rightArrow.anchor.setTo(0.5);
        rightArrow.frame = 1;
        if(currentPage==pages-1){
            rightArrow.alpha = 0.3;
        }
    },
    arrowClicked:function(button){
      if(button.frame==1 && currentPage<pages-1){
         leftArrow.alpha = 1;
         currentPage++;
         if(currentPage == pages-1){
            button.alpha = 0.3;
         }
         var buttonsTween = game.add.tween(levelThumbsGroup);
         buttonsTween.to({
            x: currentPage * game.width * -1
        }, 500, Phaser.Easing.Cubic.None);
         buttonsTween.start();
      }
      if(button.frame == 0 && currentPage > 0){
         rightArrow.alpha = 1;
         currentPage--;
         if(currentPage == 0){
            button.alpha = 0.3;
         }
         var buttonsTween = game.add.tween(levelThumbsGroup);
         buttonsTween.to({
            x: currentPage * game.width * -1
         }, 400, Phaser.Easing.Cubic.None);
         buttonsTween.start();
      }
   },

   thumbClicked:function(button){
        selectedLevel = button.levelNumber;
        game.state.start('PixelAdventure');
    }
};
