
loadScript(RENDERER_PATH+"/utils/twitter.js");

/*
 * work on twitter source
 * display the twitter in zone1 (main)
 *
 * CSS classes : 
 * - main_div_zone1
 * - tweet
 * - twitter_title  
 * - twitter_body
 * - twitter_Content
 * - twitter_Date
 * - smooth
 */
function glc_render_Twitter_for_main_different_title(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/twitter.png"/>';
	zone.loadImage("img/logos/twitter.png");
	var title = collection.title+"<br/><br/>";
	var time = timeInfo;
	var content = "";
	
	content += "<div id='twitter' class='main_div_zone1'>";
	for (var indice = 0; indice < collection.tweets.length; indice++) {
		var elements = collection.tweets[indice];
		
		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"'/>"+elements.user.screen_name+" <i>@"+elements.user.name+"</i>";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, "<br/>");
	
		if ((indice+1) % 2 == 0) {
			content += "<div class='tweet'>";
			content += "<div class='twitter_title'>"+titleTwitter+"</div>";
			content += "<div class='twitter_body'>";
				content += "<div class='twitter_Content'>"+contentTwitter+"</div>";
				content += "<div class='twitter_Date'>"+render_date_twitter(elements.created_at)+"</div>";
			content += "</div>";
			content += "</div>";
			
			content += "</div>";
			content +="<div class='smooth'> </div>";
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
			content = "<div id='twitter' class='main_div_zone1'>";
		}
		else{
			content += "<div class='tweet'>";
			content += "<div class='twitter_title'>"+titleTwitter+"</div>";
			content += "<div class='twitter_body'>";
				content += "<div class='twitter_Content'>"+contentTwitter+"</div>";
				content += "<div class='twitter_Date'>"+render_date_twitter(elements.created_at)+"</div>";
			content += "</div>";
			content += "</div>";
		}
		if (indice+1 == collection.tweets.length){
			if ((indice+1) % 2 != 0) {
				content += "</div>";
				content +="<div class='smooth'> </div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
			}
		}
		
	}
}
