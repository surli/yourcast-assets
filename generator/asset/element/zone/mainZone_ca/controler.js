/**
 * Controler de la zone principale.
 *
 * Contributors :
 *      Guillaume Golfieri
 *
 */

// Chargement des comportements
// loadScript(BEHAVIOUR_PATH+"/appearance_zone.js");

// Chargement du style
loadLess(ROOT + '/mainzone/style.less');

// Chargement du comportement
loadScript(BEHAVIOUR_PATH + '/comportement_mainzone.js');

/**
 * Initialisation de la principale zone.
 * @returns {Zone} Zone principale.
 */
function init_mainzone() {

    // Id de la zone
    var id = "mainzone";

    // ======================================================
    //  Temps d'affichage des modules
    // ======================================================

    // Lien entre les ids et le temps d'affichage
    var map_time = {    
                        "Accueil":          8,
                        "Video":            8,
                        "Announcement1":    8,
                        "Picasa1":          4,
                        "ICalReader1":      8,
                        "Anniversaires1":   8,
                        "Weather2_1":       8,
                        "Menu1":            8
                   };

    // ======================================================
    //  Ordre des modules
    // ======================================================

    var map_ordre = {   
                        "Accueil":          1,
                        "Video":            8,
                        "Announcement1":    2,
                        "Picasa1":          7,
                        "ICalReader1":      6,
                        "Anniversaires1":   5,
                        "Weather2_1":       3,
                        "Menu1":            4
                   };

    // Url des données
    var url = ROOT + '/data/exemple.json';

    // Création du comportement
    var comportement = new ComportementMainzone(2, 1); // 2 couleur en alternance avec une transition de 1 seconde entre chaque diapo

    // Initialisation de la zone
    mainzone = new InactiviteZone(id, tab_liens_renderers, map_time, url, comportement, 600000, map_ordre);

    // Changement d'attribut
    mainzone.set_master(true);
    mainzone.request();

    // Retourne la zone
    return mainzone;

}

