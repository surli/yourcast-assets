/**
 * Classe Exception
 *
 * Contributors :
 *      Guillaume Golfieri
 *
 */

/**
 *	Permet de créer une exception qui ira directement dans les logs du serveur.
 */
var Exception = Class.create({

	/**
	 *	Constructeur par défaut.
	 *
	 *	@param id : identifiant du fichier où s'est produite
	 *				l'erreur.
	 *	@param message : message de l'erreur.
	 */
	initialize: function(id, message) {
		
		// Stocke l'id où l'erreur s'est produite
		this.id = id;

		// Stocke le message de l'exception
		this.message = message;

		// Stocke la date de l'exception
		this.date = new Date();

		// Envoie à la console l'exception
		console.error(this.msg());

	},

	toString: function() {
		return this.message;
	},

	msg: function() {
		return "Exception : " + this.id + " [" + this.date + "]\n" + "Message : " + this.message;
	}

});
