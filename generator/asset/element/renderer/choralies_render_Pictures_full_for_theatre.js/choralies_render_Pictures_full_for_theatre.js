/*
 * work on picasamontana source
 * display pictures in full on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * function uses :
 * - imageSize(width, height) -> renderers/utils/pictures.js
 *
 */
 
 loadLess(LESS_ROOT+"/choralies_render_Pictures_full_for_theatre.less"); 
 loadScript(RENDERER_PATH+"/utils/pictures.js");
 
 function choralies_render_Pictures_full_for_theatre(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var title = collection.albumName;
	if (title.length > 30) {title = title.substring(0, 30); title += " ...";}
	var time = timeInfo;
	var tableau = collection.pictures;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var description = elements.description;
		if (description.length > 60) {description = description.substring(0, 60); description += " ...";}

		//var url = elements.thumbs[1].url ;
		var url = elements.url;
		zone.loadImage(url);
		
		var zoneHeight = $(zone.id).getHeight() - ($(zone.id).getHeight()*15/100);

		content ="<div id='Pictures' class='main_div_zone' style='height:"+zoneHeight+"px;'>";
				content += "<div class='Picturesimage'><span class='imageLegende'><img src='"+url+"'/>";
				if(description!="")
					content += "<div class='picturesDescription' >"+description+"</div>";
		content += "</span></div></div>";

		content += "<div class='pictures_counter'>"+(indice+1)+"/"+tableau.length+"</div>";	
		
		var dico = {"content": content, "logo": '', "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}