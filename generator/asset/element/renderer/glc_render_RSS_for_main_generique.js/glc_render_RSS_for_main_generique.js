
// Renderer RSS Main
function glc_render_RSS_for_main(collection, zone, logo, timeInfo) {

    // Debug du temps d'information
    var time_info = typeof timeInfo !== 'undefined' ? timeInfo : 50;
    
    // On charge les images
    zone.loadImage(logo);

    // On parcours les éléments du fil rss
    for (var indice = 0; indice < collection.content.length; indice++) {

        // Récupération des sous-éléments
        var elements = collection.content[indice];

        var title = elements.title;
        var image = elements.image;
        var reg = new RegExp("(\n)", "g");
        var contentAnnounces = elements.content.replace(reg, "<br/>");
        var content = "";

        content += "<div id='rssfeed' class='main_div_zone1' >";
        content += "<div class='rss_body'><div class='rss_Content'>";

        if (typeof image !== "undefined" && image !== "") {
            content += "<div class='rss_Image'><img src='" + image + "'/></div>";
        }

        content += contentAnnounces + "</div>";
        content += "<div class='rss_Source'>" + collection.title + "</div></div></div>";
        content += "<div class='smooth'> </div>";

        // Déclaration du dictionnaire
        var dico = {
            content: content,
            logo: "<img src='" + logo + "'/>",
            title: title,
            time: time_info
        };

        // On push le contenu généré dans la zone qui se chargera de l'afficher
        zone.pushInfo(dico);

    }
}

//work on rss feed source universite
function glc_render_RSS_for_main_generique(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    return glc_render_RSS_for_main(collection, zone, "img/logos/rss.png", timeInfo);
}
