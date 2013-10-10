function Game(){
    this.init = function(){
        $(elem.loader).fadeIn();
        $("#welcome,.content-instruction").hide();

        stage = new createjs.Stage("playground"); // Init canvas
        createjs.Touch.enable(stage); // Enable touch event

        PLAYGROUND_HEIGHT = stage.canvas.height;
        PLAYGROUND_WIDTH  = stage.canvas.width;

        path = "assets/img/min/";

        var manifest = [
            {src:path + "abbas.png", id:"abbas"},
            {src:path + "coins.png", id:"coins"},
            {src:path + "gold.png", id:"gold"},
            {src:path + "crow-new.png", id:"crow"},
            {src:path + "sky.png", id:"sky"},
            {src:path + "base.png", id:"base"},
            {src:path + "mountain.png", id:"mountains"},
            {src:path + "clouds.png", id:"clouds"},
            {src:path + "grass.png", id:"grass"},
            {src:path + "energy.png", id:"energy"},
            {src:path + "multiplier.png", id:"multiplier"}
        ];

        this.initSounds();

        util.initControls();

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", this.populate);
        loader.loadManifest(manifest);
    };

    this.initSounds = function(){
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
        audio_path = "assets/sounds/";
        var sounds = [
            {id:"bgm", src:audio_path + "18.mp3|"+audio_path + "18.ogg"},
            {id:"boostfx", src:audio_path + "boost.mp3|"+audio_path + "boost.ogg"},
            {id:"clickfx", src:audio_path + "click.mp3|"+audio_path + "click.ogg"},
            {id:"coinfx", src:audio_path + "coin.mp3|"+audio_path + "coin.ogg"},
            {id:"hitfx", src:audio_path + "hit.mp3|"+audio_path + "hit.ogg"},
            {id:"energyfx", src:audio_path + "energy.mp3|"+audio_path + "energy.ogg"},
            {id:"multiplierfx", src:audio_path + "multiplier.mp3|"+audio_path + "multiplier.ogg"},
        ];
        
        createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event 
        createjs.Sound.registerManifest(sounds);

    };

    function soundLoaded(event) {
        createjs.Sound.play("bgm",createjs.Sound.INTERRUPT_NONE, 0, 0, true, 1);
    }


    this.populate = function(){
        $(elem.loader).hide();
        //$(elem.loader).remove();
        $(elem.hud).show();
        var img_sky       = loader.getResult("sky");
        var img_clouds    = loader.getResult("clouds");
        var img_base      = loader.getResult("base");
        var img_mountains = loader.getResult("mountains");
        var img_grass     = loader.getResult("grass");
        var img_abbas     = loader.getResult("abbas");

        sky       = new createjs.Shape();
        clouds    = new createjs.Shape();
        mountains = new createjs.Shape();
        base      = new createjs.Shape();
        grass     = new createjs.Shape();

        sky.width       = img_sky.width;
        clouds.width    = img_clouds.width;
        mountains.width = img_mountains.width;
        base.width      = img_base.width;
        grass.width     = img_grass.width;

        // Paint to canvas
        sky.graphics.beginBitmapFill(img_sky).drawRect(0,0,PLAYGROUND_WIDTH+img_sky.width,img_sky.height);
        clouds.graphics.beginBitmapFill(img_clouds).drawRect(0,0,PLAYGROUND_WIDTH+img_clouds.width,img_clouds.height);
        mountains.graphics.beginBitmapFill(img_mountains).drawRect(0,0,PLAYGROUND_WIDTH+img_mountains.width,img_mountains.height);
        base.graphics.beginBitmapFill(img_base).drawRect(0,0,PLAYGROUND_WIDTH+img_base.width,img_base.height);
        grass.graphics.beginBitmapFill(img_grass).drawRect(0,0,PLAYGROUND_WIDTH+img_grass.width,img_grass.height);
        grass.setTransform(0,350,1,1);

        // Abbas animation
        var sprite_sheet = new createjs.SpriteSheet({
            "images": [img_abbas],
            "frames": {"regX": 0, "height": img_abbas.height, "count": 3, "regY": 0, "width": img_abbas.width/3},
            "animations": {fly: 0, up: 1, glide: 2}
        });
        abbas = new createjs.BitmapAnimation(sprite_sheet);
        abbas.setTransform(60, 0, 0.6, 0.6);
        abbas.data = new Abbas();
        abbas.gotoAndPlay("fly");

        util.generateCrow();
        util.generateCoins();
        util.generateGold();
        util.generateEnergy();
        util.generateMultiplier();

        stage.addChild(sky, clouds, mountains, base, abbas, grass);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tick); // Start Game...
    };

    function tick(event){
        var delta_s = event.delta/1000*100;
        var boost = 1;

        if( abbas.data.getBoost() === true ){
            boost = MULTIPLIER;
        }

        if( !createjs.Ticker.getPaused() ){
            sky.x       = (sky.x - delta_s * boost) % sky.width;
            clouds.x    = (clouds.x - delta_s * 1.5 * boost) % clouds.width;
            mountains.x = (mountains.x - delta_s * 2 * boost) % mountains.width;
            base.x      = (base.x - delta_s * 3.5 * boost) % base.width;
            grass.x     = (grass.x - delta_s * 10 * boost) % grass.width;

            util.abbasMovement(delta_s);
            util.abbasStats();
            util.crowMovement(delta_s);
            util.coinMovement(delta_s);
            util.goldMovement(delta_s);
            util.energyMovement(delta_s);
            util.multiplierMovement(delta_s);
        }


        stage.update();

    }
}
