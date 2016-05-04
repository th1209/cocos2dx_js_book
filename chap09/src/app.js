/**
 * グローバル変数
 */
var xFieldSize = 6; //x座標のglobezの個数
var yFieldSize = 6; //y座標のglobezの個数
var tileTypes = ["red","green","blue","grey","yellow"];
var tileSize  = 50;  //globez一個あたりのピクセル数(縦横両方)
var tileArray = []; //ここにglobezオブジェクトを格納
var globezLayer;

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

        tileArray = [row][col] = sprite;
    }
});


