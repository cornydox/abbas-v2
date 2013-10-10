function Coin(index){
	this.index = index;
}

Coin.prototype.update = function(delta_s){
	var boost = abbas.data.getBoost();

	coin[this.index].x  = (coin[this.index].x - delta_s * boost);
};