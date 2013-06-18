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
 * this is a behavior for the zone4 (right sidebar)
 * the behavior is a simple push appearance of each new info
 */
function simple_push_timeout(zone, indice, run) {
	if(run){
		var info = "";
		info = zone.infoList[indice];
		zone.addContent(info.content);
		Effect.BlindDown(zone.id+'_new_push');

		indice = (indice+1) % zone.counterInfo;

		// the time is transform in millisecond
		var time = info.time * 1000;

		zone.set_timeout("timeoutBehav", function() { simple_push_timeout(zone, indice, run); }, time);
	}else {
		zone.clear_timeout("timeoutBehav");
	}
}

/*
 * call the behavior simple_push_timeout()
 */
function simple_push(zone, run) {
	simple_push_timeout(zone, 0, run);
}