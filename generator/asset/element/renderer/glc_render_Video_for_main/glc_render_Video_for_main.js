
// to use this function, we need to convert the video in 3 different type, .mp4, .webm et .ogv
// because safari only support .mp4 and the others don't

function glc_testVideoHTML5(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 30;
    var logo = '<img src="img/logos/tv.png"/>';
    zone.loadImage("img/logos/tv.png");
    var title = 'Test Vidéo';
    var time = timeInfo; // TODO mettre la longeur de la video

    content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
    content += '<video autoplay=true autobuffer=true loop=false class="videoTest">';
    content += ' <source src="video/test.mp4" type="video/mp4" />';
    content += '<source src="video/test.webm" type="video/webm" />';
    content += '<source src="video/test.ogv" type="video/ogg" />';
    content += 'Vous n\'avez pas de navigateur moderne, donc pas de balise video HTML5 !';
    content += '</video>';
    content += "</div>";

    var dico = {"content": content, "logo": logo, "title": title, "time" : time};
    zone.pushInfo(dico);
}
