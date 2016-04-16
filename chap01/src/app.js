//これがmain.jsに書いたシーンと対応する。
//Scene - Layer - Spriteという親子関係になっている?

var gameScene = cc.Scene.extend({
  onEnter:function(){
    this._super();

    //レイヤーをSceneの子に追加
    var gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    //以下でデバッグコンソールにログ表示
    //cc.log("my awesome game starts here");
  }
});

var backgroundLayer;

//レイヤー用オブジェクトの定義
var game = cc.Layer.extend({
  init:function(){
    this._super();

    //まず灰色の背景をレイヤに追加
    backgroundLayer = cc.LayerColor.create(new cc.Color(40,40,40,255),320,480);
    this.addChild(backgroundLayer);

    //png画像を100回生成してみる(笑)
    for(var i = 0; i < 100 ;i++){
        var img = cc.Sprite.create(res.target_png);
        var x = Math.floor(Math.random() * 320);
        var y = Math.floor(Math.random() * 480);
        backgroundLayer.addChild(img,0);
        img.setPosition(x,y);
    }

    //3秒でpng画像が消えるようにする
    // setTimeout(function(){
    //   backgroundLayer.removeChild(target)
    // },3000);
  }
});
