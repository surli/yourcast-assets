/*
 * work on affiche (announce) source
 * display the affiche on the left push zone
 * the content is modified 
 */

loadLess(LESS_ROOT+"/choralies_render_Affiches_for_left_zone.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Affiches_for_left_zone(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 8;
	var time = timeInfo;
	var title = "Aujourd'hui";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.contenu.replace(reg, "<br/>");
		var content = "";
		
		//content += "<div class='affiches_number'>"+tableau.length+" &eacute;v&egrave;nements &agrave; venir</div>";	
		
		content += "<div id='affiches' class='left_div_zone'>";
			content += "<div class='affiche_body'>";
				//content += "<div class='affiche_Dates'>"+render_hour_announce(elements)+"</div>";
				content += "<div class='affiche_Title'>"+elements.titre+"</div>";
				content += "<hr>";
				content += "<div class='affiche_Price'>"+elements.tarif+"</div>";
				
				content += "<div class='affiche_Loc'>"+elements.lieu+"</div>";		
				content += "<hr>";
				content += "<div style='clear:both;'> </div>";
				if (isPropertyDefined(elements.image)){
					zone.loadImage(elements.image);
					content += "<img src="+elements.image+">";
				}		
				content += "<div class='affiche_Subtitle'>"+elements.soustitre+"</div>";
				//content += "<div class='affiche_Content'>"+contentAnnounces+"</div>";
			content += "</div>";
			
			
			
		content += "</div>";
		
		content += "<div class='affiche_counter'>"+(indice+1)+"/"+tableau.length+"</div>";		
		
		var dico = {"content": content, "logo": '', "title": title, "time": time};
		zone.pushInfo(dico);

	}
}