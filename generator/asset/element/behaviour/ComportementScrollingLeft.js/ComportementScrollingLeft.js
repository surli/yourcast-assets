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
 *
 *
 *  Versions :
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *      1.0.1 : R�solution d'un bug par rapport au d�ploiement � l'universit�
 *          - R�glage de la vitesse
 *          - R�glage du cycle
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement des fonctions
loadScript(BEHAVIOUR_PATH + "/utils/functions.js");

// Classe
var ComportementScrollingLeft = Class.create(Comportement, {
    
    /**
     *  Boucle du comportement
     *
     *  La boucle sert � changer les �l�ments d'une zone par 
     *  rapport aux informations que contient la zone. Pour 
     *  cela, elle r�cup�re les enfants de la zone et compare
     *  leur id au tableau info de la zone. Si un id n'est 
     *  pas d�fini, alors on cache l'�l�ment.
     */
    loop: function() {

        // S�curit�
        this.securiteInfosZone();

        // On clear tout d'abord les timeouts stock�s
        clearTimeout(this.timeout);
        clearTimeout(this.interval_timeout);

        // Contenu de la barre de scrolling
        var content = "";
        var time = 0;
        var info;

        // On r�cup�re les informations
        for (var i = 0; i < this.zone_concerne.counterInfo; i++) {

            // On stocke l'info
            info = this.zone_concerne.getInfos()[i];

            // On ajoute le content au content
            content += info.content;

            // On ajoute le temps d'affichage
            time += info.time;

        }

        content = "<div class='scrollContentLeft'><span class='scrollContent toLeft' id='scrollcontent_" + this.zone_concerne.id + "'>" + content + "</span></div>";
        var dicoInfo = {"content": content};
        this.zone_concerne.changeContent(dicoInfo);

        // R�cup�ration de la taille du span
        var tailleSpan = document.getElementById('scrollcontent_' + this.zone_concerne.id).offsetWidth + 400;

        // Cr�e un nouveau style
        var style = create_or_replace_behaviour_style_zone(this.zone_concerne.id);

        // Ajout des animations
        style.innerHTML = "#" + this.zone_concerne.id + " span#scrollcontent_" + this.zone_concerne.id + " { ";

        style.innerHTML += " -webkit-animation: fromLeft" + this.zone_concerne.id + " " + time + "s linear 0s forwards;";
        style.innerHTML += " -moz-animation: fromLeft" + this.zone_concerne.id + " " + time + "s linear 0s forwards;";
        style.innerHTML += " -ms-animation: fromLeft" + this.zone_concerne.id + " " + time + "s linear 0s forwards;";
        style.innerHTML += " -o-animation: fromLeft" + this.zone_concerne.id + " " + time + "s linear 0s forwards;";
        style.innerHTML += " animation: fromLeft" + this.zone_concerne.id + " " + time + "s linear 0s forwards; }";

        // Ajout des keyframes left et right
        style.innerHTML += "@-webkit-keyframes fromLeft" + this.zone_concerne.id + " { from { left: 100%; } to { left: -" + tailleSpan + "px; } }";
        style.innerHTML += "@-moz-keyframes fromLeft" + this.zone_concerne.id + " { from { left: 100%; } to { left: -" + tailleSpan + "px; } }";
        style.innerHTML += "@-ms-keyframes fromLeft" + this.zone_concerne.id + " { from { left: 100%; } to { left: -" + tailleSpan + "px; } }";
        style.innerHTML += "@-o-keyframes fromLeft" + this.zone_concerne.id + " { from { left: 100%; } to { left: -" + tailleSpan + "px; } }";
        style.innerHTML += "@keyframes fromLeft" + this.zone_concerne.id + " { from { left: 100%; } to { left: -" + tailleSpan + "px; } }";

        // Ajout du style au head
        document.head.appendChild(style);

        var self = this;
        
        // Boucle
        this.interval_timeout = setTimeout(function() {
            self.zone_concerne.request();
        }, time * 1000);

    }

});




