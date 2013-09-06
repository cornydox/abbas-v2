function Crow(index){
	this.speed = Math.random() * (9-4-1) + 4;
	this.index = index;
}

Crow.prototype.update = function(delta_s){
	crow[this.index].x  = (crow[this.index].x - this.speed * delta_s);
};