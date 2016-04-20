var level = [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,0,1],
    [1,1,3,0,2,0,1],
    [1,0,0,4,0,0,1],
    [1,0,3,1,2,0,1],
    [1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1],
];

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

        //スプライトシートからのデータの取得は以下のように
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.spritesheet_plist);

        var backGroundSprite = cc.Sprite.create(cache.getSpriteFrame("background.png"));
        backGroundSprite.setPosition(240,160);
        backGroundSprite.setScale(5);   //スプライトの拡大・縮小(5倍)
        this.addChild(backGroundSprite);

        var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
        levelSprite.setPosition(240,110);
        levelSprite.setScale(5);
        this.addChild(levelSprite);
    }
});