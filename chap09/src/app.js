/**
 * グローバル変数
 */
var xFieldSize = 6; //x座標のglobezの個数
var yFieldSize = 6; //y座標のglobezの個数
var tileTypes  = ["red","green","blue","grey","yellow"];
var tileSize   = 50; //globez一個あたりのピクセル数(縦横両方)
var tileArray  = []; //ここにglobezオブジェクトを格納
var backGroundLayer;
var globezLayer;    //globezSpriteは、このレイヤーに貼付ける
var arrowsLayer;    //マウスの軌跡を描画するレイヤー
var startColor = null;
var visitTiles = [];
var tolerance  = 20; //タッチ時に許容する中心からのピクセル数(縦横両方)。
                     //普通は我慢、耐久とかの意味だが、ここでは許容誤差を示す。ゲームだとこっちの意味をよく使う。



var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function (){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.globes_plist, res.globes_png);

        backGroundLayer =  cc.LayerGradient.create(
            cc.color(0x00, 0x22, 0x22, 255),
            cc.color(0x22, 0x00, 0x44, 255)
        );
        this.addChild(backGroundLayer);

        globezLayer = cc.Layer.create();
        this.addChild(globezLayer);

        arrowsLayer = cc.DrawNode.create();
        this.addChild(arrowsLayer);

        this.createLevel();

        cc.eventManager.addListener(touchListener, this);
    },
    createLevel:function (){
        for(var y = 0; y < yFieldSize  ;y++){
            tileArray[y] = [];
            for(var x = 0; x < xFieldSize  ;x++){
                this.addTile(y, x);
            }
        }
    },
    addTile:function (row, col) {
        var randomTile = Math.floor(Math.random() * tileTypes.length); //0-lengthの値をランダム生成

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tileTypes[randomTile]);
        var sprite = cc.Sprite.createWithSpriteFrame(spriteFrame);
        sprite.val = randomTile;
        sprite.picked = false;

        globezLayer.addChild(sprite, 0);
        sprite.setPosition(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2)

        tileArray[row][col] = sprite;
    }
});

