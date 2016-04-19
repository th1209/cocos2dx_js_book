//グローバル変数
var backGround;
var gameLayer;
var scrollSpeed = 1;
var ship;
var gameGravity = -0.05;


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

        //LayerにSpriteを追加
        backGround = new ScrollingBG();
        this.addChild(backGround);
        ship = new Ship();
        this.addChild(ship);

        //scheduleUpdate関数は、フレームの更新毎に呼び出される
        this.scheduleUpdate();
    },
    //実際に呼ばれるのはupdate関数の処理
    update:function(dt){
        backGround.scroll();
        ship.updateY();
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

var Ship = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.ship_png);
        this.ySpeed = 0;
    },
    onEnter:function(){
        this.setPosition(60,160);
    },
    updateY:function(){
        this.setPosition(this.getPosition().x, this.getPosition().y+this.ySpeed);
        this.ySpeed += gameGravity;
    }
});

