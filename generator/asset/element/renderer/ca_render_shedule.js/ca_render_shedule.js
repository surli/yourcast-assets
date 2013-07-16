//IUT de Nice / Departement informatique / Projet tuteuré
//Annee 2012_2013

//Projet YourCastStore

//calendar - Renderer calendrier

//+ Version 0.0.0 : Version initiale
//+ Version 1.0.0 : Changement de l'affichage des évènements
//+ Version 1.1.0 :  Prise en compte des nouvelles demandes, nouvelle fonction dédié pour l'irsam, ajout de commentaires
//+ Version 1.2.0 : R�glage d'un probleme d'évènement passés, le titre de l'�v�nement s'affiche en haut, ajout d'un filtre pour ne pas afficher les aux, chez, � ... pour le lieu
//                  Si l'�v�nement est en cours alors le titre est affich� en rouge, modification du fichier style.less pour changer la taille de la police et la r�partition du texte sur l'�cran.
//
//  Auteur :    Simon Urli
//              Y. Seree ( a partir de la version 1.0.0)

//to use some calendar functions
loadScript(JS_ROOT+"/utils/calendar.js");

// Chargement du style
loadLess(LESS_ROOT + '/renderers/ca_render_shedule.less');

// On lit le fichier JSon pour les exceptions concernant les lieux
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/yourcast-CA-client/data/filtreCalendar.json", false);
xmlhttp.send(null);

if(xmlhttp.readyState != 4 || xmlhttp.status!=200)
    xmlhttp = null;

/* affichage classique evenement par evenement
 affiche demain si l'activit� est le lendemain, n'affiche pas la date si l'activit� se d�roule je jour m�me, n'affiche pas lees �v�nements pass�s*/

/**
 * Retourne le lieu de l'évènement.
 * On filtre des mots clés pour qu'ils ne s'affichent pas.
 */
function getLocation(location, doc) {

    // Test des paramètres
    if (typeof location === 'undefined' || 
        location == null || 
        (location == " ") || 
        !(location) || 
        typeof doc === 'undefined' ||
        doc == null)

        // Retourne une chaîne vide
        return "";
    
    // Initialisation de la variable exception
    var exception = false;

    // Ne pas afficher les aux, à, chez ... pour le lieu
    nb = doc.location.length;

    // Stockage du lieu
    var lieu = elements.location;

    // Boucle sur les mots à ne pas afficher. On suppose qu'un lieu ne contient qu'un seul mot indésirable.
    for(var j = 0; j < nb ; j++) {

        // Vérifier si la sous chaîne d'exception est contenu dans le lieu
        if(location.indexOf(doc.location[j]) != -1) {

            // Enlever les mots non affichés
            lieu = lieu.replace(doc.location[j],"");

            // Enlever les espaces éventuels
            lieu = lieu.replace(" ", "");

            // Casse la boucle
            break;

        }

    }

    // Retourne la location
    return "<div class='calendar_location_one_elementIrsam'>("+lieu+")</div>";

}

/**
 * Methode de rendu pour le calendrier.
 */
function ca_render_shedule(evenement, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof evenement === 'undefined' || evenement === null || evenement.length == 0)
        throw new InformationsError("The informations are not correct");

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' || zone === null)
        throw new ZoneError("The zone is undefined or null");

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/ical.png"/>';
    zone.loadImage(IMG_PATH+"/logos/ical.png");

    // Stockage du nom de l'album
    var title = typeof evenement.titre === 'undefined' ? 'Inconnu' : evenement.titre;

    // Stockage du temps d'affichage
    var time = typeof timeInfo !== 'undefined' ? timeInfo : 7;

    // Stockage des évènements
    var tableau = evenement.events;

    if (xmlhttp != null){
        var doc = JSON.parse(xmlhttp.responseText);

        var eventsByDays = transform_in_days(tableau);

        // Met les jours dans l'ordre
        var daysSort = Object.keys(eventsByDays).sort();

        // On boucle sur les dates
        for (var idays = 0; idays < daysSort.length; idays++) {
            
            // On stocke le jour
            var days = daysSort[idays];

            var sortObjectStart = function(a,b) {
                return (a.start-b.start);
            };

            // On met dans l'ordre les évènements
            eventsByDays[days][days].sort(sortObjectStart);

            var elementsCollec = eventsByDays[days];
            var start = elementsCollec['days'][0];
            var elementsArray = elementsCollec[start];

            // Boucle sur les évènements du calendrier
            for (var indice = 0; indice < elementsArray.length; indice++) {
                
                // Récupère l'élément à l'indice nommé indice
                elements = elementsArray[indice];

                // On remplace les \n par des <br/>
                var descriptionCalendar = elements.description.replace("\n", "<br/>");

                // S'il reste des éléments futur à afficher
                if(!pastEvent(elements)) {

                    // Déclaration du content
                    content = "<div id='ICalReader' style='text-align: center;' class='main_div_zone1 calendar_one_event'>";
                    content += "<div id='shedule'>"+render_date(elements);
                    content += "</div>";

                    // Si l'évènement est en cours, on l'affiche en rouge
                    if (inProgress(elements))
                        title = "<div style=\"color: #9d261d;\"><b>"+elements.summary+"</b></div>";

                    // Sinon
                    else
                        title = "<b>"+elements.summary+"</b>";

                    content += getLocation(elements.location,doc);
                    content += "<div class='calendar_description_one_elementIrsam'>"+descriptionCalendar+"</div>";
                    content += "</div>";

                    // On déclare le dictionnaire
                    var dico = {"content": content, "logo": logo, "title": title, "time" : time, "alternance": true};

                    // On ajoute l'information à la zone
                    zone.pushInfo(dico);

                }

            }

        }

        // Retourne le dictionnaire
        return dico;

    }

}