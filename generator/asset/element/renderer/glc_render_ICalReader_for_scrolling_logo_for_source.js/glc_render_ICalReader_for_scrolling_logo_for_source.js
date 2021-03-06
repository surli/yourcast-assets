
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");

/*
 * work on icalreader1 source
 * display the calendar on the zone2 (scrolling)
 * the content is modified but the logo is fixed and the same for each source
 *
 *
 * CSS classes : 
 * - calendar_event
 * - calendar_Dates
 * - calendar_location 
 */
function render_ICalReader_for_scrolling_logo_for_source(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
    content = "";
    var logo = "<img src='img/logos/calendar.png'/>";
    zone.loadImage("img/logos/calendar.png");
    var time = timeInfo;

    var title = collection.name;
    var tableau = collection.events;

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

        for (var indice = 0; indice < elementsArray.length; indice++) {
            elements = elementsArray[indice];

            var reg = new RegExp("(\n)", "g");
            var summary = elements.summary.replace(reg, " ");
            if (summary > 100) {
                summary = summary.substring(0, 100);
                summary += "...";
            }

            content += "<span class='calendar_event'>";
            content += title;
            content += "<span class='calendar_Dates'>" + render_date(elements) + "</span>";
            content += ": " + elements.summary;
            if (elements.location)
                content += " (<span class='calendar_location'> " + elements.location + "</span>)";
            content += "</span>";
        }
    }

    var dico = {"content": content, "logo": logo, "time": time};
    zone.pushInfo(dico);
}
