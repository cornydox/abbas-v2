function Gold(){
	this.movement = "down";
	this.update = function(delta_s){
		gold.x = (gold.x - delta_s * 1.8);
		if(gold.y > 300){
			this.movement = "up";
		}
		else if(gold.y < 60){
			this.movement = "down";
		}

		if(this.movement == "up"){
			delta_s = -delta_s;
		}
		gold.y = (gold.y + delta_s * 2.5);
	};
}
