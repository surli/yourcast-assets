
loadScript(RENDERER_PATH + "/utils/meteo.js");

/*
 * work on weather source
 * display the current weather on the header (top)
 * The content is modified
 *
 * CSS classes : 
 * - #Weather_current_header
 */
function glc_render_Weather_current_for_header(collection, zone, ville, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 1800;

    var time = timeInfo;

    var currentDate = new Date();
    var tableau = collection.weather.curren_weather;

    for (var indice = 0; indice < tableau.length; indice++) {
        elements = tableau[indice];
        currentCode = dicoMeteo[elements.weather_code];
        temp = elements.temp;
        temp_unit = elements.temp_unit;

        if (temp == 0) {
            temp = "n/a";
        }
        ;
        if (temp_unit == "c") {
            temp_unit = "°C";
        }
        ;

        content = "<div id='Weather_current_header'>";

        if (currentDate.getHours() <= 18) {
            content += "<span class='fs0 climacon " + currentCode.day_icon + "' aria-hidden='true'></span>";
        } else {
            content += "<span class='fs0 climacon " + currentCode.night_icon + "' aria-hidden='true'></span>";
        }

        content += "<small>" + temp + temp_unit + "</small>";

        content += "</div>";

        var dico = {"content": content, "logo": "", "title": "", "time": time, "weather": content};
        zone.pushInfo(dico);
    }
}
