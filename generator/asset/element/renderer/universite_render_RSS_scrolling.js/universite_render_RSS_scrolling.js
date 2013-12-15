
/**
 * Renderer des RSS dans la bottomZone
 * @param {type} collection
 * @param {type} zone
 * @param {type} timeInfo
 * @returns {undefined}
 */
function universite_render_RSS_scrolling(collection, zone, timeInfo) {

    // Debug du temps d'information
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;

    // Variables
    var logo = '<img src="img/logos/rss.png" align="top"/>';
    var time = 0;
    var content = "";

    // On charge les images
    zone.loadImage("img/logos/rss.png");
    zone.loadImage("img/left_arrow.png");

    // On parcours les éléments du fil rss
    for (var indice = 0; indice < collection.content.length; indice++) {
        
        // Récupération des sous-éléments
        var elements = collection.content[indice];
        
        // Déclaration de l'html
        content += logo;
        content += "<img src='img/left_arrow.png' />";
        content += "<span class='tweet'>";
        content += " " + "<span class='twitter_title'>" + elements.title + " : </span>";
        
        if(elements.content.length > 40) {
            content += "<span class='twitter_Content'>" + elements.content.substring(0,40) + "... </span>";
        } else {
            content += "<span class='twitter_Content'>" + elements.content + "... </span>";
        }
        
        // On finis l'élément
        content += "</span>";
        
        // Augmentation du temps d'affichage
        time += timeInfo;
        
    }

    // Déclaration du dictionnaire
    var dico = {"content": content, "logo": logo, "time": time};

    // On push le contenu généré dans la zone qui se chargera de l'afficher
    zone.pushInfo(dico);

}