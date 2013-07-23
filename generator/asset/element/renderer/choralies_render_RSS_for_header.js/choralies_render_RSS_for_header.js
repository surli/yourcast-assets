/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 *
 */

loadLess(LESS_ROOT+"/choralies_render_RSS_for_header.less"); 
 
function choralies_render_RSS_for_header(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var time = timeInfo;
	
	var titleFeed = tableau.title;
	var mainTitle = tableau.title;
	
	for (var indice = 0; indice < tableau.content.length; indice++) {
		var elements = tableau.content[indice];

		var title = elements.title;
		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.content.replace(reg, "<br/>");
		var content = "";
		
		
		///if (contentAnnounces.length > 200) {contentAnnounces = contentAnnounces.substring(0, 200); contentAnnounces += "...";}
		
		content += "<div class='header_div' >";
		content += "<div class='logo_rss' > </div>";
		content += "<div class='rss_body'>";
			content += "<div class='rss_Title'>"+title+"</div>";
			content += "<div class='rss_Content'>"+contentAnnounces+"</div>";			
		content += "</div>";		
		content += "</div>";	
		
		var dico = {"content": content, "logo": "", "title": title, "time": time};
		zone.pushInfo(dico);
		
	}
}