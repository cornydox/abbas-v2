function Abbas(){
	this.energy = 100; // Initial energy.
	this.energy_timeout = 0;
	this.flying = false;
	this.coin   = 0;
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
		}, 100);
	}
	else{
		clearInterval(this.energy_timeout);
		console.log("zzz");
	}
};

Abbas.prototype.plusCoin = function(){
	this.coin++;
	this.energy = this.energy + 5;
	document.getElementById("energy").innerHTML = "ENERGY : " + this.energy;
};

Abbas.prototype.getCoin = function(){
	return this.coin;
};

Abbas.prototype.damage = function(){
	this.energy = this.energy - 20;
	document.getElementById("energy").innerHTML = "ENERGY : " + this.energy;
};