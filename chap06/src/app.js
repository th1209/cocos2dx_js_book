//const値
const SCREEN_CENTRAL_X = 240;

//カート関係
const CART_BASE_HEIGHT = 24;
const CART_ABS_SPEED = 2;

//ボタン関係
const BUTTON_OPACITY_DEFAULT = 128;
const BUTTON_OPACITY_ON_TOUCH = 255;
const LEFT_BUTTON_X_POS = 40;
const RIGHT_BUTTON_X_POS = 440;
const BUTTON_Y_POS = 160;


//グローバル変数
var itemsLayer;
var cart;
var cartXSpeed = 0;

//左右ボタン使う場合
var leftButton;
var rightButton;

//バーチャルパッド使う場合
var touchOrigin;
var touching = false;
var touchEnd;

//ゴーストボタン使う場合
var detectedX;
var savedX;



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

        //以下、左右ボタンを使う場合
        // leftButton = cc.Sprite.create(res.leftbutton_png);
        // topLayer.addChild(leftButton,0);
        // leftButton.setPosition(LEFT_BUTTON_X_POS, BUTTON_Y_POS);
        // leftButton.setOpacity(BUTTON_OPACITY_DEFAULT);
        //
        // rightButton = cc.Sprite.create(res.rightgitbutton_png);
        // topLayer.addChild(rightButton,0);
        // rightButton.setPosition(RIGHT_BUTTON_X_POS, BUTTON_Y_POS);
        // rightButton.setOpacity(BUTTON_OPACITY_DEFAULT);

        this.schedule(this.addItem, 1);

        cc.eventManager.addListener(touchListener, this);
        this.scheduleUpdate();
    },
    addItem: function () {
        var item = new Item();
        itemsLayer.addChild(item, 1);
    },
    removeItem: function (item) {
        itemsLayer.removeChild(item);
    },
    update:function(dt){
        //バーチャルパッドの場合、以下1行を追加
        // if(touching){
        //     cartXSpeed = (touchEnd.getPositionX() - touchOrigin.getPositionX()) / 50;
        //     if(cartXSpeed > 0){
        //         cart.setFlippedX(true);
        //     }
        //     if(cartXSpeed < 0){
        //         cart.setFlippedX(false);
        //     }
        //     cart.setPosition(cart.getPositionX()+cartXSpeed,cart.getPositionY());
        // }

        //以下、ゴーストボタンの場合
        if(touching){
            var deltaX = detectedX - savedX;
            if(deltaX > 0){
                cartXSpeed = CART_ABS_SPEED;
            }
            if(deltaX < 0){
                cartXSpeed = -1 * CART_ABS_SPEED;
            }
            savedX = detectedX;//これでフレーム毎にsavedXを更新する
            if(cartXSpeed > 0){
                cart.setFlippedX(true);
            }
            if(cartXSpeed < 0){
                cart.setFlippedX(false);
            }
            cart.setPosition(cart.getPositionX()+cartXSpeed,cart.getPositionY());
        }
    },
});

var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch,event){
        //以下、左右ボタンを使う場合
        // if(touch.getLocation().x < SCREEN_CENTRAL_X){
        //     cartXSpeed = CART_ABS_SPEED;
        //     leftButton.setOpacity(BUTTON_OPACITY_ON_TOUCH);
        //     rightButton.setOpacity(BUTTON_OPACITY_DEFAULT);
        // }else{
        //     cartXSpeed = -1 * CART_ABS_SPEED;
        //     leftButton.setOpacity(BUTTON_OPACITY_DEFAULT);
        //     rightButton.setOpacity(BUTTON_OPACITY_ON_TOUCH)
        // }
        // return true;

        //以下、バーチャルパッド使う場合
        // touchOrigin = cc.Sprite.create(res.touchorigin_png);
        // topLayer.addChild(touchOrigin,0);
        // touchOrigin.setPosition(touch.getLocationX(),touch.getLocationY());
        // touchEnd = cc.Sprite.create(res.touchend_png);
        // topLayer.addChild(touchEnd,0);
        // touchEnd.setPosition(touch.getLocationX(),touch.getLocationY());
        // touching = true;
        // return true;

        //以下、ゴーストボタン使う場合
        touching = true;
        detectedX = touch.getLocationX();
        savedX = detectedX;
        return true;
    },
    onTouchMoved: function(touch,event){
        //以下バーチャルバッド使う場合
        // touchEnd.setPosition(touch.getLocationX(),touch.getLocationY());

        //以下、ゴーストボタン使う場合
        detectedX = touch.getLocationX();
    },
    onTouchEnded:function(touch,event){
        //以下、左右ボタン使う場合
        // cartXSpeed = 0;
        // leftButton.setOpacity(BUTTON_OPACITY_DEFAULT);
        // rightButton.setOpacity(BUTTON_OPACITY_DEFAULT);

        //以下、バーチャルパッド使う場合
        // touching = false;
        // topLayer.removeChild(touchOrigin);
        // topLayer.removeChild(touchEnd);
        //
        //以下、ゴーストボタン使う場合
        touching = false;
    }
});




