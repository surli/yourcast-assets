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
function loadScriptCallback(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function loadScript(url) {
	loadScriptCallback(url, function() {});
}

function loadLess(url) {
	var head = document.getElementsByTagName('head')[0];
	lien_css = document.createElement('link');
	lien_css.href = url;
	lien_css.rel = "stylesheet/less";
	less.sheets.push(lien_css);
	less.refresh(false);
	head.appendChild(lien_css);
}

var LESS_ROOT = "less";
var JS_ROOT = "js";
var RENDERER_PATH = JS_ROOT+"/renderers";
var BEHAVIOUR_PATH = JS_ROOT+"/behaviours";

var DOMAIN_PATH = "http://"+document.location.host;
//DOMAIN_PATH = "Sites/yourcast/client/generated/ihm";
var DEFAULT_REQUEST_TIMEOUT = 60000;

var VERBOSE_DEBUG = "verbose";

var SILENT_DEBUG = "silent";

function specificActionWhenRequestWorksForGlc() {
	console.log("specif action blabla");
	if (document.getElementById('Weather_current_header')) {
		document.getElementById('Weather_current_header').style.background = "transparent url('./img/INRIA_background.png') no-repeat right 10px";
	}
	console.log("fin de specif action blabla");
}

function specificActionWhenRequestFailsForGlc() {
	if (document.getElementById('Weather_current_header')) {
		document.getElementById('Weather_current_header').style.background = "transparent url('./img/yourcast_small_red.png') no-repeat right 10px;";
	}
}	
	
	// Speed up calls to hasOwnProperty
	var hasOwnProperty = Object.prototype.hasOwnProperty;

function is_empty(obj) {

	    // null and undefined are empty
	    if (obj == null) return true;
	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length && obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key))    return false;
	    }

	    return true;
	}
