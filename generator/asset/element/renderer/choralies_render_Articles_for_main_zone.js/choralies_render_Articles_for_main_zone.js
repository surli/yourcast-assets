/*
 * work on affiche (announce) source
 * display the announces on the right push zone
 * the content is modified 
 */

loadLess(LESS_ROOT+"/choralies_render_Articles_for_main_zone.less"); 
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Articles_for_main_zone(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 8;
	var time = timeInfo;
	
	
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];

		for( var i = 0; i< elements.contenu.length; i++){
			var page = elements.contenu[i].page;
			var reg=new RegExp("(\n)", "g");
			//var contentAnnounces = page.replace(reg, "<br/>");
			var contentAnnounces = page;
			//var headerAnnounces = elements.chapeau.replace(reg, "<br/>");
			var headerAnnounces = elements.chapeau;
			var title = elements.titre;
			var content = "";
			
			if(i==0){
				content += "<div id='articles' class='main_div_zone'>";
					content += "<div class='article_body'>";
						content += "<div class='article_Subtitle'>"+headerAnnounces+"</div>";
						
						if (isPropertyDefined(elements.image)){
							zone.loadImage(elements.image);
							content += "<img src="+elements.image+">";
						}
						content += "<div class='article_Content'>"+contentAnnounces+"</div>";
						
						if(i==elements.contenu.length-1)
							content +="<br><b>"+elements.auteur+"</b>";
							
					content += "</div>";
			
				content += "</div>";
				content +="<div class='smooth'> </div>";
				//content += "<div class='article_counter'>"+(indice+1)+"/"+tableau.length+"</div>";	
				if(elements.contenu.length>1)
					content += "<div class='article_counter'>"+(i+1)+"/"+elements.contenu.length+"</div>";	
			}
			else{
				content += "<div id='articles' class='main_div_zone'>";
					content += "<div class='article_body'>";
						//content += "<i>[Page "+(i+1)+"/"+elements.contenu.length+"]</i>";
						//content += "<i>[…]</i>";
						content += "<div class='article_Content'><i>[…]</i> "+contentAnnounces+"</div>";
						
						if(i==elements.contenu.length-1)
							content +="<br><b>"+elements.auteur+"</b>";
					content += "</div>";
			
				content += "</div>";
				content +="<div class='smooth'> </div>";
				// content += "<div class='article_counter'>"+(indice+1)+"/"+tableau.length+"</div>";
				content += "<div class='article_counter'>"+(i+1)+"/"+elements.contenu.length+"</div>";
			}
			
			var dico = {"content": content, "logo": '', "title": title, "time": time};
			zone.pushInfo(dico);
		}

	}
}