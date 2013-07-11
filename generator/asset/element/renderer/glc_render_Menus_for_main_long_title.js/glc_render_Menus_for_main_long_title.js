
loadScript(RENDERER_PATH+"/utils/menus.js");

/*
 * work on menus source
 * display the menu for the day on the zone1 (main)
 * the content and the title are modified but the logo is the same
 *
 * CSS classes : 
 * - main_div_zone1
 * - menus_content
 */
function glc_render_Menus_for_main_long_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/menu.png"/>';
	zone.loadImage("img/logos/menu.png");
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		
		var title = elements.type+" du "+render_date_menus(elements.date)+" ("+elements.nom+")";
		var contentMenus = "<br/>";
		var i = 0 ;
		
		if(elements.repas.entree.length+elements.repas.plat.length+elements.repas.dessert.length <4)
			contentMenus += "<br/>";
			
		if(elements.repas.entree){
				for(i = 0; i < elements.repas.entree.length; i++){
					contentMenus += "<div>"+elements.repas.entree[i]+"</div>";
				}
				contentMenus += "<i>~~~</i>";
		}
		
		if(elements.repas.plat){
			for(i = 0; i < elements.repas.plat.length; i++){
				contentMenus += "<div>"+elements.repas.plat[i]+"</div>";
			}
			contentMenus += "<i>~~~</i>";
		}
		
		if(elements.repas.dessert){
			for(i = 0; i < elements.repas.dessert.length; i++){
				contentMenus += "<div>"+elements.repas.dessert[i]+"</div>";
			}
		}
		
		content = "<div id='menus' class='main_div_zone1'>";
			content += "<div class='menus_content'>"+contentMenus+"</div>";
		content += "</div>";	
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}
