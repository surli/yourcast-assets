
//IUT de Nice / Departement informatique / Projet tuteur� 
//Annee 2012_2013

//Projet YourCastStore

//calendar - Renderer calendrier

//+ Version 0.0.0 : Version initiale  
//+ Version 1.0.0 : Changement de l'affichage des �v�nements
//+ Version 1.1.0 :  Prise en compte des nouvelles demandes, nouvelle fonction d�di� pour l'irsam, ajout de commentaires
//+ Version 1.2.0 : R�glage d'un probleme d'�v�nement pass�s, le titre de l'�v�nement s'affiche en haut, ajout d'un filtre pour ne pas afficher les aux, chez, � ... pour le lieu
//                  Si l'�v�nement est en cours alors le titre est affich� en rouge, modification du fichier style.less pour changer la taille de la police et la r�partition du texte sur l'�cran.


//Auteur : Simon Urli 
//Y. Seree ( a partir de la version 1.0.0)

//to use some calendar functions
loadScript(RENDERER_PATH + "/utils/calendar.js");

/* affichage classique evenement par evenement 
 affiche demain si l'activit� est le lendemain, n'affiche pas la date si l'activit� se d�roule je jour m�me, n'affiche pas lees �v�nements pass�s*/

function irsam_render_calendar(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 7;
    var logo = '<img src="img/logos/ical.png"/>';
    //var logo = "";
    zone.loadImage("img/logos/ical.png");
    var time = timeInfo;
    //var title = collection.name;
    var title = "";
    var tableau = collection.events;

    /*Lire dans le fichier JSon qui contient les exceptions � ne pas afficher dans le lieu*/
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "filtreCalendar.json", false);
    xmlhttp.send(null);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        doc = JSON.parse(xmlhttp.responseText);

        var eventsByDays = transform_in_days(tableau);

        var daysSort = Object.keys(eventsByDays).sort();
        for (var idays = 0; idays < daysSort.length; idays++) {
            var days = daysSort[idays];
            var sortObjectStart = function(a, b) {
                return (a.start - b.start);
            };

            eventsByDays[days][days].sort(sortObjectStart);

            var elementsCollec = eventsByDays[days];

            var start = elementsCollec['days'][0];

            var elementsArray = elementsCollec[start];
            var listDicoElts = new Array();

            var date = get_date_from_timestamp(start);
            var eventsNum = 0;

            for (var indice = 0; indice < elementsArray.length; indice++) {
                elements = elementsArray[indice];

                var descriptionCalendar = elements.description.replace("\n", "<br/>");
                exception = false;
                motANePasAfficher = "";


                if (pastEvent(elements) == false) {

                    content = "<div id='ICalReader' class='main_div_zone1 calendar_one_event'>";
                    content += "<div class='calendar_dates_one_elementIrsam'>" + render_date_irsam(elements);
                    content += "</div>";


                    /* si l'�v�nement est en cours alors on l'affiche en rouge*/
                    if (inProgress(elements) == true) {
                        title = "<div style=\"color: #9d261d;\"><b>" + elements.summary + "</b></div>";
                    }

                    if (inProgress(elements) == false) {
                        title = "<b>" + elements.summary + "</b>";
                    }

                    content += getLocation(elements.location, doc);
                    content += "<div class='calendar_description_one_elementIrsam'>" + descriptionCalendar + "</div>";
                    content += "</div>";


                    var dico = {"content": content, "logo": logo, "title": title, "time": time};
                    zone.pushInfo(dico);


                }
            }
        }
    }
}

function getLocation(location, doc) {
    if ((location == " ") || !(location)) {
        return "";
    }
    /* Ne pas afficher les aux, �, chez ... pour le lieu*/
    nb = doc.location.length;
    for (var j = 0; j < nb; j++) {
        // V�rifier si la sous chaine d'exception est contenu dans le lieu
        var Resultat = location.indexOf(doc.location[j]);
        if (Resultat != -1) {
            exception = true;
            motANePasAfficher = doc.location[j];
            break;
        }
    }
    if (exception == false) {
        return "<div class='calendar_location_one_elementIrsam'>(" + elements.location + ")</div>";
    }

    // Si l'exception se trouve dans lieu alors on retire la sous chaine d'exception
    //if (exception == true){
    var lieu = elements.location;
    lieu = lieu.replace(motANePasAfficher, "");
    if (lieu.indexOf(" ") != -1) {
        lieu = lieu.replace(" ", "");
    }	// R�gler le probl�me d'espace apr�s la parenth�se								
    return "<div class='calendar_location_one_elementIrsam'>(" + lieu + ")</div>";
}
