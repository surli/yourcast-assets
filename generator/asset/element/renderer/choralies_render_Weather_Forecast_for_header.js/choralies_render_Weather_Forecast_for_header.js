/*
 * work on weather source
 * display the current weather on the header (top)
 * The content is modified
 *
 * CSS classes : 
 * - #Weather_current_header
 * - weatherHeaderDay
 * - weatherHeaderForecast
 * - forecast
 * - currentWeather_day_forecast
 */
 
loadLess(LESS_ROOT+"/choralies_render_Weather_Forecast_for_header.less");
loadScript(RENDERER_PATH+"/utils/meteo.js");
loadScript(RENDERER_PATH+"/utils/calendar.js");
 
function choralies_render_Weather_Forecast_for_header(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 1800;

	var time = timeInfo;
	
	var currentDate = new Date();
	var tableau = collection.weather.curren_weather;
	var forecast = collection.weather.forecast;

	for (var indice = 0; indice < tableau.length; indice++) {
		elements = tableau[indice];
		currentCode = dicoMeteo[elements.weather_code];

		temp = elements.temp;
		temp_unit = elements.temp_unit;

		if (temp == 0) {temp = "n/a";};
		if (temp_unit == "c") {temp_unit = "°C";};
		
		content = "<div id='Weather_current_header'>";

			content += "<div class='weatherHeaderDay'>";
			if (currentDate.getHours() <= 18) {
				content += "<span class='fs0 climacon "+currentCode.day_icon+"' aria-hidden='true'></span>";
			}else{
				content += "<span class='fs0 climacon "+currentCode.night_icon+"' aria-hidden='true'></span>";
			}

		content += "<small>"+temp+temp_unit+"</small>";
		content += "</div>";

		/* forecast on 2 days */
		content +="<div class='weatherHeaderForecast'>";
		for (var indice = 0; indice < 2; indice++) {
			elements = forecast[indice];
			//currentDay = dayOfWeek(elements.date);
			currentDay= indice==0?"Aujourd'hui":"Demain";
			currentCodeDay = dicoMeteo[elements.day[0].weather_code];
	
			tempDay = elements.day_max_temp;
			temp_unit = elements.temp_unit;
	
			if (tempDay == 0) {tempDay = "n/a";};
			if (temp_unit == "c") {temp_unit = "°C";};
	
			content += "<div class='forecast'>";
						content += "<span class='currentWeather_day_forecast'>"+currentDay+"</span>";
						content += "<span class='fs1 climacon "+currentCodeDay.day_icon+"' aria-hidden='true'></span><small>"+tempDay+temp_unit+"</small>";
			content += "</div>";
		}
		content +="</div>";
				
		content += "</div>";
		
		var dico = {"content": content, "logo": "", "title": "", "time" : time, "weather" : content};
		zone.pushInfo(dico);
	}
}