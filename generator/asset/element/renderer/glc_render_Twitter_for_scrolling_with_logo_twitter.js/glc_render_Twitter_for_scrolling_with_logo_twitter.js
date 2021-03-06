
loadScript(RENDERER_PATH+"/utils/twitter.js");

/*
 * work on twitter source
 * display the tweet on the zone2 (scrolling)
 * the content is modified but the logo is the same for the source
 *
 * CSS classes : 
 * - tweet
 * - twitter_title  
 * - twitter_Content  
 */
function glc_render_Twitter_for_scrolling_with_logo_twitter(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = '<img src="img/logos/twitter_bird.png"/>';
	zone.loadImage("img/logos/twitter_bird.png");	
	var content = "";
	var time = 0;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		var elements = tableau.tweets[indice];
		
		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"' align='top'/>"+elements.user.screen_name+" <i>(@"+elements.user.name+")</i> :&nbsp;";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, " ");

		content += "<span class='tweet'>";
		content += "<span class='twitter_title'>"+titleTwitter+"</span>";
		content += "<span class='twitter_Content'>"+contentTwitter+" &bull; </span>";
		content += "</span>";
		time += timeInfo;
	}

	var dico = {"content": content, "logo": logo, "time" : time};
	zone.pushInfo(dico);
}
