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
 *		La classe comportement décrit le comportement qu'aura
 *		une zone concernée tout au long de son affichage. Ici
 *		on ne parle pas d'animation, ou de requêtes. Le 
 *		comportement décrit ce qu'il se passe lors du passage
 *		à l'élément suivant ou précédent, lorsqu'on fait une
 *		pause, etc. Le plus souvent ceci concerne un 
 *		changement d'informations.
 *
 *		Par abus de language, on pourrait dire "l'animation" 
 *		de la zone ce qui est incorrect. La désignation 
 *		"animation" concerne les mouvements, les effets 
 *		possibles d'un éléments.
 *
 *		Lorsque la boucle du comportement redémarre, elle 
 *		appelle automatiquement la fonction request de la 
 *		Zone qui permet une mise à jour des informations. Il
 *		y aura toujours au minimum 2 min entre chaque request
 *		pour éviter le surchargement de réseau pour les
 *		petits comportements.
 *
 *		Cette classe peut bien sûr être hérité pour permettre
 *		une alternance de couleur par exemple.
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
 *			- version 1.0.0
 */

var ComportementTransition = Class.create(Comportement, {

	/**
	 *	Constructeur par défaut
	 *
	 *	@param indice_debut : permet de préciser le 
	 *	début du comportement. Si aucune information
	 *	n'est renseignée, l'indice est égal à 0.
	 */
	initialize: function(temps_transition, indice_debut) {

		/** Zone concernée */
        this.zone_concerne = null;

		/** Indice actuel du comportement */
		this.indice = typeof indice_debut != 'undefined' ? indice_debut : 0;

		/** Timeout du comportement */
		this.timout = null;

        /** Stocke si l'animation est en marche */
        this.marche = false;

        /** Timestamp de la dernière requête */
        this.last_request = new Date().getTime();

        /** Stocke le temps de transition entre deux diapositives */
        this.time_trans = typeof temps_transition != 'undefined' ? temps_transition : 0;

        /** Initialisation du tableau des timeouts des transitions */
        this.timeout_trans = null;

	},

	/**
	 *	Met en pause le comportement
	 *
	 *	Le comportement est en pause et ne bougera plus
	 *	tant que la fonction run n'est pas appelée. Pour
	 *	cela la fonction réinitialise le timeout de la 
	 * 	boucle et passe la variable marche à false.
	 */
	pause: function() {

		// On réinitialise
		this.marche = false;

		// On clear le timeout
		clearTimeout(this.timeout);
		clearTimeout(this.timeout_trans);

	},

	/**
	 *	Stop complètement le comportement
	 *
	 *	Cette fonction stoppe complètement le 
	 *	comportement et le remet au début. Pour
	 *	redémarrer, utilisez la méthode run.
	 */
	stop: function() {

		// On réinitialise l'indice
		this.indice = 0;

		// On réinitialise
		this.marche = false;

		// On clear le timeout
		clearTimeout(this.timeout);
		clearTimeout(this.timeout_trans);

	},

	/**
	 *	Getter variable marche
	 *
	 *	Return true if the behaviour is running or false
	 *  if it not.
	 */
	isRunning: function() {
		return this.marche;
	},

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
		clearTimeout(this.timeout_trans);

		// On récupère les informations
		var info = self.zone_concerne.getInfos()[self.indice];

		// Transition
		if(this.time_trans != 0) {

			// Lance la transition
			self.transition(info);

		}

		// Pas de transition
		else {

			// On change le content
			self.zone_concerne.changeContent(info);
			
			// On test si le comportement est en marche
			if(self.isRunning())
				self.timeout = setTimeout(function() { self.next(); }, info.time * 1000);

		}

	},

	/**
	 *	Fonction de transition.
	 */
	transition: function(info) {

		// On stocke le this
		var self = this;

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