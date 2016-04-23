//const値
const SCREEN_CENTRAL_X = 240;
const CART_BASE_HEIGHT = 24;

const BOMB_GENERATE_RATIO = 0.3;
const ITEM_DOWN_DURATION = 8;


//グローバル変数
var itemsLayer;
var cart;

var gameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init: function () {
        this._super();

        var backGroundLayer = cc.LayerGradient.create(
            cc.color(0, 0, 0, 255),
            cc.color(0x46, 0x82, 0xB4, 255));
        this.addChild(backGroundLayer);

        itemsLayer = cc.Layer.create();
        this.addChild(itemsLayer);

        topLayer = cc.Layer.create();
        this.addChild(topLayer);

        cart = cc.Sprite.create(res.cart_png);
        topLayer.addChild(cart, 0);
        cart.setPosition(240, 24);

        this.schedule(this.addItem, 1);
    },
    addItem: function () {
        var item = new Item();
        itemsLayer.addChild(item, 1);
    },
    removeItem: function (item) {
        itemsLayer.removeChild(item);
    }
});


//クラス定義
var Item = cc.Sprite.extend({
    ctor:function(){
        this._super();
        if(Math.random()<0.5){
            this.initWithFile(res.bomb_png);
            this.isBomb = true;
        }else{
            this.initWithFile(res.strawberry_png);
            this.isBomb = false;
        }
    },
    onEnter:function(){
        this._super();
        this.setPosition(Math.random()*400+40,350);
        var moveAction = cc.MoveTo.create(8,new cc.Point(Math.random()*400+40,-50));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        var itemY = this.getPositionX();
        var fromItemToCartXDelta = this.getPositionY() - cart.getPositionX();

        if(itemY > 30 && itemY < 35
           && fromItemToCartXDelta < 10
           && ! this.isBomb){
            gameLayer.removeItem(this);
            console.log("FRUIT");
        }

        if(itemY < 35
           && fromItemToCartXDelta < 25
           && this.isBomb){
            gameLayer.removeItem(this);
            console.log("BOMB");
        }

        if(itemY < -30){
            gameLayer.removeItem(this);
        }
    }
});






