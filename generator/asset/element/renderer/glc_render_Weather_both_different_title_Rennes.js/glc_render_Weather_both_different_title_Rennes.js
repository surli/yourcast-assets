
loadScript(RENDERER_PATH + "/utils/meteo.js");

function getLocation(collection, zone) {
    return "Sophia";
}

/*
 * work on weather source
 * display the current weather on the zone1 (main)
 * the logo, the content and the title are modified
 *
 * CSS classes : 
 * - main_div_zone1
 * - currentWeather  
 * - currentWeather_info  
 * - currentWeather_wind
 * - currentWeather_rain 
 */
function glc_render_Weather_current_for_main_different_title(collection, zone, ville, timeInfo) {
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

        if (currentCode != null) {

            //zone.loadImage(currentCode.day_icon);
            //zone.loadImage(currentCode.night_icon);

            title = "Météo (" + ville + ")";

            temp = elements.temp;
            temp_unit = elements.temp_unit;

            speed = elements.wind[0].speed;
            speed_unit = elements.wind[0].wind_unit;

            humidity = elements.humidity;

            if (temp == 0) {
                temp = "n/a";
            }
            ;
            if (temp_unit == "c") {
                temp_unit = "°C";
            }
            ;
            if (speed == 0) {
                speed = "n/a";
                speed_unit = "";
            }
            ;
            if (speed_unit == "kph") {
                speed_unit = "km/h";
            }
            ;
            if (humidity == 0) {
                humidity = "n/a";
            }
            else {
                humidity = humidity + "%";
            }

            content = "<div id='Weather_current' class='main_div_zone1'>";
            content += "<br/>";
            if (currentDate.getHours() <= 18) {
                content += "<div class='currentWeather'><span class='fs3 climacon " + currentCode.day_icon + "' aria-hidden='true'></span>";
            } else {
                content += "<div class='currentWeather'><span class='fs3 climacon " + currentCode.night_icon + "' aria-hidden='true'></span>";
            }
            content += "<br/>" + currentCode.text;
            content += "</div>";
            content += "<div class='currentWeather_info'><big>" + temp + temp_unit + "</big><br/>";
            content += "<span class='currentWeather_wind'><span class='fs1 climacon wind' aria-hidden='true'></span>" + speed + " " + speed_unit + "</span><br/>";
            content += "<span class='currentWeather_rain'><span class='fs1 climacon compass north' aria-hidden='true'></span> " + humidity + "</span>";
            content += "</div>";
            content += "</div>";


            var dico = {"content": content, "logo": logo, "title": title, "time": time};
            zone.pushInfo(dico);
        }
    }
}

/*
 * work on weather source
 * display the forecast weather on the zone1 (main)
 * the logo, the content and the title are modified 
 * function uses :
 * 		- dayOfWeek(date) -> renderers/utils/meteo.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - currentWeather  
 * - currentWeather_info  
 * - currentWeather_wind
 * - currentWeather_rain 
 * - weatherForecast
 * - forecast
 * - day
 * - night
 * - currentWeather_day_forecast
 * - currentWeather_forecast  
 */
function glc_render_Weather_forecast_for_main_different_title(collection, zone, ville, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    var logo = '<img src="img/logos/weather.png"/>';
    zone.loadImage("img/logos/weather.png");
    var title = "";
    var time = timeInfo;
    var currentDate = new Date();
    var tableau = collection.weather.forecast;
    var currentTableau = collection.weather.curren_weather;
    var currentDay;
    var currentCodeDay;
    var currentCodeNight;

    for (var indice = 0; indice < currentTableau.length; indice++) {
        elements = currentTableau[indice];
        currentCode = dicoMeteo[elements.weather_code];

        if (currentCode != null) {

            title = "Météo (" + ville + ")";

            temp = elements.temp;
            temp_unit = elements.temp_unit;

            speed = elements.wind[0].speed;
            speed_unit = elements.wind[0].wind_unit;

            humidity = elements.humidity;

            if (temp == 0) {
                temp = "n/a";
            }
            ;
            if (temp_unit == "c") {
                temp_unit = "°C";
            }
            ;
            if (speed == 0) {
                speed = "n/a";
                speed_unit = "";
            }
            ;
            if (speed_unit == "kph") {
                speed_unit = "km/h";
            }
            ;
            if (humidity == 0) {
                humidity = "n/a";
            }
            else {
                humidity = humidity + "%";
            }

            content = "<div id='Weather_current' class='main_div_zone1'>";
            if (currentDate.getHours() <= 18) {
                content += "<div class='currentWeather'><span class='fs2 climacon " + currentCode.day_icon + "' aria-hidden='true'></span>";
            } else {
                content += "<div class='currentWeather'><span class='fs2 climacon " + currentCode.night_icon + "' aria-hidden='true'></span>";
            }
            content += "</div>";
            content += "<div class='currentWeather_info'><big>" + temp + temp_unit + "</big><br/>";
            content += currentCode.text + "<br/>";
            content += "<span class='currentWeather_wind'><span class='fs1 climacon wind' aria-hidden='true'></span>" + speed + " " + speed_unit + "</span>";
            content += "<span class='currentWeather_rain'><span class='fs1 climacon compass north' aria-hidden='true'></span> " + humidity + "</span><br/><br/>";
            content += "</div>";

            /* forecast on 2 days (day and night) */
            content += "<div class='weatherForecast'>";
            for (var indice = 0; indice < 2; indice++) {
                elements = tableau[indice];
                currentDay = dayOfWeek(elements.date);
                currentCodeDay = dicoMeteo[elements.day[0].weather_code];
                currentCodeNight = dicoMeteo[elements.night[0].weather_code];

                tempDay = elements.day_max_temp;
                tempNight = elements.night_min_temp;
                temp_unit = elements.temp_unit;

                if (tempDay == 0) {
                    tempDay = "n/a";
                }
                ;
                if (tempNight == 0) {
                    tempNight = "n/a";
                }
                ;
                if (temp_unit == "c") {
                    temp_unit = "°C";
                }
                ;

                content += "<div class='forecast'>";
                content += "<div class='day'>";
                content += "<span class='currentWeather_day_forecast'>" + currentDay + "</span>";
                content += "<div class='currentWeather_forecast'><span class='fs1 climacon " + currentCodeDay.day_icon + "' aria-hidden='true'></span><p>" + tempDay + temp_unit + "</p></div>";
                content += "</div>";

                content += "<div class='night'>";
                content += "<span class='currentWeather_day_forecast'></span>";
                content += "<div class='currentWeather_forecast'><span class='fs1 climacon " + currentCodeNight.night_icon + "' aria-hidden='true'></span><p>" + tempNight + temp_unit + "</p></div>";
                content += "</div>";
                content += "</div>";
            }
            content += "</div>";

            content += "</div>";

            var dico = {"content": content, "logo": logo, "title": title, "time": time};
            zone.pushInfo(dico);
        }
    }

}

//launch the forecast and current weather with the renderer "different title"
function glc_render_Weather_both_different_title_Rennes(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    var location = getLocation(collection, zone);
    glc_render_Weather_current_for_main_different_title(collection, zone, location, timeInfo);
    glc_render_Weather_forecast_for_main_different_title(collection, zone, location, timeInfo);
}
