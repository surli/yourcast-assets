
loadScript(RENDERER_PATH+"/utils/twitter.js");

/*
 * work on twitter source
 * display the tweet on the zone2 (scrolling)
 * the content is modified and the logo is the user image for each info
 *
 * CSS classes : 
 * - logo_user
 * - tweet
 * - twitter_title  
 * - twitter_Content    
 */
function glc_render_Twitter_for_scrolling_with_logo_user_each_twitter(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = '<img src="img/logos/twitter_bird.png" align="top"/>';
	zone.loadImage("img/logos/twitter_bird.png");	
	zone.loadImage("img/left_arrow.png");
	var content = "";
	var time = 0;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		var elements = tableau.tweets[indice];
		
		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = elements.user.screen_name+" <i>(@"+elements.user.name+")</i> :&nbsp;";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, " ");

		content += "<img src='"+elements.user.profile_image_url+"' class='logo_user' align='top'/>";
		content += " <img src='img/left_arrow.png' />";
		content += "<span class='tweet'>";
		content += " "+"<span class='twitter_title'>"+titleTwitter+"</span>";
		content += "<span class='twitter_Content'>"+contentTwitter+" </span>";
		content += "</span>";
		time += timeInfo;
	}

	var dico = {"content": content, "logo": logo, "time" : time};
	zone.pushInfo(dico);
}
