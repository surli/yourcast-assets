
loadScript(RENDERER_PATH+"/utils/calendar.js");
loadLess(LESS_ROOT+"/glc_render_Announces_for_push_logo_different_title.less");

/*
 * work on announces1 source
 * display the announces on the zone4 (right push)
 * the content is modified 
 *
 * CSS classes : 
 * - push_div_zone4
 * - announces_Title
 * - announces_body
 * - announces_Content
 * - announces_Author 
 */
function glc_render_Announces_for_push_logo_different_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/announce.png"/>';
	zone.loadImage("img/logos/announce.png");
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		if(inProgressToDisplay(elements)){
			var title = elements.title;
			var reg=new RegExp("(\n)", "g");
			var contentAnnounces = elements.content.replace(reg, "<br/>");
			var authorAnnounces = elements.author;
			var content = "";
			
			if (contentAnnounces.length > 200) {contentAnnounces = contentAnnounces.substring(0, 200); contentAnnounces += "...";}
			if (authorAnnounces.length > 30) {authorAnnounces = authorAnnounces.substring(0, 30); authorAnnounces += "...";}
			
			content += "<div id='"+zone.id+"_new_push' class='announces_div_push'>";
			content += "<div class='announces_body'>";
				content += logo;
				content += "<div class='announces_Title'>"+title+"</div>";
				//content += "<div class='announces_Dates'>"+render_date(elements)+"</div>";
				content += "<div class='announces_Content'>"+contentAnnounces+"</div>";			
				content += "<div class='announces_Author'>"+authorAnnounces+"</div>";
			content += "</div>";
			content += "</div>";		
			
			var dico = {"content": content, "logo": logo, "title": title, "time": time};
			zone.pushInfo(dico);
		}
	}
}