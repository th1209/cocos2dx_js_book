/**
 * グローバル変数
 */
var xFieldSize = 6; //x座標のglobezの個数
var yFieldSize = 6; //y座標のglobezの個数
var tileTypes = ["red","green","blue","grey","yellow"];
var tileSize  = 50; //globez一個あたりのピクセル数(縦横両方)
var tileArray = []; //ここにglobezオブジェクトを格納
var globezLayer;    //globezSpriteは、このレイヤーに貼付ける
var startColor = null;
var visitTiles = [];



var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function (){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.globes_plist, res.globes_png);

        var backGroundLayer =  cc.LayerGradient.create(
            cc.color(0x00, 0x22, 0x22, 255),
            cc.color(0x22, 0x00, 0x44, 255)
        );
        this.addChild(backGroundLayer);

        globezLayer = cc.Layer.create();
        this.addChild(globezLayer);

        this.createLevel();
        console.log(tileArray);

        cc.eventManager.addListener(touchListener, this);
    },
    createLevel:function (){
        for(var y = 0; y < yFieldSize  ;y++){
            tileArray[y] = [];
            for(var x = 0; x < xFieldSize  ;x++){
                this.addTile(y, x);
            }
        }
    },
    addTile:function (row, col) {
        var randomTile = Math.floor(Math.random() * tileTypes.length); //0-lengthの値をランダム生成

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tileTypes[randomTile]);
        var sprite = cc.Sprite.createWithSpriteFrame(spriteFrame);
        sprite.val = randomTile;
        sprite.picked = false;

        globezLayer.addChild(sprite, 0);
        sprite.setPosition(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2)

        tileArray[row][col] = sprite;
    }
});

var touchListener = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    onMouseDown: function (event) {
        var pickedRow = Math.floor(event._y / tileSize);
        var pickedCol = Math.floor(event._x / tileSize);

        tileArray[pickedRow][pickedCol].setOpacity(128);
        tileArray[pickedRow][pickedCol].picked = true;

        startColor = tileArray[pickedRow][pickedCol].val;

        visitTiles.push({
            row: pickedRow,
            col: pickedCol
        });
    },
    onMouseUp: function(event) {
        startColor = null;
        for(i = 0; i< visitTiles.length; i++){
            tileArray[visitTiles[i].row][visitTiles[i].col].setOpacity(255);
            tileArray[visitTiles[i].row][visitTiles[i].col].picked = false;
        }
    }
});


