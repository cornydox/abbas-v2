function Coin(index){
	this.index = index;
}

Coin.prototype.update = function(delta_s){
	var boost = 1;

	if( abbas.data.getBoost() === true ){
		boost = MULTIPLIER;
	}
	coin[this.index].x  = (coin[this.index].x - delta_s * boost);
};