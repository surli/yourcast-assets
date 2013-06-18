/*
 * This behavior is a simple appearance of each info with a smooth appearance
 */
 
loadScript(BEHAVIOUR_PATH+"/utils/functions.js");
 
function choralies_behavior_smooth_appearance_timeout(zone, indice, run) {
	if(run){
		var info = "";
		info = zone.infoList[indice];

		zone.changeContent("<div id='"+zone.id+"_new_appear' style='display:none;'>"+info.content+"</div>");
		Effect.Appear(zone.id+"_new_appear");
		
		// place the logo on the zone
		if(document.getElementById(zone.id+"_logo"))
		document.getElementById(zone.id+"_logo").innerHTML = info.logo;

		// place the title on the zone
		if(document.getElementById(zone.id+"_title"))
		document.getElementById(zone.id+"_title").innerHTML = info.title;
		indice = (indice+1) % zone.counterInfo;
		
		// the time is transform in millisecond
		var time = info.time * 1000;
		
		Effect.BlindDown('progressbar', { scaleX : false, scaleY : true, duration: info.time });
		
		zone.set_timeout("timeoutBehav", function() { choralies_behavior_smooth_appearance_timeout(zone, indice, run); }, time);
	}else {
		zone.clear_timeout("timeoutBehav");
	}
}

/*
 * call the behavior simple_appearance_timeout()
 */
function choralies_behavior_smooth_appearance(zone, run) {
	choralies_behavior_smooth_appearance_timeout(zone, 0, run);
}