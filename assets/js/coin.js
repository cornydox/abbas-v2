function Coin(index, delta_s){

	this.update = function(){
		coin[index].x  = (coin[index].x - delta_s);
	};

}