/**
 *	Rights :
 *
 * 		Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 * 		All rights reserved. This program and the 
 *		accompanying materials are made available under the 
 *		terms of the GNU Public License v3.0 which accompanies 
 *		this distribution, and is available at
 * 		http://www.gnu.org/licenses/gpl.html
 *
 *	Informations :
 *
 *		La classe comportement smooth reprend les mêmes
 *		principes que comportement mais rajoute entre chaque
 *		passage d'information, une transition d'opacité qui
 *		rend visuellement comme une transition "smooth".
 *
 *	Versions :
 *
 *		1.0.0 : Création d'une classe fonctionnelle, avec des
 *				tests unitaires fonctionnels.
 *
 *	Contributors :
 *
 *		Simon Urli (simon.urli@gmail.com)
 *		Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

var ComportementSmooth = Class.create(Comportement, {

	initialize: function($super, temps_transition) {

		/** Zone concernée */
        $super();

        /** Stocke le temps de transition entre deux diapositives */
        this.time_trans = typeof temps_transition != 'undefined' ? temps_transition : 4;

        /** Initialisation du tableau des timeouts des transitions */
        this.timeout_trans = null;

	},

	clear: function($super) {

		$super();

		clearTimeout(this.timeout_trans);

	},

	loop: function() {

		// On stocke le this
		var self = this;

		// Sécurité
		this.securiteInfosZone();

		// On clear tout d'abord les timeouts stockés
		this.clear();

		// On récupère les informations
		var info = self.zone_concerne.getInfos()[self.indice];

		// On enlève l'autre diapo directement
		$(self.zone_concerne.id).setOpacity(0);

		// 1 seconde après on change l'élément
		this.timeout_trans = setTimeout(function() { 

			// On change le content
			self.zone_concerne.changeContent(info);

			// On remet l'opacity
			$(self.zone_concerne.id).setOpacity(1);

		 	// On test si le comportement est en marche
		 	if(self.isRunning())
		 		self.timeout = setTimeout(function() { self.next(); }, info.time * 1000);

		}, self.time_trans * 500);

	}
	
});