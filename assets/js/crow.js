function Crow(index){
	this.speed = ((Math.random() * 6) + 1);
	this.index = index;
}

Crow.prototype.update = function(delta_s){
	crow[this.index].x  = (crow[this.index].x - this.speed * delta_s);
};