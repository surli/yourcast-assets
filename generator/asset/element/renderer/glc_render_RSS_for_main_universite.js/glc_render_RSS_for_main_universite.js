
/*
 * work on rss feed source
 * display the rss feed on the zone1 (mainZone)
 * the content is modified but the logo and the title are the same
 *
 * CSS classes : 
 * - main_div_zone1
 * - rss_body 
 * - rss_Content
 * - rss_Source 
 * - smooth
 */
function glc_render_RSS_for_main(collection, zone, logo, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logoFeed = '<img src="'+logo+'"/>';
	zone.loadImage(logo);
	var time = timeInfo;
	var titleFeed = collection.title;
	
	for (var indice = 0; indice < collection.content.length; indice++) {
		var elements = collection.content[indice];

		var title = elements.title;
		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.content.replace(reg, "<br/>");
		var content = "";
		
		///if (contentAnnounces.length > 300) {contentAnnounces = contentAnnounces.substring(0, 300); contentAnnounces += "...";}
		
		content += "<div id='rssfeed' class='main_div_zone1' >";
		content += "<div class='rss_body'>";
			//content += "<div class='rss_Title'><br/>"+title+"</div>";
			content += "<div class='rss_Content'>"+contentAnnounces+"</div>";			
			content += "<div class='rss_Source'>"+titleFeed+"</div>";			
		content += "</div>";
		content += "</div>";		
		
		content +="<div class='smooth'> </div>";
		
		var dico = {"content": content, "logo": logoFeed, "title": title, "time": time};
		zone.pushInfo(dico);
		
	}
}

/*
 * work on rss feed source universite
 */
function glc_render_RSS_for_main_universite(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return render_RSS_for_main(collection, zone, "img/logos/rss.png", timeInfo);
}
