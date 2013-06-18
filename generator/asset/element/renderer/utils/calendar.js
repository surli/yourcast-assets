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

// return if the element is in the past or not
function pastEvent(element) {
	if (element.end == 0){
		return false;
	} else {
		
		var currentDate = get_current_date_int();
		var end = get_date_from_timestamp_int(element.end);
		
		if (end.year == currentDate.year && end.day == currentDate.day && end.month == currentDate.month) {
			if (currentDate.hour > end.hour) return true;
			else if(currentDate.hour == end.hour && currentDate.min > end.min) return true;
	    }
		else if (end.year < currentDate.year) return true;
	    else if (end.year == currentDate.year && end.month < currentDate.month) return true;
	    else if (end.year == currentDate.year && end.month == currentDate.month && end.day < currentDate.day) return true;
	    return false; 
	}
}

// return if the element is in progress or not
function inProgress(element) {
	if (element.start == 0 || element.end == 0){
		return false;
	} else {
		
		var currentDate = get_current_date_int();
		var currentTimestamp = new Date().getTime();
		var start = get_date_from_timestamp_int(element.start);
		var end = get_date_from_timestamp_int(element.end);
			
		if (end.year == start.year && end.day == start.day && end.month == start.month && end.year == currentDate.year && end.day == currentDate.day && end.month == currentDate.month) {
			if (currentDate.hour >= start.hour && currentDate.hour <= end.hour){
				if (currentDate.hour == start.hour && currentDate.min >= start.min){
					if (currentDate.hour == end.hour && currentDate.min <= end.min) return true;
					if (currentDate.hour < end.hour) return true;
				}
				if (currentDate.hour > start.hour){
					if (currentDate.hour == end.hour && currentDate.min <= end.min) return true;
					if (currentDate.hour < end.hour) return true;
				}
			}
	    }
		else if (end.year == start.year && currentDate.year == end.year) {
			if (end.month == start.month && currentDate.month == end.month){
				if (currentDate.day >= start.day && currentDate.day <= end.day) return true;
			}
			else if (currentDate.month >= start.month && currentDate.month <= end.month) {
				if (currentDate.month == start.month && currentDate.day >= start.day) return true;
				if (currentDate.month == end.month && currentDate.day <= end.day) return true;
			}
		}
		else {
			if (currentDate.year >= start.year && currentDate.year <= end.year) {
				if(currentTimestamp >= element.start && currentTimestamp <= element.end) return true;
			}
		}
	    	
		return false; 
	}
}

// return if the element has to be displayed or not
function inProgressToDisplay(element){
	
	if (element.start == 0 || element.end == 0){
		return false;
	} else {
		
		var currentDate = get_current_date_int();
		var currentTimestamp = new Date().getTime();
			
		if(currentTimestamp >= element.start && currentTimestamp <= element.end) return true;
	    	
		return false; 
	}	
}

// sort the tableau by session
function transform_in_sessions(tableau) {
	var eventsByHours = {};
	var start = 0;
	var end = 0;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		start = elements.start;
		end = elements.end;
		
		if (!eventsByHours[start]) {
			sameStarthour = {};
			sameStarthour['ends'] = new Array();
			sameStarthour['ends'].push(end);
			
			sameStarthour[end] = new Array();
			sameStarthour[end].push(elements);
			for (var indice2 = indice+1; indice2 < tableau.length; indice2++) {
				var elt = tableau[indice2];
				if (elt.start == start) {
					if (!sameStarthour[elt.end]) {
						sameStarthour[elt.end] = new Array();
						sameStarthour['ends'].push(elt.end);
					}
					sameStarthour[elt.end].push(elt);
				}
			}
			eventsByHours[start] = sameStarthour;
		}
	}
	
	return eventsByHours;
}

// sort the tableau by days
function transform_in_days(tableau) {
	var eventsByDays = {};
	var start = 0;
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		start = new Date(elements.start).setHours(0,0,0,0);
		
		if (!eventsByDays[start]) {
			sameDay = {};
			sameDay['days'] = new Array();
			sameDay['days'].push(start);
			
			sameDay[start] = new Array();
			sameDay[start].push(elements);
			
			for (var indice2 = indice+1; indice2 < tableau.length; indice2++) {
				var elt = tableau[indice2];
				if (new Date(elt.start).setHours(0,0,0,0) == start) {
					if (!sameDay[new Date(elt.start).setHours(0,0,0,0)]) {
						sameDay[new Date(elt.start).setHours(0,0,0,0)] = new Array();
						sameDay['days'].push(new Date(elt.start).setHours(0,0,0,0));
					}
					sameDay[new Date(elt.start).setHours(0,0,0,0)].push(elt);
				}
			}
			eventsByDays[start] = sameDay;
		}
	}
	
	return eventsByDays;
}

