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
        bgmusic.volume = 0.3;

        util.initControls();
        this.populate();
    };


    this.populate = function(){
        var img_sky            = loader.getResult("sky");
        var img_mountains      = loader.getResult("mountains");
        var img_bg_kl          = loader.getResult("bg_kl");
        var img_mt_kk          = loader.getResult("mt_kk");
        var img_base_01        = loader.getResult("base1");
        var img_base_02        = loader.getResult("base2");
        var img_base_03        = loader.getResult("base3");
        var img_base_04        = loader.getResult("base4");
        var img_back_grass_01  = loader.getResult("back_grass2");
        var img_back_grass_02  = loader.getResult("back_grass3");
        var img_back_grass_03  = loader.getResult("back_grass4");
        var img_back_grass_04  = loader.getResult("back_grass1");
        var img_front_grass_02 = loader.getResult("front_grass3");
        var img_abbas          = loader.getResult("abbas");

        sky = new createjs.Bitmap(img_sky);
        sky.scaleX = (PLAYGROUND_WIDTH/img_sky.width) + 1;

        mountains = new createjs.Bitmap(img_mountains);
        mountains.x = PLAYGROUND_WIDTH;

        bg_kl = new createjs.Bitmap(img_bg_kl);
        bg_kl.x = img_bg_kl.width*2;

        mt_kk = new createjs.Bitmap(img_mt_kk);
        mt_kk.x = img_mt_kk.width*3;

        base1 = new createjs.Bitmap(img_base_01);
        base2 = new createjs.Bitmap(img_base_02);
        base3 = new createjs.Bitmap(img_base_03);
        base4 = new createjs.Bitmap(img_base_04);
        base2.x = img_base_01.width;
        base3.x = img_base_01.width * 2;
        base4.x = img_base_01.width * 3;
        
        back_grass1 = new createjs.Bitmap(img_back_grass_01);
        back_grass2 = new createjs.Bitmap(img_back_grass_02);
        back_grass3 = new createjs.Bitmap(img_back_grass_03);
        back_grass4 = new createjs.Bitmap(img_back_grass_04);
        back_grass2.x = img_back_grass_01.width;
        back_grass3.x = img_back_grass_01.width * 2;
        back_grass4.x = img_back_grass_01.width * 3;

        front_grass2 = new createjs.Bitmap(img_front_grass_02);
        front_grass2.scaleX = 2.1;
        
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

        stage.addChild(sky, mountains, bg_kl, mt_kk, base1, base2, back_grass1, back_grass2, front_grass2, abbas);

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

            sky.x         = (sky.x - delta_s * boost) % sky.image.width;
            mountains.x   = (mountains.x - delta_s * 1.2 * boost) % (mountains.image.width * 2);
            bg_kl.x       = (bg_kl.x - delta_s * 2.2 * boost) % (bg_kl.image.width * 3);
            mt_kk.x       = (mt_kk.x - delta_s * 1.6 * boost) % (mt_kk.image.width * 4);
            
            base1.x = (base1.x - delta_s * 3 * boost);
            base2.x = (base2.x - delta_s * 3 * boost);
            base3.x = (base3.x - delta_s * 3 * boost);
            base4.x = (base4.x - delta_s * 3 * boost);
            
            back_grass1.x = (back_grass1.x - delta_s * 3.5 * boost);
            back_grass2.x = (back_grass2.x - delta_s * 3.5 * boost);
            back_grass3.x = (back_grass3.x - delta_s * 3.5 * boost);
            back_grass4.x = (back_grass4.x - delta_s * 3.5 * boost);

            front_grass2.x = (front_grass2.x - delta_s * 10 * boost) % (front_grass2.image.width);

            abbas.data.movement(delta_s);
            abbas.data.stats();
            util.crowMovement(delta_s);
            util.coinMovement(delta_s);
            util.goldMovement(delta_s);
            util.energyMovement(delta_s);
            util.multiplierMovement(delta_s);
            util.rotateBase();
            util.rotateBackGrass();

            stage.update();
            
            // Display FPS for debugging
            // document.getElementById("fps").innerHTML = Math.floor(createjs.Ticker.getMeasuredFPS());
        }

    }
}
