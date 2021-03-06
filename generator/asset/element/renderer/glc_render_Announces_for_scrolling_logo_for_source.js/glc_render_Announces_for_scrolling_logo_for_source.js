loadScript(RENDERER_PATH+"/utils/calendar.js");
loadLess(LESS_ROOT+"/glc_render_Announces_for_scrolling_logo_for_source.less");

/*
 * work on announces1 source
 * display the announces on the zone2 (scrolling)
 * the content is modified but the logo is the same
 *
 * CSS classes :
 * - announce
 * - announces_Author
 */
function glc_render_Announces_for_scrolling_logo_for_source(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/logos/announce.png'/>";
	zone.loadImage("img/logos/announce.png");
	var content = "";
	var time = timeInfo;

	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		if(inProgressToDisplay(elements)){
			var title = elements.title;
			var reg=new RegExp("(\n)", "g");
			var contentAnnounces = elements.content.replace(reg, " ");
			if (contentAnnounces.length > 150) {contentAnnounces = contentAnnounces.substring(0, 150); contentAnnounces += "...";}
			var authorAnnounces = elements.author;

			content += "<span class='announce'>";
			content += title;
			//content += "<span class='announces_Dates'>"+render_date(elements)+"</span>";
			content += " : "+contentAnnounces;
			content += " <span class='announces_Author'> ("+authorAnnounces+")</span>";
			content += "</span>";
		}
	}

	var dico = {"content": content, "logo": logo, "time" : time};
	zone.pushInfo(dico);
}