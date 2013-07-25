/**
 *      <b>CONTROLER GENERAL</b>
 * 
 *  Informations :
 * 
 *      Le controler général permet de gérer toute l'application. Le controler 
 *      général ne dépend pas de Prototype. Le système de classe est celui de 
 *      base de Javascript.
 *      
 *  Fonctions :
 * 
 *      push - Pousse une nouvelle zone dans le Controler General
 *      getZones - Retourne toutes les zones qui ont été push
 *      refresh - Refresh la page du client lorsque le lien
 *      
 *  Contributors :
 *  
 *    	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Création de la zone singleton
function ControlerGeneral(url) {

    // Tableau des zones
    this.zones = new Array;

    // Test si le controler général est instancié
    if (ControlerGeneral.caller !== ControlerGeneral.getInstance) {
        throw new Exception("Le controleur général ne peux pas être instancié. Veuillez utiliser getInstance");
    }

    // Test si l'url est définit
    if(isPropertyDefined(url)) {
        
        // Stockage de l'url
        this.url = url;
        
        // Stockage du this
        var self = this;
        
        // Refresh de la page
        setInterval(function() { self.refresh(); }, 1000);
        
    } else {
        
        // Affichage en information
        new Information("[ControlerGeneral] Refresh", "Aucun lien donnée pour le refresh de la page");
        
    }

    /**
     * Push
     * 
     * @param zone Nouvelle zone
     * @returns ControlerGeneral L'instance du controler général
     */
    this.push = function(zone) {

        // Ajoute la nouvelle zone
        if (zone && zone !== null) {
            this.zones.push(zone);
        }

    };

    /**
     * GetZones
     * 
     * @returns Array Le tableau des zones du controler général
     */
    this.getZones = function() {

        // Retourne les zones
        return this.zones;

    };
    
    /**
     *  Refresh de la page
     */
    this.refresh = function() {
        
        // Effecture la requête Ajax
        new Ajax.Request(this.url, {
            
            // On utilise un get
            method: 'get',
            
            // Si la requête est un succès
            onSuccess: function(transport) {

                // On vérifie que le status est bon
                if (transport.status === 200) {

                    // On récupère la réponse du JSon
                    var textContent = transport.responseText;

                    // On essaie de le traiter
                    try {

                        // Parse le JSon
                        var json = JSON.parse(textContent);

                        // On test si on doit reload la page
                        if(json.reload) {
                            location.reload();
                        }

                    }

                    // Un erreur est survenue
                    catch (e) {
                        
                        // Création d'une exception 
                        new Exception("[ControlerGeneral] Refresh", "Erreur dans le parse du JSon");

                    }

                } else {

                    // Création d'une exception
                    new Exception("[ControlerGeneral] Refresh", "Erreur dans le transport des informations lors du refresh de la page");

                }
            },
            onFailure: function() { },
            onException: function() { },
            onComplete: function() { }

        });

    };

};

// Propriété statique qui contient l'instance unique  
ControlerGeneral.instance = null;

/**
 * GetInstance
 * 
 * @returns ControlerGeneral L'instance du controler général
 */
ControlerGeneral.getInstance = function(url) {

    // Test s'il y a une instance enregistré
    if (this.instance === null) {
        this.instance = new ControlerGeneral(url);
    }

    // Retourne l'instance
    return this.instance;

};

