/*
 * work on twitter source
 * display the tweet on the scrolling zone
 * 
 */
loadLess(LESS_ROOT+"/choralies_render_Twitter_for_scrolling.less"); 
 
function choralies_render_Twitter_for_scrolling(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;

	var content = "";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		var elements = tableau.tweets[indice];
		
		zone.loadImage(elements.user.profile_image_url);
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"' align='top'/> "+elements.user.name+" <i>(@"+elements.user.screen_name+")</i> :&nbsp;";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, " ");

		content += "<span class='tweet'>";
		content += " "+"<span class='twitter_title'>"+titleTwitter+"</span>";
		content += "<span class='twitter_Content'>"+contentTwitter+" </span>";
		content += "</span>";
		
	}

	var dico = {"content": content, "logo": '', "time" : time};
	zone.pushInfo(dico);
}