/*
 * work on twitter source
 * display the tweet on the scrolling zone
 * 
 */
loadLess(LESS_ROOT+"/choralies_render_Alerts_for_scrolling.less"); 
 
function choralies_render_Alerts_for_scrolling(tableau, zone, timeInfo) {	
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var content = "";
	var time = timeInfo;
	if (!(is_empty(tableau))) {
		for (var indice = 0; indice < tableau.length; indice++) {
			var elements = tableau[indice];

			content += "<span class='alert'>";
			content += "<span class='alert_Content'> - "+elements.texte_court+" - </span>";
			content += "</span>";	
		
			$(zone.id).style.display="block";
		}

		var dico = {"content": content, "time" : time};
		zone.pushInfo(dico);
	}
}