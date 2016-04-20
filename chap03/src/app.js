//グローバル変数
var backGround;
var gameLayer;
var scrollSpeed = 1;
var ship;
var gameGravity = -0.05;
var gameThrust = 0.1;


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

        //このオブジェクトをイベントリスナに登録
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                ship.engineOn = true;
            },
            onMouseUp: function(event){
                ship.engineOn = false;
            }
        },this);

        //背景の処理
        backGround = new ScrollingBG();
        this.addChild(backGround);
        //scheduleUpdate関数は、フレームの更新毎に呼び出される
        this.scheduleUpdate();

        //これは、0.5秒毎に第一引数を呼び出すという意味
        this.schedule(this.addAsteroid,0.5);

        ship = new Ship();
        this.addChild(ship);
    },
    //scheduleUpdate関数実行後、実際に呼ばれるのはupdate関数の処理
    update:function(dt){
        backGround.scroll();
        ship.updateY();
    },
    addAsteroid:function(event){
        var asteroid = new Asteroid;
        this.addChild(asteroid,1);
    },
    removeAsteroid:function(asteroid){
        this.removeChild(asteroid);
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
        this.engineOn = false;
        this.invulnerability = 0;
    },
    onEnter:function(){
        this.setPosition(60,160);
    },
    updateY:function(){
        if(this.engineOn){
            this.ySpeed += gameThrust;
        }
        //無敵モード時処理
        if(this.invulnerability > 0){
            this.invulnerability--;
            this.setOpacity(255 - this.getOpacity());
        }
        this.setPosition(this.getPosition().x, this.getPosition().y+this.ySpeed);
        this.ySpeed += gameGravity;
        if(this.getPosition().y < 0 || this.getPosition().y > 320){
            restartGame();
        }
    }
});

var Asteroid = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.asteroid_png);
    },
    onEnter:function(){
        this._super();

        this.setPosition(600, Math.random()*320);

        //MoveToメソッドは、移動を表す。第一引数がduration,第二引数がベクトル
        //また、newではなくcreateメソッドを使う?
        var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, Math.random()*320));
        //runActionの引数に渡すとSpriteオブジェクトを動かせる
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        //衝突判定
        var shipBoundingBox = ship.getBoundingBox();
        var asteroidBoundingBox = this.getBoundingBox();
        if(cc.rectIntersectsRect(shipBoundingBox,asteroidBoundingBox)
           && ship.invulnerability==0){//無敵な時は、if文を通らない
            gameLayer.removeAsteroid(this);
            restartGame();
        }

        //x座標が画面外に出たら、オブジェクトを消去
        if(this.getPosition().x < -50){
            gameLayer.removeAsteroid(this);
        }
    }
});

//グローバル関数
function restartGame(){
    ship.ySpeed = 0;
    ship.setPosition(ship.getPosition().x,160);
    ship.invulnerability=100;
}

