
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");

/*
 * work on icalreader1 source
 * display the calendar of the day by hour, like a schedule with the detail of each and the hour in top on the zone
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 *
 * CSS classes : 
 * - push_div_zone4
 * - calendar_body
 * - calendar_title  
 * - calendar_dates_multiple_element_hour_top
 * - calendar_edt_events
 * - calendar_edt_header
 * - calendar_edt_header inProgress
 * - calendar_edt_hours
 * - calendar_edt_hours inProgress
 * - calendar_edt_location
 * - calendar_edt_summary
 * - calendar_edt_summary inProgress  
 */
function render_ICalReader_for_push_logo_edt(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
    var logo = '<img src="img/logos/calendar.png"/>';
    zone.loadImage("img/logos/calendar.png");
    var title = collection.name;
    var tableau = collection.events;
    var time = timeInfo;
    var content = "";
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

        content = "<div id='" + zone.id + "_new_push' class='push_div_zone4' style='display:none;'>";
        content += "<div class='calendar_body'>";
        content += logo;
        content += "<div class='calendar_title'>" + title + "</div>";
        if (is_same_date(date, get_current_date()))
            content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui</div>";
        else
            content += "<div class='calendar_dates_multiple_element_hour_top'>" + date.day + " " + date.month + "</div>";

        content += "<div class='calendar_edt_events'>";

        for (var indice = 0; indice < elementsArray.length; indice++) {

            var element = elementsArray[indice];
            var dicoElts = {"logo": logo, "title": title, "time": time};
            var descriptionCalendar = element.description.replace("\n", "<br/>");

            if (descriptionCalendar.length >= 100) {
                var descriptionEdt = descriptionCalendar.substring(0, 100) + " ...";
            } else
                var descriptionEdt = descriptionCalendar;

            if (!pastEvent(element)) {

                eventsNum++;


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

                if (indice + 1 == elementsArray.length) {
                    content += "</div>";
                    content += "</div>";
                    content += "</div>";
                    var dico = {"content": content, "logo": logo, "title": title, "time": time};
                    zone.pushInfo(dico);
                }
            }
        }
    }
}
