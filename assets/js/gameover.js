var gameover = (function(){
	
	return{
		showScore: function(){
			var distance = $.trim($("#distance").html());
			var coins = parseInt($("#coin").html());
            var score = parseInt(distance.replace("m","")) + coins;

            $(elem.hud).fadeOut();
            $(elem.hud).remove();
			
			$("#show_distance").html(distance);
			$("#show_coins").html(coins);
			$("#show_score").html(score);
			$("#score").val(score);

            $(elem.score).fadeIn();
		},
		registerUser: function(){
			$(elem.registration).fadeIn();
		}
	};
})();