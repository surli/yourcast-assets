/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*    Damien Mostacchi (damien.mostacchi@gmail.com)
*/

loadScript(BEHAVIOUR_PATH+"/utils/functions.js");

/*
 * this is a behavior for the zone2 (scrolling)
 * the behavior is a scroll of each info to the left side without logo
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function scrolling_animation_left(zone){
		var info;
		var content = "";
		var time = 0;

		for (var i = 0; i < zone.counterInfo; i++) {
				info = zone.infoList[i];
				content += info.content;
				time += info.time;
		}

		zone.divMarquee.innerHTML = "<span class='scrollContent toLeft' id='scollcontent_"+zone.id+"'>"+content+"</span>";

		// TODO TO MODIFY

		var tailleSpan = document.getElementById('scollcontent_'+zone.id).offsetWidth;
		var leftPourcent = (tailleSpan * 100) / zone.divMarquee.offsetWidth;

		var style = create_or_replace_behaviour_style_zone();

		style.innerHTML = "#"+zone.id+" span{";
		style.innerHTML += " -moz-animation-name: marquee_left; -webkit-animation-name: marquee_left;";
		style.innerHTML += " -moz-animation-duration: "+time+"s; -webkit-animation-duration:"+time+"s; ";
		style.innerHTML += " -moz-animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite;";
		style.innerHTML += " -moz-animation-timing-function: linear; -webkit-animation-timing-function: linear;";

		style.innerHTML += "@-webkit-keyframes marquee_left{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";
		style.innerHTML += "  @-moz-keyframes marquee_left{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";

		document.head.appendChild(style);
}


/*
 * this is a behavior for the zone2 (scrolling)
 * the behavior is a scroll of each info to the top side without logo
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function scrolling_animation_top(zone){

	var info;
	var content = "";
	var boucle = 0;
	var oldStr = "-----";
	var newStr = "<br/><br/>";
	var time = 0;

	for (var i = 0; i < zone.counterInfo; i++) {
			info = zone.infoList[i];
			content += info.content;
			time += info.time;
	}


	while (boucle!=-1) {
         boucle=content.indexOf(oldStr,boucle);
         if (boucle>=0) {
            content=content.substring(0,boucle)+newStr+content.substring(boucle+oldStr.length);
            boucle+=newStr.length;
         }
      }

	zone.divMarquee.innerHTML = "<span class='scrollContent toTop' id='scollcontent_"+zone.id+"'>"+content+"</span>";

	// TODO TO MODIFY

	var tailleSpan = document.getElementById('scollcontent_'+zone.id).offsetWidth;
	var leftPourcent = (tailleSpan * 100) / zone.divMarquee.offsetHeight;

	var style = create_or_replace_behaviour_style_zone();

	style.innerHTML = "#"+zone.id+" span{";
	style.innerHTML += " -moz-animation-name: marquee_top; -webkit-animation-name: marquee_top;";
	style.innerHTML += " -moz-animation-duration: "+time+"s; -webkit-animation-duration:"+time+"s; ";
	style.innerHTML += " -moz-animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite;";
	style.innerHTML += " -moz-animation-timing-function: linear; -webkit-animation-timing-function: linear; }";

	style.innerHTML += "@-webkit-keyframes marquee_top{ from { top: 100%; } to { top: -"+leftPourcent+"%; } }";
	style.innerHTML += "  @-moz-keyframes marquee_top{ from { top: 100%; } to { top: -"+leftPourcent+"%; } }";

	document.head.appendChild(style);

}

/*
 * this is a behavior for the zone2 (scrolling)
 * the behavior is a scroll of each info to the left side with logo before each info
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function scrolling_animation_left_with_each_logo(zone){

	var info;
	var content = "";
	var time = 0;

	for (var i = 0; i < zone.counterInfo; i++) {
			info = zone.infoList[i];
			content += info.logo;
			content += " ";
			content += info.content;
			content += ' - ';
			time += info.time;
	}

	zone.divMarquee.innerHTML = "<span class='scrollContent toLeft' id='scollcontent_"+zone.id+"'>"+content+"</span>";

	// TODO TO MODIFY

	var tailleSpan = document.getElementById('scollcontent_'+zone.id).offsetWidth;
	var leftPourcent = (tailleSpan * 100) / zone.divMarquee.offsetWidth;

	var style = create_or_replace_behaviour_style_zone();

	style.innerHTML = "#"+zone.id+" span{";
	style.innerHTML += " -moz-animation-name: marquee_bottom_logo; -webkit-animation-name: marquee_bottom_logo;";
	style.innerHTML += " -moz-animation-duration: "+time+"s; -webkit-animation-duration:"+time+"s; ";
	style.innerHTML += " -moz-animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite;";
	style.innerHTML += " -moz-animation-timing-function: linear; -webkit-animation-timing-function: linear; }";

	style.innerHTML += "@-webkit-keyframes marquee_bottom_logo{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";
	style.innerHTML += "  @-moz-keyframes marquee_bottom_logo{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";

	document.head.appendChild(style);

}

/*
 * this is a behavior for the zone2 (scrolling)
 * the behavior is a scroll of each info to the top side with logo before each info
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function scrolling_animation_top_with_each_logo(zone){

	var info;
	var content = "";
	var time = 0;

	for (var i = 0; i < zone.counterInfo; i++) {
			info = zone.infoList[i];
			content += info.logo;
			content += " ";
			content += info.content;
			content += " <br/> ";
			time += info.time;
	}

	zone.divMarquee.innerHTML += "<span class='scrollContent toTop' id='scollcontent_"+zone.id+"'>"+content+"</span>";

	// TODO TO MODIFY
	var tailleSpan = document.getElementById('scollcontent_'+zone.id).offsetWidth;
	var leftPourcent = (tailleSpan * 100) / zone.divMarquee.offsetHeight;

	var style = create_or_replace_behaviour_style_zone();

	style.innerHTML = "#"+zone.id+" span.scrollContent{";
	style.innerHTML += " -moz-animation-name: marquee_top_logo; -webkit-animation-name: marquee_top_logo;";
	style.innerHTML += " -moz-animation-duration: "+time+"s; -webkit-animation-duration:"+time+"s; ";
	style.innerHTML += " -moz-animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite;";
	style.innerHTML += " -moz-animation-timing-function: linear; -webkit-animation-timing-function: linear; }";

	style.innerHTML += "@-webkit-keyframes marquee_top_logo{ from { top: 100%; } to { top: -"+leftPourcent+"%; } }";
	style.innerHTML += "  @-moz-keyframes marquee_top_logo{ from { top: 100%; } to { top: -"+leftPourcent+"%; } }";

	document.head.appendChild(style);

}


/*
 * this is a behavior for the zone2 (scrolling)
 * the behavior is a scroll of each info to the left side with logo fixes at the left side of the scroll
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function scrolling_animation_left_with_left_logo (zone, run){
	if(run){
		var info;
		var content = "";
		var time = 0;

		for (var i = 0; i < zone.counterInfo; i++) {
			info = zone.infoList[i];
				content += info.content;
				content += " - ";
				time += info.time;
		}


		zone.changeContent("<span class='scrollContent toLeft' id='scrollcontent_"+zone.id+"'>"+content+"</span>");
		document.getElementById(zone.id+"_logo").innerHTML = info.logo;
	
		var tailleSpan = document.getElementById('scrollcontent_'+zone.id).offsetWidth;
		var leftPourcent = (tailleSpan * 100) / zone.divMarquee.offsetWidth;
	
		var style = create_or_replace_behaviour_style_zone();
	
		style.innerHTML = "#"+zone.id+" span#scrollcontent_"+zone.id+"{ ";
		style.innerHTML += " -moz-animation-name: marquee;";
		style.innerHTML += " -webkit-animation-name: marquee;";
		style.innerHTML += " -moz-animation-duration: "+time+"s;";
		style.innerHTML += " -webkit-animation-duration: "+time+"s;";
		style.innerHTML += " -moz-animation-iteration-count: infinite;";
		style.innerHTML += " -webkit-animation-iteration-count: infinite;";
		style.innerHTML += " -moz-animation-timing-function: linear;";
		style.innerHTML += " -webkit-animation-timing-function: linear; } ";

		style.innerHTML += "@-webkit-keyframes marquee{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";
		style.innerHTML += "  @-moz-keyframes marquee{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";

		document.head.appendChild(style);
	}
}