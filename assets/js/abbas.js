function Abbas(){
    this.die = false;
}

Abbas.prototype = new Player(); // Inherit Player Class

Abbas.prototype.movement = function(delta_s){
    if(this.getEnergy() === 0){
        this.setFlying(false);
        util.clearMouse();
        abbas.gotoAndPlay("fly");
    }

    if(abbas.y < PLAYGROUND_HEIGHT-100 && this.isFlying() === false){ // Abbas falling down 
        abbas.y = (abbas.y + delta_s / this.boost);
    }
    else if(abbas.y > 0 && this.isFlying() === true && this.getEnergy() > 0){ // Abbas fly, limit max height...
        abbas.y = (abbas.y - (delta_s * 2)/ this.boost);
    }
    else if(abbas.y > PLAYGROUND_HEIGHT-100){
        this.crash(delta_s);
    }
    else{
        abbas.gotoAndPlay("glide");
    }
    this.updateDistance();
};

Abbas.prototype.hit = function(){
    // Sound FX
    createjs.Sound.play("hitfx");

    abbas.y = (abbas.y + 15);
    this.damage();
};

Abbas.prototype.crash = function(delta_s){
    abbas.y = (abbas.y - delta_s);
    this.setEnergy(0);
    
    setTimeout(function(){
        abbas.y = (abbas.y + delta_s * 1.5);
        util.removeAllCrows();
    }, 500);

    if(this.die === false){
        createjs.Sound.play("crashed");
        $(elem.pause_play).hide();
        setTimeout(function(){
            util.gameOver();
        }, 1500);
    }

    this.die = true;
};

Abbas.prototype.coinify = function(){
    createjs.Sound.play("coinfx");
    this.plusCoin();

    $("#coin").html(this.getCoin());
};

Abbas.prototype.boostify = function(){
    createjs.Sound.play("boostfx");
    this.setBoost(true);
    util.removeAllCrows();

    var self = this;
    setTimeout(function(){
        self.setBoost(false);
    }, 3000);
};

Abbas.prototype.energize = function(){
    createjs.Sound.play("energyfx");
    this.regenEnergy();
};

Abbas.prototype.multiply = function(){
    createjs.Sound.play("multiplierfx");
    this.setCoinMultiply(true);

    // Make Abbas Glow!
    abbas.shadow = new createjs.Shadow("#e5d584",5,-10,30);

    // Change HUD color
    $("#coin").css({color : "#e5d584", "font-size" : "160%"});

    var self = this;
    setTimeout(function(){
        abbas.shadow = false;
        self.setCoinMultiply(false);
        $("#coin").css({color : "#fff", "font-size" : "100%"});
    }, 6000);
};

Abbas.prototype.stats = function(){
    $("#energy_bar").css("width", this.getEnergy() + "%");
    $("#distance").html(this.getDistance());

    // Display fps
    document.getElementById("fps").innerHTML = Math.floor(createjs.Ticker.getMeasuredFPS());
};