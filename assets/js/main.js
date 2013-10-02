// Global variables
var stage, loader;
var PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, path, audio_path;
var sky, clouds, base, mountains, grass, abbas, gold, energy, coin_multiplier;
var MULTIPLIER = 6; // Boost multiplier
var elem = {};
	
elem.loader       = '.txt-loading';
elem.gameover     = '.txt-gameover';

elem.hud          = '.content-hud';

elem.score        = '.content-score';
elem.btn_replay   = '.btn-replay';
elem.btn_submit   = '.btn-submit';
elem.btn_next     = '.btn-next';
elem.btn_back     = '.btn-back';
elem.btn_play     = '.btn-play';
elem.btn_close    = '.btn-close';

elem.registration = '.content-registration';
elem.formRegister = '#registration';
elem.btn_register = '.btn-register';

elem.leaderboard  = '.content-leaderboard';

var crow = [];
var coin = [];

function startGame(){
	var game = new Game();

	game.init();
}

function showTutorial(){
	$('#welcome').hide();
	$('.content-instruction').show();
}

function restartGame(){
	// Should code something here to restart game immediately without having to click
	location.reload();
}

// Events
$(function(){
	$(elem.btn_register).click(function(event){
		var good_to_go = true;

		$(elem.formRegister + ' input').each(function(){
			if( $(this).val() === '' ){
				good_to_go = false;
				$(this).attr('placeholder', 'Please fill in your ' + $(this).attr('name'));
			}
		});

		if( good_to_go === true ){
			gameover.registerUser();
		}

		event.preventDefault();
	});

	$(elem.btn_submit).click(function(event){
		$(elem.score).fadeOut();
		$(elem.registration).fadeIn();
		event.preventDefault();
	});

	$(elem.btn_replay).click(function(event){
		restartGame();
		event.preventDefault();
	});

	/* Tutorial / Instructions */
	$(elem.btn_next).click(function(event){
		$('.instruction-1').hide();
		$('.instruction-2').show();
		event.preventDefault();
	});

	$(elem.btn_back).click(function(event){
		$('.instruction-2').hide();
		$('.instruction-1').show();
		event.preventDefault();
	});

	$(elem.btn_play).click(function(event){
		startGame();
		event.preventDefault();
	});

	$(elem.btn_close).click(function(event){
		$(this).parent().parent().hide();
		$('#welcome').show();
		event.preventDefault();
	});
});