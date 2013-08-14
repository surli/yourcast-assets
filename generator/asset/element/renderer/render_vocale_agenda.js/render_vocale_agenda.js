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
 *  Renderer vocale des annonces.
 *  
 *  @param {type} tableau Tableau des annonces.
 *  @param {type} zone Zone concernée.
 */
function render_vocale_agenda(tableau, zone) {

    // On boucle sur les évènements
    for (var cpt = 0; cpt < tableau.events.length; cpt++) {

        // Stockage de la date de début
        var start = new Date(tableau.events[cpt].start);
        var end = new Date(tableau.events[cpt].end);

        // On définit les heures
        var heureLocalD = (start.getHours() === 12) ? "midi" : start.getHours();
        heureLocalD = (heureLocalD === 0) ? "minuit" : heureLocalD;
        var heureLocalF = (end.getHours() === 12) ? "midi" : end.getHours();
        heureLocalF = (heureLocalF === 0) ? "minuit" : heureLocalF;

        // Détermine le jour
        var jour = "";
        if(is_same_date(new Date(), start)) {
            jour = "aujourd'hui";
        } else if(is_same_date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), start)) {
            jour = "demain";
        } else {
            jour = get_a_day(start.getDay());
        }

        // On envoie le son à la zone
        zone.newSound(tableau.events[cpt].summary + ". " + jour + ". De "  + heureLocalD + " heures " + ((start.getMinutes() !== 0) ? start.getMinutes() : "") + " à " + heureLocalF + "  heures " + ((end.getMinutes() !== 0) ? end.getMinutes() : "") + tableau.events[cpt].location + ", " + tableau.events[cpt].description + ".");

    }

}
