/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 *
 */

loadLess(LESS_ROOT+"/choralies_render_Breves_for_right_push.less"); 
 
function choralies_render_Breves_for_right_push(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");
		var contentBreve = elements.corps.replace(reg, "<br/>");
		var content = "";
		
		content += "<div id='"+zone.id+"_new_push' class='push_div_zone breve' style='display:none;'>";
			content += "<div class='breve_body'>";
				if(elements.titre!="")
					content += "<b>"+elements.titre+"</b> - ";
			content +=contentBreve;				
			content += "</div>";
		content += "</div>";		
		
		var dico = {"content": content, "logo": '', "title": '', "time": time};
		zone.pushInfo(dico);

	}
}