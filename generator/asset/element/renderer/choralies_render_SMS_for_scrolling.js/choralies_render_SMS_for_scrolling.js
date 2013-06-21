/*
 * work on twitter source
 * display the tweet on the scrolling zone
 * 
 */
loadLess(LESS_ROOT+"/choralies_render_SMS_for_scrolling.less"); 
 
function choralies_render_SMS_for_scrolling(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;

	var content = "";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		var elements = tableau[indice];
		
		var reg=new RegExp("(\n)", "g");
		var contentSMS = elements.texte_court.replace(reg, " ");

		content += "<span class='sms'>";
			content += "<span class='sms_Content'>";
				if(elements.titre!="")
					content += "<b>"+elements.titre+"</b> - ";	
			content += contentSMS+" </span>";
		content += "</span>";
		
	}

	var dico = {"content": content, "logo": '', "time" : time};
	zone.pushInfo(dico);
}