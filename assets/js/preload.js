var preload = (function(){
	var img_path   = "assets/img/min/";
	var sound_path = "assets/sounds/";
	return {
		assets: function(){

			var manifest = [
				{src:img_path + "abbas.png", id:"abbas"},
				{src:img_path + "coins.png", id:"coins"},
				{src:img_path + "gold.png", id:"gold"},
				{src:img_path + "crow-new.png", id:"crow"},
				{src:img_path + "sky.png", id:"sky"},
				{src:img_path + "base.png", id:"base"},
				{src:img_path + "mountain.png", id:"mountains"},
				{src:img_path + "clouds.png", id:"clouds"},
				{src:img_path + "grass.png", id:"grass"},
				{src:img_path + "energy.png", id:"energy"},
				{src:img_path + "multiplier.png", id:"multiplier"},
				{id:"bgm", src:sound_path + "18.mp3|"+sound_path + "18.ogg"},
				{id:"boostfx", src:sound_path + "boost.mp3|"+sound_path + "boost.ogg"},
				{id:"clickfx", src:sound_path + "click.mp3|"+sound_path + "click.ogg"},
				{id:"coinfx", src:sound_path + "coin.mp3|"+sound_path + "coin.ogg"},
				{id:"hitfx", src:sound_path + "hit.mp3|"+sound_path + "hit.ogg"},
				{id:"energyfx", src:sound_path + "energy.mp3|"+sound_path + "energy.ogg"},
				{id:"multiplierfx", src:sound_path + "multiplier.mp3|"+sound_path + "multiplier.ogg"},
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