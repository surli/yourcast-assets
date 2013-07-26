/*
 * 	Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 * 	All rights reserved. This program and the accompanying materials
 * 	are made available under the terms of the GNU Public License v3.0
 * 	which accompanies this distribution, and is available at
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * 	Contributors:
 * 		Simon Urli (simon.urli@gmail.com) - Main contributor
 *	 	Golfieri Guillaume (golfieri.guillaume@gmail.com)
 */

// Création de la zone
var Zone = Class.create({
    
    /* 
     *	Constructeur par défaut d'une zone.
     *
     *		@param id               - Identifiant html de la zone                   - (OBLIGATOIRE)
     *		@param map_renderers 	- La map des renderers                          - (OBLIGATOIRE)
     *		@param map_time         - Le temps d'affichage des chaque renderer
     *		@param url_data 	- Le lien vers le fichier JSon de données       - (OBLIGATOIRE)
     *		@param behavior 	- Le comportement de la zone 			- (FONCTION ou CLASSE)
     *		@param request_timeout 	- Le temps minimal entre deux requêtes JSon
     *		@param url_conf 	- Le lien vers la configuration
     *		@param map_order 	- L'ordre des renderers dans la zone
     */
    initialize: function(id, map_renderers, map_time, url_data, behavior, request_timeout, url_conf, map_ordre) {

        /***************************************************************
         *	STEP 1 - TEST DES PARAMETRES OBLIGATOIRES
         *		- id
         *		- url_data
         *		- map_renderers
         ***************************************************************/

        // Test si l'id est defini, est une chaîne et est déclaré dans la page html
        if (id && !is_empty(id) && document.getElementById(id) !== null) {

            // On stocke l'identifiant
            this.id = id;

            // On récupère le div html
            this.divMarquee = $(id);

            // On récupère le code de départ
            this.htmlinit = this.divMarquee.innerHTML;
            this.map_time = map_time;

        }

        // Paramètre obligatoire donc s'il y a une erreur on lève une exception
        else {
            throw new Exception("[Controler de la zone] initialize", "L'identifiant html de la zone est incorrect : " + id);
        }

        // Test si l'url est défini, est une chaîne et est déclaré dans la page html
        if (map_renderers && !is_empty(map_renderers) && typeof map_renderers === "object") {

            // On stocke l'identifiant
            this.map_renderers = map_renderers;

        }

        // Paramètre obligatoire donc s'il y a une erreur on lève une exception
        else {
            throw new Exception("[Controler de la zone] initialize", "La map des renderers est incorrect.");
        }

        // Test si l'url est défini, est une chaîne et est déclaré dans la page html
        if (url_data && !is_empty(url_data) && url_data !== "") {

            // On stocke l'identifiant
            this.url = DOMAIN_PATH + url_data;

        }

        // Paramètre obligatoire donc s'il y a une erreur on lève une exception
        else {
            throw new Exception("[Controler de la zone] initialize", "L'url des données est incorrect.");
        }

        /***************************************************************
         *	STEP 2 - RECUPERATION DE LA CONFIGURATION
         *	
         *	Requête à l'url de configuration si elle est remplie
         *	sinon on reprend la configuration comme dans les versions
         *	antérieurs.
         ***************************************************************/

        // Stocke le this
        var self = this;

        // Test si l'url de la configuration est remplie
        if(!is_empty(url_conf) && url_conf) {

            // Effecture la requête Ajax
            new Ajax.Request(url_conf, {
                
                // On utilise un get
                method: 'get',

                // Si la requête est un succès
                onSuccess: function(transport) {
                    
                    // On vérifie que le status est bon
                    if (transport.status === 200) {

                        // On récupère la réponse du JSon
                        var textContent = transport.responseText;

                        // On essaie de le traiter
                        try {
                            
                            // On parse le JSon
                            var json_conf = JSON.parse(textContent);

                            // Si la zone est la zone principale
                            self.is_master = typeof json_conf.isMaster === 'undefined' ? false : json_conf.isMaster;
                            
                            // Test du timeout
                            self.request_timeout = typeof json_conf.requestTimeout === 'undefined' ? 60000 : json_conf.requestTimeout;

                            // Test si l'ordre des renderers a été donné
                            if (typeof json_conf.mapOrder !== 'undefined' ) {

                                // On initialise le tableau de renderers
                                self.tab_renderers = new Array();

                                // On récupère tous les renderers
                                for (var cle in json_conf.mapOrder) {
                                    self.tab_renderers.push(cle);
                                }

                                // On trie le tableau des renderers
                                self.tab_renderers.sort(function(a, b) {
                                    return json_conf.mapOrder[a] - json_conf.mapOrder[b];
                                });

                            }

                             // Stocke le temps d'affichage de chaque renderers
                            if (typeof json_conf.mapTime !== 'undefined') {
                            	 self.map_time = json_conf.mapTime;
                            }
                        }

                        // Un erreur est survenue
                        catch (e) {
                            
                            throw new Exception("[Controler de la zone] Constructeur", "Le fichier JSon de configuration n'est pas correct."+e);
                            
                        }
                    
                    }
                    
                },

                onFailure: function(transport) {

                    // Création d'une exception
                    throw new Exception("[Controler de la zone] Constructeur", "L'url de la configuration n'est pas correct (" + transport + ") donc le chargement se fera par rapport aux paramètres.");

                }

            });

        } 
        
        else {

            // Création d'une exception
            new Information("[Controler de la zone] Constructeur", "Pas de lien de configuration donné pour la zone " + id + " donc le chargement se fera par rapport aux paramètres.");

            // Si la zone est la zone principale
            this.is_master = false;

            // Test du timeout
            this.request_timeout = typeof request_timeout === 'undefined' ? DEFAULT_REQUEST_TIMEOUT : request_timeout;

            // Test si l'ordre des renderers a été donné
            if (typeof map_ordre !== 'undefined' && map_ordre !== null) {

                // On initialise le tableau de renderers
                this.tab_renderers = new Array();

                // On récupère tous les renderers
                for (var cle in map_ordre) {
                    this.tab_renderers.push(cle);
                }

                // On trie le tableau des renderers
                this.tab_renderers.sort(function(a, b) {
                    return map_ordre[a] - map_ordre[b];
                });

            }

            // Stocke le temps d'affichage de chaque renderers
            this.map_time = map_time;
            
        }

        /***************************************************************
         *	STEP 3 - INITIALISATION
         *	
         *	Initialisation de tout ce qui n'est pas obligatoire
         *	dans les paramètres et des toutes les variables 
         *	nécessaires au bon déroulement de la zone.
         ***************************************************************/

        // Test si le comportement est défini
        if (behavior instanceof Function || behavior instanceof Comportement) {

            // On stocke le comportement
            this.comportement = behavior;

        }

        // Sinon on met le comportement par défaut
        else {

            // On stocke le comportement par défaut
            this.comportement = new Comportement();

        }

        // Informations de la zone
        this.infoList = new Array();

        // Nombre d'informations dans la zone
        this.counterInfo = 0;

        // Tableau des images
        this.array_img = {};

        // Nombre d'images chargées
        this.img_loaded = 0;

        // Définition du timeout
        this.timeout = null;

        // Tableau de timeout
        this.timeout_list = {};

    },
            
    // function call to load the image before the launch
    loadImage: function(imgsrc) {
        try {
            this.array_img[imgsrc] = new Image();
            var self = this;
            this.array_img[imgsrc].onload = function() {
                self.incrementImageLoadedAndLaunchBehaviour();
            };
            this.array_img[imgsrc].src = imgsrc;
        } catch (err) {
            new Exception("[Controler de la zone] LoadImage", err);
        }
    },
            
    // increment the number of images we need to load
    incrementImageLoadedAndLaunchBehaviour: function() {
        this.img_loaded++;
        if (this.imagesAreLoaded())
            this.initBehaviour();

    },
    // define if the images are loaded
    imagesAreLoaded: function() {
        return Object.keys(this.array_img).length === this.img_loaded;
    },
            
    /**
     *	Put the infos in the infoList of the zone for the behavior
     *	@param dico Dictionnaire du renderer.
     */
    pushInfo: function(dico) {

        // Test si le dictionnaire est correct
        if(!dico && is_empty(dico)) {
            throw new Exception("[Controler de la zone] pushInfo", "Le dictionnaire poussé n'est pas correct.");
        }

        // Tout va bien
        else {
            
            // On rajoute une information au dico pour savoir � quoi correspond
            // l'information ajout�e
            dico.callId = this.cle;

            // Ajoute la nouvelle info au tableau des données
            this.infoList.push(dico);

            // On incrémente le nombre de données
            this.counterInfo++;

        }

    },
    /**
     *	Change content
     *
     *	Cette fonction change le contenu d'une zone. Si "_content" existe elle mettra
     *	ce qui existe dans info.content dedans, sinon elle le mettra dans la continuité
     *	de la zone.
     *
     *	Ensuite elle s'occupera de tous les paramètres et testera s'il existe un id
     *	correspondant. Si tel est le cas, elle mettra les informations contenues 
     *	dedans.
     */
    changeContent: function(info) {

        // S'il n'existe pas alors, on ajoute le content directement dans la zone
        if (!($(this.id + "_content"))) {
            if (info.content && info.content !== "")
                this.divMarquee.innerHTML = this.htmlinit + info.content;
        }

        // Boucle sur les clés de l'info
        for (var cle in info) {

            // Test si l'info est un texte
            if(typeof info[cle] === "string") {

                // Stockage de l'enfant
                var tmp = $(this.id + "_" + cle);

                if (tmp) {

                    // On change le contenu
                    tmp.update(info[cle]);

                }

            }

        }

    },
    /**
     *	Add Content
     *
     *	Permet d'ajouter du contenu au content d'une zone. On peut l'ajouter selon
     *	deux manières. La première en ajoutant l'html avant le content et la deuxième 
     *	en ajoutant l'html après le content.
     */
    addContent: function(html, order_content) {

        // Récupération du content
        if ($(this.id + "_content"))
            var content = document.getElementById(this.id + "_content");
        else
            var content = document.getElementById(this.id);

        // Pas d'inversement dans l'ajout des données
        if (typeof order_content === 'undefined')
            content.innerHTML = content.innerHTML + html;

        // Inversement dans l'ajout des données
        else
            content.innerHTML = html + content.innerHTML;

    },
    // set the zone to master for the loading state
    set_master: function() {
        this.is_master = true;
    },
    /*
     * This function is called by the callback of the request.
     * It prepares the datas to be used by the behaviour. Then it launches the behaviour function.
     */
    initBehaviour: function() {

        // On stocke le this
        var self = this;

        // On test si les images sont chargés et que on a des infos à afficher
        if (self.imagesAreLoaded()) {

            // Suppression du logo
            if (this.is_master)
                $('logo_loading').hide();

            // On lance le comportement
            self.runComportement();

        }

    },
    /*
     * Callback function of the request : transport is an object given by the request
     * It uses the map of renderers to call the appropriate renderer function for each information, then it put the results in document and launches behaviour.
     */
    receive: function() {

        // On stocke le this
        var self = this;

        // On reset la zone
        this.reset_zone();

        // On regarde si le fichier JSon contient des informations
        if (this.json.informations && this.json.informations.length !== 0) {

            // On affiche la zone
            self.afficherZone();

            // On test si le tableau de renderers n'est pas indéfini
            if (typeof this.tab_renderers !== 'undefined') {

                // Récupération des éléments du JSon
                var elements = new Array();

                // Boucle sur les informations recues
                for (var indice = 0; indice < this.json.informations.length; indice++) {

                    // On stocke ces éléments
                    elements.push(this.json.informations[indice]);

                }

                // On ajoute les infos aux renderers
                for (i = 0; i < this.tab_renderers.length; i++) {

                    // Stocke la clé
                    var cle = this.tab_renderers[i];

                    // On boucle sur les éléments du JSon
                    for (var cpt in elements) {

                        // On test si la clé existe dans le JSon
                        if (elements[cpt][cle]) {

                            // On boucle sur chaque information que contient le JSon sur la clé
                            for (var index = 0; index < elements[cpt][cle].length; index++) {

                                try {
                                    this.lancer_render(cle, elements[cpt][cle][index]);
                                } catch (exception) { }

                            }

                        }

                    }

                }

            }

            else {

                for (var indice = 0; indice < this.json.informations.length; indice++) {

                    var elements = this.json.informations[indice];

                    for (var cle in this.map_renderers) {

                        if (elements[cle]) {

                            for (var index = 0; index < elements[cle].length; index++) {
                                
                                try {
                                    this.lancer_render(cle, elements[cle][index]);
                                } catch (exception) { }

                            }

                        }

                    }

                }

            }

        } else {

            // On reset la zone
            this.reset_zone();

        }

        // On initialise le comportement
        this.initBehaviour();

    },
    /**
     *	Cette méthode récupère le fichier des alertes grâce à une requête AJAX et envoie à la fonction receive 
     *	ce qu'elle a obtenue pour analyse.
     */
    request: function() {

        // Stocke le this
        var self = this;

        // On arrête le comportement
        self.stopComportement();

        // Effecture la requête Ajax
        new Ajax.Request(this.url, {
            
            // On utilise un get
            method: 'get',
            
            // Si la requête est un succès
            onSuccess: function(transport) {

                // On vérifie que le status est bon
                if (transport.status === 200) {

                    // On récupère la réponse du JSon
                    var textContent = transport.responseText;

                    // On essaie de le traiter
                    try {
                        var json = JSON.parse(textContent);

                        // On stocke le nouveau JSon
                        self.json = json;

                        // On appelle la méthode receive
                        self.receive();

                    }

                    // Un erreur est survenue
                    catch (e) {
                        console.log(e);

                        // On stop le comportement
                        self.comportement.stop();

                    }

                } else {

                    // Création d'une exception
                    throw new Exception("[moteur/js/controler_zone.js] request", transport.statusText);

                }
            },
            onFailure: function(transport) {

                // Création d'une exception
                throw new Exception("[moteur/js/controler_zone.js] Request", transport);

            },
            onException: function(transport, exception) {

                // Création d'une exception
                throw new Exception("[moteur/js/controler_zone.js] Request", exception.message);

            },
            onComplete: function(transport) {

                // TODO Relancer le comportement

            }

        });

    },
    /**
     *	Cette méthode permet d'afficher la zone entière.
     *
     *	Dans cette méthode, on peut définir plusieurs
     *	éléments à afficher qui peuvent être en relation
     *	avec la zone en plus de la zone.
     */
    afficherZone: function() {

        // On affiche la zone
        $(this.id).show();

    },
    /**
     *	Cette méthode permet de cacher la zone entière.
     *
     *	Dans cette méthode, on peut définir plusieurs
     *	éléments à cacher qui peuvent être en relation
     *	avec la zone en plus de la zone.
     */
    cacherZone: function() {

        // On cache la zone
        $(this.id).hide();

    },
    /**
     *	Cette méthode permet de cacher la zone entière.
     *
     *	Dans cette méthode, on peut définir plusieurs
     *	éléments à cacher qui peuvent être en relation
     *	avec la zone en plus de la zone.
     */
    runComportement: function() {

        // Stocke le this
        var self = this;

        // On test si c'est une classe ou une fonction
        if (self.comportement instanceof Comportement) {

            // On test si la zone est entré
            if (self.comportement.zone_concerne === null) {

                // On lui donne la zone en question
                self.comportement.setZone(self);

            }

            // On clear le comportement
            self.comportement.run();

        } else {

            // Clear le timeout
            self.clear_timeout("timeoutBehav");

            // Si le timeout est null
            if (self.timeout === null)
                // timeout on the request
                self.timeout = setInterval(function() {
                    self.request();
                }, self.request_timeout);

            // S'il est maître
            if (self.is_master)
                // hide the logo loading
                document.getElementById("logo_loading").style.display = 'none';

            // Lance la fonction
            self.comportement(self, true);

        }

    },
    /**
     *	Cette méthode permet de cacher la zone entière.
     *
     *	Dans cette méthode, on peut définir plusieurs
     *	éléments à cacher qui peuvent être en relation
     *	avec la zone en plus de la zone.
     */
    stopComportement: function() {

        // Stocke le this
        var self = this;

        // On test si c'est une classe ou une fonction
        if (self.comportement instanceof Function) {

            // Clear le timeout
            self.clear_timeout("timeoutBehav");

        }

        else {

            // On clear le comportement
            self.comportement.pause();

        }

    },
    /**
     *	Cette méthode permet de reset la zone entière.
     *
     *	Lorsque le comportement est en marche, il vaut mieux la stopper 
     *	pour éviter des erreurs.
     *	Ce reset n'est pas effectué lorsque l'application est en pause.
     */
    reset_zone: function() {

        // Retro-compatibilité
        this.stopComportement();
        this.infoList = new Array();
        this.changeContent("");
        this.counterInfo = 0;
        this.img_loaded = 0;
        this.array_img = {};

    },
    lancer_render: function(cle, element) {

        // Stockage de la cl� en cours
        this.cle = cle;

        // On appelle la fonction du render
        try {

            // Test si le map_time existe
            if (typeof this.map_time === 'undefined')
                this.map_renderers[cle](element, this);

            // Sinon
            else
                this.map_renderers[cle](element, this, this.map_time[cle]);

        } catch (err) {
            
            // Création d'une exeception
            throw new Exception("[Controler de la zone] Lancer_Render", err);
            
        }

    },
    // stop the request by the delete of the interval
    stop_request: function() {
        if (this.timeout)
            clearInterval(this.timeout);
    },
    // function for manage the timeout
    set_timeout: function(name, func, time) {

        // if the timeout exist, it is cleared
        if (this.timeout_list[name]) {
            this.clear_timeout(name);
        }

        //if the debug is in verbose
        if (debug.type == "verbose") {
            var self = this;
            // function for the timeout with the message to store for debug
            var f = function() {
                func();
                var msg = "creation of the timeout : " + name + " on " + self.id;
                debug.add_message(msg);
            };
        }

        // TODO
        if (debug.type == "silent") {
            var f = function() {
                func();
            };
        }

        // creation of the timeout
        var t = setTimeout(f, time);
        //storage of the timeout in the timeout_list
        this.timeout_list[name] = t;
    },
    // function to clear a timeout
    clear_timeout: function(name) {

        if (debug.type == "verbose") {
            var msg = "delete the timeout : " + name;
            debug.add_message(msg);
        }
        if (this.timeout_list[name]) {
            clearTimeout(this.timeout_list[name]);
        }
    },
    getInfos: function() {
        return this.infoList;
    }

});



// =================================================== 
//  Création de la classe de debug
// =================================================== 

var Debug = Class.create({
    initialize: function(type) {
        this.type = type;
        this.list_msg = new Array();
    },
    add_message: function(msg, date) {
        var str = "MSG: " + msg + " | Date : " + new Date();
        console.debug(str);
        this.list_msg.push(str);
    }
});

//create the debug element with the type for argument (VERBOSE_DEBUG or SILENT_DEBUG)
//var debug = new Debug(SILENT_DEBUG);

// for the tests Unit there is a bug ONLY ON CHROME, debug doesn't work with the global SILENT and VERBOSE
var debug = new Debug("silent");