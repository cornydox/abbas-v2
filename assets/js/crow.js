function Crow(index, max_speed){
	this.speed = Math.random() * (max_speed-4-1) + 5;
	this.index = index;
}

Crow.prototype.update = function(delta_s){
	crow[this.index].x  = (crow[this.index].x - this.speed * delta_s);
};