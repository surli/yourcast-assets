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


function loader(text, points){
	if(document.getElementById('loader')){				
		points = (points ? points : 0);
		points = (points+1 > 3 ? 0 : points+1);
		
		if(!text){
			text = document.getElementById('loader').childNodes[0].innerHTML;
		}
		
		var text_suspensions = text;
		for(i=0; i<points; i++){
			text_suspensions += '.';
		}
		
		document.getElementById('loader').childNodes[0].innerHTML = text_suspensions;
		setTimeout('loader(\''+text+'\', '+points+')', 500);
	}
}

function imageSize(widthImage, heightImage) {
	var width;
	var height;
	var heightScreen = window.outerHeight;

	height = (heightScreen - (heightScreen * 0.3)) * 0.7;
	width = (widthImage * height) / heightImage;

	var collection = {"height":height, "width":width}; 
	return collection;
}

function isPaysage(element){
	var widthImage = element.width;
	var heightImage = element.height;
	
	if (widthImage >= heightImage) {
		return true;
	} else {
		return false;
	}
}