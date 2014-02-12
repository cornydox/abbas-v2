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
        var img_sky            = loader.getResult("sky");
        var img_mountains      = loader.getResult("mountains");
        var img_bg_kl          = loader.getResult("bg_kl");
        var img_mt_kk          = loader.getResult("mt_kk");
        var img_base_01        = loader.getResult("base1");
        var img_base_02        = loader.getResult("base2");
        var img_base_03        = loader.getResult("base3");
        var img_base_04        = loader.getResult("base4");
        var img_back_grass_01  = loader.getResult("back_grass1");
        var img_back_grass_03  = loader.getResult("back_grass3");
        var img_back_grass_04  = loader.getResult("back_grass4");
        var img_front_grass_02 = loader.getResult("front_grass2");
        var img_abbas          = loader.getResult("abbas");

        sky          = new createjs.Shape();

        mountains    = new createjs.Shape();
        bg_kl        = new createjs.Shape();
        mt_kk        = new createjs.Shape();
        
        base1        = new createjs.Shape();
        base4        = new createjs.Shape();
        
        front_grass2 = new createjs.Shape();

        back_grass1  = new createjs.Shape();
        back_grass3  = new createjs.Shape();
        back_grass4  = new createjs.Shape();
        
        sky.width          = img_sky.width;
        mountains.width    = img_mountains.width;
        bg_kl.width        = img_bg_kl.width;
        mt_kk.width        = img_mt_kk.width;
        base1.width        = img_base_01.width;
        base4.width        = img_base_04.width;
        front_grass2.width = img_front_grass_02.width;
        
        back_grass1.width  = img_back_grass_01.width;
        back_grass3.width  = img_back_grass_03.width;
        back_grass4.width  = img_back_grass_04.width;

        // Paint to canvas
        sky.graphics.beginBitmapFill(img_sky).drawRect(0,0,PLAYGROUND_WIDTH+img_sky.width,img_sky.height);
        mountains.graphics.beginBitmapFill(img_mountains).drawRect(PLAYGROUND_WIDTH,0,img_mountains.width,img_mountains.height);
        bg_kl.graphics.beginBitmapFill(img_bg_kl).drawRect(img_bg_kl.width*2,0,img_bg_kl.width,img_bg_kl.height);
        mt_kk.graphics.beginBitmapFill(img_mt_kk).drawRect(img_mt_kk.width*3,0,img_mt_kk.width,img_mt_kk.height);

        base1.graphics.beginBitmapFill(img_base_01).drawRect(0, 0, img_base_01.width + PLAYGROUND_WIDTH,img_base_01.height);
        base4.graphics.beginBitmapFill(img_base_04).drawRect(0, 0, img_base_04.width + PLAYGROUND_WIDTH,img_base_04.height);
        
        back_grass3.graphics.beginBitmapFill(img_back_grass_03).drawRect(0, 0, img_back_grass_03.width,img_back_grass_03.height);
        back_grass4.graphics.beginBitmapFill(img_back_grass_04).drawRect(img_back_grass_03.width, 0, img_back_grass_04.width,img_back_grass_04.height);
        back_grass1.graphics.beginBitmapFill(img_back_grass_01).drawRect(img_back_grass_03.width + img_back_grass_04.width,0,PLAYGROUND_WIDTH + img_back_grass_01.width,img_back_grass_01.height);
        
        front_grass2.graphics.beginBitmapFill(img_front_grass_02).drawRect(0,0,img_front_grass_02.width + PLAYGROUND_WIDTH,img_front_grass_02.height);

        base4.setTransform(img_base_01.width,0,1,1);

        // console.log(base2.x);

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

        stage.addChild(sky, mountains, bg_kl, mt_kk, base1, base4, back_grass3, back_grass4, back_grass1, front_grass2, abbas);
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

            sky.x         = (sky.x - delta_s * boost) % sky.width;
            mountains.x   = (mountains.x - delta_s * 1.2 * boost) % (mountains.width * 2);
            bg_kl.x       = (bg_kl.x - delta_s * 2.2 * boost) % (bg_kl.width * 3);
            mt_kk.x       = (mt_kk.x - delta_s * 1.6 * boost) % (mt_kk.width * 4);
            
            base1.x = (base1.x - delta_s * 3 * boost) % (base1.width * 2);
            base4.x = (base4.x - delta_s * 3 * boost) % (base1.width * 2);

            back_grass1.x = (back_grass1.x - delta_s * 3.5 * boost) % (back_grass1.width * 3);
            back_grass3.x = (back_grass3.x - delta_s * 3.5 * boost) % (back_grass1.width * 3 );
            back_grass4.x = (back_grass4.x - delta_s * 3.5 * boost) % (back_grass1.width * 3 );

            front_grass2.x = (front_grass2.x - delta_s * 10 * boost) % (front_grass2.width);

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
