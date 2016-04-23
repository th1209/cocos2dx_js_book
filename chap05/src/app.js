var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function () {
        this._super();
        this.audioEngine = cc.audioEngine;
        var playSoundMenu = new cc.MenuItemFont.create("Play Sound effect",this.playSound,this);
        playSoundMenu.setPosition(new cc.Point(0,350));
        var playBGMusicMenu = new cc.MenuItemFont.create("Play BG music",this.playBGMusic,this);
        playBGMusicMenu.setPosition(new cc.Point(0,300));
        var stopBGMusicMenu = new cc.MenuItemFont.create("Stop BG music",this.stopBGMusic,this);
        stopBGMusicMenu.setPosition(new cc.Point(0,250));
        var musicUpMenu = new cc.MenuItemFont.create("Music volume Up",this.musicUp,this);
        musicUpMenu.setPosition(new cc.Point(0,200));
        var musicDownMenu = new cc.MenuItemFont.create("Music volume Down",this.musicDown,this);
        musicDownMenu.setPosition(new cc.Point(0,150));
        var effectsUpMenu = new cc.MenuItemFont.create("Effects volume Up",this.effectsUp,this);
        effectsUpMenu.setPosition(new cc.Point(0,100));
        var effectsDownMenu = new cc.MenuItemFont.create("Effects volume Down",this.effectsDown,this);
        effectsDownMenu.setPosition(new cc.Point(0,50));
        var menu = cc.Menu.create(playSoundMenu,playBGMusicMenu,stopBGMusicMenu,musicUpMenu,musicDownMenu,effectsUpMenu,effectsDownMenu);
        menu.setPosition(new cc.Point(160,40));
        this.addChild(menu);
    },
    playSound:function(){
        this.audioEngine.playEffect(res.bang_mp3);
    },
    playBGMusic:function(){
        if(!this.audioEngine.isMusicPlaying()){
            this.audioEngine.playMusic(res.loop_mp3,true);
        }
    },
    stopBGMusic:function(){
        if(this.audioEngine.isMusicPlaying()){
            this.audioEngine.stopMusic();
        }
    },
    musicUp:function(){
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()+0.1);
    },
    musicDown:function(){
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()-0.1);
    },
    effectsUp:function(){
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()+0.1);
    },
    effectsDown:function(){
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()-0.1);
    }
});


// var gameScene = cc.Scene.extend({
//     onEnter:function(){
//         this._super();
//         gameLayer = new game();
//         gameLayer.init();
//         this.addChild(gameLayer);
//     }
// });
//
// var game = cc.Layer.extend({
//     init: function(){
//         this._super();
//
//         //audioEngineを使って、音声を再生する(唯一のグローバルオブジェクト?)
//         this.audioEngine = cc.audioEngine;
//
//         var playSoundMenu = new cc.MenuItemFont.create("Play Sound Effect", this.playSound, this);
//         playSoundMenu.setPosition(new cc.Point(0, 350));
//
//         var playBGMusicMenu = new cc.MenuItemFont.create("Play BG music", this.playBGMusic, this);
//         playBGMusicMenu.setPosition(new cc.Point(0, 300));
//
//         var stopBGMusicMenu = new cc.MenuItemFont.create("Stop BG music", this.stopBGMusic, this);
//         stopBGMusicMenu.setPosition(new cc.Point(0, 250));
//
//         var musicUpMenu = new cc.MenuItemFont.create("Music volume Up", this.musicUp, this);
//         musicUpMenu.setPosition(new cc.Point(0, 200));
//
//         var musicDownMenu = new cc.MenuItemFont.create("Music volume Down", this.musicDown, this);
//         musicDownMenu.setPosition(new cc.Point(0, 150));
//
//         var effectsUpMenu = new cc.MenuItemFont.create("Effects volume Up", this.effectsUp, this);
//         effectsUpMenu.setPosition(new cc.Point(0, 100));
//
//         var effectsDownMenu = new cc.MenuItemFont.create("Effects volume Down", this.effectsDown, this);
//         effectsDownMenu.setPosition(new cc.Point(0, 50));
//
//         //Menuクラスに、各MenuItemFontを渡す
//         var menu = cc.Menu.create(playSoundMenu,playBGMusicMenu,stopBGMusicMenu,musicUpMenu,musicDownMenu,effectsUpMenu,effectsDownMenu);
//
//         menu.setPosition(new cc.Point(160,40));
//         this.addChild(menu);
//     },
//     playSound:function(){
//         this.audioEngine.playEffect(res.bang_mp3);
//     },
//     playBGMusic:function(){
//         if(!this.audioEngine.isMusicPlaying()){
//             //第二引数trueで、ループを有効にする
//             this.audioEngine.playEffect(res.loop_mp3,true);
//         }
//     },
//     stopBGMusic:function(){
//         if(this.audioEngine.isMusicPlaying()){
//             this.audioEngine.stopMusic();
//         }
//     },
//     musicUp:function(){
//         this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()+0.1);
//     },
//     musicDown:function(){
//         this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()-0.1);
//     },
//     effectsUp:function(){
//         this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()+0.1);
//     },
//     effectsDown:function(){
//         this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()-0.1);
//     }
// });