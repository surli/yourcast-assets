
loadScript(RENDERER_PATH + "/utils/pictures.js");

/*
 * work on picasamontana source
 * display pictures in full on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * function uses :
 * - imageSize(width, height) -> renderers/utils/pictures.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - Picturesimage
 * - imageLegende
 * - picturesDescription  
 */
function glc_render_Pictures_for_main_full(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
    var logo = '<img src="img/logos/picture.png"/>';
    zone.loadImage("img/logos/picture.png");
    var tableau = collection.pictures;
    var title = collection.albumName;
    if (typeof tableau !== 'undefined') {
        if (typeof title !== 'undefined') {
            if (title.length > 30) {
                title = title.substring(0, 30);
                title += " ...";
            }
        } else {
            title = "";
        }
        var time = timeInfo;

        for (var indice = 0; indice < tableau.length; indice++) {
            elements = tableau[indice];

            var description = elements.description;
            if (description.length > 60) {
                description = description.substring(0, 60);
                description += " ...";
            }

            var url = elements.url;

            jQuery("#" + zone.id + "_title").text("Démarrage de Yourcast");
            var zoneHeight = $(zone.id).getHeight() - $(zone.id + "_title").getHeight() - 30;

            content = "<div id='Pictures' class='main_div_zone1' style='height:" + zoneHeight + "px;'>";
            content += "<div class='Picturesimage'><span class='imageLegende'><img src='" + url + "'/>";
            if (description != "")
                content += "<div class='picturesDescription' >" + description + "</div>";
            content += "</span></div></div>";

            var dico = {"content": content, "logo": logo, "title": title, "time": time};
            zone.pushInfo(dico);
        }
    }
}
