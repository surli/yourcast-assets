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

loadScript(RENDERER_PATH+"/utils/pictures.js");

/*
 * work on slides source
 * display pictures in full on the zone1 (main)
 * without title neither logo
 *
 * CSS classes : 
 * - main_div_zone1_full
 * - slideimage  
 */
function glc_render_Slide_for_main_full(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	//zone.loadImage("img/logos/picture.png");

	var time = timeInfo;
	var tableau = collection.slides;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var urlSlide = elements.url ;
		zone.loadImage(urlSlide);
		var zoneHeight = $(zone.id).getHeight();

		content ="<div id='Slide' class='main_div_zone1_full' style='height:"+zoneHeight+"px;'>";
				content += "<div class='slideimage'><img src='"+urlSlide+"'/></div>";
		content += "</div>";

		var dico = {"content": content, "time" : time};
		zone.pushInfo(dico);
	}
}
