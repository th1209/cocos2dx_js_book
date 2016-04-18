
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
            var tile = cc.Sprite.create(res.cover_png);
            this.addChild(tile,0);
            tile.setPositionX(49+i%4*74);               //x座標は4回毎に74*xをリセット
            tile.setPositionY(400-Math.floor(i/4)*74);  //y座標は、行が増えるたびに+74
        }
    }
});