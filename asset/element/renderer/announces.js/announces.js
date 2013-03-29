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
 * work on announces1 source
 * display the announces on the zone1 (main)
 * the content is modified but the logo and the title are the same
 * function uses :
 *	- render_date(element) -> js/date.js
 */
function render_Announces_for_main_same_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/internal.png"/>';
	zone.loadImage("img/logos/internal.png");
	var title = "Annonces";
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var titleAnnounces = elements.title;
		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.content.replace(reg, "<br/>");
		var authorAnnounces = elements.author;
		var content = "";

		if (titleAnnounces.length > 30) {titleAnnounces = titleAnnounces.substring(0, 30); titleAnnounces += "...";}
		if (contentAnnounces.length > 400) {contentAnnounces = contentAnnounces.substring(0, 400); contentAnnounces += "...";}
		if (authorAnnounces.length > 30) {authorAnnounces = authorAnnounces.substring(0, 30); authorAnnounces += "...";}

		content += "<div id='announces' class='main_div_zone1'>";
			content += "<div class='announces_title'>"+titleAnnounces+"</div>";
			content += "<div class='announces_body'>";
				content += "<div class='announces_Dates'>"+render_date(elements)+"</div>";
				content += "<div class='announces_Content'>"+contentAnnounces+"</div>";
				if (elements.img !== "")
					zone.loadImage(elements.img);
					content += "<div class='announces_Image'><img src='"+elements.img+"'/></div>";
				content += "<div class='announces_Author'><i>"+authorAnnounces+"</i></div>";
			content += "</div>";
		content += "</div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}

/*
 * work on announces1 source
 * display the announces on the zone1 (main)
 * the content and the title are modified but the logo is the same
 * function uses :
 *	- render_date(element) -> js/date.js
 */
function render_Announces_for_main_different_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var logo = '<img src="img/logos/internal.png"/>';
	zone.loadImage("img/logos/internal.png");
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var title = elements.title;
		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.content.replace(reg, "<br/>");
		var authorAnnounces = elements.author;
		var content = "";
		
		if (title.length > 30) {title = title.substring(0, 30); title += "...";}
		if (contentAnnounces.length > 400) {contentAnnounces = contentAnnounces.substring(0, 400); contentAnnounces += "...";}
		if (authorAnnounces.length > 30) {authorAnnounces = authorAnnounces.substring(0, 30); authorAnnounces += "...";}
		
		content += "<div id='announces' class='main_div_zone1'>";
		content += "<div class='announces_body_different_title'>";
			content += "<div class='announces_Dates'>"+render_date(elements)+"</div>";
			content += "<div class='announces_Content'>"+contentAnnounces+"</div>";
			if (elements.img !== "")
				zone.loadImage(elements.img);
				content += "<div class='announces_Image'><img src='"+elements.img+"'/></div>";
			content += "<div class='announces_Author'><i>"+authorAnnounces+"</i></div>";
		content += "</div>";
	content += "</div>";		
		
		var dico = {"content": content, "logo": logo, "title": title, "time": time};
		zone.pushInfo(dico);
	}
}

/*
 * work on announces1 source
 * display the announces on the zone2 (scrolling)
 * the content is modified but there isn't logo or title
 */
function render_Announces_for_scrolling_simple(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	content = "";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content += elements.content+" ----- ";
	}

	var dico = {"content": content, "time" : time};
	zone.pushInfo(dico);
}

/*
 * work on announces1 source
 * display the announces on the zone2 (scrolling)
 * the content is modified but the logo is the same
 */
function render_Announces_for_scrolling_logo_for_source(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	content = "";
	content += "<img src='img/logos/internal.png'/>";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content += elements.content+" ----- ";
	}

	var dico = {"content": content, "time" : time};
	zone.pushInfo(dico);
}

/*
 * work on announces1 source
 * display the announces on the zone2 (scrolling)
 * the content is modified but the logo is the same for each info
 */
function render_Announces_for_scrolling_logo_for_each_info(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/logos/edt.png'/>";
	zone.loadImage("img/logos/edt.png");
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content = elements.content;

		var dico = {"content": content, "logo": logo, "time" : time};
		zone.pushInfo(dico);
	}
}
