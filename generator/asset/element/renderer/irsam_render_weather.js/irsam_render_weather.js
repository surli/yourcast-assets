/**
 *      <b>Renderer de la météo pour l'Irsam</b>
 * 
 *  <b>Informations :</b>
 * 
 *      Ce renderer affiche la météo avec un style pour l'irsam. 
 *      
 *  <b>Fonctions :</b>
 * 
 *      irsam_render_weather
 *      irsam_current_weather
 *      irsam_forcast_weather
 *      
 *  <b>Contributors :</b>
 *  
 *      Simon Urli (simon.urli@gmail.com)
 *    	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement de la librairie
loadScript(RENDERER_PATH + "/utils/meteo.js");

// Chargement du style
loadLess(LESS_ROOT + '/irsam_render_weather.less');

/**
 *  <b>IrsamRenderWeather</b>
 *  
 *  @param {type} collection
 *  @param {type} zone
 *  @param {type} timeInfo
 */
function irsam_render_weather(collection, zone, timeInfo) {

    // On appelle le renderer de la météo d'aujourd'hui
    irsam_current_weather(collection, zone, timeInfo);

    // On appelle le renderer de la météo de demain
    irsam_forcast_weather(collection, zone, timeInfo);

}

/**
 *  <b>IrsamCurrentWeather</b>
 *  
 *  @param {type} collection
 *  @param {type} zone
 *  @param {type} timeInfo
 */
function irsam_current_weather(collection, zone, timeInfo) {
    
    // On récupère le temps d'affichage
    var time = typeof timeInfo !== 'undefined' ? timeInfo : 5;
    
    // On définit le titre
    var title = "Aujourd'hui";
    
    // Logo du renderer
    var logo = '<img src="img/logos/weather.png"/>';
    
    // Chargement de l'image
    zone.loadImage("img/logos/weather.png");
    
    // On récupère la date du jour
    var currentDate = new Date();
    
    // On récupère les informations
    var tableau = collection.weather.curren_weather;

    // On boucle sur les informations
    for (var indice = 0; indice < tableau.length; indice++) {
        
        // On récupère les éléments
        var elements = tableau[indice];
        
        // Le code de la météo
        var currentCode = dicoMeteo_irsam[elements.weather_code];

        // Récupération de la température
        var temp = elements.temp;
        
        // Gestion erreur
        if (temp === 0) {
            temp = "n/a";
        }
        
        // Récupération de les unités
        var temp_unit = elements.temp_unit;

        // Gestion erreur
        if (temp_unit === "c") {
            temp_unit = "C";
        }

        // =================================================
        //  LOGO
        // =================================================

        // Déclaration du logo
        var content = " <div id='logo_meteo'>";
        
        // Logo du jour
        if(currentDate.getHours() <= 19 && currentDate.getHours() >= 7) {

            // Chargement de l'image
            zone.loadImage(currentCode.day_icon);

            // Ajout du logo
            content += "    <img src='" + currentCode.day_icon + "'/>";
            
        }
        
        // Logo de nuit
        else {
            
            // Chargement de l'image
            zone.loadImage(currentCode.night_icon);

            // Ajout du logo
            content += "    <img src='" + currentCode.night_icon + "'/>";
            
        }
        
        // Fin du logo
        content += "    </div>";
        
        // =================================================
        //  INFORMATIONS
        // =================================================
        
        // Déclaration des infos
        content += "    <div id='infos_meteo'>";
        
        // Affichage de la température
        content += "        " + temp + "°" + temp_unit + "</div>";
        
        // Fin des infos
        content += "</div>";
        
        // Déclaration du dictionnaire
        var dico = {"content": content, "logo": logo, "title": title, "time": time};
        
        // Push le dico
        zone.pushInfo(dico);
        
    }
    
}

/**
 *  <b>IrsamForcastWeather</b>
 *  
 *  @param {type} collection
 *  @param {type} zone
 *  @param {type} timeInfo
 */
function irsam_forcast_weather(collection, zone, timeInfo) {
    
    // On récupère le temps d'affichage
    var time = typeof timeInfo !== 'undefined' ? timeInfo : 5;

    // Logo du renderer
    var logo = '<img src="img/logos/weather.png"/>';
    
    // Chargement de l'image
    zone.loadImage("img/logos/weather.png");
    
    // On récupère les informations
    var tableau = collection.weather.forecast;

    // On boucle sur les informations
    for (var indice = 1; indice < tableau.length; indice++) {
        
        // On récupère les éléments
        var elements = tableau[indice].day[0];
        
        // Le code de la météo
        var currentCode = dicoMeteo_irsam[elements.weather_code];

        // Ajout du jour dans le titre
        var title = "Demain, " + firstLettertoUpperCase(get_a_day(new Date(tableau[indice].date).getDay()));

        // Récupération de la température
        var tempMax = tableau[indice].day_max_temp;
        
        // Gestion erreur
        if (tempMax === 0) {
            tempMax = "n/a";
        }
        
        // Récupération de les unités
        var temp_unit = tableau[indice].temp_unit;

        // Gestion erreur
        if (temp_unit === "c") {
            temp_unit = "C";
        }

        // =================================================
        //  LOGO
        // =================================================

        // Déclaration du logo
        var content = " <div id='logo_meteo'>";

        // Chargement de l'image
        zone.loadImage(currentCode.day_icon);

        // Ajout du logo
        content += "        <img src='" + currentCode.day_icon + "'/>";

        // Fin du logo
        content += "    </div>";
        
        // =================================================
        //  INFORMATIONS
        // =================================================
        
        // Déclaration des infos
        content += "    <div id='infos_meteo'>";
        
        // Affichage de la température
        content += "        " + tempMax + "°" + temp_unit + "</div>";
        
        // Fin des infos
        content += "</div>";
        
        // Déclaration du dictionnaire
        var dico = {"content": content, "logo": logo, "title": title, "time": time};
        
        // Push le dico
        zone.pushInfo(dico);
        
    }
    
}
