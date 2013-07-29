function Game(){
    this.init = function(){
        var element = document.getElementById("welcome");
        element.parentNode.removeChild(element);

        stage = new createjs.Stage("playground"); // Init canvas
        createjs.Touch.enable(stage); // Enable touch event

        PLAYGROUND_HEIGHT = stage.canvas.height;
        PLAYGROUND_WIDTH  = stage.canvas.width;

        path = "assets/img/default/";

        var manifest = [
            {src:path + "abbass.png", id:"abbas"},
            {src:path + "coins.png", id:"coins"},
            {src:path + "crow.png", id:"crow"},
            {src:path + "bg_sky.png", id:"sky"},
            {src:path + "bg_base.png", id:"base"},
            {src:path + "bg_mountains.png", id:"mountains"},
            {src:path + "bg_clouds.png", id:"clouds"},
            {src:path + "bg_grass.png", id:"grass"}
        ];
        util.initControls();

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", this.populate);
        loader.loadManifest(manifest);
    };

    this.populate = function(){
        var img_sky       = loader.getResult("sky");
        var img_clouds    = loader.getResult("clouds");
        var img_base      = loader.getResult("base");
        var img_mountains = loader.getResult("mountains");
        var img_grass     = loader.getResult("grass");
        var img_abbas     = loader.getResult("abbas");
        var img_coins     = loader.getResult("coins");

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

        // Abbas animation
        var sprite_sheet = new createjs.SpriteSheet({
            "images": [img_abbas],
            "frames": {"regX": -60, "height": img_abbas.height, "count": 0, "regY": 0, "width": img_abbas.width},
            "animations": {fly: 0}
        });
        abbas = new createjs.BitmapAnimation(sprite_sheet);
        abbas.setTransform(0, 0, 0.5, 0.5);
        abbas.data = new Abbas();
        abbas.gotoAndPlay("fly");

        stage.addChild(sky, clouds, mountains, base, grass, abbas);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tick); // Start Game...
    };

    function tick(event){
        var delta_s = event.delta/1000*100;

        sky.x       = (sky.x - delta_s) % sky.width;
        clouds.x    = (clouds.x - delta_s*1.5) % clouds.width;
        mountains.x = (mountains.x - delta_s*2) % mountains.width;
        base.x      = (base.x - delta_s*3.5) % base.width;
        grass.x     = (grass.x - delta_s*10) % grass.width;

        util.abbasMovement(delta_s);
        util.generateCrow(delta_s);
        util.generateCoins(delta_s);

        stage.update();

        // Display fps
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
    }
}
