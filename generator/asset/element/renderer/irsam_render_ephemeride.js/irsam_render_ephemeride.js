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
 * work on ephem1 source
 * display the ephemerides for the day on the zone1 (main)
 * the content is modified but the logo and the title are the same
 * function uses :
 * 		- get_a_month(month) -> js/date.js
 */
function irsam_render_ephemeride(datas, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 3;
	var logo = '<img src="img/logos/absence.png"/>';
	zone.loadImage("img/logos/absence.png");
	var title = "Ephemeride";
	var time = timeInfo;
	var content = "";

	var day = datas.day;
	var month = get_a_month(datas.month - 1);
	content += "<div class='main_div_zone1' >";
	content += "<div id='ephemTitle'>Aujourd'hui, <i>le "+day+" "+month+"</i>, nous fêtons les : </div>";

	if ((typeof datas !== 'undefined') && (typeof datas.names !== 'undefined')) {
		for (var indice = 0; indice < datas.names.length; indice++) {
			content += "<div class='ephemSaint'>"+datas.names[indice]+"</div>";
		}
	}
	content += "</div>";	
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};
	zone.pushInfo(dico);
}
