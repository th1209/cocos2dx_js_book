//グローバル変数
var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var pickedTiles = [];

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
            var tile = new MemoryTile();
            tile.pictureValue = gameArray[i];           //動的にプロパティを追加
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
        //カードが2枚以上めくられたら何もしない
        if(pickedTiles.length < 2){
            var target = event.getCurrentTarget();
            //相対座標に変換
            var location = target.convertToNodeSpace(touch.getLocation());
            //対象のタイルを取得
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0,0,targetSize.width,targetSize.height);
            //タイル内に含まれていれば、if内の処理を実施
            if(cc.rectContainsPoint(targetRectangle, location)){
                target.initWithFile("res/tile_" + target.pictureValue + ".png");
                pickedTiles.push(target);
                if(pickedTiles.length == 2){
                    checkTiles();
                }
            }
        }
    }
});

//Spriteクラスを継承
var MemoryTile = cc.Sprite.extend({
    //コンストラクタ
    ctor:function() {
        this._super();
        this.initWithFile(res.cover_png);
        //イベントリスナは、オブジェクト毎にクローンして割り当てる必要がある
        cc.eventManager.addListener(listener.clone(), this);
    }
});

//グローバル関数
function checkTiles(){
    var pause = setTimeout(function(){
        //タイルが一致しない場合
        if(pickedTiles[0].pictureValue != pickedTiles[1].pictureValue){
            pickedTiles[0].initWithFile(res.cover_png);
            pickedTiles[1].initWithFile(res.cover_png);
        //タイルが一致した場合
        }else{
            gameLayer.removeChild(pickedTiles[0]);
            gameLayer.removeChild(pickedTiles[1]);
        }
        //グローバル配列は空にしておく
        pickedTiles = [];
    },2000);//2秒間待ち続ける
}