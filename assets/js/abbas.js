function Abbas(){
	this.energy = 100; // Initial energy.
	this.flying = false;

	this.isFlying = function(){
		return this.flying;
	};
	this.setFlying = function(state){
		this.flying = state;
	};

}