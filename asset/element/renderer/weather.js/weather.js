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

loadScript(RENDERER_PATH+"/utils/meteo.js");

// launch the forecast and current weather with the renderer "same title"
function render_Weather_both_same_title_Rennes(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	_render_Weather_current_for_main_same_title(collection, zone, "Rennes", timeInfo);
	_render_Weather_forecast_for_main_same_title(collection, zone, "Rennes", timeInfo);
}

//launch the forecast and current weather with the renderer "different title"
function render_Weather_both_different_title_Rennes(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	_render_Weather_current_for_main_different_title(collection, zone, "Rennes", timeInfo);
	_render_Weather_forecast_for_main_different_title(collection, zone, "Rennes", timeInfo);
}

/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * the logo and the content are modified, the title is always the same (Meteo)
 */
function _render_Weather_current_for_main_same_title(collection, zone, ville, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/weather.png"/>';
	zone.loadImage("img/logos/weather.png");
	
	var title = "Météo";
	var time = timeInfo;
	
	var currentDate = new Date();
	var tableau = collection.weather.curren_weather;

	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentCode = dicoMeteo[elements.weather_code];
		
		zone.loadImage(currentCode.day_icon);
		zone.loadImage(currentCode.night_icon);
		
		temp = elements.temp;
		temp_unit = elements.temp_unit;

		speed = elements.wind[0].speed;
		speed_unit = elements.wind[0].wind_unit;

		humidity = elements.humidity;

		if (temp == 0) {temp = "n/a";};
		if (temp_unit == "c") {temp_unit = "C";};
		if (speed == 0) {speed = "n/a"; speed_unit = "";};
		if (speed_unit == "kph") {speed_unit = "km/h";};
		if (humidity == 0) {humidity = "n/a";}
		else {humidity = humidity+" %";}

		content = "<div id='Weather_current' class='main_div_zone1'>";
				content += "<div class='currentWeather_city'><b> "+ville+" </b></div>";
				if (currentDate.getHours() <= 17) {
					content += "<div class='currentWeather'><img src='"+currentCode.day_icon+"'/><p>"+temp+"°"+temp_unit+"</p></div>";
				}else{
					content += "<div class='currentWeather'><img src='"+currentCode.night_icon+"'/><p> "+temp+"°"+temp_unit+"</p></div>";
				}
		content += "<div class='currentWeather_wind_rain'>";
			content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speed+" "+speed_unit+"</div>";
			content += "<div class='currentWeather_rain'><img src='img/pluie.png'/>  "+humidity+"</div>";
		content += "</div>";
		content += "</div>";
		
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
	}
}

function render_Weather_current_for_main_same_title_Rennes(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return _render_Weather_current_for_main_same_title(collection, zone, "Rennes", timeInfo);
}

/*
 * work on weather source
 * display the forecast weather on the zone1 (main)
 * the logo and the content are modified, the title is always the same (Météo)
 * function uses :
 * 		- dayOfWeek(date) -> renderers/utils/meteo.js
 */
function _render_Weather_forecast_for_main_same_title(collection, zone, ville, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/weather.png"/>';
	zone.loadImage("img/logos/weather.png");
	
	var title = "Météo";
	var time = timeInfo;
	var tableau = collection.weather.forecast;
	var currentDay;
	var currentCodeDay;
	var currentCodeNight;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentDay = dayOfWeek(elements.date);
		currentCodeDay = dicoMeteo[elements.day[0].weather_code];
		currentCodeNight = dicoMeteo[elements.night[0].weather_code];
		
		zone.loadImage(currentCodeDay.day_icon);
		zone.loadImage(currentCodeNight.night_icon);

		tempDay = elements.day_max_temp;
		tempNight = elements.night_min_temp;
		temp_unit = elements.temp_unit;

		speedDay = elements.day[0].wind[0].speed;
		speed_unitDay = elements.day[0].wind[0].wind_unit;

		speedNight = elements.night[0].wind[0].speed;
		speed_unitNight = elements.night[0].wind[0].wind_unit;

		humidityDay = elements.day[0].humidity;
		humidityNight = elements.night[0].humidity;

		if (tempDay == 0) {tempDay = "n/a";};
		if (tempNight == 0) {tempNight = "n/a";};
		if (temp_unit == "c") {temp_unit = "C";};

		if (speedDay == 0) {speedDay = "n/a"; speed_unitDay = "";};
		if (speed_unitDay == "kph") {speed_unitDay = "km/h";};

		if (speedNight == 0) {speedNight = "n/a"; speed_unitNight = "";};
		if (speed_unitNight == "kph") {speed_unitNight = "km/h";};

		content = "<div id='Weather_forecast' class='main_div_zone1'>";

			content += "<div class='currentWeather_city'>"+ville+" : <b> "+currentDay+" </b></div>";

			content += "<div class='forecast'>";
				content += "<div class='day'>";
					content += "<span class='currentWeather_day_forecast'>Jour</span>";
					content += "<div class='currentWeather_forecast'><img src='"+currentCodeDay.day_icon+"'/><p>"+tempDay+"°"+temp_unit+"</p></div>";
					content += "<div class='currentWeather_wind_rain_forecast'>";
						content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speedDay+" "+speed_unitDay+"</div>";
					content += "</div>";
				content += "</div>";

				content += "<div class='night'>";
					content += "<span class='currentWeather_day_forecast'>nuit</span>";
					content += "<div class='currentWeather_forecast'><img src='"+currentCodeNight.night_icon+"'/><p>"+tempNight+"°"+temp_unit+"</p></div>";
					content += "<div class='currentWeather_wind_rain_forecast'>";
						content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speedNight+" "+speed_unitNight+"</div>";
					content += "</div>";
				content += "</div>";
			content += "</div>";

		content += "</div>";

		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
		
	}
}

