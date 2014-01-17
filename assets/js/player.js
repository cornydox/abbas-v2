function Player(){
	this.energy         = 100; // Initial energy.
	this.distance       = 0;
	this.offset			= 0;
	this.energy_timeout = 0;
	this.flying         = false;
	this.coin           = 0;
	this.coin_multiply  = false;
	this.is_boosting    = false;
	this.boost          = 1;
}

Player.prototype.isFlying = function(){
	return this.flying;
};

Player.prototype.setFlying = function(state){
	this.flying = state;
	var self = this;
	if(state === true){
		this.energy_timeout = setInterval(function(){
			self.energy = self.energy - 1;
		}, 100);
	}
	else{
		clearInterval(this.energy_timeout);
	}
};

Player.prototype.setEnergy = function(value){
	this.energy = value;
};

Player.prototype.getEnergy = function(){
	if( this.energy < 0 ){
		this.energy = 0;
	}

	return this.energy;
};

Player.prototype.plusCoin = function(){
	if(this.coin_multiply === true){
		this.coin = this.coin + 3;
	}
	else{
		this.coin++;
	}
};

Player.prototype.getCoin = function(){
	return this.coin;
};

Player.prototype.regenEnergy = function(){
	this.energy = 100;
};

Player.prototype.damage = function(){
	this.energy = this.energy - 5;
};

Player.prototype.updateDistance = function(){
	this.offset = 0.3 * (createjs.Ticker.getFPS() / createjs.Ticker.getMeasuredFPS());
	this.distance = this.distance + (this.offset * this.boost);
};

Player.prototype.getDistance = function(){
	return Math.floor(this.distance);
};

Player.prototype.setBoost = function(state){
	this.is_boosting = state;
	if(this.is_boosting === true){
		this.boost = MULTIPLIER;
	}
	else{
		this.boost = 1;
	}
};

Player.prototype.isBoosting = function(){
	return this.is_boosting;
};

Player.prototype.getBoost = function(){
	return this.boost;
};

Player.prototype.setCoinMultiply = function(state){
	this.coin_multiply = state;
};