// Du [jour] [heure] au [jour] [heure]
// Le [jour]
// [jour] de [heure] a [heure]
function render_date(elements) {
	if (elements.start == 0 || elements.end == 0){
		return "";
	} else {
		var start = get_date_from_timestamp(elements.start);
		var end = get_date_from_timestamp(elements.end);
		var today = get_current_date();
		
		if (start.year != end.year) {
	        startDate = start.day + " " + start.month + " " + start.year;
	        endDate = end.day + " " + end.month + " " + end.year;
	    }
	    else {
	        startDate = start.day + " " + start.month;
	        endDate = end.day + " " + end.month;
	    }
	
	    var startTime = start.hour + "h" + start.min;
	    var endTime = end.hour + "h" + end.min;
	    
	    var content = "";
	    
	    if (is_same_date(start,end)){
			if(start.day == today.day && start.month==today.month)
				content = "<i>Aujourd'hui</i> de <i>"+startTime+" </i> &agrave; <i>"+endTime+"</i>";
			else
		    	content = "<i>"+startDate+"</i> de <i>"+startTime+" </i> &agrave; <i>"+endTime+"</i>";
	    }
	    else {
	    	if(startTime == endTime && startTime=="00h00"){
				if(start.day == today.day && start.month==today.month)
					content = "Aujourd'hui";
				else	
		    		content = "Le <i>"+startDate+"</i>";
	    	}
	    	else{
				if(start.day == today.day && start.month==today.month)
					content = "<i>Aujourd'hui</i> <i>"+startTime+"</i> au <i>"+endDate+"</i> <i>"+endTime+"</i>";
				else if(end.day == today.day && end.month==today.month)
					content = "Du <i>"+startDate+"</i> <i>"+startTime+"</i> a <i>aujourd'hui</i> <i>"+endTime+"</i>";		
				else			
		        	content = "Du <i>"+startDate+"</i> <i>"+startTime+"</i> au <i>"+endDate+"</i> <i>"+endTime+"</i>";      
	    	}              
	    }
	
	    return content;
	}
}

// [Date][heure] -> [Date][heure]
function render_date_edt(elements) {
	if (elements.start == 0 || elements.end == 0){
		return "";
	} else {
		var start = get_date_from_timestamp(elements.start);
		var end = get_date_from_timestamp(elements.end);
		var today = get_current_date();
		
		if(start.month == end.month && start.day == end.day){
			var startTime = start.hour + "h" + start.min;
		    var endTime = end.hour + "h" + end.min;
		    var content = "";
		    content = "<i>"+startTime+" &rarr; "+endTime+"</i>";
		    return content;
		}
		else {
			if(start.hour == 00 && start.min == 00 && end.hour == 00 && end.min == 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";				
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
			    var content = "";
			    content = "<i>"+startDate+" &rarr; "+endDate+"</i>";
			    if(parseInt(elements.end)-parseInt(elements.start) == 86400000)
			    	content = "<i>"+startDate+"</i>";
			    return content;
			}else if(start.hour == 00 && start.min == 00 && end.hour != 00 && end.min != 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";				
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" &rarr; "+endDate+" "+endTime+"</i>";
			    return content;
			}else if(start.hour != 00 && start.min != 00 && end.hour == 00 && end.min == 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" "+startTime+" &rarr; "+endDate+"</i>";
			    return content;
			}else {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" "+startTime+" &rarr; "+endDate+" "+endTime+"</i>";
			    return content;
			}
		}
	}
}

//return (date1.day == date2.day && date1.month == date2.month && date1.year == date2.year);

