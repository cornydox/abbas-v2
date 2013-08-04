function Gold(){
	this.movement = "down";
	this.update = function(delta_s){
		gold.x = (gold.x - delta_s * 1.5);
		if(gold.y > 300){
			movement = "up";
		}
		else if(gold.y < 60){
			movement = "down";
		}

		if(movement == "up"){
			delta_s = -delta_s;
		}
		gold.y = (gold.y + delta_s * 2);
	};
}
