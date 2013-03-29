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
 * display pictures in full on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * function uses :
 * - imageSize(width, height) -> renderers/utils/pictures.js
 */
function render_Pictures_for_main_full(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/pict.png"/>';
	zone.loadImage("img/logos/pict.png");
	var title = collection.albumName;
	var time = timeInfo;
	var tableau = collection.pictures;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];

		var description = elements.description;
		if (description.length > 100) {description = description.substring(0, 100); description += " ...";}

		var url = elements.url;
		zone.loadImage(url);
		if (elements.height >= 400) {
			sizeImage = imageSize(elements.width, elements.height);
			content = "<div id='Pictures' class='main_div_zone1'>";
					content += "<div class='Picturesimage'><img src='"+url+"' style='width:"+sizeImage.width+"px; height: "+sizeImage.height+"px;' /></div>";
					content += "<div class='picturesDescription'><b>"+description+"</b></div>";
			content += "</div>";

		}else {
			content = "<div id='Pictures' class='main_div_zone1'>";
					content += "<div class='Picturesimage'><img src='"+url+"' style='width:50%;' /></div>";
					content += "<div class='picturesDescription'><b>"+description+"</b></div>";
			content += "</div>";
		}
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}

/*
 * work on picasamontana source
 * display pictures in mosaic on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * only 6 pictures are displayed (3x3)
 */
function render_Pictures_for_main_mosaic(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/pict.png"/>';
	zone.loadImage("img/logos/pict.png");
	var title = collection.albumName;
	var time = timeInfo;
	var tableau = collection.pictures;
	
	var content = "<div class='main_div_zone1 mosaicPictures'>";	
	
	for (var indice = 0; indice < tableau.length; indice++){
		elements = tableau[indice].thumbs[2].url;
		zone.loadImage(elements);

		if ((indice+1) % 6 == 0) {
			content += "<span><img src='"+elements+"'/></span>";
			content += "</div>";
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
			content = "<div class='main_div_zone1 mosaicPictures'>";
		} else {
			if (indice % 3 == 0)
				content += "<br/>";
			content += "<span><img src='"+elements+"'/></span>";
		}
		if (indice+1 == tableau.length){
			if ((indice+1) % 6 != 0) {
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
			}
		}
	}
}


/*
 * work on picasamontana source
 * display pictures in mosaic on the zone1 (main)
 * the content is modified, the logo is the same and the title is the album's name
 * pictures are displayed by their size ( portrait or paysage )
 */
function render_Pictures_for_main_mosaic_display_by_size(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/pict.png"/>';
	zone.loadImage("img/logos/pict.png");
	var title = collection.albumName;
	var tableau = collection.pictures;
	var time = timeInfo;
	var paysages = new Array();
	var portraits = new Array();
	var tab_image = new Array();
	var content = "";
	
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
		content = "<div class='main_div_zone1 mosaicPicturesSize'>";
		content += "<div class='mosaicPaysage'>";
		for (var indice = 0; indice < paysages.length; indice++) {
			elements = paysages[indice];
	
			if ((indice+1) % 6 == 0) {
				content += "<span><img src='"+elements+"'/></span>";
				content += "</div>";
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				content = "<div class='main_div_zone1 mosaicPicturesSize'>";
				content += "<div class='mosaicPaysage'>";
			} else {
				if (indice % 3 == 0)
					content += "<br/>";
				content += "<span><img src='"+elements+"'/></span>";
			}
			if (indice+1 == tableau.length){
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
		content = "<div class='main_div_zone1 mosaicPicturesSize'>";
		content += "<div class='mosaicPortrait'>";
		for (var indice2 = 0; indice2 < portraits.length; indice2++) {
			elements = portraits[indice2];
	
			if ((indice2+1) % 3 == 0) {
				content += "<span><img src='"+elements+"'/></span>";
				content += "</div>";
				content += "</div>";
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				content = "<div class='main_div_zone1 mosaicPicturesSize'>";
				content += "<div class='mosaicPortrait'>";
			} else {
				content += "<span><img src='"+elements+"'/></span>";
			}
			if (indice2+1 == tableau.length){
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

