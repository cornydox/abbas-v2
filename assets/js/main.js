// Global variables
var stage, loader;
var PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, path;
var sky, clouds, base, mountains, grass, abbas, gold;
var MULTIPLIER = 6; // Boost multiplier

var crow = [];
var coin = [];

function startGame(){
	var game = new Game();

	game.init();
}


// Events
$(function(){
	$("#register").click(function(){
		var $form = $("#registration");
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
				html += "<li>" + data[i].name.substring(0,12) + " ";
				html += "<span class='list'>" + data[i].score + "</span></li>";
			}

			$("#top25").html(html);

			$("#gameover_3").fadeOut();
			$("#gameover_4").fadeIn();

		}).fail(function (jqXHR, textStatus, errorThrown){
			console.dir(jqXHR + "," + "textStatus" , + "errorThrown");
		});

	});

	$("#submit").click(function(){
		$("#gameover_2").fadeOut();
		$("#gameover_3").fadeIn();
	});

	$("#playagain").click(function(){
		location.reload();
	});
});