
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");

/*
 * work on icalreader1 source
 * display the calendar with just one element not in sessions on the zone1 (main)
 * the content and the title are modified given by the event but the logo is the same
 * function uses :
 * 		- render_date(element) -> js/date.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - calendar_one_event
 * - calendar_dates_one_element
 * - calendar_location_one_element
 * - calendar_description_one_element
 * - smooth 
 */
function glc_render_ICalReader_for_main_different_title_one_element(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/calendar.png"/>';
	zone.loadImage("img/logos/calendar.png");
	var time = timeInfo;
	var tableau = collection.events;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		var title = elements.summary;
		var descriptionCalendar = elements.description.replace("\n", "<br/>");
		
		content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
			content += "<div class='calendar_dates_one_element'>"+render_date(elements);
			if (elements.location)
				content += "<br/><div class='calendar_location_one_element'>"+elements.location+"</div>";
			content += "</div>";
			content += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
		content += "</div>";
		
		content +="<div class='smooth'> </div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}
