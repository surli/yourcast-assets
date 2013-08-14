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
 *  Renderer vocale des intervenants.
 *  
 *  @param {type} tableau Tableau des annonces.
 *  @param {type} zone Zone concernée.
 */
function render_vocale_intervenants(tableau, zone) {

    // On boucle sur les informations
    for (var indice = 0; indice < tableau.length; indice++) {
        
        // On récupère l'annonce
        var elements = tableau[indice];

        // Si le title ou le contenu n'est pas défini
        if (elements.jour !== "" && elements.intervenant !== "" ) {

            // On envoie le son à la zone
            zone.newSound(elements.jour + ". " + elements.intervenants + ".");

        }

    }

}
