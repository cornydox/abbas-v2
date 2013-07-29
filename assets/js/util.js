// Utilities / helper

var util = (function(){
    var mouse_timeout = 0;
    return{
        initControls: function(){
            stage.onPress = function(evt) {
                // On click
                if(abbas.y > 10){
                    abbas.y = abbas.y - 50;
                    abbas.x = abbas.x + 10;
                }
                else{
                    abbas.y = abbas.y - 10;
                    abbas.x = abbas.x + 10;
                }

                // On mouse hold, abbas hover / fly constant
                mouse_timeout = setTimeout(function(){
                    abbas.data.setFlying(true);
                }, 400);

                // On mouse release
                evt.onMouseUp = function(evt){
                    clearTimeout(mouse_timeout);
                    abbas.data.setFlying(false);
                };
            };
        },

        abbasMovement: function(delta_s){
            if(abbas.y < 350 && abbas.data.isFlying() === false){
                abbas.y = (abbas.y + delta_s);
            }
            else if(abbas.y > 0 && abbas.data.isFlying() === true){
                abbas.y = (abbas.y - delta_s*2);
            }
            if(abbas.x > 0){
                abbas.x = (abbas.x - delta_s);
            }
        },

        generateCrow: function(delta_s){
            var spawn_chance = Math.random();

            // Temporary implementation, need better method.
            if( spawn_chance > 0.04 && spawn_chance < 0.05 ){
                var img_crow      = loader.getResult("crow");

                var spriteSheet = new createjs.SpriteSheet({
                    "images": [img_crow],
                    "frames": {"regX": -PLAYGROUND_WIDTH, "height": 80, "count": 2, "regY": -abbas.y, "width": 100},
                    "animations": {fly:[0,1,"fly",4.5]}
                });
                crow.push(new createjs.BitmapAnimation(spriteSheet));
                crow[crow.length-1].gotoAndPlay("fly");
                crow[crow.length-1].data = new Crow(crow.length-1, delta_s);

                stage.addChild(crow[crow.length-1]);
                // console.log(crow[0].x);
            }

            for(var i in crow){
                if(crow[i].x < -PLAYGROUND_WIDTH){
                    stage.removeChild(crow[i]);
                    delete crow[i];
                    console.log("removed!");
                }
                else{
                    crow[i].data.update();
                }
            }
        },

        generateCoins: function(delta_s){
            var spawn_chance = Math.random();
            var no_of_coins  = Math.floor(Math.random()*10) + 3;

            // Temporary implementation, need better method.
            if( spawn_chance > 0.04 && spawn_chance < 0.042 ){
                var img_coin = loader.getResult("coins");
                var temp     = [];
                var coin_pos = -PLAYGROUND_WIDTH;
                for( var z = 0; z < no_of_coins; z++ ){
                    var speed = Math.floor(Math.random()*2) + 1;
                    // console.log(speed);
                    temp.push(new createjs.SpriteSheet({
                        images: [img_coin],
                        frames: {"regX": coin_pos, "height": 30, "count": 5, "regY": -abbas.y, "width": 30},
                        animations: {turn:[0,4,true,speed+2]}
                    }));

                    coin.push(new createjs.BitmapAnimation(temp[z]));
                    coin[coin.length-1].gotoAndPlay("turn");
                    coin[coin.length-1].data = new Coin(coin.length-1, delta_s);
                    stage.addChild(coin[coin.length-1]);
                    coin_pos = coin_pos -30;
                }

            }

            for(var i in coin){
                if(coin[i].x < -PLAYGROUND_WIDTH-180){
                    stage.removeChild(coin[i]);
                    delete coin[i];
                    console.log("Coin removed!");
                }
                else{
                    coin[i].data.update();
                }
            }
        }

    };
})();