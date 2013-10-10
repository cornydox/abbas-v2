function Energy(){
	this.movement = "down";
	this.update = function(delta_s){
		// X Axis
		var boost = abbas.data.getBoost();

		energy.x = (energy.x - delta_s * 1.2 * boost);

		// Y Axis
		if(energy.y > 300){
			this.movement = "up";
		}
		else if(energy.y < 60){
			this.movement = "down";
		}

		if(this.movement == "up"){
			delta_s = -delta_s;
		}
		energy.y = (energy.y + delta_s * 1.2);
	};
}
