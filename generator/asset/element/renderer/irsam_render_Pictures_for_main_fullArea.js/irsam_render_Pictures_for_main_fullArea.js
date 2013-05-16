
loadLess(LESS_ROOT+"/irsam_render_Pictures_for_main_fullArea.less");
/*
 * display pictures in full on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 TODO: change main_div_zone1
 */
function irsam_render_Pictures_for_main_fullArea(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/pict.png"/>';
	zone.loadImage("img/logos/pict.png");
	var title = collection.albumName;
	var time = timeInfo;
	var tableau = collection.pictures;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		 var url = elements.url;

			content = "<div id='Pictures' class='main_div_zone1'>";
		    content += "<div class='Picturesimage'><img src='"+url+"' style='height:80%;' /></div>";
            content += "</div>";
	
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}
