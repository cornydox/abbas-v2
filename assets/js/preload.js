var preload = (function(){
	var img_path   = "assets/img/min/";
	var new_path   = "assets/img/new/";
	var bg_path   = "assets/img/background/";
	var sound_path = "assets/sounds/";
	return {
		assets: function(){

			var manifest = [
				{id:"abbas", src:new_path + "abbas.png"},
				{id:"coins", src:img_path + "coins.png"},
				{id:"gold", src:new_path + "speed-booster.png"},
				{id:"crow", src:img_path + "crow-new.png"},
				{id:"sky", src:new_path + "sky.png"},
				{id:"base1", src:bg_path + "bg_base_01.png"},
				{id:"base2", src:bg_path + "bg_base_02.png"},
				{id:"base3", src:bg_path + "bg_base_03.png"},
				{id:"base4", src:bg_path + "bg_base_04.png"},
				{id:"mt_kk", src:bg_path + "bg_mt_kk.png"},
				{id:"bg_kl", src:bg_path + "bg_kl.png"},
				{id:"mountains", src:bg_path + "bg_mountains.png"},
				{id:"front_grass1", src:bg_path + "bg_front_grass_01.png"},
				{id:"front_grass2", src:bg_path + "bg_front_grass_02.png"},
				{id:"front_grass3", src:bg_path + "bg_front_grass_03.png"},
				{id:"front_grass4", src:bg_path + "bg_front_grass_04.png"},
				{id:"back_grass1", src:bg_path + "bg_back_grass_01.png"},
				{id:"back_grass2", src:bg_path + "bg_back_grass_02.png"},
				{id:"back_grass3", src:bg_path + "bg_back_grass_03.png"},
				{id:"back_grass4", src:bg_path + "bg_back_grass_04.png"},
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