function render_date_edt_synth(elements) {
	if (elements.start == 0 || elements.end == 0){
		return "";
	} else {
		var start = get_date_from_timestamp(elements.start);
		var end = get_date_from_timestamp(elements.end);
		var today = get_current_date();
		
		if(start.month == end.month && start.day == end.day){
			var startTime = start.hour + "h" + start.min;
		    var endTime = end.hour + "h" + end.min;
		    var content = "";
		    content = "<i>"+startTime+" &darr; "+endTime+"</i>";
		    return content;
		}
		else {
			if(start.hour == 00 && start.min == 00 && end.hour == 00 && end.min == 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";				
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
			    var content = "";
			    content = "<i>"+startDate+" &darr; "+endDate+"</i>";
			    if(parseInt(elements.end)-parseInt(elements.start) == 86400000)
			    	content = "<i>"+startDate+"</i>";
			    return content;
			}else if(start.hour == 00 && start.min == 00 && end.hour != 00 && end.min != 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";					
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" &rarr; "+endDate+" "+endTime+"</i>";
			    return content;
			}else if(start.hour != 00 && start.min != 00 && end.hour == 00 && end.min == 00) {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";					
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" "+startTime+" &rarr; "+endDate+"</i>";
			    return content;
			}else {
				var startDate = start.day + " " + start.month;
				if(start.day == today.day && start.month==today.month)
					startDate = "Aujourd'hui";					
				var endDate = end.day + " " + end.month;
				if(end.day == today.day && end.month==today.month)
					endDate = "Aujourd'hui";				
				var startTime = start.hour + "h" + start.min;
			    var endTime = end.hour + "h" + end.min;
			    var content = "";
			    content = "<i>"+startDate+" "+startTime+" &rarr; "+endDate+" "+endTime+"</i>";
			    return content;
			}
		}
	}
}

// [jour] : [heure debut] - [heure fin] 
function render_date_announce(elements) {
	if (elements.debut == 0 || elements.fin == 0){
		return "";
	} else {
		var start = get_date_from_date(elements.debut);
		var end = get_date_from_date(elements.fin);
		var today = get_current_date();
		
        var startDate = start.day + " " + start.month;
        var endDate = end.day + " " + end.month;
	
	    var startTime = start.hour + "h" + start.min;
	    var endTime = end.hour + "h" + end.min;
	    
	    //var month = parseInt(daytab[1],10) - 1;
	    //var monthString = get_a_month(month);
	    var dayString = parseInt(start.day,10);
	    
	    var content = "";
	    
	    if(start.day == today.day && start.month==today.month)
	    	content = "Aujourd'hui : "+startTime+" - "+endTime;
	    else{
	    	var currentDate = new Date(start.year, start.month, start.day);
    		var currentDay = get_a_day(currentDate.getDay());
	    	content = currentDay+" "+dayString+" : "+startTime+" - "+endTime;
	    }
	
	    return content;
	}
}

// [heure debut] - [heure fin] 
function render_hour_announce(elements) {
	if (elements.debut == 0 || elements.fin == 0){
		return "";
	} else {
		var start = get_date_from_date(elements.debut);
		var end = get_date_from_date(elements.fin);

	    var startTime = start.hour + "h" + start.min;
	    var endTime = end.hour + "h" + end.min;

	    var content = startTime+" - "+endTime;

	    return content;
	}
}

// [heure debut] 
function render_hour_atelier(elements) {
	if (elements == 0){
		return "";
	} else {
		var start = get_date_from_timestamp(elements);
	    var startTime = start.hour + "h" + start.min;

	    return startTime;
	}
}

// [aujourd'hui] || [demain] || [jour day] 
function render_day_atelier(elements) {
	if (elements == 0){
		return "";
	} else {
		var start = get_date_from_timestamp(elements);
		var startInt = get_date_from_timestamp_int(elements);
		
	    var today = new Date();

		var year = today.getFullYear();

		var month = get_a_month(today.getMonth());

		var day = add_zero_if_need(today.getDate());
	
	    var monthString = parseInt(start.month,10)-1;

		if(start.day == day && start.month==month)
	    	return "aujourd'hui";
	    else{
  			//var start = get_date_from_date(elements);
		    var currentTimestamp = new Date(year, today.getMonth(), day);
		    var tomorrow = new Date(year, today.getMonth(), day+1);
		    
		    //if(elements - currentTimestamp.getTime() < 2764800001) return "demain";
		    if(add_zero_if_need(tomorrow.getDate())==start.day && get_a_month(tomorrow.getMonth())==start.month) return "demain";
		    else {
		    	var currentDate = new Date(startInt.year, startInt.month, startInt.day);
    			var currentDay = get_a_day(currentDate.getDay());
	    		return currentDay+" "+start.day;
		    }
	    }
	    	
	    return "";
	}
}
