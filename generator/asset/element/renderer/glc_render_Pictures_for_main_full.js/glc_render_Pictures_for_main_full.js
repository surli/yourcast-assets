
loadScript(RENDERER_PATH+"/utils/pictures.js");

/*
 * work on picasamontana source
 * display pictures in full on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * function uses :
 * - imageSize(width, height) -> renderers/utils/pictures.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - Picturesimage
 * - imageLegende
 * - picturesDescription  
 */
function glc_render_Pictures_for_main_full(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/picture.png"/>';
	zone.loadImage("img/logos/picture.png");
	var title = collection.albumName;
	if (title.length > 30) {title = title.substring(0, 30); title += " ...";}
	var time = timeInfo;
	var tableau = collection.pictures;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var description = elements.description;
		if (description.length > 60) {description = description.substring(0, 60); description += " ...";}

		var url = elements.url ;
		var zoneHeight = $(zone.id).getHeight() - 135;

		content ="<div id='Pictures' class='main_div_zone1' style='height:"+zoneHeight+"px;'>";
				content += "<div class='Picturesimage'><span class='imageLegende'><img src='"+url+"'/>";
				if(description!="")
					content += "<div class='picturesDescription' >"+description+"</div>";
		content += "</span></div></div>";
		
	/*	if (elements.height >= 400) {
			sizeImage = imageSize(elements.width, elements.height);
			content = "<div id='Pictures' class='main_div_zone1'>";
			content += "<div class='Picturesimage'><img src='"+url+"' style='width:"+sizeImage.width+"px; height: "+sizeImage.height+"px;' /></div>";
			content += "<div class='picturesDescription'>"+description+"</div>";
			content += "</div>";

		}
		*/

		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}
