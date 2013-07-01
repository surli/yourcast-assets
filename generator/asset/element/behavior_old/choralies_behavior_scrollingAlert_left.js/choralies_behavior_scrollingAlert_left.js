/*
 * this is a behavior for scrolling zone
 * the behavior is a scroll of each info to the left side with logo before each info
 * functions uses :
 *	- time_duration(time, taille, direction) -> behaviours/utils/functions.js
 *	- create_or_get_behaviour_style_zone() -> behaviours/utils/functions.js
 */
function choralies_behavior_scrollingAlert_left(zone){

	var info;
	var content = "";
	var time = 0;

	for (var i = 0; i < zone.counterInfo; i++) {
		info = zone.infoList[i];
			content += info.content;
			time += info.time;
	}
	
	content = "<div class='scrollContentEachLogoLeft'><span class='scrollContent toLeft' id='scrollcontent_"+zone.id+"'>"+content+"</span></div>";
	zone.changeContent(content);
	
	var dicoInfo = {"content": content, "time":time};
	
		
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