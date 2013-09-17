
loadScript(RENDERER_PATH+"/utils/twitter.js");

/*
 * work on twitter source
 * display the tweet on the zone2 (scrolling)
 * the content is modified but there isn't logo or title
 *
 * CSS classes : 
 * - tweet
 * - twitter_title  
 * - twitter_Content 
 */
function glc_render_Twitter_for_scrolling_simple(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var content = "";
	var time = 0;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		var elements = tableau.tweets[indice];
		
		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"' align='top'/>"+elements.user.name+" <i>(@"+elements.user.screen_name+")</i> :&nbsp;";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, " ");

		content += "<span class='tweet'>";
		content += "<span class='twitter_title'>"+titleTwitter+"</span>";
		content += "<span class='twitter_Content'>"+contentTwitter+" &bull; </span>";
		content += "</span>";
		time += timeInfo;
	}

	var dico = {"content": content, "time" : time};
	zone.pushInfo(dico);
}
