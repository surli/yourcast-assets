
/*
 *  Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the GNU Public License v3.0
 *  which accompanies this distribution, and is available at
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  Contributors:
 *    Simon Urli (simon.urli@gmail.com) - Main contributor
 *    Emilie Nguyen Van (emilie.nguyenvan@gmail.com) - Projet YourCastStore - IUT Informatique
 *    Guillaume Golfieri
 *
 *
 */

// Chargement du style
loadLess(LESS_ROOT + '/ca_render_announcement.less');

/*
 * Render of announcements.
 * For Clement Ader's model.
 */
function ca_render_announcement(tableau, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof tableau === 'undefined' ||�tableau === null || tableau.length === 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' ||�zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/internal.png"/>';
    zone.loadImage(IMG_PATH+"/logos/internal.png");

    // Stockage du temps d'affichage
    var time = timeInfo;

    // Pour chaque annonces que possède le json on l'ajoute à la zone
    for (var indice = 0 ; indice < tableau.length ; indice++) {

        // On stock les élements
        var elements = tableau[indice];

        // On remplace tout les sauts de pages \n par des sauts de pages html <br/>
        var reg = new RegExp("(\n)", "g");

        // Récupération des éléments de l'annonce
        var title = elements.title;
        var contentAnnounces = elements.content.replace(reg, "<br/>");
        var authorAnnounces = elements.author;

        // Dépassement
        if(contentAnnounces.length > 90)
            contentAnnounces = contentAnnounces.substr(0, 90) + ' &hellip;';

        // Chargement de l'image
        if (elements.img !== "") {
            zone.loadImage(elements.img);
            var img = elements.img;
        }

        // Initialisation du content
        var content = "<div id='announces' class='main_div_mainzone'>";

        // Ajout des divs html
        typeof authorAnnounces === 'undefined' ? content : content += "<div class='internal_Author'><i>"+authorAnnounces+"</i></div>";
        typeof contentAnnounces === 'undefined' ? content : content += "<div class='internal_Content'><p>"+contentAnnounces+"</p></div>";
        typeof img === 'undefined' ? content : content += "<div class='internal_Image'><img src='"+img+"'/></div>";

        // Fin du content
        content += "</div>";

        // Déclaration du dictionnaire
        var dico = {"content": content, "logo": logo, "title": title, "time" : time, "alternance": true};

        // On ajoute cette nouvelle info dans la zone
        zone.pushInfo(dico);

    }

    // Retourne le dictionnaire
    return dico;

}
