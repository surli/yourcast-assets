/*
*	Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*	All rights reserved. This program and the accompanying materials
*	are made available under the terms of the GNU Public License v3.0
*	which accompanies this distribution, and is available at
*	http://www.gnu.org/licenses/gpl.html
*
*	Contributors:
*    	Simon Urli (simon.urli@gmail.com) - Main contributor
*/

// ====================================================
//	VARIABLES
// ====================================================

var MOTEUR_PATH = "/moteur_yourcast"
var ROOT = "/yourcast/client/yourcast-choralies-client";


var LESS_ROOT = ROOT+"/less";
var JS_ROOT = ROOT+"/js";
var IMG_PATH = ROOT+"/img";

var RENDERER_PATH = JS_ROOT+"/renderers";
var BEHAVIOUR_PATH = JS_ROOT+"/behaviours";

var DOMAIN_PATH = "http://"+document.location.host;
//DOMAIN_PATH = "Sites/yourcast/client/generated/ihm";
var DEFAULT_REQUEST_TIMEOUT = 60000;

var VERBOSE_DEBUG = "verbose";

var SILENT_DEBUG = "silent";

// ====================================================
//	FONCTIONS
// ====================================================

function loadScriptCallback(url, callback)
{
  // adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  if(typeof callback !== 'undefined') {
    
    // then bind the event to the callback function 
    // there are several events for cross browser compatibility
    script.onreadystatechange = callback;
    script.onload = callback;

  }

  // fire the loading
  head.appendChild(script);
}

/**
 *	Charge un script javascript
 */
function loadScript(url) {
	loadScriptCallback(url);
}

/**
 *	Méthode qui permet d'ajouter une feuille de style dans le document
 */
function loadLess(url) {

	// On récupère la balise head
	var head = document.getElementsByTagName('head')[0];

 	// On crée un lien pour une feuille de style
	lien_css = document.createElement('link');

	// On met l'url donné en paramêtre
	lien_css.href = url;

	// On annonce que c'est un fichier Less
	lien_css.rel = "stylesheet/less";

	// On ajoute le lien css dans le head
	head.appendChild(lien_css);

}

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

function firstLettertoUpperCase(str){
    var newstr = str.charAt(0).toUpperCase();
    newstr += str.substr(1,str.length);
    return newstr;
}
