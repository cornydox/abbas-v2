function Abbas(){
	this.energy = 100; // Initial energy.
	this.distance = 0;
	this.energy_timeout = 0;
	this.flying = false;
	this.coin   = 0;
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
			document.getElementById("energy").innerHTML = "ENERGY : " + self.energy;

			var width = "width:"+ self.energy + "%";
			document.getElementById("energy_bar").setAttribute("style", width);
		}, 100);
	}
	else{
		clearInterval(this.energy_timeout);
	}
};

Abbas.prototype.plusCoin = function(){
	this.coin++;

	if( this.energy <= 95 ){
		this.energy = this.energy + 5;
		document.getElementById("energy").innerHTML = "ENERGY : " + this.energy;
	}
};

Abbas.prototype.getCoin = function(){
	return this.coin;
};

Abbas.prototype.damage = function(){
	this.energy = this.energy - 20;
	document.getElementById("energy").innerHTML = "ENERGY : " + this.energy;
};

Abbas.prototype.updateDistance = function(){
	this.distance = this.distance + 0.3;
	document.getElementById("distance").innerHTML = "DISTANCE : " + Math.floor(this.distance) + " m";
};

Abbas.prototype.setBoost = function(state){
	this.boosting = state;
};

Abbas.prototype.getBoost = function(){
	return this.boosting;
};