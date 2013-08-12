/**
 * Fichier exception
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
    initialize: function(fichier, erreur, ligne) {

        // Stocke le fichier de l'exception
        this.fichier = fichier;

        // Stocke l'errer de l'exception
        this.erreur = erreur;

        // Stocke la ligne de l'exception
        this.ligne = ligne;

        // Stocke la date de l'exception
        this.date = new Date();

        // Envoie à la console l'exception
        console.warn(this.msg());
        
        // Ajout de l'exception
        if(document.getElementById('msg_console') !== null) {
            
            // Ajoute le message dans la console html
        document.getElementById('msg_console').innerHTML = document.getElementById('msg_console').innerHTML + "<div class='exception'>" + this.msg().replace(/\n/gi, "<br/>") + "</div><br/>";

            // Défilement automatique
            var div = document.getElementById('msg_console');
            div.scrollTop = div.scrollHeight - div.clientHeight;

        }
        
    },
    toString: function() {

        // Retourne le message
        return this.msg();
        
    },
    msg: function() {

        // Retourne le message de l'exception
        return "Exception\n\tFichier : " + this.fichier + "\n\tMessage : " + this.erreur + "\n\tLigne : " + this.ligne;
        
    }

});

/**
 *	Permet de créer une information qui ira directement dans les logs du serveur.
 */
var Information = Class.create({
    /**
     *	Constructeur par défaut.
     *
     *	@param id : identifiant du fichier où s'est produite l'erreur.
     *	@param message : message de l'erreur.
     */
    initialize: function(fichier, erreur, ligne) {

        // Stocke le fichier de l'exception
        this.fichier = fichier;

        // Stocke l'errer de l'exception
        this.erreur = erreur;

        // Stocke la ligne de l'exception
        this.ligne = ligne;

        // Stocke la date de l'exception
        this.date = new Date();

        // Envoie à la console l'exception
        console.info(this.msg());

        // Ajout de l'exception
        if(document.getElementById('msg_console') !== null) {

            document.getElementById('msg_console').innerHTML = document.getElementById('msg_console').innerHTML + "<div class='information'>" + this.msg().replace(/\n/gi, "<br/>") + "</div><br/>";

            // Défilement automatique
            var div = document.getElementById('msg_console');
            div.scrollTop = div.scrollHeight - div.clientHeight;

        }

    },
    toString: function() {

        // Retourne le message
        return this.msg();
        
    },
    msg: function() {

        // Retourne le message de l'exception
        return "Information\n\tFichier : " + this.fichier + "\n\tMessage : " + this.erreur + "\n\tLigne : " + this.ligne;
        
    }

});

/**
 *	Permet de créer une erreur qui ira directement dans les logs du serveur.
 */
var Erreur = Class.create({
    /**
     *	Constructeur par défaut.
     *
     *	@param id : identifiant du fichier où s'est produite l'erreur.
     *	@param message : message de l'erreur.
     */
    initialize: function(fichier, erreur, ligne) {

        // Stocke le fichier de l'exception
        this.fichier = fichier;

        // Stocke l'errer de l'exception
        this.erreur = erreur;

        // Stocke la ligne de l'exception
        this.ligne = ligne;

        // Stocke la date de l'exception
        this.date = new Date();

        // Envoie à la console l'exception
        console.info(this.msg());

        // Ajout de l'exception
        if(document.getElementById('msg_console') !== null) {

            document.getElementById('msg_console').innerHTML = document.getElementById('msg_console').innerHTML + "<div class='erreur'>" + this.msg().replace(/\n/gi, "<br/>") + "</div><br/>";

            // Défilement automatique
            var div = document.getElementById('msg_console');
            div.scrollTop = div.scrollHeight - div.clientHeight;

        }

    },
    toString: function() {

        // Retourne le message
        return this.msg();
        
    },
    msg: function() {

        // Retourne le message de l'exception
        return "Erreur\n\tFichier : " + this.fichier + "\n\tMessage : " + this.erreur + "\n\tLigne : " + this.ligne;
        
    }

});
