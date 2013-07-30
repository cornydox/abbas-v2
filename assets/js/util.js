// Utilities / helper

var util = (function(){
    var mouse_timeout = 0;

    return{
        initControls: function(){
            stage.onPress = function(evt) {

                // On mouse hold, abbas hover / fly constant
                mouse_timeout = setTimeout(function(){
                    abbas.data.setFlying(true);
                }, 100);

                // On mouse release
                evt.onMouseUp = function(evt){
                    clearTimeout(mouse_timeout);
                    abbas.data.setFlying(false);
                };
            };
        },

        getRandom: function(from, to){
            return Math.floor(Math.random()*(to-from-1) + from);
        },

        abbasMovement: function(delta_s){
            if(abbas.y < 350 && abbas.data.isFlying() === false){
                abbas.y = (abbas.y + delta_s);
            }
            else if(abbas.y > 0 && abbas.data.isFlying() === true){
                abbas.y = (abbas.y - delta_s*2);
            }

        },

        abbasHit: function(){
            abbas.y = (abbas.y + 100);
            abbas.data.damage();
        },

        abbasCoin: function(){
            abbas.data.plusCoin();
            document.getElementById("coin").innerHTML = "COIN : " + abbas.data.getCoin();
        },

        generateCrow: function(){
            var spawn_chance = util.getRandom(100,2500);

            setTimeout(function(){
                var img_crow      = loader.getResult("crow");

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
                    var col = crow[i].localToLocal(0, 10, abbas);
                    if( abbas.hitTest(col.x, col.y) ){ util.abbasHit(); }
                    crow[i].data.update(delta_s);
                }
            }
        },

        generateCoins: function(){
            var spawn_chance = util.getRandom(1000,15000);

            setTimeout(function(){
                var no_of_coins  = Math.floor(Math.random()*10) + 3;
                var pos_y        = Math.floor(Math.random()*300) + 10;

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
        }

    };
})();