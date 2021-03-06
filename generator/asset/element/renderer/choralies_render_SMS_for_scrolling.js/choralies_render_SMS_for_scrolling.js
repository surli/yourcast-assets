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

		if(indice%3==0)
			content += "<span class=\"info\"> Participez via Twitter (#choralies2013) ou envoyez Choralies suivi de votre message par SMS au 3 10 37 (coût d'un sms) ! &nbsp;</span>";
			
		content += "<span class='sms'>";
			content += "<span class='sms_Content'>&nbsp;&nbsp;";
				zone.loadImage('img/SMS.png');
				content += "&nbsp;<img src=\"img/SMS.png\" align=\"top\">&nbsp;&nbsp;";			
				//if(elements.titre!="")
				//	content += "<b>"+elements.titre+"</b> - ";	
			content += contentSMS+" </span>";
		content += "</span>";
	
		if(indice%3==2)
			content += "<span class=\"info\"> Envoyez Choralies suivi de votre message par SMS au 3 10 37 (coût d'un sms) ! &nbsp;</span>";

		
	}

	var dico = {"content": content, "logo": '', "time" : time};
	zone.pushInfo(dico);
}