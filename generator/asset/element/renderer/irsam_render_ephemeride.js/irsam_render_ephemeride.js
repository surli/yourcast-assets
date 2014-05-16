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
	var time = timeInfo;
	var content = "";
	var date_actuelle = new Date();
	var day = get_a_day(date_actuelle.getDay());
	var dayNumber = date_actuelle.getDate();
	var month = get_a_month(date_actuelle.getMonth());
	
	var title = day+" "+dayNumber+" "+month;
	
    if (datas.length === 0 || is_empty(datas[0])) {
        throw new Information("irsam_render_ephemeride.js", "The informations are empty", 30);
    }

	content += "<div class='main_div_zone1' >";
	content += "<div id='ephemTitle'>Bonne fête </div>";

	if ((typeof datas !== 'undefined') && (typeof datas.names !== 'undefined')) {
		if (datas.names.length > 1) {
			valRandom = (Math.random()*1000).ceil() % datas.names.length;
			content += "<div class='ephemSaint'>"+datas.names[valRandom]+"</div>";
		}
	}
	content += "</div>";	
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};
	zone.pushInfo(dico);
}

