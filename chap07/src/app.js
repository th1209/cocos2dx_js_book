var world;
var worldScale = 30; //変換比率(1m:30px)

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

        this.addBody(
            240, 10,        //中心のx,y座標
            480, 20,        //bodyのx,yサイズ
            false,          //動的オブジェクト or 静的オブジェクト。今回は静的オブジェクトなので、物理空間の力(重力etc)の影響を受けない。
            res.ground_png, //リソースファイル
            "ground"        //リソース名
        )
    },
    update: function(dt){
        //update関数の第一引数はdeltaでl、前フレームからの経過時間を表す。
        //残り二つの引数は、速度と位置の繰り返し計算回数を表す。
        world.Step(dt,10,10);
        console.log(world);
    },
    addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){

        //b2FixtureDefクラス。名前の通り、物体の材質を決めるようだ。
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1.0;       //密度
        fixtureDef.friction = 0.5;      //摩擦
        fixtureDef.restitution = 0.2;   //反発
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;               //box2dで多角形のオブジェクトを作りたいなら、多分これ使う
        fixtureDef.shape.SetAsBox(0.5 * width/worldScale, 0.5 * height/worldScale); //これで長方形が作れる。実際のサイズの半分の値を渡す必要があることに注意！

        //b2bodyDefクラス。物体の特性を決める
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        if(isDynamic){
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }else{
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        }
        bodyDef.position.Set(posX/worldScale, posY/worldScale);

        //Sprite生成 & bodyDefに紐づける
        //(box2d学習するにあたって、ここが結構なはまりどころとのこと。)
        var userSprite = cc.Sprite.create(spriteImage);
        this.addChild(userSprite, 0);
        userSprite.setPosition(posX, posY);
        bodyDef.userData = {
            type: type,
            asset: userSprite
        }

        //bodyオブジェクトの作成 & bodyDef紐付け
        var body = world.CreateBody(bodyDef);

        //bodyオブジェクトにfixtureDefを紐づける
        body.CreateFixture(fixtureDef);
    }

});