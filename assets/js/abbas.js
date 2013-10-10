function Abbas(){
	this.energy = 100; // Initial energy.
	this.distance = 0;
	this.energy_timeout = 0;
	this.flying = false;
	this.coin   = 0;
	this.coin_multiply = false;
	this.boosting = false;
}

Abbas.prototype.isFlying = function(){
	return this.flying;
};

Abbas.prototype.setFlying = function(state){
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

Abbas.prototype.setEnergy = function(value){
	this.energy = value;
};

Abbas.prototype.getEnergy = function(){
	if( this.energy < 0 ){
		this.energy = 0;
	}

	return this.energy;
};

Abbas.prototype.plusCoin = function(){
	if(this.coin_multiply === true){
		this.coin = this.coin + 3;
	}
	else{
		this.coin++;
	}
};

Abbas.prototype.getCoin = function(){
	return this.coin;
};

Abbas.prototype.regenEnergy = function(){
	this.energy = 100;
};

Abbas.prototype.damage = function(){
	this.energy = this.energy - 15;
};

Abbas.prototype.updateDistance = function(){
	var boost = 1;
	if(this.boosting === true){
		boost = MULTIPLIER;
	}

	this.distance = this.distance + (0.3 * boost);
};

Abbas.prototype.getDistance = function(){
	return Math.floor(this.distance);
};

Abbas.prototype.setBoost = function(state){
	this.boosting = state;
};

Abbas.prototype.getBoost = function(){
	return this.boosting;
};

Abbas.prototype.setCoinMultiply = function(state){
	this.coin_multiply = state;
};