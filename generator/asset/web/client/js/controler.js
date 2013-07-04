/*
 * Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/gpl.html
 *
 * Contributors:
 *    Simon Urli (simon.urli@gmail.com) - Main contributor
 */

loadScript(JS_ROOT + "/comportement.js");
loadScript(JS_ROOT + "/exception.js");

var Zone = Class.create({	

	/* 
	 * Constructor to an object Zone. It takes :
	 * - An id: must be coherent with the HTML (if the given id is 'foo' the html must contain an element with the id 'foo': <div id='foo'>)
	 * - A map given the binding between informations and renderers functions to use (e.g: { 'myJsonKey': my_renderer_to_use })
	 * - The URL of the service given json informations 
	 * - A pointer on a behaviour class
	 * - Plus la hauteur est grande et plus le calque sera en haut.
	 */
	initialize: function(id, map_renderers, map_time, url, anim_func, request_timeout, map_ordre, order_content) {
		
	    // Si un des paramètres n'est pas défini
	    if(typeof id === 'undefined')
	        throw new Exception("[moteur/js/controler_zone.js] initialize", "L'id n'est pas défini.");

	    if(typeof url === 'undefined')
	        throw new Exception("[moteur/js/controler_zone.js] initialize", "L'url n'est pas défini.");

    	if(typeof anim_func === 'undefined')
	        throw new Exception("[moteur/js/controler_zone.js] initialize", "Le comportement n'est pas défini.");

	    // Récupération de l'élément html
		if(document.getElementById(id) != null) {

            this.divMarquee = $(id);
            this.htmlinit = this.divMarquee.innerHTML;

			// On stocke l'id de la zone
			this.id = id;

        }
        // Sinon Exception
        else {
        	throw new Exception("[moteur/js/controler_zone.js] initialize", "L'id de la zone n'a pas été trouvée dans le code html.");	
        }

		// Test si le comportement est une fonction ou une classe
		if(anim_func instanceof Function || anim_func instanceof Comportement)
			this.comportement = anim_func;
		else
			throw new Exception("[moteur/js/controler_zone.js] initialize", "La variable anim_func doit être un comportement.");

		// Test si l'ordre des renderers a été donné
		if(typeof map_ordre !== 'undefined' && map_ordre != null) {

			// On initialise le tableau de renderers
			this.tab_renderers = new Array();

			// On récupère tous les renderers
			for(var cle in map_ordre) {
				this.tab_renderers.push(cle);
			}

			// On trie le tableau des renderers
			this.tab_renderers.sort(function(a, b) {
				return map_ordre[a] - map_ordre[b];
			});

		}

		this.map_renderers = map_renderers;

		// Stocke l'inversement ou non lors de l'ajout d'un content
		this.order_content = typeof order_content === 'undefined' ? false : order_content;

		// Stocke le temps d'affichage de chaque renderers
		this.map_time = map_time;
		
		// we can't do cross-site request, so we don't give complete URL, just the path
		this.url = DOMAIN_PATH + url;

		// Elements of the zone
		this.infoList = new Array();
		this.last_request = 0;
		
		// initialize the counter of informations
		this.counterInfo = 0; 
		
		this.img_loaded = 0;
		this.array_img = {};

		// Savoir si la zone est maître		
		this.is_master = false;

		// Définition du timeout
		this.request_timeout = typeof request_timeout !== 'undefined' ? request_timeout : DEFAULT_REQUEST_TIMEOUT;
		this.timeout = null;
		this.timeout_list = {};

		// Initialise le content à rien
		this.changeContent("");

	},
	
	// function call to load the image before the launch
	loadImage: function(imgsrc) {
		this.array_img[imgsrc] = new Image();
		var self = this;
		this.array_img[imgsrc].onload = function() {self.incrementImageLoadedAndLaunchBehaviour();};
		this.array_img[imgsrc].src = imgsrc;
	},
	
	// increment the number of images we need to load
	incrementImageLoadedAndLaunchBehaviour: function() {
		this.img_loaded++;
		if (this.imagesAreLoaded())
			this.initBehaviour();
		
	},
	
	// define if the images are loaded
	imagesAreLoaded: function() {
		return Object.keys(this.array_img).length == this.img_loaded;
	},
	
	/**
	 *	Put the infos in the infoList of the zone for the behavior
	 */
	pushInfo: function(dico) {

		// Ajoute la nouvelle info au tableau des données
		this.infoList.push(dico);
		
		// On incrémente le nombre de données
		this.counterInfo++;

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
	 	if(!($(this.id + "_content"))) {
	 		if(info.content && info.content != "")
	 			this.divMarquee.innerHTML = this.htmlinit + info.content;
		}

	 	// Boucle sur les clés de l'info
	 	for(var cle in info) {

	 		// Stockage de l'enfant
	 		var tmp = $(this.id + "_" + cle);
	
    		if(tmp) {

    			// On change le contenu
    			tmp.update(info[cle]);

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
	 	if($(this.id + "_content"))
			var content = document.getElementById(this.id + "_content");
		else
			var content = document.getElementById(this.id);

		// Pas d'inversement dans l'ajout des données
		if(typeof order_content === 'undefined')
			content.innerHTML = content.innerHTML + html;
		
		// Inversement dans l'ajout des données
		else
			content.innerHTML = html + content.innerHTML;

	},

	// set the zone to master for the loading state
	set_master: function(val) {
		this.is_master = true;
	},
	
	/*
	 * This function is called by the callback of the request.
	 * It prepares the datas to be used by the behaviour. Then it launches the behaviour function.
	 */
	initBehaviour : function() {

		// On stocke le this
		var self = this;

		// On test si les images sont chargés et que on a des infos à afficher
		if (self.imagesAreLoaded()) {

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
			if(typeof this.tab_renderers !== 'undefined') {

				// Récupération des éléments du JSon
				var elements = new Array();

				// Boucle sur les informations recues
				for (var indice = 0; indice < this.json.informations.length ; indice++) {

					// On stocke ces éléments
					elements.push(this.json.informations[indice]);

				}

				// On ajoute les infos aux renderers
				for (i = 0 ; i < this.tab_renderers.length ; i++) {

					// Stocke la clé
					var cle = this.tab_renderers[i];

					// On boucle sur les éléments du JSon
					for(var cpt in elements) {

						// On test si la clé existe dans le JSon
						if (elements[cpt][cle]) {

							// On boucle sur chaque information que contient le JSon sur la clé
							for (var index = 0; index < elements[cpt][cle].length ; index++) {
									
								this.lancer_render(cle, elements[cpt][cle][index]);

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

								this.lancer_render(cle, elements[cle][index]);
								
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
			method:'get',

			// Si la requête est un succès
			onSuccess: function(transport) {

				// On vérifie que le status est bon
				if (transport.status == 200) {

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

						// On cache la zone
						self.cacherZone();
					}

				} else {

					// Création d'une exception
					throw new Exception("[moteur/js/controler_zone.js] request", transport.statusText);

				}
			},

			onFailure: function(transport) { 

				// On cache la zone
				self.cacherZone();

				// Création d'une exception
				throw new Exception("[moteur/js/controler_zone.js] request", "La requête vers l'url donné a échouée.");

			},

			onException: function(transport, exception) {

				// Création d'une exception
				throw new Exception("[moteur/js/controler_zone.js] request", exception.message);

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
		if(self.comportement instanceof Comportement) {

			// On test si la zone est entré
			if(self.comportement.zone_concerne == null) {

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
				self.timeout = setInterval(function() { self.request(); }, self.request_timeout);
			
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
		if(self.comportement instanceof Function) {

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

		// On appelle la fonction du render
		try {

			// Test si le map_time existe
			if(typeof this.map_time === 'undefined')
				this.map_renderers[cle](element, this);

			// Sinon
			else
				this.map_renderers[cle](element, this, this.map_time[cle]);

		} catch(err) {

			debug.add_message("Error in loading renderer : " + cle + " : " + err);
			
		}

	},

	// stop the request by the delete of the interval
	stop_request: function() {
		if(this.timeout)
			clearInterval(this.timeout);
	},
	
	// function for manage the timeout
	set_timeout: function(name, func, time){
		
		// if the timeout exist, it is cleared
		if(this.timeout_list[name]){
			this.clear_timeout(name);
		}
		
		//if the debug is in verbose
		if(debug.type == "verbose"){
			var self=this;
			// function for the timeout with the message to store for debug
			var f = function(){
				func();
				var msg = "creation of the timeout : "+name+" on "+self.id;
				debug.add_message(msg);
			};
		}
		
		// TODO
		if(debug.type == "silent"){var f = function(){func();};}
		
		// creation of the timeout
		var t = setTimeout(f, time);
		//storage of the timeout in the timeout_list
		this.timeout_list[name] = t;
	},
	
	// function to clear a timeout
	clear_timeout: function(name){
		
		if(debug.type == "verbose"){
			var msg = "delete the timeout : "+name;
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
		var str = "MSG: "+msg+" | Date : "+new Date();
		console.debug(str);
		this.list_msg.push(str);
	}
});

//create the debug element with the type for argument (VERBOSE_DEBUG or SILENT_DEBUG)
//var debug = new Debug(SILENT_DEBUG);

// for the tests Unit there is a bug ONLY ON CHROME, debug doesn't work with the global SILENT and VERBOSE
var debug = new Debug("silent");