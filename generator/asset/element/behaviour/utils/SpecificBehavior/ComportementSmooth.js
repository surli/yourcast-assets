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
 *      La classe comportement alternance réutilise la classe
 *      comportement et alterne deux styles différends de
 *      couleur pour la maquette de Clément Ader.
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

// Load le script d'apparition
loadScript(BEHAVIOUR_PATH + "/utils/YourcastAnim/apparition.js");

// Classe
var ComportementSmooth = Class.create(Comportement, {

	/**
	 *	Boucle du comportement
	 *
	 *	La boucle sert à changer les éléments d'une zone par 
	 *	rapport aux informations que contient la zone. Pour 
	 *	cela, elle récupère les enfants de la zone et compare
	 *	leur id au tableau info de la zone. Si un id n'est 
	 *	pas défini, alors on cache l'élément.
	 */
	loop: function() {

		// Sécurité
		this.securiteInfosZone();

		// On stocke le this
		var self = this;

		// On clear tout d'abord les timeouts stockés
		clearTimeout(this.timeout);
		clearTimeout(this.timeout_fadeIn);
		clearTimeout(this.timeout_fadeOut);

		// On récupère les informations
		var info = this.zone_concerne.getInfos()[this.indice];

		// On change le content
		this.zone_concerne.changeContent(info);
		
		// Met le nouveau block en opacité 0
		if($(this.zone_concerne.id + "_content")) {

			$(this.zone_concerne.id + "_content").setStyle({
				opacity: 0
			});

			// Transition d'apparition des informations
			this.timeout_fadeIn = setTimeout(function() { fadeIn(self.zone_concerne.id + "_content", info.time/4, "linear"); }, 1);
			this.timeout_fadeOut = setTimeout(function() { fadeOut(self.zone_concerne.id + "_content", info.time/4, "linear"); }, (1000*2.9*info.time)/4);

		}

		// On test si le comportement est en marche
		if(this.isRunning())
			self.timeout = setTimeout(function() { self.next(); }, info.time * 1000);

	}

});

