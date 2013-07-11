
/*
 * work on rss feed source 
 * display the rss feed on the zone4 (pushZone)
 * the content is modified and the source is displayed every 5 feeds
 *
 * CSS classes : 
 * - push_div_zone4
 * - rss_body 
 * - rss_Title
 * - rss_Content
 * - rss_source 
 * - rss_sourceTitle 
 */
function glc_render_RSS_for_push(collection, zone, logo, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logoFeed = '<img src="'+logo+'" align="center"/>';
	zone.loadImage(logo);
	var time = timeInfo;
	var mainTitle = collection.title;
	
	for (var indice = 0; indice < collection.content.length; indice++) {
		var elements = collection.content[indice];

		var title = elements.title;
		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.content.replace(reg, "<br/>");
		var content = "";
		
		///if (contentAnnounces.length > 200) {contentAnnounces = contentAnnounces.substring(0, 200); contentAnnounces += "...";}
		
		content += "<div id='"+zone.id+"_new_push' class='push_div_zone4' style='display:none;'>";
		content += "<div class='rss_body'>";
			content += "<div class='rss_Title'>"+title+"</div>";
			content += "<div class='rss_Content'>"+contentAnnounces+"</div>";			
		content += "</div>";
		if(indice%3==0){
			content += "<div class='rss_source'>";
				content += "<div class='rss_sourceTitle'>"+logoFeed+mainTitle+"</div>";		
			content += "</div>";	
		}		
		content += "</div>";		

		
		var dico = {"content": content, "logo": "", "title": "", "time": time};
		zone.pushInfo(dico);
	}
}
