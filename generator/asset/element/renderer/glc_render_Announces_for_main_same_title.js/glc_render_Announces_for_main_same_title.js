/*
 * work on announces1 source
 * display the announces on the zone1 (main)
 * the content is modified but the logo and the title are the same
 * function uses :
 *	- render_date(element) -> js/date.js
 *
 * CSS classes :
 * - main_div_zone1
 * - announces_title
 * - announces_body
 * - announces_Content
 * - announces_Author
 * - smooth
 */

loadScript(RENDERER_PATH+"/utils/calendar.js");
loadLess(LESS_ROOT+"glc_render_Announces_for_main_same_title.less");

function glc_render_Announces_for_main_same_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/announce.png"/>';
	zone.loadImage("img/logos/announce.png");
	var title = "Annonces <br/>";
	var time = timeInfo;

	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		if(inProgressToDisplay(elements)){
			var titleAnnounces = elements.title;
			var reg=new RegExp("(\n)", "g");
			var contentAnnounces = elements.content.replace(reg, "<br/>");
			var authorAnnounces = elements.author;
			var content = "";

			if (titleAnnounces.length > 50) {titleAnnounces = titleAnnounces.substring(0, 50); titleAnnounces += "...";}
			if (contentAnnounces.length > 400) {contentAnnounces = contentAnnounces.substring(0, 400); contentAnnounces += "...";}
			if (authorAnnounces.length > 30) {authorAnnounces = authorAnnounces.substring(0, 30); authorAnnounces += "...";}

			content += "<div id='announces' class='main_div_zone1'>";
			content += "<div class='announces_title'>"+titleAnnounces+"</div>";
			content += "<div class='announces_body'>";
			//content += "<div class='announces_Dates'>"+render_date(elements)+"</div>";
			content += "<br/><div class='announces_Content'>"+contentAnnounces+"</div>";
			if (elements.img !== ""){
				zone.loadImage(elements.img);
				content += "<div class='announces_Image'><img src='"+elements.img+"'/></div>";
			}
			content += "<div class='announces_Author'>"+authorAnnounces+"</div>";
			content += "</div>";
			content += "</div>";
			content +="<div class='smooth'> </div>";

			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
		}
	}
}