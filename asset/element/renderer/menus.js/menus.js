/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/

loadScript(RENDERER_PATH+"/utils/menus.js");

/*
 * work on menus source
 * display the menu for the day on the zone1 (main)
 * the content and the title are modified but the logo is the same
 */
function render_Menus_for_main_long_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/restaurant.png"/>';
	zone.loadImage("img/logos/restaurant.png");
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		
		var title = elements.type+" du "+render_date_menus(elements.date)+" ("+elements.nom+")";
		var contentMenus = "";
		var i = 0 ;
		
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

/*
 * work on menus source
 * display the menu for the day on the zone1 (main)
 * the content and the title are modified but the logo is the same
 */
function render_Menus_for_main_short_title(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/restaurant.png"/>';
	zone.loadImage("img/logos/restaurant.png");
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		
		var title = elements.type+" du "+render_date_menus(elements.date);
		var contentMenus = "";
		var i = 0 ;
		
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
			content += "<div class='menus_header'>"+elements.nom+"</div>";
			content += "<div class='menus_content'>"+contentMenus+"</div>";
		content += "</div>";	
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}


/*
 * work on menus source
 * display the menu for the day on the zone1 (main)
 * the content and the title are modified but the logo is the same
 */
function render_Menus_for_main_without_name(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/restaurant.png"/>';
	zone.loadImage("img/logos/restaurant.png");
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		
		var title = elements.type+" du "+render_date_menus(elements.date);
		var contentMenus = "";
		var i = 0 ;
		
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