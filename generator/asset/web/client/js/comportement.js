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
 *		La classe comportement dÃ©crit le comportement qu'aura
 *		une zone concernÃ©e tout au long de son affichage. Ici
 *		on ne parle pas d'animation, ou de requÃªtes. Le 
 *		comportement dÃ©crit ce qu'il se passe lors du passage
 *		Ã  l'Ã©lÃ©ment suivant ou prÃ©cÃ©dent, lorsqu'on fait une
 *		pause, etc. Le plus souvent ceci concerne un 
 *		changement d'informations.
 *
 *		Par abus de language, on pourrait dire "l'animation" 
 *		de la zone ce qui est incorrect. La dÃ©signation 
 *		"animation" concerne les mouvements, les effets 
 *		possibles d'un Ã©lÃ©ments.
 *
 *		Lorsque la boucle du comportement redÃ©marre, elle 
 *		appelle automatiquement la fonction request de la 
 *		Zone qui permet une mise Ã  jour des informations. Il
 *		y aura toujours au minimum 2 min entre chaque request
 *		pour Ã©viter le surchargement de rÃ©seau pour les
 *		petits comportements.
 *
 *	Versions :
 *
 *		1.0.0 : CrÃ©ation d'une classe fonctionnelle, avec des
 *				tests unitaires fonctionnels.
 *
 *	Contributors :
 *
 *		Simon Urli (simon.urli@gmail.com)
 *		Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

