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
 *		principes que comportement mais au lieu de faire une
 *		requête chaque fois qu'on revient au début du 
 *		comportement, on effectue une requête toutes les x
 *		secondes.
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

var ComportementBoucle = Class.create(Comportement, {

	initialize: function($super, time_loop_request) {

		/** Zone concernée */
        $super();

        /** Stocke le temps de transition entre deux diapositives */
        this.time_loop_request = typeof time_loop_request != 'undefined' ? time_loop_request : 10;

        /** Initialisation du timeout pour la loop de request */
        this.timeout_loop_request = null;

	},

	clear: function($super) {

		// On réinitialise
		$super();

		// On clear le timeout
		clearTimeout(this.timeout_loop_request);

	},

	run: function($super) {

		// On stocke le this
		var self = this;

		// Si on est pas déjà en route
		if(!self.isRunning()) {

			// Changement
			self.marche = true;

			// Loop des requêtes
			this.loop_request();

			// On appelle le changement d'élément
			self.goto(self.indice);

		}

	},

	next: function() {

		// Sécurité
		this.securiteInfosZone();

		// On incrémente l'indice
		this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

		// On appelle le changement d'élément
		this.goto(this.indice);

	},

	loop_request: function() {

		if(isRunning()) {

			var self = this;

			this.zone_concerne.request();

			this.timeout_loop_request = setInterval(function() { self.loop_request(); }, self.time_loop_request * 1000);

		}

	}

});