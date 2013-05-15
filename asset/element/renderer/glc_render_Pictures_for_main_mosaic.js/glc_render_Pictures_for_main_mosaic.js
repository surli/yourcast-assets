/*
 * work on picasamontana source
 * display pictures in mosaic on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * only 6 pictures are displayed (3x3)
 *
 * CSS classes :
 * - main_div_zone1
 * - mosaicPictures
 */

loadLess(LESS_ROOT+"/glc_render_Pictures_for_main_mosaic.less");

function glc_render_Pictures_for_main_mosaic(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/picture.png"/>';
	zone.loadImage("img/logos/picture.png");
	var title = collection.albumName;
	if (title.length > 30) {title = title.substring(0, 30); title += " ...";}
	var time = timeInfo;
	var tableau = collection.pictures;

	var zoneHeight = $(zone.id).getHeight() - 135;

	var content = "<div class='main_div_zone1 mosaicPictures' style='height:"+zoneHeight+"px;'>";

	for (var indice = 0; indice < tableau.length; indice++){
		elements = tableau[indice].thumbs[2].url;
		zone.loadImage(elements);

		if ((indice+1) % 6 == 0) {
			content += "<span><img src='"+elements+"'/></span>";
			content += "</div>";
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
			content = "<div class='main_div_zone1 mosaicPictures' style='height:"+zoneHeight+"px;'>";
		} else {
			if (indice % 3 == 0 && indice % 6 !=0)
				content += "<br/>";
			content += "<span><img src='"+elements+"'/></span>";
		}
		if (indice+1 == tableau.length){
			if ((indice+1) % 6 != 0) {
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
			}
		}
	}
}