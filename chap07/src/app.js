var world;
var worldScale; //変換比率(1m:30px)

var gameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init: function(){
        this._super();

        var backGroundLayer = cc.LayerGradient.create(
            cc.color(0xdf,0x9f,0x83,255),
            cc.color(0xfa,0xf7,0x9f,255)
        );
        this.addChild(backGroundLayer);

        //(0,9.81)が地球の重力。
        //物体が下方に落ちる際は、y値が増加しないよう、負の重力としている?
        var gravity = new Box2D.Common.Math.b2Vec2(0,-10);

        //物理空間の生成。
        //第二引数は、何らかの物理計算が必要となるまで、物理オブジェクトをスリープ状態にしておく為のスイッチ。
        world = new Box2D.Dynamics.b2World(gravity,true);

        this.scheduleUpdate();
    },
    update: function(dt){
        //update関数の第一引数はdeltaでl、前フレームからの経過時間を表す。
        //残り二つの引数は、速度と位置の繰り返し計算回数を表す。
        world.Step(dt,10,10);
        console.log(world);
    }
});