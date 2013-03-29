/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/
// to use some calendar functions
loadScript(RENDERER_PATH+"/utils/calendar.js");


/*
 * work on icalreader1 source
 * display the calendar on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- render_date(element) -> js/date.js
 */
function render_ICalReader_for_main_same_title(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var time = timeInfo;
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
			
		var listDicoElts = new Array();
		
		var date = get_date_from_timestamp(start);
		var eventsNum = 0;
		
		for (var indice = 0; indice < elementsArray.length; indice++) {
			elements = elementsArray[indice];
	
			var descriptionCalendar = elements.description.replace("\n", "<br/>");
			
			content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
				content += "<div class='calendar_dates_one_element'>"+render_date(elements);
				content += "<div class='calendar_summary_one_element'><b>"+elements.summary+"</b></div>";
				if (elements.location)
					content += "<div class='calendar_location_one_element'>("+elements.location+")</div>";
				content += "</div>";
				content += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
			content += "</div>";
			
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
		}
	}
}

/*
 * work on icalreader1 source
 * display the calendar with just one element not in sessions on the zone1 (main)
 * the content and the title are modified given by the event but the logo is the same
 * function uses :
 * 		- render_date(element) -> js/date.js
 */
function render_ICalReader_for_main_different_title_one_element(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var time = timeInfo;
	var tableau = collection.events;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		if(elements.summary.length > 20){
			var title = elements.summary.substring(0, 20) + "...";
		} else {
			var title = elements.summary;
		}
		
		var descriptionCalendar = elements.description.replace("\n", "<br/>");
		
		content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
			content += "<div class='calendar_dates_one_element'>"+render_date(elements);
			if (elements.location)
				content += "<div class='calendar_location_one_element'>("+elements.location+")</div>";
			content += "</div>";
			content += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
		content += "</div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}

/*
 * work on icalreader1 source
 * display the calendar in sessions on the zone1 (main)
 * the content is modified but the logo and the title are the same given by the event
 * function uses :
 * 		- transform_in_sessions(tableau) -> renderers/utils/calendar.js
 * 		- render_date(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 * 		- display_date_and_hour(dateEnd) -> js/date.js
 */
function generic_renderer_ICalReader_sessions(collection, zone, details, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var title = collection.name;
	var tableau = collection.events;
	var time = timeInfo;
	
	var eventsByHours = transform_in_sessions(tableau);
	var hoursSort = Object.keys(eventsByHours).sort();
	
	for (var ihours = 0; ihours < hoursSort.length; ihours++) {
		var hours = hoursSort[ihours];
		var elementsCollec = eventsByHours[hours];
		
		// if one event or all events finished at the same time
		if (elementsCollec['ends'].length == 1) {
			
			// get the end timestamp
			var end = elementsCollec['ends'][0];
			
			// get the events finishing at this moment
			var elementsArray = elementsCollec[end];
			
			// if there is only one event
			if (elementsArray.length == 1) {
				var element = elementsArray[0];
				var descriptionCalendar = element.description.replace("\n", "<br/>");
				
				content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
					content += "<div class='calendar_dates_one_element'>"+render_date(element);
					content += "<div class='calendar_summary_one_element'><b>"+element.summary+"</b></div>";
					if (element.location)
						content += "<div class='calendar_location_one_element'>("+element.location+")</div>";
					content += "</div>";
					content += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
				content += "</div>";
				
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				
			// if there is many events
			} else {
				var listDicoElts = new Array();
				
				content = "<div id='ICalReader' class='main_div_zone1'>";
				content += "<div class='calendar_dates_multiple_element'>"+render_date(elementsArray[0])+"</div>";
				
	
				for (var indice = 0; indice < elementsArray.length; indice++) {
					var element = elementsArray[indice];
					var dicoElts = {"logo": logo, "title": title, "time" : time};
					var descriptionCalendar = element.description.replace("\n", "<br/>");
					
					if (descriptionCalendar.length >= 50){
						var descriptionEdt = descriptionCalendar.substring(0, 50)+" ...";
					}else var descriptionEdt = descriptionCalendar;
					
					/*// displaying session
					content += "<div class='calendar_multiple_events'>&rarr; "+element.summary;
					if (element.location)
						content += " <span class='calendar_location_multiple_element'>("+element.location+")</span>";
					if (!details)
						content += "<div class='calendar_description_multiple_element'>"+descriptionCalendar+"</div>";
					content += "</div>";*/
					
					
					// displaying session edt tsyle
					content += "<div class='calendar_edt_events'>";
						content += "<div class='calendar_edt_summary'> "+element.summary;
						content += "</div>";
						if (inProgress(element)) {
							content += "<div class='calendar_edt_hours inProgress'> "+descriptionEdt;
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						} else {
							content += "<div class='calendar_edt_hours'> "+descriptionEdt;
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						}
					content += "</div>";
					
					
					if (details) {
						// content for details
						var contentDetail = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
						contentDetail += "<div class='calendar_dates_one_element'>"+render_date(element);
						contentDetail += "<div class='calendar_summary_one_element'><b>"+element.summary+"</b></div>";
						if (element.location)
							contentDetail += "<div class='calendar_location_one_element'>("+element.location+")</div>";
						contentDetail += "</div>";
						contentDetail += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
						contentDetail += "</div>";
						
						dicoElts['content'] = contentDetail;
						listDicoElts.push(dicoElts);
					}
				}
				
				content += "</div>";
				
				var dico = {"content": content, "logo": logo, "title": title, "time" : time};
				zone.pushInfo(dico);
				
				if (details) {
					for (var i = 0; i < listDicoElts.length; i++)
						zone.pushInfo(listDicoElts[i]);
				}
			}
			
		// if there is many sessions finishing at different times
		} else {
			var listDicoElts = new Array();
			var hours_int = parseInt(hours);
			var dateBegin = get_date_from_timestamp(hours_int);
			var content_dateBegin = display_date_and_hour(dateBegin);
			
			content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
			content += "<div class='calendar_dates_one_element'><i>"+content_dateBegin+"</i>";
			
			// for each date of end session
			for (var indice = 0; indice < elementsCollec['ends'].length; indice++) {
				var end = elementsCollec['ends'][indice];
				var dateEnd = get_date_from_timestamp(end);
				var content_dateEnd = display_date_and_hour(dateEnd);
				
				var elementsArray = elementsCollec[end];
				
				for (var indice2 = 0; indice2 < elementsArray.length; indice2++) {
					var element = elementsArray[indice2];
					var dicoElts = {"logo": logo, "title": title, "time" : time};
					var descriptionCalendar = element.description.replace("\n", "<br/>");
					/*content += "<div class='calendar_multiple_events'><div class='calendar_date_end'><i>"+content_dateEnd+" </i></div>";
					content += element.summary;
					if (element.location)
						content += " <span class='calendar_location_multiple_element'>("+element.location+")</span>";
					if (!details)
						content += "<div class='calendar_description_multiple_element'>"+descriptionCalendar+"</div>";
					content += "</div>";*/
					// displaying session edt tsyle
					content += "<div class='calendar_edt_events'>";
						content += "<div class='calendar_edt_summary'> "+element.summary;
						if (!details)
							content += "<span class='calendar_description_edt'>"+descriptionCalendar+"</span>";
						content += "</div>";
						content += "<div class='calendar_edt_hours'> "+render_date_edt(elementsArray[0]);
						if (element.location)
							content += " <span class='calendar_location_edt'>("+element.location+")</span>";
						content += "</div>";
					content += "</div>";
					
					if (details) {
						// content for detail
						contentDetail = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
						contentDetail += "<div class='calendar_dates_one_element'>"+render_date(element);
						contentDetail += "<div class='calendar_summary_one_element'><b>"+element.summary+"</b></div>";
						if (element.location)
							contentDetail += "<div class='calendar_location_one_element'>("+element.location+")</div>";
						contentDetail += "</div>";
						contentDetail += "<div class='calendar_description_one_element'>"+descriptionCalendar+"</div>";
						contentDetail += "</div>";
						
						dicoElts['content'] = contentDetail;
						listDicoElts.push(dicoElts);
					}
				}
			}
			content += "</div>";
			
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
			
			if (details) {
				for (var i = 0; i < listDicoElts.length; i++)
					zone.pushInfo(listDicoElts[i]);
			}
		}
	}
}

/*
 * work on icalreader1 source
 * display the calendar in session without the detail on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- generic_renderer_ICalReader_sessions(collection, zone, false) -> renderers/calendar.js
 */
function render_ICalReader_for_main_different_title_many_session_simple(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	generic_renderer_ICalReader_sessions(collection, zone, false, timeInfo);
}


/*
 * work on icalreader1 source
 * display the calendar in session with the detail of each on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- generic_renderer_ICalReader_sessions(collection, zone, true) -> renderers/calendar.js
 */
function render_ICalReader_for_main_different_title_many_session_with_details(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	generic_renderer_ICalReader_sessions(collection, zone, true, timeInfo);
}


/*
 * work on icalreader1 source
 * display the calendar of the day by hour, like a schedule without the detail of each on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 */
function render_ICalReader_for_main_edt_without_detail(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var title = collection.name;
	var tableau = collection.events;
	var time = timeInfo;
	
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
			
		var listDicoElts = new Array();
		
		var date = get_date_from_timestamp(start);
		var eventsNum = 0;
		
		content = "<div id='ICalReader' class='main_div_zone1'>";
		content += "<div class='calendar_dates_multiple_element'>"+date.day + " " + date.month+"</div>";
		content += "<div class='calendar_edt_events'>";
		
		for (var indice = 0; indice < elementsArray.length; indice++) {
			var element = elementsArray[indice];

			var dicoElts = {"logo": logo, "title": title, "time" : time};
			
			if (!pastEvent(element)) {
				eventsNum++;
				if ((eventsNum) % 4 == 0) {
					content += "<div class='calendar_edt_summary'> "+element.summary+ "</div>";
					if (inProgress(element)) {
						content += "<div class='calendar_edt_hours inProgress'> "+render_date_edt(element);
						if (element.location)
							content += " <span class='calendar_location_edt'>("+element.location+")</span>";
						content += "</div>";
					} else {
						content += "<div class='calendar_edt_hours'> "+render_date_edt(element);
						if (element.location)
						content += " <span class='calendar_location_edt'>("+element.location+")</span>";
						content += "</div>";
					}
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
					content = "<div id='ICalReader' class='main_div_zone1'>";
					content += "<div class='calendar_dates_multiple_element'>"+date.day + " " + date.month+"</div>";
					content += "<div class='calendar_edt_events'>";
				} else {
					content += "<div class='calendar_edt_summary'> "+element.summary+ "</div>";
					if (inProgress(element)) {
						content += "<div class='calendar_edt_hours inProgress'> "+render_date_edt(element);
						if (element.location)
							content += " <span class='calendar_location_edt'>("+element.location+")</span>";
						content += "</div>";
					} else {
						content += "<div class='calendar_edt_hours'> "+render_date_edt(element);
						if (element.location)
						content += " <span class='calendar_location_edt'>("+element.location+")</span>";
						content += "</div>";
					}
				}
				if (indice+1 == elementsArray.length){
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
				}
			}
		}
	}
}


