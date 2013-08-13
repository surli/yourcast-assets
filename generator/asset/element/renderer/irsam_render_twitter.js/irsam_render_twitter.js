/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/


/*
 * work on twitter source
 * display the twitter in zone1 (main)
 */
function irsam_render_twitter(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/twitter.png"/>';
	zone.loadImage("img/logos/twitter.png");
	var title = collection.title;
	var time = timeInfo;
	
	for (var indice = 0; indice < collection.tweets.length; indice++) {
		elements = collection.tweets[indice];
		var titleTwitter = "<i>"+elements.user.name+"</i> - @"+elements.user.screen_name+"  <img src='"+elements.user.profile_image_url+"'/>";
		var reg=new RegExp("(\n)", "g");
		var contentTwitter = elements.text.replace(reg, "<br/>");
		var authorPicTwitter = "<img src='"+elements.user.profile_image_url+"'/>";
		zone.loadImage(elements.user.profile_image_url);
		var content = "";

		content += "<div id='twitter' class='main_div_zone1'>";
			content += "<div class='twitter_title'>"+titleTwitter+"</div>";
			content += "<div class='twitter_body'>";
				content += "<div class='twitter_Content'>"+contentTwitter+"</div>";
				//content += "<div class='twitter_Author'>"+authorPicTwitter+"</div>";
			content += "</div>";
		content += "</div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}