var touchListener = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    onMouseDown: function (event) {
        var pickedRow = Math.floor(event._y / tileSize);
        var pickedCol = Math.floor(event._x / tileSize);

        tileArray[pickedRow][pickedCol].setOpacity(128);
        tileArray[pickedRow][pickedCol].picked = true;

        startColor = tileArray[pickedRow][pickedCol].val;

        visitTiles.push({
            row: pickedRow,
            col: pickedCol
        });
    },
    onMouseMove: function(event){
        //startColorがnullならダメ
        if(startColor == null){
            return;
        }

        //必要な値は先に計算しておく
        var currentRow = Math.floor(event._y / tileSize);
        var currentCol = Math.floor(event._x / tileSize);
        var centerY = currentRow * tileSize + tileSize / 2;
        var centerX = currentCol * tileSize + tileSize / 2;
        var distY = event._y - centerY;
        var distX = event._x - centerX;

        //許容範囲外ならダメ(ピタゴラスの定理)
        //これよく使うと思うので、覚えておくこと
        if((distX * distX) + (distY * distY) > (tolerance * tolerance)){
            return;
        }

        this.drawPath();

        //タイルが隣接していないならダメ
        var tileYDiff = Math.abs(currentRow - visitTiles[visitTiles.length - 1].row);
        var tileXDiff = Math.abs(currentCol - visitTiles[visitTiles.length - 1].col);
        if(! (tileYDiff <= 1 && tileXDiff <= 1)){
            return;
        }

        //最初にタッチしたタイルと違う色ならダメ
        if(tileArray[currentRow][currentCol].val !== startColor) {
            return;
        }

        //未選択のタイル
        if(! tileArray[currentRow][currentCol].picked) {
            //選択したタイルに対し処理実施
            tileArray[currentRow][currentCol].setOpacity(128);
            tileArray[currentRow][currentCol].picked = true;
            visitTiles.push({
                row:currentRow,
                col:currentCol
            });
        }else{
            //選択したタイルが、一つ前のタイルと一致
            if(visitTiles.length >= 2 &&
               currentRow == visitTiles[visitTiles.length - 2].row &&
               currentCol == visitTiles[visitTiles.length - 2].col){
                //最新のタイルを破棄する
                var recentTileRow = visitTiles[visitTiles.length - 1].row;
                var recentTileCol = visitTiles[visitTiles.length - 1].col;
                tileArray[recentTileRow][recentTileCol].setOpacity(255);
                tileArray[recentTileRow][recentTileCol].picked = false;
                visitTiles.pop();
            }
        }
    },
    onMouseUp: function(event) {
        //軌跡の削除
        arrowsLayer.clear();

        startColor = null;
        for(i = 0; i< visitTiles.length; i++){
            if(visitTiles.length < 3){
                tileArray[visitTiles[i].row][visitTiles[i].col].setOpacity(255);
                tileArray[visitTiles[i].row][visitTiles[i].col].picked = false;
            }else{
                //タイルの削除処理
                globezLayer.removeChild(tileArray[visitTiles[i].row][visitTiles[i].col]);
                tileArray[visitTiles[i].row][visitTiles[i].col] = null;
            }
        }

        //タイルの落下処理
        if(visitTiles.length >= 3){
            for(y = 1; y < yFieldSize; y++){//yは、最下列は計算しなくてよい
                for(x = 0; x < xFieldSize; x++){
                    //削除されていないタイルのみ
                    if(tileArray[y][x] != null){
                        //下行に、何個削除されたタイルがあるか求める
                        var holesBellow = 0;
                        for(dY = y - 1; dY >= 0; dY--){
                            if(tileArray[dY][x] == null){
                                holesBellow++;
                            }
                        }
                        //落下処理
                        if(holesBellow > 0){
                            //落下アクション実行
                            var moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[y][x].x, tileArray[y][x].y - holesBellow * tileSize));
                            tileArray[y][x].runAction(moveAction);

                            //配列の値を置き換える
                            tileArray[y-holesBellow][x] = tileArray[y][x];
                            tileArray[y][x] = null;
                        }
                    }
                }
            }

        }

        //新規タイルの生成処理
        for(x = 0; x < xFieldSize; x++){
            for(y = yFieldSize-1; y >= 0; y--){
                if(tileArray[y][x] != null){//補足：前の落下処理で、タイルは全て落下した状態
                    break;
                }
            }
            var missingGlobes = (yFieldSize - 1) - y;//注意。for文で回した後のyを使っている
            if(missingGlobes > 0){
                for(y = 0; y < missingGlobes; y++){
                    this.fallTile(yFieldSize-1-y, x, missingGlobes - y);
                }
            }
        }
        visitTiles = [];
    },
    fallTile: function(row, col, height) {
        var randomTile = Math.floor(Math.random() * tileTypes.length);

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tileTypes[randomTile]);
        var sprite = cc.Sprite.createWithSpriteFrame(spriteFrame);
        sprite.val = randomTile;
        sprite.picked = false;

        globezLayer.addChild(sprite, 0);
        sprite.setPosition(col*tileSize+tileSize/2, (yFieldSize+height) * tileSize);//最初のy座標は、yFieldSize * tileSizeでスプライトを生成しておく

        var moveAction = cc.MoveTo.create(0.5, new cc.Point(col*tileSize+tileSize/2, row*tileSize+tileSize/2));
        sprite.runAction(moveAction);

        tileArray[row][col] = sprite;
    },
    drawPath: function(){
      arrowsLayer.clear();
      if(visitTiles.length > 0){
        for(var i = 1; i<visitTiles.length; i++){
            arrowsLayer.drawSegment(
                new cc.Point(visitTiles[i-1].col * tileSize + tileSize/2, visitTiles[i-1].row * tileSize + tileSize/2),
                new cc.Point(visitTiles[i].col * tileSize + tileSize/2,   visitTiles[i].row * tileSize + tileSize/2),
                4,
                cc.color(255,255,255,128)
            );
        }
      }
    }
});


