
//アイテム生成割合
const BOMB_GENERATE_RATIO = 0.3;

//アイテムの移動
const ITEM_GENERATE_Y = 350;
const ITEM_DEST_Y = -50;
const ITEM_DOWN_DURATION = 8;

//アイテムの当たり判定
const ITEM_COLLISION_Y_ABOVE = 35;
const ITEM_COLLISION_Y_BELOW = 30;
const FUUIT_COLLISION_X = 10;
const BOMB_COLLISION_X = 25;



var Item = cc.Sprite.extend({
    ctor:function(){
        this._super();
        if(Math.random() < BOMB_GENERATE_RATIO){
            this.initWithFile(res.bomb_png);
            this.isBomb = true;
        }else{
            this.initWithFile(res.strawberry_png);
            this.isBomb = false;
        }
    },
    onEnter:function(){
        this._super();
        this.setPosition(Math.random()*400+40,ITEM_GENERATE_Y);
        var moveAction = cc.MoveTo.create(
            ITEM_DOWN_DURATION,
            new cc.Point(Math.random()*400+40,ITEM_DEST_Y));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        var itemY = this.getPositionY();
        var fromItemToCartXDelta = this.getPositionX() - cart.getPosition().x;

        //フルーツの当たり判定
        if(itemY > ITEM_COLLISION_Y_BELOW && itemY < ITEM_COLLISION_Y_ABOVE
            && fromItemToCartXDelta < FUUIT_COLLISION_X
            && ! this.isBomb){
            gameLayer.removeItem(this);
            console.log("FRUIT");
        }

        //爆弾の当たり判定
        if(itemY < ITEM_COLLISION_Y_ABOVE
            && fromItemToCartXDelta < BOMB_COLLISION_X
            && this.isBomb){
            gameLayer.removeItem(this);
            console.log("BOMB");
        }

        if(itemY < -30){
            gameLayer.removeItem(this);
        }
    }
});