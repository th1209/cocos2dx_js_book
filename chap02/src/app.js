
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

        //背景画像にグラデーションをかける
        //(第三引数にベクトルを渡せば、任意の方向でグラデーションをかけられる)
        var gradient = cc.LayerGradient.create(
            cc.color(0,0,0,255),            //黒。α値は255で最大であり、不透明となる
            cc.color(0x64,0x82,0xB4,255));  //16進数でも記述可能
        this.addChild(gradient);

        //16個の背景を表示
        for(i = 0; i < 16; i++){
            //var tile = cc.Sprite.create(res.cover_png);
            var tile = new MemoryTile();
            this.addChild(tile,0);
            tile.setPositionX(49+i%4*74);               //x座標は4回毎に74*xをリセット
            tile.setPositionY(400-Math.floor(i/4)*74);  //y座標は、行が増えるたびに+74
        }
    }
});

//イベントリスナ
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event){
        var target = event.getCurrentTarget();
        //相対座標に変換
        var location = target.convertToNodeSpace(touch.getLocation());
        //対象のタイルを取得
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0,0,targetSize.width,targetSize.height);
        //タイル内に含まれていれば、if内の処理を実施
        if(cc.rectContainsPoint(targetRectangle, location)){
            console.log("I picked a tile!!");
        }
    }
});

//Spriteクラスを継承
var MemoryTile = cc.Sprite.extend({
    //コンストラクタ
    ctor:function(){
        this._super();
        this.initWithFile(res.cover_png);
        //イベントリスナは、オブジェクト毎にクローンして割り当てる必要がある
        cc.eventManager.addListener(listener.clone(),this);
    }
});