function render_Weather_forecast_for_main_same_title_Rennes(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return _render_Weather_forecast_for_main_same_title(collection, zone, "Rennes", timeInfo);
}

/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * the logo, the content and the title are modified
 */

function _render_Weather_current_for_main_different_title(collection, zone, ville, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/weather.png"/>';
	zone.loadImage("img/logos/weather.png");
	var title = "";
	var time = timeInfo;
	var currentDate = new Date();
	var tableau = collection.weather.curren_weather;

	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentCode = dicoMeteo[elements.weather_code];
		
		if(currentCode != null){
			
			zone.loadImage(currentCode.day_icon);
			zone.loadImage(currentCode.night_icon);
			
			title = "Météo "+ville+"";
	
			temp = elements.temp;
			temp_unit = elements.temp_unit;
	
			speed = elements.wind[0].speed;
			speed_unit = elements.wind[0].wind_unit;
	
			humidity = elements.humidity;
	
			if (temp == 0) {temp = "n/a";};
			if (temp_unit == "c") {temp_unit = "C";};
			if (speed == 0) {speed = "n/a"; speed_unit = "";};
			if (speed_unit == "kph") {speed_unit = "km/h";};
			if (humidity == 0) {humidity = "n/a";}
			else {humidity = humidity+" %";}
	
			content = "<div id='Weather_current' class='main_div_zone1'>";
					if (currentDate.getHours() <= 17) {
						content += "<div class='currentWeather'><img src='"+currentCode.day_icon+"'/><p>"+temp+"°"+temp_unit+"</p></div>";
					}else{
						content += "<div class='currentWeather'><img src='"+currentCode.night_icon+"'/><p> "+temp+"°"+temp_unit+"</p></div>";
					}
			content += "<div class='currentWeather_wind_rain'>";
				content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speed+" "+speed_unit+"</div>";
				content += "<div class='currentWeather_rain'><img src='img/pluie.png'/>  "+humidity+"</div>";
			content += "</div>";
			content += "</div>";
			
			var dico = {"content": content, "logo": logo, "title": title, "time" : time};
			zone.pushInfo(dico);
		}
	}
}

function render_Weather_current_for_main_different_title_Rennes(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return _render_Weather_current_for_main_different_title(collection, zone, "Rennes", timeInfo);
}

/*
 * work on weather source
 * display the forecast weather on the zone1 (main)
 * the logo, the content and the title are modified 
 * function uses :
 * 		- dayOfWeek(date) -> renderers/utils/meteo.js
 */
function _render_Weather_forecast_for_main_different_title(collection, zone, ville, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '<img src="img/logos/weather.png"/>';
	zone.loadImage("img/logos/weather.png");
	var title = "";
	var tableau = collection.weather.forecast;
	var time = timeInfo;
	var currentDay;
	var currentCodeDay;
	var currentCodeNight;
	
	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentDay = dayOfWeek(elements.date);
		currentCodeDay = dicoMeteo[elements.day[0].weather_code];
		currentCodeNight = dicoMeteo[elements.night[0].weather_code];

		zone.loadImage(currentCodeDay.day_icon);
		zone.loadImage(currentCodeNight.night_icon);
		
		title = "Météo "+ville+" "+currentDay;

		tempDay = elements.day_max_temp;
		tempNight = elements.night_min_temp;
		temp_unit = elements.temp_unit;

		speedDay = elements.day[0].wind[0].speed;
		speed_unitDay = elements.day[0].wind[0].wind_unit;

		speedNight = elements.night[0].wind[0].speed;
		speed_unitNight = elements.night[0].wind[0].wind_unit;

		humidityDay = elements.day[0].humidity;
		humidityNight = elements.night[0].humidity;

		if (tempDay == 0) {tempDay = "n/a";};
		if (tempNight == 0) {tempNight = "n/a";};
		if (temp_unit == "c") {temp_unit = "C";};

		if (speedDay == 0) {speedDay = "n/a"; speed_unitDay = "";};
		if (speed_unitDay == "kph") {speed_unitDay = "km/h";};

		if (speedNight == 0) {speedNight = "n/a"; speed_unitNight = "";};
		if (speed_unitNight == "kph") {speed_unitNight = "km/h";};

		content = "<div id='Weather_forecast' class='main_div_zone1'>";
			content += "<div class='forecast'>";
				content += "<div class='day'>";
					content += "<span class='currentWeather_day_forecast'>Jour</span>";
					content += "<div class='currentWeather_forecast'><img src='"+currentCodeDay.day_icon+"'/><p>"+tempDay+"°"+temp_unit+"</p></div>";
					content += "<div class='currentWeather_wind_rain_forecast'>";
						content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speedDay+" "+speed_unitDay+"</div>";
					content += "</div>";
				content += "</div>";

				content += "<div class='night'>";
					content += "<span class='currentWeather_day_forecast'>Nuit</span>";
					content += "<div class='currentWeather_forecast'><img src='"+currentCodeNight.night_icon+"'/><p>"+tempNight+"°"+temp_unit+"</p></div>";
					content += "<div class='currentWeather_wind_rain_forecast'>";
						content += "<div class='currentWeather_wind'><img src='img/vent.png'/>  "+speedNight+" "+speed_unitNight+"</div>";
					content += "</div>";
				content += "</div>";
			content += "</div>";

		content += "</div>";

		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
		
	}
}

function render_Weather_forecast_for_main_different_title_Rennes(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return _render_Weather_forecast_for_main_different_title(collection, zone, "Rennes", timeInfo);
}

function render_Weather_forecast_for_main_different_title_Nice(collection, zone, timeInfo){
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	return _render_Weather_forecast_for_main_different_title(collection, zone, "Nice", timeInfo);
}

