var level = [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,0,1],
    [1,1,3,0,2,0,1],
    [1,0,0,4,0,0,1],
    [1,0,3,1,2,0,1],
    [1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1],
];
var cratesArray = [];
var playerPosition;
var playerSprite;

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
        backGroundSprite.getTexture().setAliasTexParameters();//アンチエイリアス処理(スプライトシートの場合、シート内全画像に影響)
        backGroundSprite.setPosition(240,160);
        backGroundSprite.setScale(5);   //スプライトの拡大・縮小(5倍)
        this.addChild(backGroundSprite);

        var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
        levelSprite.setPosition(240,110);
        levelSprite.setScale(5);
        this.addChild(levelSprite);

        for(i = 0; i < 7; i++){
            cratesArray[i] = [];
            for(j = 0; j < 7; j++){
                switch(level[i][j]){
                    //プレイヤーの配置
                    case 4:
                    case 6:
                        playerSprite = cc.Sprite.create(cache.getSpriteFrame("player.png"));
                        playerSprite.setPosition(165+25*j,185-25*i);
                        playerSprite.setScale(5);
                        this.addChild(playerSprite);
                        playerPosition = {x:j, y:i};
                        cratesArray[i][j] = null;
                        break;
                    //木箱の配置
                    case 3:
                    case 5:
                        var crateSprite = cc.Sprite.create(cache.getSpriteFrame("crate.png"));
                        crateSprite.setPosition(165+25*j,185-25*i);
                        crateSprite.setScale(5);
                        this.addChild(crateSprite);
                        cratesArray[i][j] = crateSprite;
                        break;
                    default:
                        cratesArray[i][j] = null;
                }
            }
        }
    }
});