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

var startTouch;
var endTouch;
var swipeTolerance = 10;


var gameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegin: function(touch,event){
        startTouch = touch.getLocation();
        return true;
    },
    onTouchEnd: function(touch,event){
        endTouch = touch.getLocation();
        swipeDirection();
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

        //プレイヤーと木箱の配置
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

        cc.eventManager.addListener(listener,this);
    }
});




//グローバル関数
function swipeDirection(){
    var distX = statrTouch.x - endTouch.x;
    var distY = statrTouch.y - endTouch.y;

    //10px以上で有効なスワイプと見なす
    if((Math.abs(distX) + Math.abs(distY)) > swipeTolerance) {
        if(Math.abs(distX) > Math.abs(distY)){
            //左への移動
            if(distX > 0){
                move(-1,0);
                //playerSprite.setPosition(playerSprite.getPosition().x - 25, playerSprite.getPosition().y);
            //右への移動
            }else{
                move(1,0);
                // playerSprite.setPosition(playerSprite.getPosition().x + 25, playerSprite.getPosition().y);
            }
        }else{
            //下への移動
            if(distY > 0){
                move(0,-1);
                //playerSprite.setPosition(playerSprite.getPosition().x, playerSprite.getPosition().y - 25);
            //上への移動
            }else{
                move(0,1);
                //playerSprite.setPosition(playerSprite.getPosition().x, playerSprite.getPosition().y + 25);
            }
        }
    }
}

function move(deltaX, deltaY){
    switch(level[playerPosition.y+deltaY][playerPosition.x+deltaX]){
        //隣のセルが床かゴール
        case 0:
        case 2:
            level[playerPosition.y][playerPosition.x] -= 4;
            playserPosition.x += deltaX();
            playserPosition.y += deltaY();
            level[playerPosition.y][playerPosition.x] += 4;
            playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
            break;
        //隣のセルが木箱
        case 3:
        case 5:
            //2個となりのセルが床かゴールの時だけ移動
            if(level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==0
            || level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==2){
                level[playerPosition.y][playerPosition.x] -= 4;
                playserPosition.x += deltaX();
                playserPosition.y += deltaY();
                level[playerPosition.y][playerPosition.x] += 1;//+4の間違いでは?
                playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
                level[playerPosition.y+deltaY][playerPosition.x+deltaX] += 3;
                var movingCrate = cratesArray[playerPosition.y][playerPositon.x];
                movingCrate.setPosition(movingCrate.getPosition().x+25*deltaX, movingCrate.getPosition().y-25*deltaY);
                cratesArray[playerPosition.y+deltaY][playerPosition.x+deltaX] = movingCrate;
                cratesArray[playerPosition.y][playerPosition.x] = null;
                break;
            }
    }
}