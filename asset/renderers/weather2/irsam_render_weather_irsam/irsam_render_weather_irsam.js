/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*    Emilie Nguyen Van (emilie.nguyenvan@gmail.com) - Projet YourCastStore - IUT Informatique

*/

loadScript(RENDERER_PATH+"/utils/meteo.js");

loadLess(LESS_ROOT+"/irsam_render_weather_irsam.less");



function irsam_render_weather_irsam(collection, zone, timeInfo){
    render_Weather_current_for_main_simple(collection, zone, timeInfo);
    render_Weather_forcast_for_main_simple_irsam(collection, zone, timeInfo);
}


/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * that display only the current weather's logo and the temperature
 */
function render_Weather_current_for_main_simple(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var time = timeInfo;
	var logo ="";
	var title = "Aujourd'hui";
	
	var currentDate = new Date();
	var tableau = collection.weather.curren_weather;

	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentCode = dicoMeteo[elements.weather_code];
		
		zone.loadImage(currentCode.day_icon);
		zone.loadImage(currentCode.night_icon);
		
		temp = elements.temp;
		temp_unit = elements.temp_unit;

		if (temp == 0) {temp = "n/a";};
		if (temp_unit == "c") {temp_unit = "C";};

		content = "<div class='main_div_zone1'>";
				if (currentDate.getHours() <= 17) {
					content += "</br> <div class='currentWeather'><img src='"+currentCode.day_icon+"'/><p>"+temp+"°"+temp_unit+"</p></div>";
				}else{
					content += "<br/> <div class='currentWeather'><img src='"+currentCode.night_icon+"'/><p> "+temp+"°"+temp_unit+"</p></div>";
				}
		content += "</div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}




/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * that display only the current weather's logo and the temperature
 */
function render_Weather_forcast_for_main_simple_irsam(collection, zone, timeInfo) {
    console.log("appel forcast");
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var time = timeInfo;
	var logo ="";
	var title = "Demain";


	var tableau = collection.weather.forecast;
	//var forecastCodeDay2;
	//	forecastCodeDay2 = dicoMeteo[tableau[1].day[0].weather_code];


	for (var indice = 1; indice < tableau.length; indice++) {
        console.log("dans forcast");
		elements = tableau[indice].day[0];
		tempMin = tableau[indice].night_min_temp;
		tempMax = tableau[indice].day_max_temp;
		temp_unit = tableau[indice].temp_unit;
		currentCode = dicoMeteo[elements.weather_code];
		zone.loadImage(currentCode.day_icon);
	//	zone.loadImage(currentCode.night_icon);

		title += ", "+ firstLettertoUpperCase(get_a_day(new Date(tableau[indice].date).getDay()));


		//if (temp == 0) {temp = "n/a";};
		if (temp_unit == "c") {temp_unit = "C";};

		content = "<div class='main_div_zone1'>";
		//		if (currentDate.getHours() <= 17) {
					content += "<br/><div class='currentWeather'><img src='"+currentCode.day_icon+"'/><p>" + tempMax+"°"+temp_unit+"</p></div>";
		//		}else{
		//			content += "<div class='currentWeather'><img src='"+currentCode.night_icon+"'/><p> "+temp+"°"+temp_unit+"</p></div>";
		//		}
		content += "</div>";

		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
    console.log("fin appel forcast");
}