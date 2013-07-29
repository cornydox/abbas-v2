function Crow(index, delta_s){
	var speed = delta_s * ((Math.random() * 6) + 1);
	this.update = function(){
		crow[index].x  = (crow[index].x - speed);
	};
}