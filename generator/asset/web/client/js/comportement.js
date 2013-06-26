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
 */

var Comportement = Class.create({

	/**
	 *	Constructeur par défaut
	 *
	 *	@param indice_debut : permet de préciser le 
	 *	début du comportement. Si aucune information
	 *	n'est renseignée, l'indice est égal à 0.
	 */
	initialize: function() {

		/** Zone concernée */
        this.zone_concerne = null;

		/** Indice actuel du comportement */
		this.indice = 0;

		/** Timeout du comportement */
		this.timout = null;

        /** Stocke si l'animation est en marche */
        this.marche = false;

        /** Timestamp de la dernière requête */
        this.last_request = new Date().getTime();

	},

	/**
	 *	Passage à l'élément suivant
	 *
	 *	Le passage à l'élément suivant ne peut se faire
	 *	que si le comportement est en route. Sinon elle
	 *	ne fait rien. Lorsque la boucle arrive à la fin
	 *	des informations de la zone, elle retourne au 
	 * 	début.
	 */
	next: function() {

		// Sécurité
		this.securiteInfosZone();

		// On stocke le this
		var self = this;

		// On incrémente l'indice
		self.indice = (self.indice + 1) % self.zone_concerne.getInfos().length;

        // Si on est au début de l'application
        if(this.indice == 0) {

            // Si on est revenu au début on test si ca on peut faire une requete
            if((new Date().getTime() - this.last_request) > 120000) {

                // On stocke la nouvelle requete
                this.last_request = new Date().getTime();

                // On lance la requête
                this.zone_concerne.request();

            }

        }

		// On appelle le changement d'élément
		self.goto(self.indice);

	},

	/**
	 *	Passage à l'élément précédent
	 *
	 *	Le passage à l'élément précédent ne peut se
	 *	faire que si le comportement est en route. Sinon
	 *	elle ne fait rien. Lorsque la boucle au début
	 *	(indice égal à 0), elle retourne à la fin des
	 *  informations de la zone.
	 */
	before: function() {

		// Sécurité
		this.securiteInfosZone();

		// On stocke le this
		var self = this;

		// On incrémente l'indice
		self.indice = (self.indice - 1) % self.zone_concerne.getInfos().length;

		// Test si l'indice est passé en négatif
		if(self.indice < 0)
			self.indice = self.zone_concerne.getInfos().length - 1;

		// On appelle le changement d'élément
		self.goto(self.indice);

	},

	/**
	 *	Changement d'élément à l'indice donné
	 *
	 *	Cette fonction doit être obligatoirement appelée
	 *	avant loop. Elle sert de sécurité pour éviter
	 *	tout type d'erreur dans la boucle.
	 *
	 *	Exception renvoyée :
	 *
	 *		- Aucune zone n'est définie
	 *		- Aucune informations dans la zone
	 *		- Aucune informatinos dans l'indice donné
	 *
	 *	Cette fonction peut être appelée n'importe où et
	 *	n'importe quand.
	 */
	goto: function(indice) {

		// Sécurité
		this.securiteInfosZone();

		// On stocke le this
		var self = this;

		// Test si l'indice existe dans les informations données par la zone
		if(typeof self.zone_concerne.getInfos()[indice] !== 'undefined') {

			// On stocke l'indice
			self.indice = indice;

			// On change l'élément
			self.loop();

		} else

			// Création d'une exeception
	        throw new Exception("[moteur/class/comportement.js] goto", "L'information à l'indice donnée n'a pas été trouvée.");

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

		// On stocke le this
		var self = this;

		// Si on est pas déjà en route
		if(!self.isRunning()) {

			// Changement
			self.marche = true;

			// On appelle le changement d'élément
			self.goto(self.indice);

		}

	},

	/**
	 *	Reset le comportement
	 *
	 *	Reset juste l'indice de navigation. Si le 
	 *	comportement est en route, il continuera. Si
	 * 	vous désirez arrêter le comportement, utilisez
	 *	la fonction stop.
	 */
	clear: function() {

		// On réinitialise l'indice
		this.indice = 0;

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

		// On récupère les informations
		var info = self.zone_concerne.getInfos()[self.indice];

		// On change le content
		self.zone_concerne.changeContent(info);
		
		// On test si le comportement est en marche
		if(self.isRunning())
			self.timeout = setTimeout(function() { self.next(); }, info.time * 1000);

	},

	/**
	 *	Fonction de sécurité lié à la zone
	 *
	 *	Evite les erreurs 'undefined'. Teste si la 
	 *	zone est prête à être utilisée. Malgré
	 *	qu'il existe une fonction dédié à la
	 *	modification de la zone, on peut quand 
	 *	même la modifiée directement.
	 */
	securiteZone: function() {

		// Test si c'est bien une zone
		if(this.zone_concerne === 'undefined' || this.zone_concerne == null || !(this.zone_concerne instanceof Zone))

	 	// Création de l'exception
		throw new Exception("[moteur/class/comportement.js] setZone", "La zone est incorrect.");

	},

	/**
	 *	Fonction de sécurité lié aux infos de la 
	 *	zone
	 *
	 *	Evite les erreurs 'undefined'. Teste si les
	 *	informations transmises par la fonction
	 *	getInfos sont correctes est prêtes à être 
	 *	utilisées.
	 */
	securiteInfosZone: function() {

		// Sécurité zone
		this.securiteZone();

		// Test si les informations sont corrects
		if(this.zone_concerne.getInfos() === 'undefined' || this.zone_concerne.getInfos() == null)

	 	// Création de l'exception
		throw new Exception("[moteur/class/comportement.js] setZone", "Les infos de la zone sont incorrects.");

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
	setZone: function(nouvelle_zone) {

		// Stockage de la nouvelle zone
		this.zone_concerne = nouvelle_zone;

		// Sécurité
		this.securiteZone();

	}

});

/**
 *  Ajout l'animation d'une zone
 */
function ajouterAnimation(id, duration, nom_anim, nom_timing) {

    enleverAnimation(id);

    $(id).setStyle({
        transition: nom_anim + " " + duration + " " + nom_timing
    });

}

/**
 *  Enlève l'animation d'une zone
 */
function enleverAnimation(id) {

    $(id).setStyle({
        transition: "none"
    });

}

/**
 *  Cette fonction met la position de l'élément récupérée
 *  par rapport à l'id en "absolute".
 */
function testPositionAbsolute(id) {

    // On test si l'élément est en position "absolute"
    console.log($(id).getStyle('position'));

}