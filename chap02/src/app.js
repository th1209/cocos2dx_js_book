
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

        for(i = 0; i < 16; i++){
            var tile = cc.Sprite.create(res.cover_png);
            this.addChild(tile,0);
            tile.setPositionX(49+i%4*74);               //x座標は4回毎に74*xをリセット
            tile.setPositionY(400-Math.floor(i/4)*74);  //y座標は、行が増えるたびに+74
        }
    }
});