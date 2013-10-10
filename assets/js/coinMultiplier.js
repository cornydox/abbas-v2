function CoinMultiplier(){
	this.movement = "down";
	this.update = function(delta_s){
		// X Axis
		var boost = abbas.data.getBoost();

		coin_multiplier.x = (coin_multiplier.x - delta_s * 2 * boost);

		// Y Axis
		if(coin_multiplier.y > 300){
			this.movement = "up";
		}
		else if(coin_multiplier.y < 60){
			this.movement = "down";
		}

		if(this.movement == "up"){
			delta_s = -delta_s;
		}
		coin_multiplier.y = (coin_multiplier.y + delta_s * 2);
	};
}
