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
		var titleTwitter = "<img src='"+elements.user.profile_image_url+"' align='top'/> "+elements.user.screen_name+" <i>(@"+elements.user.name+")</i>";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, " ");

		if(indice%3==0)
			content += "<span class=\"info\"> Participez via Twitter (#choralies2013) ou envoyez Choralies suivi de votre message par SMS au 3 10 37 (coût d'un sms) ! &nbsp;</span>";
			
		content += "<span class='tweet'>";
		content += "&nbsp;&nbsp;<span class='twitter_title'>"+titleTwitter+"</span>&nbsp;:&nbsp;";
		content += "<span class='twitter_Content'>"+contentTwitter+" &nbsp;&nbsp;</span>";
		content += "</span>";

		if(indice%3==2)
			content += "<span class=\"info\"> Participez via Twitter avec le hashtag #choralies2013 ! &nbsp;</span>";
		
	}

	var dico = {"content": content, "logo": '', "time" : time};
	zone.pushInfo(dico);
}