/*
 * work on icalreader1 source
 * display the calendar of the day by hour, like a schedule with the detail of each on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 */
function render_ICalReader_for_main_edt_with_detail(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var title = collection.name;
	var tableau = collection.events;
	var time = timeInfo;
	
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
			
		var listDicoElts = new Array();
		
		var date = get_date_from_timestamp(start);
		var eventsNum = 0;
		
		content = "<div id='ICalReader' class='main_div_zone1'>";
		content += "<div class='calendar_dates_multiple_element'>"+date.day + " " + date.month+"</div>";
		content += "<div class='calendar_edt_events'>";
		
		for (var indice = 0; indice < elementsArray.length; indice++) {
			var element = elementsArray[indice];
			var dicoElts = {"logo": logo, "title": title, "time" : time};
			var descriptionCalendar = element.description.replace("\n", "<br/>");
			
			if (descriptionCalendar.length >= 200){
				var descriptionEdt = descriptionCalendar.substring(0, 200)+" ...";
			}else var descriptionEdt = descriptionCalendar;
			
			
			if (!pastEvent(element)) {
				eventsNum++;
				if ((eventsNum) % 2 == 0) {
					content += "<div class='calendar_edt_summary'> "+element.summary+ "</div>";
					if (inProgress(element)) {
						if(element.description) {
							content += "<div class='calendar_edt_hours_desc inProgress'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
							content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
						} else {
							content += "<div class='calendar_edt_hours inProgress'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						}
					} else {
						if(element.description) {
							content += "<div class='calendar_edt_hours_desc'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
							content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
						} else {
							content += "<div class='calendar_edt_hours'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						}
					}
					
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
					content = "<div id='ICalReader' class='main_div_zone1'>";
					content += "<div class='calendar_dates_multiple_element'>"+date.day + " " + date.month+"</div>";
					content += "<div class='calendar_edt_events'>";
				} else {
					content += "<div class='calendar_edt_summary'> "+element.summary+ "</div>";
					if (inProgress(element)) {
						if(element.description) {
							content += "<div class='calendar_edt_hours_desc inProgress'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
							content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
						} else {
							content += "<div class='calendar_edt_hours inProgress'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						}
					} else {
						if(element.description) {
							content += "<div class='calendar_edt_hours_desc'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
							content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
						} else {
							content += "<div class='calendar_edt_hours'> "+render_date_edt(element);
							if (element.location)
								content += " <span class='calendar_location_edt'>("+element.location+")</span>";
							content += "</div>";
						}
					}
				}
				if (indice+1 == elementsArray.length){
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
				}
			}
		}
	}
}


/*
 * work on icalreader1 source
 * display the calendar of the day by hour, like a schedule with the detail of each and the hour in top on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 */
function render_ICalReader_for_main_edt_with_detail_hour_top(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var title = collection.name;
	var tableau = collection.events;
	var time = timeInfo;
	
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
			
		var listDicoElts = new Array();
		
		var date = get_date_from_timestamp(start);
		var eventsNum = 0;
		
		content = "<div id='ICalReader' class='main_div_zone1'>";
		
		if (is_same_date(date, get_current_date())) content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui, "+date.day + " " + date.month+"</div>";
		else content += "<div class='calendar_dates_multiple_element_hour_top'>"+date.day + " " + date.month+"</div>";
		content += "<div class='calendar_edt_events'>";
		
		for (var indice = 0; indice < elementsArray.length; indice++) {
			var element = elementsArray[indice];
			var dicoElts = {"logo": logo, "title": title, "time" : time};
			var descriptionCalendar = element.description.replace("\n", "<br/>");
			
			if (descriptionCalendar.length >= 200){
				var descriptionEdt = descriptionCalendar.substring(0, 200)+" ...";
			}else var descriptionEdt = descriptionCalendar;
			
			
			if (!pastEvent(element)) {
				eventsNum++;
				if ((eventsNum) % 2 == 0) {
					if (inProgress(element)) {
						content += "<div class='calendar_edt_hours_top_tab'>";
						zone.loadImage("img/rightNow.png");
						content += "<span class='calendar_edt_hours_top_date inProgress'><img src='img/rightNow.png'/>  "+render_date_edt(element)+"</span>";
						if (element.location)
							content += " <span class='calendar_edt_hours_top_location'>("+element.location+")</span>";
						content += "</div>";
					} else {
						content += "<div class='calendar_edt_hours_top_tab'>";
						content += "<span class='calendar_edt_hours_top_date'>"+render_date_edt(element)+"</span>";
						if (element.location)
							content += " <span class='calendar_edt_hours_top_location'>("+element.location+")</span>";
						content += "</div>";
					}
					if(element.description) {
						content += "<div class='calendar_edt_summary_top'> "+element.summary+ "</div>";
						content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
					} else {
						content += "<div class='calendar_edt_summary_top_no_desc'> "+element.summary+ "</div>";
					}
					
					content += "</div>";
					content += "</div>";
					var dico = {"content": content, "logo": logo, "title": title, "time" : time};
					zone.pushInfo(dico);
					content = "<div id='ICalReader' class='main_div_zone1'>";
					if (is_same_date(date, get_current_date())) content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui, "+date.day + " " + date.month+"</div>";
					else content += "<div class='calendar_dates_multiple_element_hour_top'>"+date.day + " " + date.month+"</div>";
					content += "<div class='calendar_edt_events'>";
				} else {
					if (inProgress(element)) {
						content += "<div class='calendar_edt_hours_top_tab'>";
						zone.loadImage("img/rightNow.png");
						content += "<span class='calendar_edt_hours_top_date inProgress'><img src='img/rightNow.png'/>  "+render_date_edt(element)+"</span>";
						if (element.location)
							content += " <span class='calendar_edt_hours_top_location'>("+element.location+")</span>";
						content += "</div>";
					} else {
						content += "<div class='calendar_edt_hours_top_tab'>";
						content += "<span class='calendar_edt_hours_top_date'>"+render_date_edt(element)+"</span>";
						if (element.location)
							content += " <span class='calendar_edt_hours_top_location'>("+element.location+")</span>";
						content += "</div>";
					}
					if(element.description) {
						content += "<div class='calendar_edt_summary_top'> "+element.summary+ "</div>";
						content += "<div class='calendar_edt_description'> "+descriptionEdt+ "</div>";
					} else {
						content += "<div class='calendar_edt_summary_top_no_desc'> "+element.summary+ "</div>";
					}
				}
				if (indice+1 == elementsArray.length){
					if ((eventsNum) % 2 != 0) {
						content += "</div>";
						content += "</div>";
						var dico = {"content": content, "logo": logo, "title": title, "time" : time};
						zone.pushInfo(dico);
					}
				}
			}
		}
	}
}

/*
 * work on icalreader1 source
 * display the calendar of the day on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 */
function render_ICalReader_for_main_edt_one_day_all_event(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
	var logo = '<img src="img/logos/ical.png"/>';
	zone.loadImage("img/logos/ical.png");
	var title = collection.name;
	var tableau = collection.events;
	var eventsNum = 0;
	var time = timeInfo;
	
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
			
		var listDicoElts = new Array();
		
		var date = get_date_from_timestamp(start);
		eventsNum = 0;
		
		content = "<div id='ICalReader' class='main_div_zone1'>";
		
		if (is_same_date(date, get_current_date())) content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui, "+date.day + " " + date.month+"</div>";
		else content += "<div class='calendar_dates_multiple_element_hour_top'>"+date.day + " " + date.month+"</div>";
		
		content += "<div class='calendar_one_day_all_event'>";
		content += "<table class='calendarTable'>";
		
		for (var indice = 0; indice < elementsArray.length; indice++) {
			elements = elementsArray[indice];
			
			if (!pastEvent(elements)) {
				eventsNum++;
				if ((eventsNum) % 10 == 0) {
					if ((eventsNum) % 2 == 0) {
						
						var summary = elements.summary;
						
						if (elements.summary.length >= 50) summary = elements.summary.substring(0, 50) + "...";
						
						if (inProgress(elements)) {
							content += "<tr class='color2 inProgress_synth'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						} else {
							content += "<tr class='color2'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						}
						
						content += "</table>";
						content += "</div>";
						content += "</div>";
						var dico = {"content": content, "logo": logo, "title": title, "time" : time};
						zone.pushInfo(dico);
						
						content = "<div id='ICalReader' class='main_div_zone1'>";
						
						if (is_same_date(date, get_current_date())) content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui, "+date.day + " " + date.month+"</div>";
						else content += "<div class='calendar_dates_multiple_element_hour_top'>"+date.day + " " + date.month+"</div>";
						
						content += "<div class='calendar_one_day_all_event'>";
						content += "<table class='calendarTable'>";
					}
					
					else {
						
						var summary = elements.summary;
						
						if (elements.summary.length >= 50) summary = elements.summary.substring(0, 50) + "...";
						
						if (inProgress(elements)) {
							content += "<tr class='color1 inProgress_synth'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						} else {
							content += "<tr class='color1'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						}
						
						content += "</table>";
						content += "</div>";
						content += "</div>";
						var dico = {"content": content, "logo": logo, "title": title, "time" : time};
						zone.pushInfo(dico);
						
						content = "<div id='ICalReader' class='main_div_zone1'>";
						
						if (is_same_date(date, get_current_date())) content += "<div class='calendar_dates_multiple_element_hour_top'>Aujourd'hui, "+date.day + " " + date.month+"</div>";
						else content += "<div class='calendar_dates_multiple_element_hour_top'>"+date.day + " " + date.month+"</div>";
						
						content += "<div class='calendar_one_day_all_event'>";
						content += "<table class='calendarTable'>";
					}
				}
				else {
					if ((eventsNum) % 2 == 0) {

						var summary = elements.summary;
						
						if (elements.summary.length >= 50) summary = elements.summary.substring(0, 50) + "...";
						
						if (inProgress(elements)) {
							content += "<tr class='color2 inProgress_synth'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						} else {							
							content += "<tr class='color2'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						}
					}
					else {

						var summary = elements.summary;
						
						if (elements.summary.length >= 50) summary = elements.summary.substring(0, 50) + "...";
						
						if (inProgress(elements)) {
							content += "<tr class='color1 inProgress_synth'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>"; 
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						} else {
							content += "<tr class='color1'>";
							content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>";
							if (elements.location) {
								content += "<td class='tableSum'>" + summary + "</td>";
								content += "<td class='tableLoc'>" + elements.location + "</td>";
							}
							else {
								content += "<td class='tableSum' COLSPAN=2>" + summary + "</td>";
							}
							content += "</tr>";
						}
					}
				}
				if (indice+1 == elementsArray.length){
					if ((eventsNum) % 10 != 0) {
						content += "</table>";
						content += "</div>";
						content += "</div>";
						var dico = {"content": content, "logo": logo, "title": title, "time" : time};
						zone.pushInfo(dico);
					}
				}	
			}
		}
	}
}

/*
 * work on icalreader1 source
 * display the calendar on the zone2 (scrolling)
 * the content is modified but there isn't logo or title
 */
function render_ICalReader_for_scrolling_simple(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	content = "";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content += "<b>"+elements.summary+"</b>";
		if (elements.location)
			content += "<i> "+elements.location+"</i>";
		content += " ----- ";
	}

	var dico = {"content": content, "time" : time};
	zone.pushInfo(dico);
}


/*
 * work on icalreader1 source
 * display the calendar on the zone2 (scrolling)
 * the content is modified but the logo is the same for each source
 */
function render_ICalReader_for_scrolling_logo_for_source(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	content = "";
	content += "<img src='img/logos/apal.png'/>";
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content += "<b>"+elements.summary+"</b>";
		if (elements.location)
			content += "<i> "+elements.location+"</i>";
		content += " ----- ";
	}

	var dico = {"content": content, "time" : time};
	zone.pushInfo(dico);
}

/*
 * work on icalreader1 source
 * display the calendar on the zone2 (scrolling)
 * the content is modified but the logo is the same for each info
 */
function render_ICalReader_for_scrolling_logo_for_each_info(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 50;
	var logo = "<img src='img/logos/apal.png'/>";
	zone.loadImage("img/logos/apal.png");
	var time = timeInfo;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		content = "<b>"+elements.summary+"</b>";
		if (elements.location)
			content += "<i> "+elements.location+"</i>";

		var dico = {"content": content, "logo": logo, "time" : time};
		zone.pushInfo(dico);
	}
}





















