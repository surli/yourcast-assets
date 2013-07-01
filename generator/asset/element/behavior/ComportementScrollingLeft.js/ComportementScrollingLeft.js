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

        // Temps d'affichage de la barre de scrolling
        var time = 0;

		// On récupère les informations
		for (var i = 0; i < this.zone_concerne.getInfos(); i++) {
			
			// On stocke l'info
			info = this.zone_concerne.getInfos[i];

			// On ajoute le content au content
			content += info.content;

			// On ajoute le temps d'affichage
			time += info.time;

		}

		content = "<div class='scrollContentLeft'><span class='scrollContent toLeft' id='scrollcontent_"+this.zone_concerne.id+"'>"+content+"</span></div>";
		var dicoInfo = { "content":content };
		this.zone_concerne.changeContent(dicoInfo);
			
		var tailleSpan = document.getElementById('scrollcontent_'+this.zone_concerne.id).offsetWidth;

		var leftPourcent = (tailleSpan * 100) / this.zone_concerne.divMarquee.offsetWidth;

		var style = create_or_replace_behaviour_style_zone();
		
		style.innerHTML = "#"+this.zone_concerne.id+" span#scrollcontent_"+this.zone_concerne.id+"{ ";
		style.innerHTML += " -moz-animation-name: marquee;";
		style.innerHTML += " -webkit-animation-name: marquee;";
		style.innerHTML += " -moz-animation-duration: "+time+"s;";
		style.innerHTML += " -webkit-animation-duration: "+time+"s;";
		style.innerHTML += " -moz-animation-iteration-count: infinite;";
		style.innerHTML += " -webkit-animation-iteration-count: infinite;";
		style.innerHTML += " -moz-animation-timing-function: linear;";
		style.innerHTML += " -webkit-animation-timing-function: linear; } ";

		style.innerHTML += "@-webkit-keyframes marquee{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";
		style.innerHTML += "  @-moz-keyframes marquee{ from { left: 100%; } to { left: -"+leftPourcent+"%; } }";

		document.head.appendChild(style);

    }

});





