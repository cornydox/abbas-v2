/*=====================================================

 Global Variables
  
======================================================*/
var stage, loader, delta_s, bgmusic;
var PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT;

// Objects
var abbas, gold, energy, coin_multiplier;

// Background Landscape - Back Layers
var sky, clouds, base, base1, base2, base3, base4, mountains, mt_kk, bg_kl;

// Background Landscape - Front Layers
var front_grass1, front_grass2, front_grass3, front_grass4, back_grass1, back_grass2, back_grass3, back_grass4;

// Boost speed constant. Currently set to 6x of normal speed.
var MULTIPLIER = 6;

// Current movement speed (** Should've name this something else, oh well)
var boost;

// Pause state
var set_paused = false;

// Array to store multiple objects on screen
var crow = [];
var coin = [];

// Selectors
var elem = {};
	
elem.loader       = '.txt-loading';
elem.gameover     = '.txt-gameover';

elem.pause_play   = '.content-pause-play';
elem.hud          = '.content-hud';

elem.score        = '.content-score';
elem.btn_replay   = '.btn-replay';
elem.btn_submit   = '.btn-submit';
elem.btn_next     = '.btn-next';
elem.btn_back     = '.btn-back';
elem.btn_play     = '.btn-play';
elem.btn_close    = '.btn-close, .btn-main-menu';
elem.btn_pause_play = '.btn-pause-play';

elem.registration = '.content-registration';
elem.formRegister = '#registration';
elem.btn_register = '.btn-register';

elem.leaderboard  = '.content-leaderboard';

/*=====================================================

 Global Functions
  
======================================================*/
function startGame(){
	var game = new Game();
	game.init();
}

function showTutorial(){
	$('#welcome').hide();
	$('.content-instruction').show();
}

function restartGame(){
	$(elem.score).hide();
	startGame();
}

function showLeaderboard(){
	$.ajax({
		url: './src/main.php',
		data: {action: 'getLeaderboard'},
		type: "POST"
	}).done(function(data) {
		data = $.parseJSON(data); // Data for Leaderboard

		var html = '';
		for(var i in data){ // Loop through each row, add to list
			html += '<li class="list-player"><span class="txt-name">' + data[i].name.substring(0,12) + '</span>';
			html += '<span class="txt-score">' + data[i].score + "</span></li>";
		}

		$('.wrapper-leaderboard ol').html(html);

		$('#welcome').fadeOut();
		$(elem.leaderboard).fadeIn();

	}).fail(function (jqXHR, textStatus, errorThrown){
		console.dir(jqXHR + "," + "textStatus" , + "errorThrown");
	});
}

function loadAssets(){
	$(elem.loader).fadeIn();
	preload.assets();
}

/*=====================================================

 Events
  
======================================================*/
$(function(){
	loadAssets();

	// Proceed to register high score
	$(elem.btn_submit).click(function(event){
		$(elem.score).fadeOut();
		$(elem.registration).fadeIn();
		event.preventDefault();
	});

	// Actual high score form registration
	$(elem.btn_register).click(function(event){
		var good_to_go = true;

		$(elem.formRegister + ' input').each(function(){
			if($(this).val() === ''){
				good_to_go = false;
				$(this).attr('placeholder', 'Please fill in your ' + $(this).attr('name'));
			}
		});

		if(good_to_go === true){
			gameover.registerUser();
		}

		event.preventDefault();
	});

	// Click sound
	$('.btn, .btn-img-right, .btn-img-left').click(function(){
		createjs.Sound.play("clickfx");
	});

	// Play game
	$(elem.btn_play).click(function(event){
		startGame();
		event.preventDefault();
	});

	// Play again
	$(elem.btn_replay).click(function(event){
		restartGame();
		event.preventDefault();
	});

	// Tutorial / Instructions
	$(elem.btn_next).click(function(event){
		$('.instruction-1').hide();
		$('.instruction-2').show();
		event.preventDefault();
	});

	// Back to main menu
	$(elem.btn_back).click(function(event){
		$('.instruction-2').hide();
		$('.instruction-1').show();
		event.preventDefault();
	});
	
	// Close button
	$(elem.btn_close).click(function(event){
		$(this).parent().parent().hide();
		$('#welcome').show();

		event.preventDefault();
	});

	// Pause / Resume button
	$(elem.btn_pause_play).click(function(event){
		createjs.Sound.play("clickfx");
		var current_image = $(this).attr('src');

		if($(this).hasClass('paused')){
			set_paused = false;
			current_image = current_image.replace('pause', 'play');
			$(this).removeClass('paused');
			bgmusic.resume();
		}
		else {
			set_paused = true;
			current_image = current_image.replace('play', 'pause');
			$(this).addClass('paused');
			bgmusic.pause();
		}

		$(this).attr('src', current_image);

		util.pausePlay(set_paused);

		event.preventDefault();
	});
});