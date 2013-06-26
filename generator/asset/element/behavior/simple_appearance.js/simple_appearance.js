/*
 * This behavior is a simple appearance of each info
 */
 
loadScript(BEHAVIOUR_PATH+"/utils/functions.js");
 
function simple_appearance_timeout(zone, indice, run) {
	if(run){
		var info = "";
		info = zone.infoList[indice];

		zone.changeContent(info);
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