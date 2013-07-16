
/*
 *  Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the GNU Public License v3.0
 *  which accompanies this distribution, and is available at
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  Contributors:
 *    Simon Urli (simon.urli@gmail.com)
 *    Guillaume Golfieri
 *
 *
 */

// Chargement du style
loadLess(LESS_ROOT + '/renderers/ca_render_accueil.less');

/*
 * Render of the home.
 * For Clement Ader's model.
 */
function ca_render_accueil(tableau, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof tableau === 'undefined' ||�tableau === null || tableau.length === 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' ||�zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Stockage du titre
    var title = "Accueil";

    // Stockage du temps d'affichage
    var time = timeInfo;

    // Initialisation du content
    var content = "<div id='accueil'>";

    // Ajout des divs html
    typeof tableau.img === 'undefined' ? content : content += '<img id="img_accueil" src="' + tableau.img + '"/>';

    // Fin du content
    content += "</div>";

    // Déclaration du dictionnaire
    var dico = {"content": content, "time" : time, "alternance": false};

    // On ajoute cette nouvelle info dans la zone
    zone.pushInfo(dico);

    // Retourne le dictionnaire
    return dico;

}
