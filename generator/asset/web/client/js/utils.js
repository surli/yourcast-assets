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

var ROOT = document.location.pathname;

var LESS_ROOT = ROOT + "/less";
var JS_ROOT = ROOT + "/js";
var IMG_PATH = ROOT + "/img";

var RENDERER_PATH = JS_ROOT + "/renderers";
var BEHAVIOUR_PATH = JS_ROOT + "/behaviours";

var DOMAIN_PATH = "http://" + document.location.host;
//DOMAIN_PATH = "Sites/yourcast/client/generated/ihm";
var DEFAULT_REQUEST_TIMEOUT = 60000;

var VERBOSE_DEBUG = "verbose";

var SILENT_DEBUG = "silent";

var PROD = false;

// ====================================================
//	FONCTIONS
// ====================================================

function loadScriptCallback(url, callback) {

    // On ajoute l'élément au head
    document.write('<script type="text/javascript" src="' + url + '"></script>');

}

/**
 *	Charge un script javascript
 *	
 *	@param url L'adresse du script
 *	@param callback Booléen qui indique si on doit attendre que le script
 *	soit chargé
 */
function loadScript(url, callback) {
    loadScriptCallback(url, callback);
}

/**
 *	Méthode qui permet d'ajouter une feuille de style dans le document
 *	
 *	@param url L'adresse du style less
 */
function loadLess(url) {

    try {

        // On crée un lien pour une feuille de style
        lien_less = document.createElement('link');

        // On met l'url donné en paramêtre
        lien_less.rel = "stylesheet/less";
        lien_less.href = url;

        // On ajoute le lien css dans le head
        document.getElementsByTagName('head')[0].appendChild(lien_less);

    } catch (exception) {
        
        // Si on est en développement on affiche une exception
        if(!PROD) {
            new Exception("[Utils] LoadLess", "L'url est incorrect : " + url);
        }
        
    }

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
    if (obj == null)
        return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}

function isPropertyDefined(prop) {
    if (prop === undefined) {
        return false;
    } else {
        if (typeof prop === "string") {
            return (prop !== "");
        } else if (typeof prop === "object") {
            return !(is_empty(prop));
        } else if (typeof prop === "array") {
            return !(is_empty(prop));
        } else {
            return true;
        }
    }
}

function firstLettertoUpperCase(str) {
    var newstr = str.charAt(0).toUpperCase();
    newstr += str.substr(1, str.length);
    return newstr;
}
