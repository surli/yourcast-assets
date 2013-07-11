
loadScript(RENDERER_PATH + "/utils/meteo.js");

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

function getLocation(collection, zone) {
    return "Sophia";
}

function render_Weather_current_for_main_different_title_Rennes(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    var location = getLocation(collection, zone);
    return _render_Weather_current_for_main_different_title(collection, zone, location, timeInfo);
}
