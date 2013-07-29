function Crow(index, delta_s){
	this.speed = delta_s * ((Math.random() * 6) + 1);
	this.index = index;
}

Crow.prototype.update = function(){
	crow[this.index].x  = (crow[this.index].x - this.speed);
};