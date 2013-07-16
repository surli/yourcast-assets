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

// Cr�ation de la zone singleton
function ControlerGeneral() {  

    // Tableau des zones
    this.zones = new Array;

    // Test si le controler g�n�ral est instanci�
    if ( ControlerGeneral.caller !== ControlerGeneral.getInstance ) {  
        throw new Exception("Le controleur g�n�ral ne peux pas �tre instanci�. Veuillez utiliser getInstance");  
    }
  
};

// Propri�t� statique qui contient l'instance unique  
ControlerGeneral.instance = null;  

/**
 * GetInstance
 * 
 * @returns ControlerGeneral L'instance du controler g�n�ral
 */
ControlerGeneral.getInstance = function() {  

    // Test s'il y a une instance enregistr�
    if(this.instance === null) {
        this.instance = new ControlerGeneral();
    }
    
    // Retourne l'instance
    return this.instance;

};

/**
 * Push
 * 
 * @returns ControlerGeneral L'instance du controler g�n�ral
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
 * @returns ControlerGeneral L'instance du controler g�n�ral
 */
ControlerGeneral.getZones = function() {  

    // Retourne les zones
    return this.zones;

};
