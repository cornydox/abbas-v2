// Utilities / helper

var util = (function(){
    var mouse_timeout = 0;
    var gold_on_screen = false;

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
                        clearTimeout(mouse_timeout);
                        abbas.data.setFlying(false);
                        abbas.gotoAndPlay("fly");
                    };

                }

            };
        },

        getRandom: function(from, to){
            return Math.floor(Math.random()*(to-from-1) + from);
        },

        gameOver: function(){
            var paused = createjs.Ticker.getPaused();
            console.log(paused + " PAUSED?");
            createjs.Ticker.setPaused(true);
            console.log("gameOver");
        },

        abbasMovement: function(delta_s){
            var boost = 1;

            if( abbas.data.getBoost() === true ){
                boost = MULTIPLIER;
            }

            if(abbas.y < 350 && abbas.data.isFlying() === false){ // Abbas falling down 
                abbas.y = (abbas.y + delta_s / boost);
            }
            else if(abbas.y > 0 && abbas.data.isFlying() === true && abbas.data.getEnergy() > 0){ // Abbas fly, limit max height...
                abbas.y = (abbas.y - (delta_s * 2)/ boost);
            }
            else if(abbas.y > 350){
                util.abbasCrash(delta_s);
            }
            else{
                abbas.gotoAndPlay("glide");
            }
            abbas.data.updateDistance();

        },

        abbasHit: function(){
            abbas.y = (abbas.y + 100);
            abbas.data.damage();
        },

        abbasCrash: function(delta_s){
            abbas.data.setEnergy(0);
            abbas.y = (abbas.y - delta_s);
            setTimeout(function(){
                abbas.y = (abbas.y + delta_s * 1.5);
                util.removeAllCrows();
            }, 500);
            setTimeout(function(){
                util.gameOver();
            }, 1500);

        },

        abbasCoin: function(){
            abbas.data.plusCoin();
            document.getElementById("coin").innerHTML = "COIN : " + abbas.data.getCoin();
        },

        abbasGold: function(){
            abbas.data.setBoost(true);
            util.removeAllCrows();
            setTimeout(function(){
                abbas.data.setBoost(false);
            }, 3000);
        },

        abbasStats: function(){
            var energy   = abbas.data.getEnergy();
            var distance = abbas.data.getDistance();
            var width    = "width:"+ energy + "%";

            // document.getElementById("energy").innerHTML = "ENERGY : " + energy;
            document.getElementById("energy_bar").setAttribute("style", width);
            document.getElementById("distance").innerHTML = "DISTANCE : " + distance + " m";
            // Display fps
            document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        },

        generateCrow: function(){
            var spawn_chance = util.getRandom(100,2500);

            setTimeout(function(){
                if( abbas.data.getBoost() === false ){
                    var img_crow    = loader.getResult("crow");

                    var spriteSheet = new createjs.SpriteSheet({
                        "images": [img_crow],
                        "frames": {"regX": 0, "height": 80, "count": 2, "regY": 0, "width": 100},
                        "animations": {fly:[0,1,"fly",4.5]}
                    });
                    crow.push(new createjs.BitmapAnimation(spriteSheet));
                    crow[crow.length-1].setTransform(PLAYGROUND_WIDTH,abbas.y,0.5,0.5);
                    crow[crow.length-1].gotoAndPlay("fly");
                    crow[crow.length-1].data = new Crow(crow.length-1);

                    stage.addChild(crow[crow.length-1]);

                    console.log("spawn! " + spawn_chance);
                }

                util.generateCrow();
            }, spawn_chance);

        },

        crowMovement: function(delta_s){
            for(var i in crow){
                if(crow[i].x < -PLAYGROUND_WIDTH){
                    stage.removeChild(crow[i]);
                    delete crow[i];
                    console.log("Bird removed!");
                }
                else{
                    var col = crow[i].localToLocal(5, 20, abbas);
                    if( abbas.hitTest(col.x, col.y) ){ util.abbasHit(); }
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
            var spawn_chance = util.getRandom(1000,15000);

            setTimeout(function(){
                var no_of_coins  = util.getRandom(3,10);
                var pos_y        = util.getRandom(10,300);

                var img_coin = loader.getResult("coins");
                var coin_width = img_coin.width/5;
                var temp     = [];
                var pos_x = PLAYGROUND_WIDTH + (no_of_coins*coin_width);
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
                        util.abbasCoin();
                        stage.removeChild(coin[i]);
                        delete coin[i];
                    }
                    else{
                        coin[i].data.update(delta_s);
                    }
                }
            }
        },

        generateGold: function(){
            if( gold_on_screen === false ){
                var spawn_chance = util.getRandom(1000,3000);

                setTimeout(function(){
                    var img_gold = loader.getResult("gold");
                    var pos_y   = util.getRandom(10,300);
                    var pos_x   = PLAYGROUND_WIDTH + img_gold.width;

                    var sprite_sheet = new createjs.SpriteSheet({
                        "images": [img_gold],
                        "frames": {"regX": 0, "height": img_gold.height, "count": 1, "regY": 0, "width": img_gold.width},
                        "animations": {move: 0}
                    });
                    gold = new createjs.BitmapAnimation(sprite_sheet);
                    gold.setTransform(pos_x, 0, 0.3, 0.3);
                    gold.data = new Gold();
                    gold.gotoAndPlay("move");
                    stage.addChild(gold);

                    gold_on_screen = true;
                    console.log("gold!");

                }, spawn_chance);
            }
        },

        goldMovement: function(delta_s){
            if( gold_on_screen === true ){
                if( gold.x < -PLAYGROUND_WIDTH) {
                    stage.removeChild(gold);
                    gold_on_screen = false;
                }
                else{
                    var col = gold.localToLocal(20, 20, abbas);
                    if( abbas.hitTest(col.x, col.y) ){
                        util.abbasGold();
                        stage.removeChild(gold);
                    }
                    else{
                        gold.data.update(delta_s);
                    }
                }
            }
            else if( abbas.data.getBoost() === false ){
                util.generateGold();
            }

        }

    };
})();