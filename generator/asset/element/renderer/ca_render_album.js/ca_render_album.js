/**
 *
 * Rendu des albums photos pour la maquette de Clément Ader.
 *
 * Contributors:
 *      Simon Urli
 *      Guillaume Golfieri
 *
 */

// Chargement du style
loadLess(LESS_ROOT + '/ca_render_album.less');

/**
 * Méthode qui permet d'ajouter toutes les images à la zone.
 *
 * - Chargement de l'image
 * - Stockage des informations nécessaires à l'affichage de l'album
 * - Ajout des images à la zone
 * 
 * @param collection Informations
 * @param zone Zone concern�e
 * @param timeInfo Temps de l'information
 */
function ca_render_album(collection, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof collection === 'undefined' ||�collection === null || collection.length === 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' ||�zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/pict.png"/>';
    zone.loadImage(IMG_PATH+"/logos/pict.png");

    // Stockage du nom de l'album
    var title = typeof collection.albumName === 'undefined' ? 'Inconnu' : collection.albumName;

    // Stockage du temps d'affichage
    var time = typeof timeInfo !== 'undefined' ? timeInfo : 7;

    // Stockage des images
    var tableau_album = collection.pictures;

    // Test si le tableau n'est pas erroné
    if(typeof tableau_album === 'undefined' ||�tableau_album === null || tableau_album.length === 0)
        throw new InformationsError("The images' informations are not correct");

    // Déclaration du dictionnaire
    var dico;

    // On ajoute le titre de l'album
    var content = "<div id='title_album'>" + title + "</div>";
    dico = {"content": content, "logo": logo, "time" : time, "alternance": false};

    // On ajoute cette nouvelle info dans la zone
    zone.pushInfo(dico);

    // On boucle sur les images
    for (var indice = 0; indice < tableau_album.length; indice++) {

        // Récupération des éléments
        var elements = tableau_album[indice];

        // Création du content
        var content = " <div class='image_album'>" +
                            "<img src='"+elements.url+"'/>" +
                       "</div>";

        // Déclaration du dictionnaire
        dico = {"content": content, "logo": logo, "time" : time, "alternance": false};

        // On ajoute cette nouvelle info dans la zone
        zone.pushInfo(dico);

    }

    // Retourne le dictionnaire
    return dico;

}