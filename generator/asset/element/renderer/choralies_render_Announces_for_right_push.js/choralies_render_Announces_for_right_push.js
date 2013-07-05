/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 *
 * CSS classes : 
 * - push_div_zone
 * - announces_Title
 * - announces_body
 * - announces_Content
 * - announces_Author
 */

loadLess(LESS_ROOT+"/choralies_render_Announces_for_right_push.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Announces_for_right_push(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;
	var time = timeInfo;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");
		var contentAnnounces = elements.contenu.replace(reg, "<br/>");
		if (contentAnnounces.length > 500) {contentAnnounces = contentAnnounces.substring(0, 500); contentAnnounces += " ...";}
		var content = "";
		
		content += "<div id='"+zone.id+"_new_push' class='push_div_zone'>";
			content += "<div class='announce_body'>";
				content += "<div class='announce_Title'>"+elements.titre+"</div>";
				if (isPropertyDefined(elements.image)){
					zone.loadImage(elements.image);
					content += "<img src="+elements.image+">";
				}	
				content += "<div class='announce_Content'>"+contentAnnounces+"</div>";
				content += "<div style='clear:both;'> </div>";			
			content += "</div>";
		content += "</div>";		
		
		var dico = {"content": content, "logo": '', "title": '', "time": time};
		zone.pushInfo(dico);

	}
}