/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 */

loadLess(LESS_ROOT+"/choralies_render_Announces_for_main_zone.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Announces_for_main_zone(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 8;
	var time = timeInfo;
	var title = "Aujourd'hui";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.corps.replace(reg, "<br/>");
		var content = "";
			
		content += "<div id='announces' class='main_div_zone'>";
			content += "<div class='announce_body'>";
				content += "<br/><div class='announce_Title'>"+elements.titre+"</div>";
				content += "<div style='clear:both;'> </div>";
				if (elements.image != "")
					content += "<img src="+elements.image+">";	
				content += "<div class='announce_Content'>"+contentAnnounces+"</div>";
			content += "</div>";
			
			
			
		content += "</div>";
		
		content += "<div class='announce_counter'>"+(indice+1)+"/"+tableau.length+"</div>";		
		
		var dico = {"content": content, "logo": '', "title": title, "time": time};
		zone.pushInfo(dico);

	}
}