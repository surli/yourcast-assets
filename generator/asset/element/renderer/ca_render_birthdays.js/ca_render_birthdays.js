
// Chargement du style
loadLess(LESS_ROOT + '/renderers/ca_render_birthdays.less');

// Rendu des anniversaires
function ca_render_birthdays(datas, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof datas === 'undefined' || datas === null || datas.length == 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' || zone === null)
        throw new ZoneError("The zone is undefined or null");


    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/birthday.png"/>';
    zone.loadImage(IMG_PATH+"/logos/birthday.png");

    // Stockage du titre de
    var title = "Joyeux anniversaire";

    // Stockage du temps d'affichage
    var time = timeInfo;

    // On rajoute chaque prénom
    for (var indice = 0; indice < datas.length; indice++) {

        // Nom de l'heureux élu
        var name = (datas[indice].name);

        // Récupération de l'age
        if(typeof datas[indice].age !== 'undefined' && datas[indice].age != "")

            // Ajout dans l'html
            content = "<div class='main_div_mainzone'><div id='birthdays'>" + name.substr(0, 1).toUpperCase()+name.substr(1, name.length)+" - " + (datas[indice].age) + " ans</div></div>";

        else

            // Ajout dans l'html
            content = "<div class='main_div_mainzone'><div id='birthdays'>" + name.substr(0, 1).toUpperCase()+name.substr(1, name.length)+"</div></div>";

        // Déclaration du dictionnaire
        var dico = {"content": content, "logo": logo, "title": title, "time" : timeInfo, "alternance": true};

        // Ajout des anniversaires à la zone
        zone.pushInfo(dico);

    }

    // Retourne le dictionnaire
    return dico;

}