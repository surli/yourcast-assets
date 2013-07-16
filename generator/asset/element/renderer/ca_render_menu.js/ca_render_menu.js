/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*    Emilie Nguyen Van (emilie.nguyenvan@gmail.com) - Projet YourCastStore - IUT Informatique
*    Alexis Fourrier  - Projet YourCastStore - IUT Informatique
*    
*Versions :
*	- V 0.0.0 Initial version
*   - V 1.0.0 
*   	- Modification of "~" in "-" 
*       - Adding of new renderers: 
*             	- render_Menus_for_main_without_title 
*             	- render_Menus_for_main_without_title_separate this renderer calls 3 new renderers to make a new version of "Menu"
*             	to display firstly "entree" secondly "plat" and finally "dessert"
*             		- render_Menus_for_main_without_title_separate_entree
*             		- render_Menus_for_main_without_title_separate_plat
*             		- render_Menus_for_main_without_title_separate_dessert
*    - V 2.0.0 Modification of     
*/

// Chargement du style
loadLess(LESS_ROOT + '/ca_render_menu.less');

/*
 * work on menus source
 * display the menu for the day on the zone1(main)
 * the title is deleted 
 */
function ca_render_menu(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/restaurant.png"/>';
	zone.loadImage("img/logos/restaurant.png");
	var time = timeInfo;
	var content = "";
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		var contentMenus = "";
		var i = 0;

		if (elements.nom !== undefined) 
			title = elements.nom ;

		if(elements.repas.entree){
			for(i = 0; i < elements.repas.entree.length; i++){
				entree = elements.repas.entree[i];
				contentMenus += entree.charAt(0).toUpperCase() + entree.substring(1).toLowerCase();

				if(i+1 < elements.repas.entree.length)
					contentMenus += '<br />';
			}	
		}
		
		if(elements.repas.plat){
			contentMenus += "<hr />";
			for(i = 0; i < elements.repas.plat.length; i++){
				plat = elements.repas.plat[i];
				contentMenus += plat.charAt(0).toUpperCase() + plat.substring(1).toLowerCase();

				if(i+1 < elements.repas.plat.length)
					contentMenus += '<br />';
			}
			
		}
		
		if(elements.repas.dessert){
			contentMenus += "<hr />";
			for(i = 0; i < elements.repas.dessert.length; i++){
				dessert = elements.repas.dessert[i];
				contentMenus += dessert.charAt(0).toUpperCase() + dessert.substring(1).toLowerCase();

				if(i+1 < elements.repas.dessert.length)
					contentMenus += '<br />';
			}
		}
		
		content = "<div id='menus' class='main_div_zone1'>";
			content += "<div class='menus_content'>"+contentMenus+"</div>";
		content += "</div>";	
		
		var dico = {"content": content, "logo": logo, "time" : time, "alternance": true};
		zone.pushInfo(dico);
	}

}
