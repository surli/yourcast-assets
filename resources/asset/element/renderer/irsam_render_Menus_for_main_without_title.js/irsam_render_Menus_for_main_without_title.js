
loadLess(LESS_ROOT+"/irsam_render_Menus_for_main_without_title.less");
/*
 * work on menus source
 * display the menu for the day on the zone1(main)
 * the title is deleted
 */
//        irsam_render_Menus_for_main_without_title is not defined
function irsam_render_Menus_for_main_without_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/restaurant.png"/>';
	zone.loadImage("img/logos/restaurant.png");
	var time = timeInfo;
	var content = "";
	var title = "";


	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		var contentMenus = "";
		var i = 0 ;
		if (elements.nom != undefined) title = elements.nom ;
		if(elements.repas.entree){
			for(i = 0; i < elements.repas.entree.length; i++){
				contentMenus += "<div>"+elements.repas.entree[i]+"</div>";
			}

		}

		if(elements.repas.plat){
			contentMenus += "<i>_____</i>";
			contentMenus +="<br/><br/>";
			for(i = 0; i < elements.repas.plat.length; i++){
				contentMenus += "<div>"+elements.repas.plat[i]+"</div>";
			}

		}

		if(elements.repas.dessert){
			contentMenus += "<i>_____</i>";
			contentMenus +="<br/><br/>";
			for(i = 0; i < elements.repas.dessert.length; i++){
				contentMenus += "<div>"+elements.repas.dessert[i]+"</div>";
			}
		}

		content = "<div id='menus'>";
		content += "<div class='menus_content'>"+contentMenus+"</div>";
		content += "</div>";

		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}