
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");


/*
 * work on icalreader1 source
 * display the calendar on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- render_date(element) -> js/date.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - calendar_one_event
 * - calendar_dates_one_element
 * - calendar_summary_one_element
 * - calendar_location_one_element
 * - calendar_description_one_element
 * - smooth 
 */
	

function glc_render_ICalReader_for_main_same_title(collection, zone, timeInfo) {
       timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
       var logo = '<img src="img/logos/calendar.png"/>';
       zone.loadImage("img/logos/calendar.png");
       var time = timeInfo;
      
       if (typeof collection === "object" && typeof collection.name === "string" && Array.isArray(collection.events)) {
               var title = collection.name;
               var tableau = collection.events;

               var eventsByDays = transform_in_days(tableau);
               var daysSort = Object.keys(eventsByDays).sort();

               for (var idays = 0; idays < daysSort.length; idays++) {
                       var days = daysSort[idays];
                       var sortObjectStart = function(a,b) {
                               return (a.start-b.start);
                       };

                       eventsByDays[days][days].sort(sortObjectStart);

                       var elementsCollec = eventsByDays[days];

                       var start = elementsCollec['days'][0];
                       var elementsArray = elementsCollec[start];

                       for (var indice = 0; indice < elementsArray.length; indice++) {
                               elements = elementsArray[indice];

                               var descriptionCalendar = elements.description.replace("\n", "<br/>");

                               content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
                                       content += "<div class='calendar_dates_one_element'>"+render_date(elements);
                                       content += "<br/><div class='calendar_summary_one_element'>"+elements.summary+"</div>";
                                       if (elements.location)
                                               content += "<div class='calendar_location_one_element'>"+elements.location+"</div>";
                                       content += "</div>";
                                       content += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
                               content += "</div>";

                               content +="<div class='smooth'> </div>";

                               var dico = {"content": content, "logo": logo, "title": title, "time" : time};
                               zone.pushInfo(dico);
                       }
               }
       }
}


