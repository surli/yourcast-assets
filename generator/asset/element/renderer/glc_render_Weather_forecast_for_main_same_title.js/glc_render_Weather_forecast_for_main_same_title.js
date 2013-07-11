
loadScript(RENDERER_PATH + "/utils/meteo.js");

/*
 * work on weather source
 * display the forecast weather on the zone1 (main)
 * the logo and the content are modified, the title is always the same (Météo)
 * function uses :
 * 		- dayOfWeek(date) -> renderers/utils/meteo.js
 *
 * CSS classes : 
 * - main_div_zone1
 * - currentWeather_city
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
function glc_render_Weather_forecast_for_main_same_title(collection, zone, ville, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    var logo = '<img src="img/logos/weather.png"/>';
    zone.loadImage("img/logos/weather.png");
    var title = "Météo";
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
            content += "<div class='currentWeather_city'>" + ville + "</div>";
            if (currentDate.getHours() <= 18) {
                content += "<div class='currentWeather'><span class='fs3 climacon " + currentCode.day_icon + "' aria-hidden='true'></span>";
            } else {
                content += "<div class='currentWeather'><span class='fs3 climacon " + currentCode.night_icon + "' aria-hidden='true'></span>";
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
