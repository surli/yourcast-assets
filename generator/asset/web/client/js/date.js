/**
 * This file was part of jSeduite::util
 *
 * Copyright (C) 2008-  Sebastien Mosser
 *
 * jSeduite::util is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * jSeduite::util is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with jSeduite::util; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @author      Main     Celine Auzias          [celine.auzias@gmail.com]
 * @contributor 2009     Sebastien Mosser       [mosser@polytech.unice.fr]
 * @contributor 2010     Christophe Desclaux    [desclaux@polytech.unice.fr]
 * @contributor 2012     Damien Mostacchi		[damien.mostacchi@gmail.com]
 * @contributor 2013     Clément DUFFAU         [duffau@polytech.unice.fr]
 **/

var SPEED_DATE = 1000*60;
var timer_date;

function init_date(){
    day_date();
    timer_date = setInterval("day_date()",SPEED_DATE);
}

function clearTimer(){
    clearInterval(timer_date);
}

function day_date(){
    var date;
    var hour;
    if(document.getElementsByClassName("date_with_months").length>0 && typeof document.getElementsByClassName("date_with_months")!="undefined"){
        hour = get_time();
        date =get_current_date();
        var day=date.day;
        var month=date.month;
        var year=date.year;
        var dateString=get_day()+" "+day+" "+month;
        document.getElementById("date_time").innerHTML = "<big>"+hour +"</big><br/>"+dateString;
    }
    else{
        hour = get_time();
        //document.getElementById("date_time").innerHTML = date;
        document.getElementById("date_time").innerHTML = "<big>" + hour + "</big>";
    }
}

function get_time(){
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    if(h<10) h = '0'+h;
    if(m<10) m = '0'+m;
    return h+'h'+m+'';
}

function get_year(){
    return (new Date()).getFullYear();
}

function get_month(){
    var month =  (new Date()).getMonth();
    return get_a_month(month);
}

function get_a_month(month){
    switch (month){
        case 0: return "janvier";   
        case 1: return "février";   
        case 2: return "mars";      
        case 3: return "avril";     
        case 4: return "mai";       
        case 5: return "juin";      
        case 6: return "juillet";   
        case 7: return "août";
        case 8: return "septembre"; 
        case 9:return "octobre";    
        case 10:return "novembre";  
        case 11:return "décembre";  
    }
}

function get_day(){
    var d = (new Date()).getDay();
    return get_a_day(d);
}

function get_a_day(d){
    switch (d){
    case 0: return "dimanche";	
    case 1: return "lundi";		
    case 2: return "mardi";		
    case 3: return "mercredi";	
    case 4: return "jeudi";		
    case 5: return "vendredi";	
    case 6: return "samedi";		
    }
}

function get_UTCDate(){
    return (new Date()).getUTCDate();
}


function buildDateFromStamp(stamp) {
    var year    = stamp.substring(0,4);
    var month   = (stamp.substring(5,7) - 1);
    var day     = stamp.substring(8,10);
    var hours   = stamp.substring(11,13);
    var minutes = stamp.substring(14,16);
    var secondes= stamp.substring(17,19);
    return new Date(year,month,day,hours,minutes,secondes);
}

function dateToString(aDate) {
    var h = "" + aDate.getHours();
    var m = "" + aDate.getMinutes();
    h = (h.length < 2? "0"+h: h);
    m = (m.length < 2? "0"+m: m);
    return h + "h" + m;
}

function add_zero_if_need(number) {
	if (number < 10)
		return "0"+number;
	else
		return number;
}

function get_date_from_timestamp(timestamp) {
	var date = new Date(timestamp);
	var year = date.getFullYear();
	var month = get_a_month(date.getMonth());
	var day = add_zero_if_need(date.getDate());
	var hour = add_zero_if_need(date.getHours());
	var min = add_zero_if_need(date.getMinutes());
	
	return {'year':year,'month':month,'day':day,'hour':hour,'min':min};
}

function get_date_from_timestamp_int(timestamp) {
	var date = new Date(timestamp);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	
	return {'year':year,'month':month,'day':day,'hour':hour,'min':min};
}

function get_current_date() {
	//var date = new Date(2012, 05, 20, 08, 45);
	var date = new Date();
	var year = date.getFullYear();
	var month = get_a_month(date.getMonth());
	var day = add_zero_if_need(date.getDate());
	var hour = add_zero_if_need(date.getHours());
	var min = add_zero_if_need(date.getMinutes());
	
	return {'year':year,'month':month,'day':day,'hour':hour,'min':min};
}

function get_current_date_int() {
	//var date = new Date(2012, 05, 29, 16, 22);
	var date = new Date();
	var year = date.getFullYear();
	var month = add_zero_if_need(date.getMonth()+1);
	var day = add_zero_if_need(date.getDate());
	var hour = add_zero_if_need(date.getHours());
	var min = add_zero_if_need(date.getMinutes());
	
	return {'year':year,'month':month,'day':day,'hour':hour,'min':min};
}

function is_same_date(date1, date2) {
	return (date1.day == date2.day && date1.month == date2.month && date1.year == date2.year);
}

function display_date_and_hour(date) {
	return date.day+" "+date.month+" &agrave; "+date.hour+"h "+date.min;
}



















