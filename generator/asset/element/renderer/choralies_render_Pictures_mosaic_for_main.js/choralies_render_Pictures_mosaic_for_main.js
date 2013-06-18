/*
 * work on Pictures source
 * display pictures in mosaic on the main zone
 * only 6 pictures are displayed (2x3)
 *
 */
 
 loadLess(LESS_ROOT+"/choralies_render_Pictures_mosaic_for_main.less"); 
 loadScript(RENDERER_PATH+"/utils/pictures.js");
 
 function choralies_render_Pictures_mosaic_for_main(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var title = "Vos photos !";
	
	var time = timeInfo;
	var tableau = collection.pictures;
	
	//var zoneHeight = $(zone.id).getHeight() - 140;
	var heightScreen = window.outerHeight;
	var zoneHeight = (heightScreen * 70 / 100) - 140;
	
	var content = "<span class='pictureInfo'>Envoyez vos photos par email &agrave; contact@choralies.org !</span>";
	content += "<div class='mosaicPictures' style='height:"+zoneHeight+"px;'>";	
	
	for (var indice = 0; indice < tableau.length; indice++){
		elements = tableau[indice].thumbs[2].url;
		zone.loadImage(elements);

		if ((indice+1) % 6 == 0) {
			content += "<span><img src='"+elements+"'/></span>";
			content += "</div>";
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
			content = "<div class='mosaicPictures' style='height:"+zoneHeight+"px;'>";
		} else {
			if (indice % 3 == 0 && indice % 6 !=0)
				content += "<br/>";
			content += "<span><img src='"+elements+"'/></span>";
		}
		if (indice+1 == tableau.length){
			if ((indice+1) % 6 != 0) {
				content += "</div>";
				var dico = {"content": content, "logo": '', "title": title, "time" : time};
				zone.pushInfo(dico);
			}
		}
	}
}