/**
 *  <b>Rights :</b>
 *      
 * 	Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *      
 * 	All rights reserved. This program and the 
 *	accompanying materials are made available under the 
 *	terms of the GNU Public License v3.0 which accompanies 
 *	this distribution, and is available at
 * 	http://www.gnu.org/licenses/gpl.html
 *              
 *  <b>Informations :</b>
 *              
 *	Ce renderer est particulier à la vocalisation des clients
 *	Yourcast. 
 *
 *  <b>Versions :</b>
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *
 *  <b>Contributors :</b>
 *
 *	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

/**
 *  Renderer vocale des saints.
 *  
 *  @param {type} tableau Tableau des annonces.
 *  @param {type} zone Zone concernée.
 */
function render_vocale_ephemeride(tableau, zone) {

    // Récupère la date d'aujourd'hui
    var date_actuelle = new Date();
    
    // Crée le son de la date
    zone.newSound("On est actuellement " + get_a_day(date_actuelle.getDay()) + " " + date_actuelle.getDate() + " " + get_a_month(date_actuelle.getMonth()) + ". Il est " + date_actuelle.getHours() + " heures et " + date_actuelle.getMinutes() + " minutes.");

    // Si le title ou le contenu n'est pas défini
    if (tableau.names || tableau.names.length > 0) {

        // On envoie le son à la zone
        zone.newSound("Bonne fête aux " + tableau.names[Math.floor((Math.random()*tableau.names.length))]);

    }

}
