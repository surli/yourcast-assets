/*
 *Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 *All rights reserved. This program and the accompanying materials
 *are made available under the terms of the GNU Public License v3.0
 *which accompanies this distribution, and is available at
 *http://www.gnu.org/licenses/gpl.html
 *
 *Contributors:
 *    Simon Urli (simon.urli@gmail.com) - Main contributor
 */

// Chargement des fonctions
loadScript(RENDERER_PATH + "/utils/menus.js");

// Chargement du style
loadLess(LESS_ROOT + '/irsam_render_menus.less');

/*
 * work on menus source
 * display the menu for the day on the zone1 (main)
 * the content and the title are modified but the logo is the same
 */
function irsam_render_menus(tableau, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    var logo = '<img src="img/logos/restaurant.png"/>';
    zone.loadImage("img/logos/restaurant.png");
    var time = timeInfo;
    var content = "<div id='menus'>";
    var title = "";
    for (var indice = 0; indice < tableau.length; indice++) {
        var elements = tableau[indice];
        var contentMenus = "";
        var i = 0;
        if (elements.nom !== undefined)
            title = elements.nom;
        if (elements.repas.entree) {
            for (i = 0; i < elements.repas.entree.length; i++) {
                contentMenus += "<div>" + firstLettertoUpperCase(elements.repas.entree[i]) + "</div>";
            }
        }
        if (elements.repas.plat) {
            contentMenus += "<i>_____</i>";
            contentMenus += "<br/><br/>";
            for (i = 0; i < elements.repas.plat.length; i++) {
                contentMenus += "<div>" + firstLettertoUpperCase(elements.repas.plat[i]) + "</div>";
            }
        }
        if (elements.repas.dessert) {
            contentMenus += "<i>_____</i>";
            contentMenus += "<br/><br/>";
            for (i = 0; i < elements.repas.dessert.length; i++) {
                contentMenus += "<div>" + firstLettertoUpperCase(elements.repas.dessert[i]) + "</div>";
            }
        }
        content = "<div id='menus' class='main_div_zone1'>";
        content += "<div class='menus_content'>" + contentMenus + "</div>";
        content += "</div>";
        content += "</div>";
        var dico = {"content": content, "logo": logo, "title": title, "time": time};
        zone.pushInfo(dico);
    }
} 