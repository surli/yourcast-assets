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

/* * * * * * * * * * * * * * * * * * * * * * * * *  *
 *  /!\/!\ This function is not used anymore /!\/!\	*
 *													*
 * take in parameter :								*
 * - intensity : the speed of the animation			*
 *	1: Low											*
 *	2: Normal										*
 *	3: Fast											*
 *	other : Normal									*
 * - contentSize : the size of the content			*
 * - anim : the type of th animation				*
 *		top or left									*
 * * * * * * * * * * * * * * * * * * * * * * * * *  */	
function time_duration(intensity, contentSize, anim) {
	var vitesseLow;
	var vitesseNormal;
	var vitesseFast;
	var time = 0;

	if (anim == "top") {
		vitesseLow = 10;
		vitesseNormal = 30;
		vitesseFast = 60;
		time = 0;

		if (intensity == 1) {
			time = contentSize / vitesseLow;
		}
		else if (intensity == 2) {
			time = contentSize / vitesseNormal;
		}
		else if (intensity == 3) {
			time = contentSize / vitesseFast;
		}
		else {
			time = contentSize / vitesseNormal;
		}
	}
	else {
		vitesseLow = 115;
		vitesseNormal = 235;
		vitesseFast = 535;
		time = 0;

		if (intensity == 1) {
			time = contentSize / vitesseLow;
		}
		else if (intensity == 2) {
			time = contentSize / vitesseNormal;
		}
		else if (intensity == 3) {
			time = contentSize / vitesseFast;
		}
		else {
			time = contentSize / vitesseNormal;
		}
	}

	return time;
}

// this function create a style element for the css3 animation
// if the element exist, it is deleted before created
function create_or_replace_behaviour_style_zone() {
	var styleZoneId = 'behaviourStyle';
	if (document.getElementById(styleZoneId)) {
		var head = document.getElementsByTagName("head")[0];
		head.removeChild(document.getElementById(styleZoneId));
	}
	var elem = document.createElement('style');
	elem.id = styleZoneId;
	return elem;
}

// use by the IRSAM layout, remove the less styles
function removeLessStyles() {
	var head = document.getElementsByTagName("head")[0];
	var stylesTableau = document.getElementsByTagName("style");
	var style;
	for (var i = 0; i < stylesTableau.length; i++) {
		style = stylesTableau[i];
		if (style.id.indexOf("less:") != -1)
			head.removeChild(style);
	}
}
