/*
 * Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/gpl.html
 * Contributors:
 * Simon Urli (simon.urli@gmail.com) - Main contributor
 */

loadScript(BEHAVIOUR_PATH+"/utils/functions.js");


/*
 * this is a behavior for the zone1 (main)
 * the behavior is a simple appearance of each info
 */
function simple_appearance_timeout(zone, indice, run) {
	if(run){
		var info = "";
		info = zone.infoList[indice];
		zone.changeContent(info.content);
		// place the logo on the zone
		document.getElementById(zone.id+"_logo").innerHTML = info.logo;
		// place the title on the zone
		document.getElementById(zone.id+"_title").innerHTML = info.title;
		indice = (indice+1) % zone.counterInfo;
		
		// the time is transform in millisecond
		var time = info.time * 1000;
		
		zone.set_timeout("timeoutBehav", function() { simple_appearance_timeout(zone, indice, run); }, time);
	}else {
		zone.clear_timeout("timeoutBehav");
	}
}

/*
 * call the behavior simple_appearance_timeout()
 */
function simple_appearance(zone, run) {
	simple_appearance_timeout(zone, 0, run);
}


/*
 * this is a behavior for the zone1 (main) for irsam
 * the behavior is a simple appearance of each info but every info is display twice, first in black and the second in yellow
 * functions uses :
 *	- removeLessStyles() -> behaviours/utils/functions.js
 */
function irsam_appearance_timeout(zone, styles, indice) {
	var info = "";
	var lien_css;
	removeLessStyles();
	less.sheets = styles.clone();
	
	// alternate between the black and yellow appearance
	if (indice % 2 === 0) {
			lien_css = document.createElement('link');
			lien_css.href = "less/black.less";
			lien_css.rel = "stylesheet/less";
			less.sheets.push(lien_css);
			less.refresh(false);

		} else {
			lien_css = document.createElement('link');
			lien_css.href = "less/yellow.less";
			lien_css.rel = "stylesheet/less";
			less.sheets.push(lien_css);
			less.refresh(false);
		}

	zone.clear_timeout("timeout");

	info = zone.infoList[Math.floor(indice/2)];
	
	zone.changeContent(info.content);
	document.getElementById(zone.id+"_logo").innerHTML = info.logo;
	document.getElementById(zone.id+"_title").innerHTML = info.title;
	indice = (indice+1) % (zone.counterInfo*2);
	
	// the time is transform in millisecond
	var time = info.time * 1000;
	
	zone.set_timeout("timeout", function() { irsam_appearance_timeout(zone, styles, indice); }, time); 
}


/*
 * call the behavior irsam_appearance_timeout()
 */
function irsam_appearance(zone) {
	irsam_appearance_timeout(zone, less.sheets, 0);
}

