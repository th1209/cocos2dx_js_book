//グローバル変数
var backGround;
var gameLayer;
var scrollSpeed = 1;


//グローバルオブジェクト
var gameScene = cc.Scene.extend({
 onEnter:function(){
     this._super();
     gameLayer = new game();
     gameLayer.init();
     this.addChild(gameLayer);
 }
});

var game = cc.Layer.extend({
    init:function(){
        this._super();
        backGround = new ScrollingBG();
        this.addChild(backGround);
        //scheduleUpdate関数は、フレームの更新毎に呼び出される
        this.scheduleUpdate();
    },
    //実際に呼ばれるのはupdate関数の処理
    update:function(dt){
        backGround.scroll();
    }
});


//クラス定義
var ScrollingBG = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.background_png);
    },
    onEnter:function(){
        this.setPosition(480,160)
    },
    scroll:function(){
        //x座標は-1する
        this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
        if(this.getPosition().x < 0){
            this.setPosition(this.getPosition().x+480,this.getPosition().y);
        }
    }
});

