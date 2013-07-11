
// this function support all the format but depends on the operating systeme and if the user has install or not the different plugin for the extension
function glc_testVideoEmbed(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 30;
	var logo = '<img src="img/logos/tv.png"/>';
	zone.loadImage("img/logos/tv.png");
	var title = 'Test Vidéo';
	var time = timeInfo; // TODO mettre la longeur de la video
	
	content += '<EMBED SRC="video/test.avi" LOOP="-1" AUTOSTART="true" class="videoTest">';
	content += "</div>";
		
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};
	zone.pushInfo(dico);
}