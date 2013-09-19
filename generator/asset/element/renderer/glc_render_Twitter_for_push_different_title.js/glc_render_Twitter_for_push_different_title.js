
loadScript(RENDERER_PATH+"/utils/twitter.js");

/*
 * work on Twitter source
 * display the tweets on the zone4 (right push)
 * the content is modified 
 *
 * CSS classes : 
 * - push_div_zone4
 * - tweet
 * - twitter_title  
 * - twitter_body
 * - twitter_Content
 * - twitter_Date
 */
function glc_render_Twitter_for_push_different_title(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/twitter.png"/>';
	zone.loadImage("img/logos/twitter.png");
	var title = collection.title;
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < collection.tweets.length; indice++) {
		var elements = collection.tweets[indice];

		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"'/>"+elements.user.screen_name+" <i>@"+elements.user.name+"</i>";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, "<br/>");
		
		content = "<div id='"+zone.id+"_new_push' class='push_div_zone4'>";
		content += "<div class='tweet'>";
		content += "<div class='twitter_title'>"+titleTwitter+"</div>";
		content += "<div class='twitter_body'>";
			content += "<div class='twitter_Content'>"+contentTwitter+"</div>";
			content += "<div class='twitter_Date'>"+render_date_twitter(elements.created_at)+"</div>";
		content += "</div>";
		content += "</div>";
		content += "</div>";
				
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);

	}
}
