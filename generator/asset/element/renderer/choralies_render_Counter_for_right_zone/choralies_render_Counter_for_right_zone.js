/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 */

loadLess(LESS_ROOT+"/choralies_render_Counter_for_right_zone.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Counter_for_right_zone(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 2;
	var time = timeInfo;
	var title = "Nombre d'arrivants";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");

		var content = "";
			
		
		content += "<div id='counter' class='right_div_zone'>";
			content += "<div class='counter_body'>";
				content += "<div class='counter_Title'>"+title+"</div>";
				content += "<div class='counter_number'>"+elements.number+"</div>";
			content += "</div>";
		content += "</div>";
	
	}
	
	var dico = {"content": content, "logo": '', "title": title, "time": time};
	zone.pushInfo(dico);
}