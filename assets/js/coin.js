function Coin(index){
	this.index = index;
}

Coin.prototype.update = function(delta_s){
	coin[this.index].x  = (coin[this.index].x - delta_s);
};