
// to use some calendar functions
loadScript(RENDERER_PATH + "/utils/calendar.js");

/*
 * work on icalreader1 source
 * display the calendar in sessions on the zone1 (main)
 * the content is modified but the logo and the title are the same given by the event
 * function uses :
 * 		- transform_in_sessions(tableau) -> renderers/utils/calendar.js
 * 		- render_date(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 * 		- display_date_and_hour(dateEnd) -> js/date.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - calendar_one_event
 * - calendar_dates_one_element
 * - calendar_summary_one_element
 * - calendar_location_one_element
 * - calendar_description_one_element
 * - calendar_dates_multiple_element
 * - calendar_edt_events
 * - calendar_edt_header
 * - calendar_edt_header inProgress
 * - calendar_edt_hours
 * - calendar_edt_hours inProgress
 * - calendar_edt_location
 * - calendar_edt_summary
 * - calendar_edt_description
 * - smooth  
 */
function glc_generic_renderer_ICalReader_sessions(collection, zone, details, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
    var logo = '<img src="img/logos/calendar.png"/>';
    zone.loadImage("img/logos/calendar.png");
    var originalTitle = collection.name;

    var tableau = collection.events;
    var time = timeInfo;

    var eventsByHours = transform_in_sessions(tableau);
    var hoursSort = Object.keys(eventsByHours).sort();

    for (var ihours = 0; ihours < hoursSort.length; ihours++) {
        var hours = hoursSort[ihours];
        var elementsCollec = eventsByHours[hours];

        // if one event or all events finished at the same time
        if (elementsCollec['ends'].length == 1) {
            var title = originalTitle;
            // get the end timestamp
            var end = elementsCollec['ends'][0];

            // get the events finishing at this moment
            var elementsArray = elementsCollec[end];

            // if there is only one event
            if (elementsArray.length == 1) {
                var element = elementsArray[0];
                var descriptionCalendar = element.description.replace("\n", "<br/>");

                content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
                content += "<div class='calendar_dates_one_element'>" + render_date(element);
                content += "<br/><div class='calendar_summary_one_element'>" + element.summary + "</div>";
                if (element.location)
                    content += "<div class='calendar_location_one_element'>" + element.location + "</div>";
                content += "</div>";
                content += "<div class='calendar_description_one_element'>" + descriptionCalendar + "</div>";
                content += "</div>";
                content += "<div class='smooth'> </div>";

                var dico = {"content": content, "logo": logo, "title": title, "time": time};
                zone.pushInfo(dico);

                // if there is many events
            } else {
                var listDicoElts = new Array();

                content = "<div id='ICalReader' class='main_div_zone1'>";
                content += "<div class='calendar_dates_multiple_element'>" + render_date(elementsArray[0]) + "</div>";

                for (var indice = 0; indice < elementsArray.length; indice++) {
                    var element = elementsArray[indice];
                    var dicoElts = {"logo": logo, "title": title, "time": time};
                    var descriptionCalendar = element.description.replace("\n", "<br/>");

                    if (descriptionCalendar.length >= 100) {
                        var descriptionEdt = descriptionCalendar.substring(0, 100) + " ...";
                    } else
                        var descriptionEdt = descriptionCalendar;


                    // displaying session edt tsyle
                    content += "<div class='calendar_edt_events'>";
                    if (inProgress(element)) {
                        content += "<div class='calendar_edt_header inProgress'> ";
                        content += "<span class='calendar_edt_hours inProgress'> " + render_date_edt(elementsArray[0]) + "</span>";
                    }
                    else {
                        content += "<div class='calendar_edt_header'> ";
                        content += "<span class='calendar_edt_hours'> " + render_date_edt(elementsArray[0]) + "</span>";
                    }
                    if (element.location)
                        content += " <span class='calendar_edt_location'>" + element.location.substring(0, 20) + "</span>";
                    content += "</div>";
                    content += "<div class='calendar_edt_summary'> " + element.summary;
                    if (details && element.description)
                        content += " : <span class='calendar_edt_description'> " + descriptionEdt + "</span>";
                    content += "</div>";
                    content += "</div>";

                    // For a slide with details of the event
                    /*if (details) {
                     var contentDetail = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
                     contentDetail += "<div class='calendar_dates_one_element'>"+render_date(element);
                     contentDetail += "<br/><br/><div class='calendar_summary_one_element'><b>"+element.summary+"</b></div>";
                     if (element.location)
                     contentDetail += "<div class='calendar_location_one_element'>"+element.location+"</div>";
                     contentDetail += "</div>";
                     contentDetail += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
                     contentDetail += "</div>";
                     
                     dicoElts['content'] = contentDetail;
                     listDicoElts.push(dicoElts);
                     }*/
                }

                content += "</div>";
                content += "<div class='smooth'> </div>";

                var dico = {"content": content, "logo": logo, "title": title, "time": time};
                zone.pushInfo(dico);

                // For a slide with details of the event
                /*if (details) {
                 for (var i = 0; i < listDicoElts.length; i++)
                 zone.pushInfo(listDicoElts[i]);
                 }*/
            }

            // if there is many sessions finishing at different times
        } else {
            var title = originalTitle;
            var listDicoElts = new Array();
            var hours_int = parseInt(hours);
            var dateBegin = get_date_from_timestamp(hours_int);
            var content_dateBegin = display_date_and_hour(dateBegin);

            content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
            content += "<div class='calendar_dates_multiple_element'><i>" + content_dateBegin + "</i>";
            content += "</div>";
            // for each date of end session
            for (var indice = 0; indice < elementsCollec['ends'].length; indice++) {
                var end = elementsCollec['ends'][indice];
                var dateEnd = get_date_from_timestamp(end);
                var content_dateEnd = display_date_and_hour(dateEnd);

                var elementsArray = elementsCollec[end];

                for (var indice2 = 0; indice2 < elementsArray.length; indice2++) {
                    var element = elementsArray[indice2];
                    var dicoElts = {"logo": logo, "title": title, "time": time};
                    var descriptionCalendar = element.description.replace("\n", "<br/>");

                    // displaying session edt tsyle
                    content += "<div class='calendar_edt_events'>";
                    if (inProgress(element)) {
                        content += "<div class='calendar_edt_header inProgress'> ";
                        content += "<span class='calendar_edt_hours inProgress'> " + render_date_edt(elementsArray[0]) + "</span>";
                    }
                    else {
                        content += "<div class='calendar_edt_header'> ";
                        content += "<span class='calendar_edt_hours'> " + render_date_edt(elementsArray[0]) + "</span>";
                    }
                    if (element.location)
                        content += " <span class='calendar_edt_location'>" + element.location.substring(0, 20) + "</span>";
                    content += "</div>";
                    content += "<div class='calendar_edt_summary'> " + element.summary;
                    if (details && element.description)
                        content += " : <span class='calendar_edt_description'>" + descriptionCalendar + "</span>";
                    content += "</div>";

                    content += "</div>";
                    content += "<div class='smooth'> </div>";

                    /* For a slide with content of the event */
                    /*if (details) { 
                     contentDetail = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
                     contentDetail += "<div class='calendar_dates_one_element'>"+render_date(element);
                     contentDetail += "<div class='calendar_summary_one_element'><b>"+element.summary+"</b></div>";
                     if (element.location)
                     contentDetail += "<div class='calendar_location_one_element'>"+element.location+"</div>";
                     contentDetail += "</div>";
                     contentDetail += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
                     contentDetail += "</div>";
                     
                     dicoElts['content'] = contentDetail;
                     listDicoElts.push(dicoElts);
                     }*/
                }
            }

            var dico = {"content": content, "logo": logo, "title": title, "time": time};
            zone.pushInfo(dico);

            if (details) {
                for (var i = 0; i < listDicoElts.length; i++)
                    zone.pushInfo(listDicoElts[i]);
            }
        }
    }
}
