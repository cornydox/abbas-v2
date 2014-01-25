var preload = (function(){
	var img_path   = "assets/img/min/";
	var new_path   = "assets/img/new/";
	var sound_path = "assets/sounds/";
	return {
		assets: function(){

			var manifest = [
				{id:"abbas", src:new_path + "abbas.png"},
				{id:"coins", src:img_path + "coins.png"},
				{id:"gold", src:new_path + "speed-booster.png"},
				{id:"crow", src:img_path + "crow-new.png"},
				{id:"sky", src:new_path + "sky.png"},
				{id:"base", src:new_path + "base.png"},
				{id:"mountains", src:img_path + "mountain.png"},
				{id:"clouds", src:img_path + "clouds.png"},
				{id:"grass", src:new_path + "grass.png"},
				{id:"energy", src:img_path + "energy.png"},
				{id:"multiplier", src:new_path + "multiplier.png"},
				{id:"bgm", src:sound_path + "1001bgm.mp3|"+sound_path + "1001bgm.ogg"},
				{id:"boostfx", src:sound_path + "boost.mp3|"+sound_path + "boost.ogg"},
				{id:"clickfx", src:sound_path + "click.mp3|"+sound_path + "click.ogg"},
				{id:"coinfx", src:sound_path + "coin.mp3|"+sound_path + "coin.ogg"},
				{id:"hitfx", src:sound_path + "hit-new.mp3|"+sound_path + "hit-new.ogg"},
				{id:"energyfx", src:sound_path + "energy.mp3|"+sound_path + "energy.ogg"},
				{id:"multiplierfx", src:sound_path + "multiplier.mp3|"+sound_path + "multiplier.ogg"},
				{id:"crashed", src:sound_path + "crashed.mp3|"+sound_path + "crashed.ogg"},
			];

			loader = new createjs.LoadQueue(false);
			loader.installPlugin(createjs.Sound);
			loader.addEventListener("complete", preload.assetsLoaded);
			loader.loadManifest(manifest);
		},

		assetsLoaded: function(event){
			$(elem.loader).hide();
			$('.content-welcome').fadeIn();
		}
	};
})();