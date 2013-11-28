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
 *      Ce render permet d'afficher une vid�o dans une zone.
 *      N�anmoins ce render ne permet pas pour l'instant 
 *      d'afficher n'importe quelle vid�o. En effet, il ne 
 *      supporte que les vid�os de Youtube, Dailymotion (pour
 *      ce site vous devez r�cup�rer l'adresse de partage) ou
 *      des vid�os sp�cifiques support� par le navigateur. En
 *      gros, mp4 support� que par ie alors que ogg et webm  
 *      par firefox et chrome. Si le format n'est pas support�
 *      le render ignore la vid�o.
 *
 *      Ce render ajoute un block contenant un id "video" que
 *      vous pouvez personnaliser de pr�f�rence dans un 
 *      fichier less "NOMMODELE_render_video".
 *
 *      Le timeinfo permet de d�finir le temps d'affichage de
 *      l'�l�ment. Si la vid�o n'est pas fini, le comportement
 *      passera quand m�me � l'�l�ment suivant.
 *
 *  TODO :
 *
 *      - Appeler la m�thode "next" du comportement de la zone
 *        lorsque la vid�o est termin�e.
 *      - Pouvoir attendre que la video soit finie pour passer 
 *        � la diapo suivante.
 *      - G�rer plus de formats (lecteur flash?).
 *
 *  Versions :
 *
 *      (Juin 2013) 1.0.0 : Cr�ation d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement du style
loadLess(LESS_ROOT + '/renderers/universite_render_video.less');

// Fonction du rendu vid�o
function universite_render_video(elements, zone, timeInfo) {

    // Test si la zone est null ou ind�fini
    if (typeof zone === 'undefined' || zone === null)
        throw new Exception("The zone is undefined or null");

    // Si le temps d'affichage n'est pas d�fini, on en stocke une par d�faut
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 6;

    // Initialisation du content
    var content = "<div id='video'>";
    var infoFound = false;

    /**
     *  Test quel type de vid�o est l'�l�ment
     */

    // Youtube
    if (elements.type.toLowerCase() === 'youtube') {
        // Test si on a une url absolu ou juste l'id
        var url = "";
        if (elements.url.PLAYER.search("youtu.be") !== -1) {
            url = elements.url.PLAYER.split("youtu.be/")[1];
        } else if (elements.url.PLAYER.search("youtube.com/watch") !== -1) {
            url = elements.url.PLAYER.split("youtube.com/watch?v=")[1];
            url = url.split("&")[0];
        }
        //var url = elements.url.PLAYER.search("youtube") === -1 ? 'https://www.youtube.com/v/' + elements.url.PLAYER : elements.url.PLAYER;
        content += '<iframe width="640" height="480" src="http://www.youtube.com/embed/' + url + '?rel=0&amp;autoplay=1&controls=0" frameborder="0" allowfullscreen frameborder="0"></iframe>';

        // Information trouv�e
        infoFound = true;

    }

    // Dailymotion
    else if (elements.type.toLowerCase() === 'dailymotion') {

        content += '<object width="' + width + '" height="' + height + '">';
        content += '    <param name="movie" value="http://www.dailymotion.com/swf/video/' + elements.url['PLAYER'] + '?autoPlay=1&chromeless=1"></param>';
        content += '    <param name="allowFullScreen" value="true"></param>';
        content += '    <param name="allowScriptAccess" value="always"></param>';
        content += '    <embed type="application/x-shockwave-flash" src="http://www.dailymotion.com/swf/video/' + elements.url['PLAYER'] + '?autoPlay=1&chromeless=1" width="' + width + '" height="' + height + '" allowscriptaccess="always"></embed>';
        content += '</object>';

        // Information trouv�e
        infoFound = true;

    }

    // Specifique
    else if (elements.type.toLowerCase() === 'specific') {

        // D�claration de l'url
        var url = "";

        // Mozilla
        if (window.mozRequestAnimationFrame) {
            url = typeof elements.url.webm === 'undefined' || elements.url.webm === '' ? url : elements.url.webm;
            url = typeof elements.url.ogv === 'undefined' || elements.url.ogv === '' ? url : elements.url.ogv;
        }

        // Chrome
        else if (requestAnimationFrame) {
            url = typeof elements.url.webm === 'undefined' || elements.url.webm === '' ? url : elements.url.webm;
            url = typeof elements.url.ogv === 'undefined' || elements.url.ogv === '' ? url : elements.url.ogv;
        }

        // Safari
        else if (window.webkitRequestAnimationFrame) {
            url = typeof elements.url.mp4 === 'undefined' || elements.url.mp4 === '' ? url : elements.url.mp4;
        } else {
            console.log("impossible de d�terminer le type de video");
            console.log(elements);
        }


        // Si l'url n'est pas vide
        if (url !== '') {

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
            content += 'Vous n\'avez pas de navigateur moderne, ni Flash install�... suivez les liens ci-dessous pour t�l�charger les vid�os.';
            content += '</object>';
            content += '</video>';

            // Information trouv�e
            infoFound = true;

        }
    }

    // Si une information a �t� trouv�e
    if (infoFound) {

        // Fin du content
        content += "</div>";

        // Stockage du temps d'affichage
        var time = elements.time;

        // D�claration du dictionnaire
        var dico = {"content": content, "time": time, "alternance": false};

        // On ajoute cette nouvelle info dans la zone
        zone.pushInfo(dico);

    }


    // Retourne le dictionnaire
    return dico;

}

