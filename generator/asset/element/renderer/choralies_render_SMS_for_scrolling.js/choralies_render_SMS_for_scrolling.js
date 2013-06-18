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
	for (var indice = 0; indice < tableau.sms.length; indice++) {
		var elements = tableau.sms[indice];
		
		var reg=new RegExp("(\n)", "g");
		var contentSMS = elements.text.replace(reg, " ");

		content += "<span class='sms'>";
		content += " "+"<span class='sms_author'>"+elements.user+"</span> : ";
		content += "<span class='sms_Content'>"+contentSMS+" </span>";
		content += "</span>";
		
	}

	var dico = {"content": content, "logo": '', "time" : time};
	zone.pushInfo(dico);
}