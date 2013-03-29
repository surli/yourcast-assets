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

// to use this function, we need to convert the video in 3 different type, .mp4, .webm et .ogv
// because safari only support .mp4 and the others don't

function testVideoHTML5(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 30;
	var logo = '<img src="img/logos/tv.png"/>';
	zone.loadImage("img/logos/tv.png");
	var title = 'Test Vidéo';
	var time = timeInfo; // TODO mettre la longeur de la video
	
	content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
	content += '<video autoplay=true autobuffer=true loop=false class="videoTest">';
	content += ' <source src="video/test.mp4" type="video/mp4" />';
	content += '<source src="video/test.webm" type="video/webm" />';
	content += '<source src="video/test.ogv" type="video/ogg" />';
	content += 'Vous n\'avez pas de navigateur moderne, donc pas de balise video HTML5 !';
	content += '</video>';
	content += "</div>";
		
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};
	zone.pushInfo(dico);
}

// this function support all the format but depends on the operating systeme and if the user has install or not the different plugin for the extension
function testVideoEmbed(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 30;
	var logo = '<img src="img/logos/tv.png"/>';
	zone.loadImage("img/logos/tv.png");
	var title = 'Test Vidéo';
	var time = timeInfo; // TODO mettre la longeur de la video
	
	content += '<EMBED SRC="video/test.avi" LOOP="-1" AUTOSTART="true" class="videoTest">';
	content += "</div>";
		
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};
	zone.pushInfo(dico);
}