var Comportement = Class.create({
    /**
     *	Constructeur par dÃ©faut
     */
    initialize: function() {

        /** Zone concernÃ©e */
        this.zone_concerne = null;

        /** Indice actuel du comportement */
        this.indice = 0;

        /** Timeout du comportement */
        this.timout = null;

        /** Stocke si l'animation est en marche */
        this.marche = false;

        /** Timestamp de la derniÃ¨re requÃªte */
        this.last_request = new Date().getTime();

    },
    /**
     *	Passage Ã  l'Ã©lÃ©ment suivant
     *
     *	Le passage Ã  l'Ã©lÃ©ment suivant ne peut se faire
     *	que si le comportement est en route. Sinon elle
     *	ne fait rien. Lorsque la boucle arrive Ã  la fin
     *	des informations de la zone, elle retourne au 
     * 	dÃ©but.
     */
    next: function() {

        // SÃ©curitÃ©
        this.securiteInfosZone();

        // On incrÃ©mente l'indice
        this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

        // Si on est au dÃ©but de l'application
        if (this.indice === 0) {

            // Si on est revenu au dÃ©but on test si ca on peut faire une requete
            if ((new Date().getTime() - this.last_request) > 120000) {

                // On stocke la nouvelle requete
                this.last_request = new Date().getTime();

                // On lance la requÃªte
                this.zone_concerne.request();

            }

        }

        // On appelle le changement d'Ã©lÃ©ment
        this.goto(this.indice);

    },
    /**
     *	Passage Ã  l'Ã©lÃ©ment prÃ©cÃ©dent
     *
     *	Le passage Ã  l'Ã©lÃ©ment prÃ©cÃ©dent ne peut se
     *	faire que si le comportement est en route. Sinon
     *	elle ne fait rien. Lorsque la boucle au dÃ©but
     *	(indice Ã©gal Ã  0), elle retourne Ã  la fin des
     *  informations de la zone.
     */
    before: function() {

        // SÃ©curitÃ©
        this.securiteInfosZone();

        // On incrÃ©mente l'indice
        this.indice = (this.indice - 1) % this.zone_concerne.getInfos().length;

        // Test si l'indice est passÃ© en nÃ©gatif
        if (this.indice < 0)
            this.indice = this.zone_concerne.getInfos().length - 1;

        // On appelle le changement d'Ã©lÃ©ment
        this.goto(this.indice);

    },
    /**
     *	Changement d'Ã©lÃ©ment Ã  l'indice donnÃ©
     *
     *	Cette fonction doit Ãªtre obligatoirement appelÃ©e
     *	avant loop. Elle sert de sÃ©curitÃ© pour Ã©viter
     *	tout type d'erreur dans la boucle.
     *
     *	Exception renvoyÃ©e :
     *
     *		- Aucune zone n'est dÃ©finie
     *		- Aucune informations dans la zone
     *		- Aucune informatinos dans l'indice donnÃ©
     *
     *	Cette fonction peut Ãªtre appelÃ©e n'importe oÃ¹ et
     *	n'importe quand.
     */
    goto: function(indice) {

        // SÃ©curitÃ©
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // Test si l'indice existe dans les informations donnÃ©es par la zone
        if (typeof self.zone_concerne.getInfos()[indice] !== 'undefined') {

            // On stocke l'indice
            self.indice = indice;

            // On change l'Ã©lÃ©ment
            self.loop();

        } else
            // CrÃ©ation d'une exeception
            throw new Exception("[moteur/class/comportement.js] goto", "L'information Ã  l'indice donnÃ©e n'a pas Ã©tÃ© trouvÃ©e.");

    },
    /**
     *	Met en pause le comportement
     *
     *	Le comportement est en pause et ne bougera plus
     *	tant que la fonction run n'est pas appelÃ©e. Pour
     *	cela la fonction rÃ©initialise le timeout de la 
     * 	boucle et passe la variable marche Ã  false.
     */
    pause: function() {

        // On rÃ©initialise
        this.marche = false;

        // On clear le timeout
        this.clear();

    },
    /**
     *	Lance le comportement
     *
     *	Cette fonction est lancÃ©e que si le comportement
     *	est arrÃªtÃ©e. Elle repasse la variable marche Ã 
     * 	true et appelle la fonction goto Ã  l'indice oÃ¹
     *	le comportement s'Ã©tait arrÃªtÃ©.
     */
    run: function() {

        // Si on est pas dÃ©jÃ  en route
        if (!this.isRunning()) {

            // Changement
            this.marche = true;

            // On appelle le changement d'Ã©lÃ©ment
            this.goto(this.indice);

        }

    },
    /**
     *	Clear le comportement
     *
     *	Clear uniquement les timeouts du comportement. 
     *	Cette fonction n'intervient pas dans la boucle 
     *	next -> goto.
     */
    clear: function() {

        // Clear le timeout principal
        clearTimeout(this.timeout);

    },
    /**
     *	Reset le comportement
     *
     *	Reset juste l'indice de navigation. Si le 
     *	comportement est en route, il continuera. Si
     * 	vous dÃ©sirez arrÃªter le comportement, utilisez
     *	la fonction stop.
     */
    reset: function() {

        // On rÃ©initialise l'indice
        this.indice = 0;

    },
    /**
     *	Stop complÃ¨tement le comportement
     *
     *	Cette fonction stoppe complÃ¨tement le 
     *	comportement et le remet au dÃ©but. Pour
     *	redÃ©marrer, utilisez la mÃ©thode run.
     */
    stop: function() {

        // On rÃ©initialise l'indice
        this.reset();

        // On rÃ©initialise
        this.marche = false;

        // On clear le timeout
        this.clear();

    },
    /**
     *	Getter variable marche
     *
     *	Return true if the behaviour is running or false
     *  if it not.
     */
    isRunning: function() {

        // Retourne la valeur de la variable marche
        return this.marche;

    },
    /**
     *	Boucle du comportement
     *
     *	La boucle sert Ã  changer les Ã©lÃ©ments d'une zone par 
     *	rapport aux informations que contient la zone. Pour 
     *	cela, elle rÃ©cupÃ¨re les enfants de la zone et compare
     *	leur id au tableau info de la zone. Si un id n'est 
     *	pas dÃ©fini, alors on cache l'Ã©lÃ©ment.
     */
    loop: function() {

        // SÃ©curitÃ©
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // On clear tout d'abord les timeouts stockÃ©s
        this.clear();

        // On rÃ©cupÃ¨re les informations
        var info = self.zone_concerne.getInfos()[self.indice];

        // On change le content
        self.zone_concerne.changeContent(info);

        // On test si le comportement est en marche
        if (self.isRunning()) {
            self.timeout = setTimeout(function() {
                self.next();
            }, info.time * 1000);
        }

    },
    /**
     *	Fonction de sécurité lié à la zone
     *
     *	Evite les erreurs 'undefined'. Teste si la zone est prête à être 
     *	utilisée. Malgré qu'il existe une fonction dédié à la modification de la 
     *	zone, on peut quand même la modifiée directement.
     */
    securiteZone: function() {

        // Test si la zone est définie
        if (typeof this.zone_concerne === 'undefined') {
            throw new Exception(
                new Error().fileName, 
                "L'élément donné n'est pas défini",
                new Error().lineNumber
            );
        }

        // Test si la zone est null
        if (this.zone_concerne === null) {
            throw new Exception(
                new Error().fileName, 
                "L'élément donné ne peut pas être égal à null", 
                new Error().lineNumber
            );
        }

        // Test si la zone est bien du type Zone
        if (!(this.zone_concerne instanceof Zone)) {
            throw new Exception(
                new Error().fileName, 
                "L'élement donné doit être une zone", 
                new Error().lineNumber
            );
        }
        
    },
    /**
     *	Fonction de sÃ©curitÃ© liÃ© aux infos de la 
     *	zone
     *
     *	Evite les erreurs 'undefined'. Teste si les
     *	informations transmises par la fonction
     *	getInfos sont correctes est prÃªtes Ã  Ãªtre 
     *	utilisÃ©es.
     */
    securiteInfosZone: function() {

        // SÃ©curitÃ© zone
        this.securiteZone();

        // Test si les informations sont corrects
        if (this.zone_concerne.getInfos() === 'undefined' || this.zone_concerne.getInfos() === null) {
            
            // CrÃ©ation de l'exception
            throw new Exception(
                new Error().fileName, 
                "Les informations de la zone ne sont pas correct", 
                new Error().lineNumber
            );
            
        }

    },
    /**
     *	Setter de la zone
     *
     *	Permet de chancer la zone du comportement. 
     *
     *	/!\ Cette fonction doit Ãªtre appelÃ©e lors du 
     *	lancement du comportement sous peine d'avoir 
     *	une erreur critique.
     */
    setZone: function(nouvelle_zone) {

        // Stockage de la nouvelle zone
        this.zone_concerne = nouvelle_zone;

        // SÃ©curitÃ©
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
 *  EnlÃ¨ve l'animation d'une zone
 */
function enleverAnimation(id) {

    $(id).setStyle({
        transition: "none"
    });

}

