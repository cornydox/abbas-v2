var gameover = (function(){
	
	return{
		showScore: function(){
			var distance = $.trim($("#distance").html());
			var coins = parseInt($("#coin").html());
			var score = parseInt(distance.replace("m","")) + coins;

			$(elem.hud).fadeOut();
			$(elem.hud).hide();
			
			$("#show_distance").html(distance);
			$("#show_coins").html(coins);
			$("#show_score").html(score);
			$("#score").val(score);

            $(elem.score).fadeIn();
		},
		registerUser: function(){
			var $form = $(elem.formRegister);
			var $input = $form.find("input");
			var form_data = $form.serialize();

			form_data += "&action=register";
			$input.prop("disabled", true);

			$.ajax({
				url: "./src/main.php",
				data: form_data,
				type: "POST"
			}).done(function ( data ) {
				data = $.parseJSON(data); // Data for Leaderboard

				var html = "";
				for(var i in data){ // Loop through each row, add to list
					html += '<li class="list-player"><span class="txt-name">' + data[i].name.substring(0,12) + '</span>';
					html += '<span class="txt-score">' + data[i].score + "</span></li>";
				}

				$(".wrapper-leaderboard ol").html(html);

				$(elem.registration).fadeOut();
				$(elem.leaderboard).fadeIn();

			}).fail(function (jqXHR, textStatus, errorThrown){
				console.dir(jqXHR + "," + "textStatus" , + "errorThrown");
			});

		}
	};
})();