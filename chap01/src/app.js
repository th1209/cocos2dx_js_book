//これがmain.jsに書いたシーンと対応する。
//Scene - Layer - Spriteという親子関係になっている?

var gameScene = cc.Scene.extend({
  onEnter:function(){
    this._super();

    //レイヤー用のオブジェクトを生成して、Sceneオブジェクトの子として追加
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

    backgroundLayer = cc.LayerColor.create(new cc.Color(40,40,40,255),320,480);
    this.addChild(backgroundLayer);
    var target = cc.Sprite.create(res.target_png);  //Spriteクラスで画像を生成出来るみたい


    backgroundLayer.addChild(target, 0);            //Layerオブジェクトの子として追加してやる必要があるようだ
    target.setPosition(160,240);                    //これで、画面の中心座標をセット
    setTimeout(function(){
      backgroundLayer.removeChild(target)
    },3000);
  }
});
