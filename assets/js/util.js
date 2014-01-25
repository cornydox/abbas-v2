// Utilities / helper

var util = (function(){
    var mouse_timeout        = 0;
    var gold_on_screen       = false;
    var energy_on_screen     = false;
    var multiplier_on_screen = false;
    var crow_spawn_timeout   = 0;
    var coin_spawn_timeout   = 0;
    var gold_timeout         = 0;
    var energy_timeout       = 0;
    var multiplier_timeout   = 0;
    var min_spawn_rate       = 0;
    var max_spawn_rate       = 0;    
    var max_speed            = 0;

    return{
        initControls: function(){
            stage.onPress = function(evt) {
                if( abbas.data.getEnergy() > 0 ){
                    // On mouse hold, abbas hover / fly constant
                    mouse_timeout = setTimeout(function(){
                        abbas.data.setFlying(true);
                        abbas.gotoAndPlay("up");
                    }, 100);

                    // On mouse release
                    evt.onMouseUp = function(evt){
                        util.clearMouse();
                        abbas.data.setFlying(false);
                        abbas.gotoAndPlay("fly");
                    };

                }

            };
        },

        clearMouse: function(){
            clearTimeout(mouse_timeout);
        },

        getRandom: function(from, to){
            return Math.floor(Math.random()*(to-from-1) + from);
        },

        gameOver: function(){
            createjs.Ticker.setPaused(true);
            $("#gameover_1").fadeIn();

            setTimeout(function(){
                $("#gameover_1").fadeOut();
                gameover.showScore();
            },2000);
            
        },

        levelCheck: function(){
            var current_distance = abbas.data.getDistance();

            if(current_distance < 650){
                min_spawn_rate = 650;
                max_spawn_rate = 1900;
                max_speed      = 5;
            }
            else if(current_distance < 1200){
                min_spawn_rate = 400;
                max_spawn_rate = 1400;
                max_speed      = 7;
            }
            else if(current_distance < 1900){
                min_spawn_rate = 150;
                max_spawn_rate = 1200;
                max_speed      = 9;
            }
            else{
                min_spawn_rate = 100;
                max_spawn_rate = 1000;
                max_speed      = 10;
            }
        },

        generateCrow: function(){
            util.levelCheck();

            var spawn_chance = util.getRandom(min_spawn_rate, max_spawn_rate);

            crow_spawn_timeout = setTimeout(function(){
                if( abbas.data.isBoosting() === false ){
                    var img_crow    = loader.getResult("crow");

                    var spriteSheet = new createjs.SpriteSheet({
                        "images": [img_crow],
                        "frames": {"regX": 0, "height": img_crow.height, "count": 2, "regY": 0, "width": img_crow.width/2},
                        "animations": {fly:[0,1,"fly",5.5]}
                    });
                    crow.push(new createjs.BitmapAnimation(spriteSheet));
                    crow[crow.length-1].setTransform(PLAYGROUND_WIDTH,abbas.y,0.6,0.6);
                    crow[crow.length-1].gotoAndPlay("fly");
                    crow[crow.length-1].data = new Crow(crow.length-1, max_speed);

                    stage.addChild(crow[crow.length-1]);

                    // console.log("spawn! " + spawn_chance);
                }

                util.generateCrow();
            }, spawn_chance);

        },

        crowMovement: function(delta_s){
            for(var i in crow){
                if(crow[i].x < -PLAYGROUND_WIDTH){
                    stage.removeChild(crow[i]);
                    delete crow[i];
                    // console.log("Bird removed!");
                }
                else{
                    var col = crow[i].localToLocal(5, 25, abbas);
                    if( abbas.hitTest(col.x, col.y) ){ abbas.data.hit(); }
                    crow[i].data.update(delta_s);
                }
            }
        },

        removeAllCrows: function(){
            for(var i in crow){
                stage.removeChild(crow[i]);
                delete crow[i];
            }
        },

        generateCoins: function(){
            var spawn_chance = util.getRandom(1000,6000);

            coin_spawn_timeout = setTimeout(function(){
                var no_of_coins  = util.getRandom(7,14);
                var pos_y        = util.getRandom(10,300);

                var img_coin   = loader.getResult("coins");
                var coin_width = img_coin.width/5;
                var temp       = [];
                var pos_x      = PLAYGROUND_WIDTH + (no_of_coins*coin_width);
                for( var z = 0; z < no_of_coins; z++ ){
                    var speed = Math.floor(Math.random()*2) + 1;

                    temp.push(new createjs.SpriteSheet({
                        images: [img_coin],
                        frames: {"regX": 0, "height": 30, "count": 5, "regY": 0, "width": coin_width},
                        animations: {turn:[0,4,true,speed+2]}
                    }));

                    coin.push(new createjs.BitmapAnimation(temp[z]));
                    coin[coin.length-1].setTransform(pos_x,pos_y,0.7,0.7);
                    coin[coin.length-1].gotoAndPlay("turn");
                    coin[coin.length-1].data = new Coin(coin.length-1);
                    stage.addChild(coin[coin.length-1]);
                    pos_x = pos_x - coin_width;
                }

                util.generateCoins();
            }, spawn_chance);

        },

        coinMovement: function(delta_s){
            for(var i in coin){
                if(coin[i].x < -PLAYGROUND_WIDTH-180){
                    stage.removeChild(coin[i]);
                    delete coin[i];
                    // console.log("Coin removed!");
                }
                else{
                    var col = coin[i].localToLocal(0, 10, abbas);
                    if( abbas.hitTest(col.x, col.y) ){
                        abbas.data.coinify();
                        stage.removeChild(coin[i]);
                        delete coin[i];
                    }
                    else{
                        coin[i].data.update(delta_s);
                    }
                }
            }
        },

        removeAllCoins: function(){
            for(var i in coin){
                stage.removeChild(coin[i]);
                delete coin[i];
            }
        },

        generateGold: function(){
            if( gold_on_screen === false ){
                var spawn_chance = util.getRandom(10000,30000);

                gold_timeout = setTimeout(function(){
                    var img_gold = loader.getResult("gold");
                    var pos_y   = util.getRandom(10,300);
                    var pos_x   = PLAYGROUND_WIDTH + img_gold.width;

                    var sprite_sheet = new createjs.SpriteSheet({
                        "images": [img_gold],
                        "frames": {"regX": 0, "height": img_gold.height, "count": 1, "regY": 0, "width": img_gold.width},
                        "animations": {move: 0}
                    });
                    gold = new createjs.BitmapAnimation(sprite_sheet);
                    gold.setTransform(pos_x, 0, 1, 1);
                    gold.data = new Gold();
                    gold.gotoAndPlay("move");
                    stage.addChild(gold);

                    gold_on_screen = true;
                    // console.log("gold!");

                }, spawn_chance);
            }
        },

        goldMovement: function(delta_s){
            if( gold_on_screen === true ){
                if( gold.x < -PLAYGROUND_WIDTH) {
                    stage.removeChild(gold);
                    gold_on_screen = false;
                    util.generateGold();
                }
                else{
                    var col = gold.localToLocal(20, 20, abbas);
                    if( abbas.hitTest(col.x, col.y) ){
                        abbas.data.boostify();
                        stage.removeChild(gold);
                        util.generateGold();
                    }
                    else{
                        gold.data.update(delta_s);
                    }
                }
            }

        },

        generateEnergy: function(){
            if( energy_on_screen === false ){
                var spawn_chance = util.getRandom(4000,10000);

                energy_timeout = setTimeout(function(){
                    var img_energy = loader.getResult("energy");
                    var pos_y      = util.getRandom(10,300);
                    var pos_x      = PLAYGROUND_WIDTH + img_energy.width;

                    var sprite_sheet = new createjs.SpriteSheet({
                        "images": [img_energy],
                        "frames": {"regX": 0, "height": img_energy.height, "count": 1, "regY": 0, "width": img_energy.width},
                        "animations": {move: 0}
                    });
                    energy = new createjs.BitmapAnimation(sprite_sheet);
                    energy.setTransform(pos_x, 0, 1, 1);
                    energy.data = new Energy();
                    energy.gotoAndPlay("move");
                    stage.addChild(energy);

                    energy_on_screen = true;
                    // console.log("energy!");

                }, spawn_chance);
            }
        },

        energyMovement: function(delta_s){
            if( energy_on_screen === true ){
                if( energy.x < -PLAYGROUND_WIDTH) {
                    stage.removeChild(energy);
                    energy_on_screen = false;
                    util.generateEnergy();
                }
                else{
                    var col = energy.localToLocal(0, 5, abbas);
                    if( abbas.hitTest(col.x, col.y) ){
                        abbas.data.energize();
                        stage.removeChild(energy);
                        energy_on_screen = false;
                        util.generateEnergy();
                    }
                    else{
                        energy.data.update(delta_s);
                    }
                }
            }

        },

        generateMultiplier: function(){
            if( multiplier_on_screen === false ){
                var spawn_chance = util.getRandom(13000,25000);

                multiplier_timeout = setTimeout(function(){
                    var img_multiplier = loader.getResult("multiplier");
                    var pos_y          = util.getRandom(10,300);
                    var pos_x          = PLAYGROUND_WIDTH + img_multiplier.width;

                    var sprite_sheet = new createjs.SpriteSheet({
                        "images": [img_multiplier],
                        "frames": {"regX": 0, "height": img_multiplier.height, "count": 1, "regY": 0, "width": img_multiplier.width},
                        "animations": {move: 0}
                    });
                    coin_multiplier = new createjs.BitmapAnimation(sprite_sheet);
                    coin_multiplier.setTransform(pos_x, 0, 1, 1);
                    coin_multiplier.data = new CoinMultiplier();
                    coin_multiplier.gotoAndPlay("move");
                    stage.addChild(coin_multiplier);

                    multiplier_on_screen = true;
                    // console.log("energy!");

                }, spawn_chance);
            }
        },

        multiplierMovement: function(delta_s){
            if( multiplier_on_screen === true ){
                if( coin_multiplier.x < -PLAYGROUND_WIDTH) {
                    stage.removeChild(coin_multiplier);
                    multiplier_on_screen = false;
                    util.generateMultiplier();
                }
                else{
                    var col = coin_multiplier.localToLocal(0, 5, abbas);
                    if( abbas.hitTest(col.x, col.y) ){
                        abbas.data.multiply();
                        stage.removeChild(coin_multiplier);
                        multiplier_on_screen = false;
                        util.generateMultiplier();
                    }
                    else{
                        coin_multiplier.data.update(delta_s);
                    }
                }
            }

        },

        resetAllObjects: function(){
            coin = [];
            crow = [];
            clearTimeout(coin_spawn_timeout);
            clearTimeout(crow_spawn_timeout);
            clearTimeout(gold_timeout);
            clearTimeout(energy_timeout);
            clearTimeout(multiplier_timeout);
            delete window.abbas;
            delete window.energy;
            delete window.gold;
            delete window.coin_multiplier;
            energy_on_screen = gold_on_screen = multiplier_on_screen = false;
        }

    };
})();