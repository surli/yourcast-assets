
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");

/*
 * work on icalreader1 source
 * display the calendar of the day by hour, like a schedule without the detail of each on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - calendar_dates_multiple_element
 * - calendar_edt_events
 * - calendar_edt_header
 * - calendar_edt_header inProgress
 * - calendar_edt_hours
 * - calendar_edt_hours inProgress
 * - calendar_edt_location
 * - calendar_edt_summary
 * - smooth  
 */
function render_ICalReader_for_main_edt_without_detail(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
    var logo = '<img src="img/logos/calendar.png"/>';
    zone.loadImage("img/logos/calendar.png");
    var title = collection.name;
    var tableau = collection.events;
    var time = timeInfo;

    var eventsByDays = transform_in_days(tableau);
    var daysSort = Object.keys(eventsByDays).sort();

    for (var idays = 0; idays < daysSort.length; idays++) {
        var days = daysSort[idays];
        var sortObjectStart = function(a, b) {
            return (a.start - b.start);
        };

        eventsByDays[days][days].sort(sortObjectStart);

        var elementsCollec = eventsByDays[days];

        var start = elementsCollec['days'][0];
        var elementsArray = elementsCollec[start];

        var listDicoElts = new Array();

        var date = get_date_from_timestamp(start);
        var eventsNum = 0;

        content = "<div id='ICalReader' class='main_div_zone1'>";
        content += "<div class='calendar_dates_multiple_element'>" + date.day + " " + date.month + "</div>";
        content += "<div class='calendar_edt_events'>";

        for (var indice = 0; indice < elementsArray.length; indice++) {
            var element = elementsArray[indice];

            var dicoElts = {"logo": logo, "title": title, "time": time};

            if (!pastEvent(element)) {
                eventsNum++;
                if ((eventsNum) % 3 == 0) {
                    if (inProgress(element)) {
                        content += "<div class='calendar_edt_header inProgress'> ";
                        content += "<span class='calendar_edt_hours inProgress'> " + render_date_edt(element) + "</span>";
                    }
                    else {
                        content += "<div class='calendar_edt_header'> ";
                        content += "<span class='calendar_edt_hours'> " + render_date_edt(element) + "</span>";
                    }
                    if (element.location)
                        content += " <span class='calendar_edt_location'>" + element.location.substring(0, 20) + "</span>";
                    content += "</div>";
                    if (inProgress(element))
                        content += "<div class='calendar_edt_summary inProgress'> " + element.summary + "</div>";
                    else
                        content += "<div class='calendar_edt_summary'> " + element.summary + "</div>";

                    content += "</div>";
                    content += "</div>";
                    content += "<div class='smooth'> </div>";

                    var dico = {"content": content, "logo": logo, "title": title, "time": time};
                    zone.pushInfo(dico);
                    content = "<div id='ICalReader' class='main_div_zone1'>";
                    content += "<div class='calendar_dates_multiple_element'>" + date.day + " " + date.month + "</div>";
                    content += "<div class='calendar_edt_events'>";
                } else {

                    if (inProgress(element)) {
                        content += "<div class='calendar_edt_header inProgress'> ";
                        content += "<span class='calendar_edt_hours inProgress'> " + render_date_edt(element) + "</span>";
                    }
                    else {
                        content += "<div class='calendar_edt_header'> ";
                        content += "<span class='calendar_edt_hours'> " + render_date_edt(element) + "</span>";
                    }
                    if (element.location)
                        content += " <span class='calendar_edt_location'>" + element.location.substring(0, 20) + "</span>";
                    content += "</div>";
                    if (inProgress(element))
                        content += "<div class='calendar_edt_summary inProgress'> " + element.summary + "</div>";
                    else
                        content += "<div class='calendar_edt_summary'> " + element.summary + "</div>";
                }
                if (indice + 1 == elementsArray.length) {
                    content += "</div>";
                    content += "</div>";
                    var dico = {"content": content, "logo": logo, "title": title, "time": time};
                    zone.pushInfo(dico);
                }
            }
        }
    }
}
