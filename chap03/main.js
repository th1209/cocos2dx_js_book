

cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading"))
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(false);
    cc.view.adjustViewPort(true);
    //画面を横向きに
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new gameScene());
    }, this);
};
cc.game.run();