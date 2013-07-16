/*
 * 	Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 * 	All rights reserved. This program and the accompanying materials
 * 	are made available under the terms of the GNU Public License v3.0
 * 	which accompanies this distribution, and is available at
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * 	Contributors:
 * 		Simon Urli (simon.urli@gmail.com) - Main contributor
 *	 	Golfieri Guillaume (golfieri.guillaume@gmail.com)
 */

// Création de la zone singleton
function ControlerGeneral() {  

    // Tableau des zones
    this.zones = new Array;

    // Test si le controler général est instancié
    if ( ControlerGeneral.caller !== ControlerGeneral.getInstance ) {  
        throw new Exception("Le controleur général ne peux pas être instancié. Veuillez utiliser getInstance");  
    }
  
};

// Propriété statique qui contient l'instance unique  
ControlerGeneral.instance = null;  

/**
 * GetInstance
 * 
 * @returns ControlerGeneral L'instance du controler général
 */
ControlerGeneral.getInstance = function() {  

    // Test s'il y a une instance enregistré
    if(this.instance === null) {
        this.instance = new ControlerGeneral();
    }
    
    // Retourne l'instance
    return this.instance;

};

/**
 * Push
 * 
 * @returns ControlerGeneral L'instance du controler général
 */
ControlerGeneral.push = function(zone) {  

    // Ajoute la nouvelle zone
    if(zone && zone !== null) {
        this.zones.push(zone);
    }

};

/**
 * GetZones
 * 
 * @returns ControlerGeneral L'instance du controler général
 */
ControlerGeneral.getZones = function() {  

    // Retourne les zones
    return this.zones;

};
