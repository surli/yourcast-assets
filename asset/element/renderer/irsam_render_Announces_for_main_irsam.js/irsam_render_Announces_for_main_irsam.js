

/*
 * work on announces1 source
 * display the announces on the zone1 (main)
 * the content and the title are modified but the logo is the same
 * for irsam
 */


loadLess(LESS_ROOT+"/irsam_render_Announces_for_main_irsam.less");

function irsam_render_Announces_for_main_irsam(tableau, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
    var logo = '<img src="img/logos/internal.png"/>';
    zone.loadImage("img/logos/internal.png");
    var time = timeInfo;

    for (var indice = 0; indice < tableau.length; indice++) {
        elements = tableau[indice];
        var title = elements.title;
        var reg=new RegExp("(\n)", "g");
        var contentAnnounces = elements.content.replace(reg, "<br/>");
        var authorAnnounces = elements.author;
        var content = "";

        if (title.length > 20) { title += "<br/><br/>";}
        if (contentAnnounces.length > 200) {contentAnnounces = contentAnnounces.substring(0, 200); contentAnnounces += "...";}
        if (authorAnnounces.length > 30) {authorAnnounces = authorAnnounces.substring(0, 30); authorAnnounces += "...";}

        content += "<div id='announces' class='main_div_zone1'>";
     //   content += "<div class='announces_body_different_title'>";
        content += "<div class='internal_Content'>"+contentAnnounces+"</div>";
        if (elements.img !== "")
            zone.loadImage(elements.img);
        content += "<div class='internal_Image'><img src='"+elements.img+"'/></div>";
        content += "<div class='internal_Author'><i>"+authorAnnounces+"</i></div>";
        content += "</div>";
        content += "</div>";

        var dico = {"content": content, "logo": logo, "title": title, "time" : time};
        zone.pushInfo(dico);
    }
}