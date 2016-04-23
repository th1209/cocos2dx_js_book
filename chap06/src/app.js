//const値
const SCREEN_CENTRAL_X = 240;
const CART_BASE_HEIGHT = 24;

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
        cart.setPosition(SCREEN_CENTRAL_X , CART_BASE_HEIGHT);

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





