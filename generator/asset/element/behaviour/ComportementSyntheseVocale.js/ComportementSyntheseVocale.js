/**
 *	<b>Rights :</b>
 *              
 * 		Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *              
 * 		All rights reserved. This program and the 
 *		accompanying materials are made available under the 
 *		terms of the GNU Public License v3.0 which accompanies 
 *		this distribution, and is available at
 * 		http://www.gnu.org/licenses/gpl.html
 *              
 *	<b>Informations :</b>
 *              
 *		Cette classe correspond au comportement du client vocale. Celui
 *		ci possède des fonctions et un algorithme particuliers. 
 *		
 *	<b>Bind des touches :</b>
 *	
 *	
 *      
 *	<b>Versions :</b>
 *
 *		1.0.0 : Création d'une classe fonctionnelle.
 *
 *	<b>Contributors :</b>
 *
 *		Simon Urli (simon.urli@gmail.com)
 *		Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

loadScript(BEHAVIOUR_PATH + "/utils/SoundManager/script/soundmanager2-nodebug-jsmin.js");
loadScript(BEHAVIOUR_PATH + "/utils/YourcastVocale/YourcastVocale.js");

var ComportementSyntheseVocale = Class.create(Comportement, {
    /**
     *	Constructeur par défaut
     */
    initialize: function() {

        /** Zone concernée */
        this.zone_concerne = null;

        /** Indice actuel du comportement */
        this.indice = 0;

        /** Timeout du comportement */
        this.timeout = null;

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

        // On incrémente l'indice
        this.indice++;

        // On appelle le changement d'élément
        this.goto(this.indice);

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

        // On incrémente l'indice
        this.indice = (this.indice - 1) % this.zone_concerne.getInfos().length;

        // Test si l'indice est passé en négatif
        if (this.indice < 0)
            this.indice = this.zone_concerne.getInfos().length - 1;

        // On appelle le changement d'élément
        this.goto(this.indice);

    },
    /**
     *	Changement d'élément à l'indice donné
     *
     *	Cette fonction doit être obligatoirement appelée
     *	avant loop. Elle sert de sécurité pour éviter
     *	tout type d'erreur dans la boucle. Elle permet 
     *	notamment de trouver un indice correct pour la 
     *	prochaine boucle.
     *
     *	@param indice Indice à afficher
     */
    goto: function(indice) {

        // Sécurité
        this.securiteInfosZone();

        // Indice à lire
        var info_trouve = false;

        // Boucle pour trouver le prochain élément à écouter
        for(var i = indice ; i < this.zone_concerne.getInfos().length ; i++) {

            // Test si l'information est définie
            if (typeof this.zone_concerne.getInfos()[i] !== 'undefined') {
                
                // Test si le callId correspond à celui de la section
                if(this.zone_concerne.getInfos()[i].callId === this.section) {
                    info_trouve = true;
                    this.indice = i;
                    i = this.zone_concerne.getInfos().length;
                }
                
            }
            
        }

        // Test si un indice à été trouvé
        if(!info_trouve) {

            // On remet l'indice à 0
            this.indice = 0;

            // Fin du comportement
            this.marche = false;

            // On lance la requête
            this.zone_concerne.request();

            // Information au client
            if(indice > 0) {
                new Information("ComportementVocale.js", "Plus aucune information après l'indice " + indice, new Error().lineNumber);
            } else {
                new Information("ComportementVocale.js", "Aucun son sur cette clé", new Error().lineNumber);
            }

        }

        else {

            // On lance la loop
            this.loop();

        }
        
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
        this.clear();

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
        
        if(typeof window.self_evenement === 'undefined') {
            self_evenement = this;
            document.onkeydown = this.evenement;
        }
        
    },
    evenement: function(key) {
        
        // Test si la touche est entre 1 et 9
        if(key.keyCode > 96 && key.keyCode < 106) {
            
            // Numéro du renderer à écouter
            var num_renderer = key.keyCode - 97;
            var cpt = 0;
            
            // On parcours la map des renderers
            for(var cle in window.self_evenement.zone_concerne.map_renderers) {
                
                // Test si on a le bon numéro
                if(cpt === num_renderer) {
                    window.self_evenement.lancerSection(cle);
                }
                
                // On incrément le compteur
                cpt++;
                
            }
            
        }
        
    },
    /**
     *	Lance le comportement
     *
     *	Cette fonction est lancée que si le comportement
     *	est arrêtée. Elle repasse la variable marche à
     * 	true et appelle la fonction goto à l'indice où
     *	le comportement s'était arrêté.
     *	
     *	@param {type} section Clé du renderer
     */
    lancerSection: function(section) {

        // On stocke la section
        this.section = section;

        // Si on est pas déjà en route
        if (!this.isRunning()) {
console.log(section);
            // Changement
            this.marche = true;

            // On appelle le changement d'élément
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
     * 	vous désirez arrêter le comportement, utilisez
     *	la fonction stop.
     */
    reset: function() {

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
        this.reset();

        // On réinitialise
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
     * Boucle de la vocalisation
     */
    loop: function() {

        // Sécurité
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // On clear tout d'abord les timeouts stockés
        this.clear();

        // On récupère les informations
        var info = self.zone_concerne.getInfos()[this.indice];

        // Joue le son
        playSound(info, function() {
            this.timeout = setTimeout(function() { self.next(); }, 700);
        });
        
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