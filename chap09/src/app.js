/**
 * グローバル変数
 */
var fieldSize = 6;                                      //globezの縦・横それぞのの個数
var tileTypes = ["red","green","blue","gray","yellow"];
var tileSize  = 50;
var tileArray = [];                                     //ここにglobezオブジェクトを格納
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
        init._super();

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

    },
    addTile:function () {

    }
});


