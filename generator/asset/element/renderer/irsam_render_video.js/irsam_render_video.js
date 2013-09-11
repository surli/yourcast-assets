/**
 *  Rights :
 *
 *      Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 *      All rights reserved. This program and the 
 *      accompanying materials are made available under the 
 *      terms of the GNU Public License v3.0 which accompanies 
 *      this distribution, and is available at
 *      http://www.gnu.org/licenses/gpl.html
 *
 *  Informations :
 *
 *      Ce render permet d'afficher une vidéo dans une zone.
 *      Néanmoins ce render ne permet pas pour l'instant 
 *      d'afficher n'importe quelle vidéo. En effet, il ne 
 *      supporte que les vidéos de Youtube, Dailymotion (pour
 *      ce site vous devez récupérer l'adresse de partage) ou
 *      des vidéos spécifiques supporté par le navigateur. En
 *      gros, mp4 supporté que par ie alors que ogg et webm  
 *      par firefox et chrome. Si le format n'est pas supporté
 *      le render ignore la vidéo.
 *
 *      Ce render ajoute un block contenant un id "video" que
 *      vous pouvez personnaliser de préférence dans un 
 *      fichier less "NOMMODELE_render_video".
 *
 *      Le timeinfo permet de définir le temps d'affichage de
 *      l'élément. Si la vidéo n'est pas fini, le comportement
 *      passera quand même à l'élément suivant.
 *
 *  TODO :
 *
 *      - Appeler la méthode "next" du comportement de la zone
 *        lorsque la vidéo est terminée.
 *      - Pouvoir attendre que la video soit finie pour passer 
 *        à la diapo suivante.
 *      - Gérer plus de formats (lecteur flash?).
 *
 *  Versions :
 *
 *      (Juin 2013) 1.0.0 : Création d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement du style
loadLess(LESS_ROOT + '/renderers/irsam_render_video.less');

// Fonction du rendu vidéo
function irsam_render_video(tableau, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof tableau === 'undefined' || tableau === null || tableau.length === 0)
        throw new Exception("The informations are not correct");

    // Test si la zone est null ou indéfini
    if(typeof zone === 'undefined' || zone === null)
        throw new Exception("The zone is undefined or null");

    // Si le temps d'affichage n'est pas défini, on en stocke une par défaut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Chargement de l'image de zone
    var logo = '<img src="'+IMG_PATH+'/logos/tv.png"/>';
    zone.loadImage(IMG_PATH+"/logos/tv.png");

    // Pour chaque annonces que possède le json on l'ajoute à la zone
    for (var indice = 0 ; indice < tableau.length ; indice++) {

        // On stock les élements
        var elements = tableau[indice];

        // Récupération des dimensions
        var width = window.innerWidth * 0.9;
        var height = window.innerHeight * 0.7;

        // Initialisation du content
        var content = "<div id='video'>";
        var infoFound = false;

        /**
         *  Test quel type de vidéo est l'élément
         */

        // Youtube
        if(elements.type === 'youtube') {

            // Test si on a une url absolu ou juste l'id
            var url = elements.urls.player.search("youtube") === -1 ? 'https://www.youtube.com/v/' + elements.urls.player : elements.urls.player;

            // Ajout du lecteur avec l'API Youtube
            content += '<object width="' + width + '" height="' + height + '">';
            content += '    <param name="movie" value="' + url + '?autoplay=1&controls=0&enablejsapi=1&playerapiid=ytplayer&modestbranding=1&version=3"></param>';
            content += '    <param name="allowFullScreen" value="true"></param>';
            content += '    <param name="allowScriptAccess" value="always"></param>';
            content += '    <embed src="' + url + '?autoplay=1&controls=0&enablejsapi=1&playerapiid=ytplayer&modestbranding=1&version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="' + width + '" height="' + height + '"></embed>';
            content += '</object>';

            // Information trouvée
            infoFound = true;

        }

        // Dailymotion
        else if(elements.type === 'dailymotion') {

            content += '<object width="' + width + '" height="' + height + '">';
            content += '    <param name="movie" value="http://www.dailymotion.com/swf/video/' + elements.urls['player']+ '?autoPlay=1&chromeless=1"></param>';
            content += '    <param name="allowFullScreen" value="true"></param>';
            content += '    <param name="allowScriptAccess" value="always"></param>';
            content += '    <embed type="application/x-shockwave-flash" src="http://www.dailymotion.com/swf/video/' + elements.urls['player'] + '?autoPlay=1&chromeless=1" width="' + width + '" height="' + height + '" allowscriptaccess="always"></embed>';
            content += '</object>';

            // Information trouvée
            infoFound = true;

        }

        // Specifique
        else if(elements.type === 'specific') {

            // Déclaration de l'url
            var url = "";

            // Mozilla
            if(window.mozRequestAnimationFrame) {
                url = typeof elements.urls.webm === 'undefined' || elements.urls.webm === '' ? url : elements.urls.webm;
                url = typeof elements.urls.ogv === 'undefined' || elements.urls.ogv === '' ? url : elements.urls.ogv;
            }

            // Chrome
            else if(requestAnimationFrame) {
                url = typeof elements.urls.webm === 'undefined' || elements.urls.webm === '' ? url : elements.urls.webm;
                url = typeof elements.urls.ogv === 'undefined' || elements.urls.ogv === '' ? url : elements.urls.ogv;
            }

            // Safari
            else if(window.webkitRequestAnimationFrame) {
                url = typeof elements.urls.mp4 === 'undefined' || elements.urls.mp4 === '' ? url : elements.urls.mp4;
            }

            // Si l'url n'est pas vide
            if(url !== '') {

                content += '<video width="' + width + '" height="' + height + '" src="' + url + '" autoplay>';
                content += '</video>';

                content += '<video width="' + width + '" height="' + height + '" controls="controls">';
                content += '<source src="' + url + '" type="video/mp4" />';
                content += '<source src="' + url + '" type="video/webm" />';
                content += '<source src="' + url + '" type="video/ogg" />';
                content += '<object type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" data="' + url;
                content += '<param name="movie" value="' + url + '" />';
                content += '<param name="wmode" value="transparent" />';
                content += '';
                content += '<!--[if lte IE 6 ]>';
                content += '<embed src="' + url + '" type="application/x-shockwave-flash"  allowscriptaccess="always" allowfullscreen="true" width="' + width + '" height="' + height + '">';
                content += '</embed>';
                content += '<![endif]-->';
                content += 'Vous n\'avez pas de navigateur moderne, ni Flash installé... suivez les liens ci-dessous pour télécharger les vidéos.';
                content += '</object>';
                content += '</video>';
                
                // Information trouvée
                infoFound = true;

            }

        }

        // Si une information a été trouvée
        if(infoFound) {

            // Fin du content
            content += "</div>";

            // Stockage du temps d'affichage
            var time = elements.time;

            // Déclaration du dictionnaire
            var dico = {"content": content, "logo" : logo, "time" : time, "alternance": false};

            // On ajoute cette nouvelle info dans la zone
            zone.pushInfo(dico);

        }

    }

    // Retourne le dictionnaire
    return dico;

}
