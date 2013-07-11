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

loadScript(RENDERER_PATH+"/utils/pictures.js");

/*
 * work on picasamontana source
 * display pictures in mosaic on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * pictures are displayed by their size ( portrait or paysage )
 *
 * CSS classes : 
 * - main_div_zone1
 * - mosaicPicturesSize 
 * - mosaicPaysage
 * - mosaicPortrait
 */
function glc_render_Pictures_for_main_mosaic_display_by_size(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/picture.png"/>';
	zone.loadImage("img/logos/picture.png");
	var title = collection.albumName;
	if (title.length > 30) {title = title.substring(0, 30); title += " ...";}
	var tableau = collection.pictures;
	var time = timeInfo;
	var paysages = new Array();
	var portraits = new Array();
	var tab_image = new Array();
	var content = "";
	
	var zoneHeight = $('mainZone').getHeight() - 135;
		
	for (var indice = 0; indice < tableau.length; indice++){
		elements = tableau[indice].thumbs[2];
		zone.loadImage(elements.url);
		
		if (isPaysage(elements)) {
			paysages.push(elements.url);
		}
		else {
			portraits.push(elements.url);
		}
	}
	
	
	if (paysages.length > 0){
		content = "<div class='main_div_zone1 mosaicPicturesSize' style='height:"+zoneHeight+"px;'>";
		content += "<div class='mosaicPaysage'>";
		for (var indice = 0; indice < paysages.length; indice++) {
			elements = paysages[indice];
	
			if ((indice+1) % 6 == 0) {
				content += "<span><img src='"+elements+"'/></span>";
				content += "</div>";
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				content = "<div class='main_div_zone1 mosaicPicturesSize' style='height:"+zoneHeight+"px;'>";
				content += "<div class='mosaicPaysage'>";
			} else {
				if (indice % 3 == 0 && indice%6!=0)
					content += "<br/>";
				content += "<span><img src='"+elements+"'/></span>";
			}
			if (indice+1 == paysages.length){
				if ((indice+1) % 6 != 0) {
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
				}else {
					content += "</div>";
					content += "</div>";
				}
			}
		}
	}
	
	if(portraits.length > 0){
		content = "<div class='main_div_zone1 mosaicPicturesSize' style='height:"+zoneHeight+"px;'>";
		content += "<div class='mosaicPortrait'>";
		for (var indice2 = 0; indice2 < portraits.length; indice2++) {
			elements = portraits[indice2];
	
			if ((indice2+1) % 3 == 0) {
				content += "<span><img src='"+elements+"'/></span>";
				content += "</div>";
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				content = "<div class='main_div_zone1 mosaicPicturesSize' style='height:"+zoneHeight+"px;'>";
				content += "<div class='mosaicPortrait'>";
			} else {
				content += "<span><img src='"+elements+"'/></span>";
			}
			if (indice2+1 == portraits.length){
				if ((indice2+1) % 3 != 0) {
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
				}else {
					content += "</div>";
					content += "</div>";
				}
			}
		}
	}
}
