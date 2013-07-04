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
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement des fonctions
loadScript(BEHAVIOUR_PATH+"/utils/functions.js");

// Classe
var ComportementScrollingLeft = Class.create(Comportement, {
    
    /**
     *  Boucle du comportement
     *
     *  La boucle sert à changer les éléments d'une zone par 
     *  rapport aux informations que contient la zone. Pour 
     *  cela, elle récupère les enfants de la zone et compare
     *  leur id au tableau info de la zone. Si un id n'est 
     *  pas défini, alors on cache l'élément.
     */
    loop: function() {

        // Sécurité
        this.securiteInfosZone();

        // On clear tout d'abord les timeouts stockés
        clearTimeout(this.timeout);

        // Contenu de la barre de scrolling
        var content = "";
        var time = 0;
        var info;

        // On récupère les informations
        for (var i = 0; i < this.zone_concerne.counterInfo ; i++) {
            
            // On stocke l'info
            info = this.zone_concerne.getInfos()[i];

            // On ajoute le content au content
            content += info.content;

            // On ajoute le temps d'affichage
            time += info.time;

        }

        content = "<div class='scrollContentLeft'><span class='scrollContent toLeft' id='scrollcontent_"+this.zone_concerne.id+"'>"+content+"</span></div>";
        var dicoInfo = { "content":content };
        this.zone_concerne.changeContent(dicoInfo);

        // Récupération de la taille du span
        var tailleSpan = document.getElementById('scrollcontent_' + this.zone_concerne.id).offsetWidth;

        // Calcule du pourcentage pour la scrollbar
        var leftPourcent = (tailleSpan * 100) / this.zone_concerne.divMarquee.offsetWidth;

        // Crée un nouveau style
        var style = create_or_replace_behaviour_style_zone();
        
        // Ajout des animations
        style.innerHTML = "#" + this.zone_concerne.id+" span#scrollcontent_" + this.zone_concerne.id+" { ";

        style.innerHTML += " -webkit-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -moz-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -ms-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -o-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " animation: fromLeft " + time + "s linear 0s infinite; }";

        // Ajout des keyframes left et right
        style.innerHTML += "@-webkit-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-moz-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-ms-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-o-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";

        // Ajout du style au head
        document.head.appendChild(style);

    }
    
});




