var gameover = (function(){
	
	return{
		showScore: function(){
			var distance = $.trim($("#distance").html());
			var coins = parseInt($("#coin").html());
            var score = parseInt(distance.replace("m","")) + coins;

            $("#hud").fadeOut();
            $("#hud").remove();
			
			$("#show_distance").html(distance);
			$("#show_coins").html(coins);
			$("#show_score").html(score);
			$("#score").val(score);

            $("#gameover_2").fadeIn();
		},
		registerUser: function(){
			$("#gameover_3").fadeIn();
		}
	};
})();