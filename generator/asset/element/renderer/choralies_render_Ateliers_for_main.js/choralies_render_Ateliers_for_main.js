/*
 * work on Atelier source
 * display the list of ateliers (by 6 per page) on the main zone
 * the content is modified 
 */

loadLess(LESS_ROOT+"/choralies_render_Ateliers_for_main.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Ateliers_for_main(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 4;

	var time = timeInfo;
	var title = "Programme des prochains ateliers";
	var content = "";
	
	content += "<div id='ateliers' class='main_div_zone'>";
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		var reg=new RegExp("(\n)", "g");

		if ((indice+1) % 6 == 0) {
			content += "<div class='atelier'>";
				content += "<span class='atelier_loc'>"+elements.lieu+"</span>";
				content += "<span class='atelier_title'>"+elements.titre+"</span>";
				content += "<span class='atelier_sep'> </span>";
				content += "<span class='atelier_hour'>"+render_hour_atelier(parseInt(elements.debut+"000"))+"</span>";
				content += "<span class='atelier_day'>"+render_day_atelier(parseInt(elements.debut+"000"))+"</span>";
			content += "</div>";
			
			content += "</div>";
			content += "<div class='ateliers_counter'>"+(Math.floor(indice/6)+1)+"/"+( Math.floor((tableau.length-1)/6) + 1 )+"</div>";
			//content +="<div class='smooth'> </div>";
			var dico = {"content": content, "logo": '', "title": title, "time" : time};
			zone.pushInfo(dico);
			content = "<div id='ateliers' class='main_div_zone'>";
		}
		else{
			content += "<div class='atelier'>";
				content += "<span class='atelier_loc'>"+elements.lieu+"</span>";
				content += "<span class='atelier_title'>"+elements.titre+"</span>";
				content += "<span class='atelier_sep'> </span>";
				content += "<span class='atelier_hour'>"+render_hour_atelier(parseInt(elements.debut+"000"))+"</span>";
				content += "<span class='atelier_day'>"+render_day_atelier(parseInt(elements.debut+"000"))+"</span>";
			content += "</div>";
		}
		if (indice+1 == tableau.length){
			if ((indice+1) % 6 != 0) {
				content += "</div>";
				content += "<div class='ateliers_counter'>"+(Math.floor(indice/6)+1)+"/"+( Math.floor((tableau.length-1)/6) + 1 )+"</div>";
				//content +="<div class='smooth'> </div>";
				var dico = {"content": content, "logo": '', "title": title, "time" : time};
				zone.pushInfo(dico);
			}
		}			
	}
}