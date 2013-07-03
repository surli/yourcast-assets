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
 *
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

	},

	/**
	 *	Lance le comportement
	 *
	 *	Cette fonction est lancée que si le comportement
	 *	est arrêtée. Elle repasse la variable marche à
	 * 	true et appelle la fonction goto à l'indice où
	 *	le comportement s'était arrêté.
	 */
	run: function() {

		this.next();

	},

	next: function() {

		// Sécurité
		if(this.securiteInfosZone()) {

			// On incrémente l'indice
			this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

			// On appelle le changement d'élément
			this.goto(this.indice);

		}

	},

	/**
	 *	Boucle des requêtes
	 *
	 *	Permet de lancer une requête toutes les x secondes.
	 */
	loop_request: function() {

		this.zone_concerne.request();

	},

	/**
	 *	Setter de la zone
	 *
	 *	Permet de chancer la zone du comportement. 
	 *
	 *	/!\ Cette fonction doit être appelée lors du 
	 *	lancement du comportement sous peine d'avoir 
	 *	une erreur critique.
	 */
	setZone: function($super, nouvelle_zone) {

		// Stockage de la nouvelle zone
		$super(nouvelle_zone);

		// Le comportement est arrêté
		this.marche = false;

		var self = this;

		// Lance la loop
		this.timeout_loop_request = setInterval(function() { self.loop_request(); }, self.time_loop_request * 1000);

	}

});