/**
 *      <b>UTILS</b>
 *      
 *  Rights :
 *  
 *	Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 *	All rights reserved. This program and the accompanying materials
 *	are made available under the terms of the GNU Public License v3.0
 *	which accompanies this distribution, and is available at
 *	http://www.gnu.org/licenses/gpl.html
 *
 *  Contributors:
 *  
 *    	Simon Urli (simon.urli@gmail.com) - Main contributor
 *    	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// ====================================================
//	SCRIPTS PRINCIPAUX
// ====================================================

// Chargement des fichiers n?cessaires
loadScript("js/comportement.js");
loadScript("js/exception.js");

// ====================================================
//	VARIABLES
// ====================================================

var ROOT                    = document.location.pathname;

var LESS_ROOT               = ROOT + "/less";
var JS_ROOT                 = ROOT + "/js";
var IMG_PATH                = ROOT + "/img";

var RENDERER_PATH           = JS_ROOT + "/renderers";
var BEHAVIOUR_PATH          = JS_ROOT + "/behaviours";

var DOMAIN_PATH             = "http://" + document.location.host;
var DEFAULT_REQUEST_TIMEOUT = 60000;

// Variables de debug
var VERBOSE_DEBUG           = "verbose";
var SILENT_DEBUG            = "silent";

// Variable avec des fonctions de debug
var PROD                    = true;
var PAGE_CHARGE             = false;

// Speed up calls to hasOwnProperty
var hasOwnProperty          = Object.prototype.hasOwnProperty;

// ====================================================
//	FONCTIONS
// ====================================================
//  - loadScript (url : string, callback : boolean)
//  - loadLess (url : string)
//  - specificActionWhenRequestWorksForGlc
//  - specificActionWhenRequestFailsForGlc
//  - is_empty (obj : object)
//  - isPropertyDefined (prop : string)
//  - firstLettertoUpperCase (string)
// ====================================================

/**
 *  <b>LoadScript</b>
 *  
 *  Charge un fichier Javascript en synchrone ou en asynchrone.
 *
 *  Callback non définit => Synchrone : On attend la fin du chargement pour 
 *  continuer.
 *  Callback définit => A-synchrone : On n'attend pas la fin du chargement pour 
 *  continuer.
 *	
 *  @param url Lien du fichier javascript
 *  @param callback Asynchrone
 */
function loadScript(url, callback) {

    try {

        // Callback définit
        if (callback || PAGE_CHARGE) {

            // adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // fire the loading
            head.appendChild(script);

        } else {

            document.write('<script type="text/javascript" src="' + url + '"></script>');

        }

    } catch (exception) {

        // Si on est en développement on affiche une exception
        if (!PROD) {
            new Exception("[Utils] LoadScript", "L'url est incorrect : " + url);
        }

    }

}

/**
 *  <b>LoadLess</b>
 *  
 *  Méthode qui permet d'ajouter une feuille de style dans le document
 *	
 *  @param url L'adresse du style less
 */
function loadLess(url) {

    // Si on est en prod, il n'y a plus de less
    if (PROD) {
        return true;
    }

    try {

        // On crée un lien pour une feuille de style
        lien_less = document.createElement('link');

        // On met l'url donné en paramêtre
        lien_less.rel = "stylesheet";
        lien_less.type = "text/less";
        lien_less.href = url;

        // On ajoute le lien css dans le head
        document.getElementsByTagName('head')[0].appendChild(lien_less);

    } catch (exception) {

        // Si on est en développement on affiche une exception
        new Exception("[Utils] LoadLess", "L'url est incorrect : " + url + " exception : " + exception);

    }

}

/**
 *  <b>SpecificActionWhenRequestWorksForGlc</b>
 *  
 *  Actions spécifiques lorsque le client fonctionne parfaitement
 */
function specificActionWhenRequestWorksForGlc() {
    console.log("specif action blabla");
    if (document.getElementById('Weather_current_header')) {
        document.getElementById('Weather_current_header').style.background = "transparent url('./img/INRIA_background.png') no-repeat right 10px";
    }
    console.log("fin de specif action blabla");
}

/**
 *  Actions spécifiques lorsque le client ne fonctionne pas
 */
function specificActionWhenRequestFailsForGlc() {
    if (document.getElementById('Weather_current_header')) {
        document.getElementById('Weather_current_header').style.background = "transparent url('./img/yourcast_small_red.png') no-repeat right 10px;";
    }
}

/**
 *  Return if the object is empty or not.
 *  @param {type} obj An object
 *  @returns {Boolean} True : the object is empty
 */
function is_empty(obj) {

    // null and undefined are empty
    if (obj === null || obj === undefined)
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

/**
 * Return if the object is defined
 * 
 * @param {type} prop
 * @returns {@exp;@call;is_empty|Boolean}
 */
function isPropertyDefined(prop) {
    if (prop === undefined) {
        return false;
    } else {
        if (typeof prop === "string") {
            return (prop !== "");
        } else if (typeof prop === "object") {
            return !(is_empty(prop));
        } else if (typeof prop === "array") {
            return !(is_empty(prop));
        } else {
            return true;
        }
    }
}

/**
 * First letter in uppercase
 * 
 * @param {type} str String to modify
 * @returns {unresolved} The new string
 */
function firstLettertoUpperCase(str) {

    // Récupère la première lettre et la met en majuscule
    var newstr = str.charAt(0).toUpperCase() + str.substr(1, str.length);

    // Retourne la nouvelle chaîne
    return newstr;

}
