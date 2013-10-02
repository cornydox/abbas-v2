// Global variables
var stage, loader;
var PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, path, audio_path;
var sky, clouds, base, mountains, grass, abbas, gold, energy, coin_multiplier;
var MULTIPLIER = 6; // Boost multiplier
var elem = {};
	
elem.loader = '.txt-loading';
elem.gameover = '.txt-gameover';

elem.hud = '.content-hud';

elem.score ='.content-score';
elem.btn_replay = '.btn-replay';
elem.btn_submit = '.btn-submit';

elem.registration = '.content-registration';
elem.formRegister = '#registration';
elem.btn_register = '.btn-register';

elem.leaderboard = '.content-leaderboard';

var crow = [];
var coin = [];

function startGame(){
	var game = new Game();

	game.init();
}


// Events
$(function(){
	$(elem.btn_register).click(function(){
		var $form = $(elem.formRegister);
		var $input = $form.find("input");

		var form_data = $form.serialize();
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

	});

	$(elem.btn_submit).click(function(){
		$(elem.score).fadeOut();
		$(elem.registration).fadeIn();
	});

	$(elem.btn_replay).click(function(){
		location.reload();
	});
});