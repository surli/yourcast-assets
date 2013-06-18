/*
 * this is a behavior for the push zone
 * the behavior is a simple push appearance of each new info
 */






loadScript(BEHAVIOUR_PATH+"/utils/functions.js");

/*
 * this is a behavior for right sidebar
 * the behavior is a simple push appearance of each new info
 */
function choralies_behavior_simple_push_timeout(zone, indice, run) {
	if(run){
		var info = "";
		info = zone.infoList[indice];
		zone.addContent(info.content);
		
		Effect.BlindDown(zone.id+'_new_push'); 

		indice = (indice+1) % zone.counterInfo;
		
		// the time is transform in millisecond
		var time = info.time * 1000;
		
		zone.set_timeout("timeoutBehav", function() { choralies_behavior_simple_push_timeout(zone, indice, run); }, time);
	}else {
		zone.clear_timeout("timeoutBehav");
	}
}

/*
 * call the behavior simple_push_timeout()
 */
function choralies_behavior_simple_push(zone, run) {
	choralies_behavior_simple_push_timeout(zone, 0, run);
}