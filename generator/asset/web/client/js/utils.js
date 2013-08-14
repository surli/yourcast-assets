/**
 *      <b>CONTROLER GENERAL</b>
 * 
 *  <b>Informations :</b>
 * 
 *      Le controler général permet de gérer toute l'application. Le controler 
 *      général ne dépend pas de Prototype. Le système de classe est celui de 
 *      base de Javascript.
 *      
 *  <b>Fonctions :</b>
 * 
 *      push - Pousse une nouvelle zone dans le Controler General
 *      getZones - Retourne toutes les zones qui ont été push
 *      refresh - Refresh la page du client lorsque le lien
 *      
 *  <b>Contributors :</b>
 *  
 *    	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

/**
 *  <b>ControlerGeneral</b>
 * 
 *  @param {type} url Url du lien
 */
function ControlerGeneral(url) {

    // Tableau des zones
    this.zones = new Array;

    // Test si le controler général est instancié
    if (ControlerGeneral.caller !== ControlerGeneral.getInstance) {
        
        // Retourne une exception
        throw new Exception("utils.js", "Le controleur général ne peux pas être instancié. Veuillez utiliser getInstance", new Error().lineNumber);
        
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
        new Information("utils.js", "Aucun lien donnée pour le refresh de la page", new Error().lineNumber);
        
    }

    /**
     * <b>Push</b>
     * 
     * Push une nouvelle zone.
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
     * <b>StopAllBehaviors</b>
     * 
     * Stop all behaviors of the client.
     */
    this.stopAllBehaviors = function() {

        // Stop tous les comportements
        for(var zone in this.zones) {
            zone.comportement.pause();
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
        
        // Effecture la requéte Ajax
        new Ajax.Request(this.url, {
            
            // On utilise un get
            method: 'get',
            
            // Si la requ�te est un succ�s
            onSuccess: function(transport) {

                // On v�rifie que le status est bon
                if (transport.status === 200) {

                    // On r�cup�re la r�ponse du JSon
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
                        
                        // Cr�ation d'une exception 
                        new Exception("utils.js", "Erreur dans le parse du JSon", new Error().lineNumber);

                    }

                } else {

                    // Création d'une exception
                    new Exception("utils.js", "Erreur dans le transport des informations lors du refresh de la page", new Error().lineNumber);

                }
            },
            onFailure: function() { },
            onException: function() { },
            onComplete: function() { }

        });

    };

};

// Propri�t� statique qui contient l'instance unique  
ControlerGeneral.instance = null;

/**
 * GetInstance
 * 
 * @param url Url du lien de refresh
 * 
 * @returns ControlerGeneral L'instance du controler g�n�ral
 */
ControlerGeneral.getInstance = function(url) {

    // Test s'il y a une instance enregistr�
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
//	MESSAGE GENERAL
// ====================================================

console.log("\t\t\t____________________________________________________________________________________________________\n\n\t\t\t\t\t\t\tYOURCAST Client - Console\n\n\t\t\tYourcast est un système de diffusion d'informations développé par le laboratoire i3S du CNRS.\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tVersion 2.0\n\t\t\t____________________________________________________________________________________________________\n\n");

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
var LESS_CHARGE             = false;
var NB_ZONE_CHARGE          = 0;

// Speed up calls to hasOwnProperty
var hasOwnProperty          = Object.prototype.hasOwnProperty;

// Variable du less
less = {
    env: "production",
    async: false,
    fileAsync: true
};

// Chargement de la page
if (window.addEventListener) {
    window.addEventListener('load', pageCharge, false);
} else {
    window.attachEvent('onload', pageCharge);
}

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

function modifValues() {
    
    if(document.getElementById('chargement')) {
        
        val = document.getElementById('chargement').value;
                
        if(val>=100) {
            val=5;
        } else {
            val += 2;
        }
        
        document.getElementById('chargement').value = val;

    }
    
} 

var timeout_chargement = setInterval(function(){ modifValues(); }, 40);

/**
 *  <b>FinChargement</b>
 *  
 *  Fin du chargement. Test si le chargement des fichiers less et le chargement
 *  de la zone "master" est terminé.
 */
function finChargement() {

    // Cache le logo de chargement
    if(NB_ZONE_CHARGE >= ControlerGeneral.getInstance().getZones().length) {
        
        // Cache le logo du chargements
        $('logo_loading').hide();
        
    }

}

/**
 *  <b>FinChargementLess</b>
 *  
 *  Fin du chargement des fichiers less.
 */
function finChargementLess() {

    // Change la variable
    LESS_CHARGE = true;

    // Fin du chargement
    finChargement();

}

/**
 *  <b>FinChargementMaster</b>
 *  
 *  Fin du chargemenet de la zone master
 */
function finChargementZone() {

    // Change la variable
    NB_ZONE_CHARGE++;

    finChargement();

}

/**
 *  
 */
function pageCharge() {
    
    // La page est chargé
    PAGE_CHARGE = true;
    
}

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
            throw new Exception("utils.js", "L'url est incorrect : " + url, new Error().lineNumber);
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

        // On met l'url donné en param�tre
        lien_less.rel = "stylesheet";
        lien_less.type = "text/less";
        lien_less.href = url;

        // On ajoute le lien css dans le head
        document.getElementsByTagName('head')[0].appendChild(lien_less);

    } catch (exception) {

        // Si on est en développement on affiche une exception
        new Exception("utils.js", exception, new Error().lineNumber);

    }

}

/**
 * Le client bloqué
 */
function clientBloque() {
    
    // On clear le timeout
    clearTimeout(timeout_chargement);
    
    // Récupérer la valeur
    val = document.getElementById('chargement').value;
    
    // Change le text
    document.getElementById("progress").innerHTML = '<p style="color: red;">Erreur dans le chargement</p><progress id="chargement_bloque" value="' + val + '" max="100"></progress>';
    
}

/**
 *  <b>SpecificActionWhenRequestWorksForGlc</b>
 *  
 *  Actions sp�cifiques lorsque le client fonctionne parfaitement
 */
function specificActionWhenRequestWorksForGlc() {
    console.log("specif action blabla");
    if (document.getElementById('Weather_current_header')) {
        document.getElementById('Weather_current_header').style.background = "transparent url('./img/INRIA_background.png') no-repeat right 10px";
    }
    console.log("fin de specif action blabla");
}

/**
 *  Actions sp�cifiques lorsque le client ne fonctionne pas
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

    // R�cup�re la premi�re lettre et la met en majuscule
    var newstr = str.charAt(0).toUpperCase() + str.substr(1, str.length);

    // Retourne la nouvelle cha�ne
    return newstr;

}
