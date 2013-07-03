/*
 *  Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the GNU Public License v3.0
 *  which accompanies this distribution, and is available at
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  Contributors:
 *    Simon Urli (simon.urli@gmail.com)
 *    Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement du style
loadLess(LESS_ROOT + '/ca_render_alerte.less');

/*
 * Render of the home.
 * For Clement Ader's model.
 */
function ca_render_alerte(tableau, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof tableau === 'undefined' || tableau === null || tableau.length == 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' || zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Stockage du titre
    var title = "Accueil";

    // Stockage du temps d'affichage
    var time = timeInfo;

    // Initialisation du content
    var content = "<div class='alerte'>";

    // Ajout des divs html
    content += tableau.msg;

    // Fin du content
    content += "</div>";

    // Déclaration du dictionnaire
    var dico = {"content": content, "title": title, "time" : time};

    // On ajoute cette nouvelle info dans la zone
    zone.pushInfo(dico);

    // Retourne le dictionnaire
    return dico;

}
