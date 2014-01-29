function Game(){
    this.init = function(){
        $("#welcome,.content-instruction").hide();
        $(elem.hud).show();
        $(elem.pause_play).show();

        stage = new createjs.Stage("playground"); // Init canvas
        createjs.Touch.enable(stage); // Enable touch event

        PLAYGROUND_HEIGHT = stage.canvas.height;
        PLAYGROUND_WIDTH  = stage.canvas.width;
        
        bgmusic = createjs.Sound.play("bgm", {loop: -1});
        bgmusic.volume = 0.5;

        util.initControls();
        this.populate();
    };


    this.populate = function(){
        var img_sky       = loader.getResult("sky");
        var img_base      = loader.getResult("base");
        var img_grass     = loader.getResult("grass");
        var img_abbas     = loader.getResult("abbas");

        sky       = new createjs.Shape();
        base      = new createjs.Shape();
        grass     = new createjs.Shape();

        sky.width       = img_sky.width;
        base.width      = img_base.width;
        grass.width     = img_grass.width;

        // Paint to canvas
        sky.graphics.beginBitmapFill(img_sky).drawRect(0,0,PLAYGROUND_WIDTH+img_sky.width,img_sky.height);
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

        stage.addChild(sky, base, grass, abbas);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

        createjs.Ticker.setFPS(60);
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
        }
        else{
            createjs.Ticker.setPaused(false);
        }
        
    };

    function tick(event){
        if( !createjs.Ticker.getPaused() ){
            delta_s = event.delta/1000*100;
            boost   = abbas.data.getBoost();

            sky.x       = (sky.x - delta_s * boost) % sky.width;
            base.x      = (base.x - delta_s * 3.5 * boost) % base.width;
            grass.x     = (grass.x - delta_s * 10 * boost) % grass.width;

            abbas.data.movement(delta_s);
            abbas.data.stats();
            util.crowMovement(delta_s);
            util.coinMovement(delta_s);
            util.goldMovement(delta_s);
            util.energyMovement(delta_s);
            util.multiplierMovement(delta_s);

            stage.update();
        }

    }
}
