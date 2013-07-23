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

loadScript(JS_ROOT+"/utils/meteo.js");

// Chargement du style
loadLess(LESS_ROOT + '/ca_render_weather.less');

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

		//humidityDay = elements.day[0].humidity;
		//humidityNight = elements.night[0].humidity;

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

function render_weather_irsam(collection, zone, timeInfo){
	render_Weather_current_for_main_simple(collection, zone, timeInfo);
	render_Weather_forcast_for_main_simple_irsam(collection, zone, timeInfo);
}

/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * that display only the current weather's logo and the temperature
 */
function render_Weather_forcast_for_main_simple_irsam(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var time = timeInfo;
	var logo ="";
	var title = "Demain";
	
	var tableau = collection.weather.forecast;
	//var forecastCodeDay2;
	//	forecastCodeDay2 = dicoMeteo[tableau[1].day[0].weather_code];
	

	for (var indice = 1; indice < tableau.length; indice++) {
	
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
}
/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * that display only the current weather's logo and the temperature
 */
function render_Weather_forecast_irsam(collection, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	var logo = '';
	var title = "";
	var tableau = collection.weather.forecast;
	var time = timeInfo;

	var forecastCodeDay1;
	var forecastCodeDay2;

		//currentDay = dayOfWeek(elements.date);
		forecastCodeDay1 = dicoMeteo[tableau[0].day[0].weather_code];
		forecastCodeDay2 = dicoMeteo[tableau[1].day[0].weather_code];
		zone.loadImage(forecastCodeDay1.day_icon);
		zone.loadImage(forecastCodeDay2.day_icon);

		content = "<div class='main_div_zone1'>";
			content += "<div class='forecast'>";
				content += "<div class='dayforecast1'>";
				    var day = firstLettertoUpperCase(get_a_day(new Date(tableau[0].date).getDay()));
					content += "<span>&nbsp;&nbsp;&nbsp;"+day+"</span>";
					content += "<br/> <div><img src='"+forecastCodeDay1.day_icon+"'/></div>";
				content += "</div>";

				content += "<div class='dayforecast2'>";
			        day = firstLettertoUpperCase(get_a_day(new Date(tableau[1].date).getDay()));
					content += "<span>&nbsp;&nbsp;&nbsp;"+day+"</span>";
					content += "<br/> <div><img src='"+forecastCodeDay2.day_icon+"'/></div>";
				content += "</div>";
			content += "</div>";
		content += "</div>";
		var dico = {"content": content, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
		
}

// ==========================================================================
//
//
//	Render météo pour la maquette Clément Ader
//
// ==========================================================================

/*
 * Render de la météo pour la maquette de Clément Ader
 *
 * Display weather and temperature of today and tomorrow in the mainzone
 */
function ca_render_weather(collection, zone, timeInfo) {

	// Test si la collection est null ou indéfini
    if(typeof collection === 'undefined' ||collection === null || collection.length === 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' ||�zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/weather.png"/>';
    zone.loadImage(IMG_PATH+"/logos/weather.png");

    // On appelle la méthode lié à la météo d'aujourd'hui
    ca_render_weather_today(collection, zone, logo, timeInfo);

    // On appelle la méthode lié à la météo de demain
    ca_render_weather_tomorrow(collection, zone, logo, timeInfo);
	
}

/**
 *	Méthode pour afficher la date d'aujourd'hui
 */
function ca_render_weather_today(collection, zone, logo, timeInfo) {

	// Stockage du titre de la zone
	var title = "Aujourd'hui";
	
	// Récupère la date d'aujourd'hui
	var currentDate = new Date();

	// Récupération du tableau
	var tableau = collection.weather.current_weather;

	// Boucle sur 
	for (var indice = 0; indice < tableau.length; indice++) {

		// Récupération de l'élément
		elements = tableau[indice];

		// Récupération du code de la météo
		currentCode = dicoMeteo[elements.weather_code];

		// Récupération de la température
		temp = elements.temp;

		// Récupération de l'unité (température)
		temp_unit = elements.temp_unit;

		// Initialisation du content
		content = "<div class='currentWeather'>";
	
		// Si on est le jour (8h - 18h)		
		if (currentDate.getHours() >= 8 && currentDate.getHours() <= 18) {

			// On ajoute l'image du jour
			content += "<img src='" + currentCode.day_icon + "'/><p>" + temp + "°" + temp_unit.toUpperCase() + "</p>";

		} 

		// Sinon
		else {

			// On ajoute l'image de la nuit
			content += "<img src='" + currentCode.night_icon + "'/><p> " + temp + "°" + temp_unit.toUpperCase() + "</p>";

		}

		// On ferme la balise
		content += "</div>";
		
		// Déclaration du dictionnaire
		var dico = {"content": content, "title": title, "logo" : logo, "time" : timeInfo, "alternance": true};

	    // On ajoute cette nouvelle info dans la zone
	    zone.pushInfo(dico);

	}

    // Retourne le dictionnaire
    return dico;

}

/**
 *	Méthode pour afficher la m�t�o du lendemain
 */
function ca_render_weather_tomorrow(collection, zone, logo, timeInfo) {

	// Stockage du titre de la zone
	var title = "Demain";
	
	// Récupération du temps de demain
	var tableau = collection.weather.forecast;
	
	// Récupère la date d'aujourd'hui
	var currentDate = new Date();

	// Boucle sur les informations obtenues
	for (var indice = 1; indice < tableau.length; indice++) {
	
		// Récupération des données
		elements = tableau[indice].day[0];
		tempMin = tableau[indice].night_min_temp;
		tempMax = tableau[indice].day_max_temp;
		temp_unit = tableau[indice].temp_unit;
		currentCode = dicoMeteo[elements.weather_code];
		zone.loadImage(currentCode.day_icon);
		zone.loadImage(currentCode.night_icon);
		
		// Initialisation du content
		content = "<div class='currentWeather'>";
	
		// Si on est le jour (8h - 18h)		
		if (currentDate.getHours() >= 8 && currentDate.getHours() <= 18) {

			// On ajoute l'image du jour
			content += "<img src='" + currentCode.day_icon + "'/><p>" + tempMax + "°" + temp_unit.toUpperCase() + "</p>";

		} 

		// Sinon
		else {

			// On ajoute l'image de la nuit
			content += "<img src='" + currentCode.night_icon + "'/><p> " + tempMax + "°" + temp_unit.toUpperCase() + "</p>";

		}
		
		// On ferme la balise
		content += "</div>";
		
		// Déclaration du dictionnaire
		var dico = {"content": content, "title": title, "logo" : logo, "time" : timeInfo, "alternance": true};

	    // On ajoute cette nouvelle info dans la zone
	    zone.pushInfo(dico);

	}

    // Retourne le dictionnaire
    return dico;
	
}

