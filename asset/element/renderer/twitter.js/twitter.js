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
function render_Twitter_for_main_different_title(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/twitter.png"/>';
	zone.loadImage("img/twitter.png");
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

/*
 * work on twitter source
 * display the twitter in zone2 (scrolling)
 * the content is modified but the logo is the same for the source 
 */
function render_Twitter_for_scrolling_with_logo_twitter(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/twitter.png'/>";
	zone.loadImage('img/twitter.png');
	
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		elements = tableau.tweets[indice];

		content = "<i class='atTwitter'>@"+elements.user.screen_name+" </i> - ";
		var text = elements.text;
		var linkText = text.indexOf("");
		 content += elements.text;

		var dico = {"content": content, "logo": logo, "time" : time};
		zone.pushInfo(dico);
	}
}

function render_Twitter_for_scrolling_with_logo_user_dynamic_time(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/twitter.png'/>";
	zone.loadImage('img/twitter.png');
	
	var ratio = timeInfo / 140;
	//var time = timeInfo;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		elements = tableau.tweets[indice];
		content = "<span><img class='user_logo' src='"+elements.user.profile_image_url+"'/></span> - ";
		content += "<i class='atTwitter'>@"+elements.user.screen_name+" </i> - ";
		var text = elements.text;
		var linkText = text.indexOf("");
		 content += elements.text;
		var time = ratio*text.length;
		var dico = {"content": content, "logo": logo, "time" : time};
		zone.pushInfo(dico);
	}
}

function render_Twitter_for_scrolling_with_logo_user_fixed_time(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/twitter.png'/>";
	zone.loadImage('img/twitter.png');
	
	var time = timeInfo;
	for (var indice = 0; indice < tableau.tweets.length; indice++) {
		elements = tableau.tweets[indice];
		content = "<span><img class='user_logo' src='"+elements.user.profile_image_url+"'/></span> - ";
		content += "<i class='atTwitter'>@"+elements.user.screen_name+" </i> - ";
		var text = elements.text;
		var linkText = text.indexOf("");
		 content += elements.text;
		
		var dico = {"content": content, "logo": logo, "time" : time};
		zone.pushInfo(dico);
	}
}
