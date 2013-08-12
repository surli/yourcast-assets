/*
*Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Clément DUFFAU (duffau@polytech.unice.fr)
*/



function polytech_render_WebReader_main(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 10;
	var time = timeInfo;
	
	

	var elements=collection;
	var content=elements.content;
	var title=elements.title;
	var iframeType=elements.type;

	//alert(zone.divMarquee.getWidth()+ " "+zone.divMarquee.getHeight());
	if(iframeType=="url"){
			var contentHTML=decodeURIComponent(content);
			var contentRes="<iframe style=\"height: 100%;width:100%\" frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='"+contentHTML+"'><p>Your browser does not support iframes</p></iframe>";
	}
	else{

			var contentHTML=decodeURIComponent(content);
			var contentRes="<iframe style=\"height: 100%;width:100%\" frameborder='0' scrolling='no' marginheight='0' marginwidth='0' srcdoc=\""+contentHTML+"\" ><p>Your browser does not support iframes</p></iframe>";
	}	



		
	var dico = {"title":title,"content":contentRes,"time":time};
	console.log("Refreshing WebReader");
	zone.pushInfo(dico);

}

