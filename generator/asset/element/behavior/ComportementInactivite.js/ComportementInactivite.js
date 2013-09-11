/**
 *  Rights :
 *
 *      Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 *      All rights reserved. This program and the 
 *      accompanying materials are made available under the 
 *      terms of the GNU Public License v3.0 which accompanies 
 *      this distribution, and is available at
 *      http://www.gnu.org/licenses/gpl.html
 *
 *  Informations :
 *
 *      Comportement par défaut.
 *
 *  Versions :
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Load le script d'apparition
loadScript(BEHAVIOUR_PATH + "/utils/YourcastAnim/apparition.js");

// Classe
var ComportementSmooth = Class.create(Comportement, {
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
        clearTimeout(this.timeout_fadeIn);
        clearTimeout(this.timeout_fadeOut);

        // On récupère les informations
        var info = this.zone_concerne.getInfos()[this.indice];

        // On change le content
        this.zone_concerne.changeContent(info);

        // Met le nouveau block en opacité 0
        if ($(this.zone_concerne.id + "_content")) {

            $(this.zone_concerne.id + "_content").setStyle({
                opacity: 0
            });

            // Transition d'apparition des informations
            this.timeout_fadeIn = setTimeout(function() {
                fadeIn(self.zone_concerne.id + "_content", info.time / 4, "linear");
            }, 1);
            this.timeout_fadeOut = setTimeout(function() {
                fadeOut(self.zone_concerne.id + "_content", info.time / 4, "linear");
            }, (1000 * 2.9 * info.time) / 4);

        }

        // On test si le comportement est en marche
        if (this.isRunning())
            self.timeout = setTimeout(function() {
                self.next();
            }, info.time * 1000);

    }

});

/**
 *  Rights :
 *
 *      Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 *      All rights reserved. This program and the 
 *      accompanying materials are made available under the 
 *      terms of the GNU Public License v3.0 which accompanies 
 *      this distribution, and is available at
 *      http://www.gnu.org/licenses/gpl.html
 *
 *  Informations :
 *
 *      La classe comportement alternance r�utilise la classe
 *      comportement et alterne deux styles diff�rends de
 *      couleur pour la maquette de Cl�ment Ader.
 *
 *  Versions :
 *
 *      1.0.0 : Cr�ation d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

var ComportementAlternanceSmooth = Class.create(ComportementSmooth, {
    /**
     *  Constructeur par d�faut
     *
     *  @param indice_debut : permet de pr�ciser le 
     *  d�but du comportement. Si aucune information
     *  n'est renseign�e, l'indice est �gal � 0. On
     *  stocke un indice pour l'aternance. Si l'indice
     *  est �gal � 0, le style est noir; si l'indice 
     *  est �gal � 1, le style est jaune.
     */
    initialize: function($super, nombre_alternance) {

        // Constructeur par d�faut
        $super();

        // Initialisation de l'indice d'alternance
        this.indice_alternance = 0;

        // Nombre d'alternance
        this.nombre_alternance = typeof nombre_alternance === 'undefined' ? 2 : nombre_alternance;

    },
    /**
     *  Passage � l'�l�ment suivant
     *
     *  Le passage � l'�l�ment suivant ne peut se faire
     *  que si le comportement est en route. Sinon elle
     *  ne fait rien. Lorsque la boucle arrive � la fin
     *  des informations de la zone, elle retourne au 
     *  d�but. Elle alterne deux styles diff�rends.
     */
    next: function($super) {

        // S�curit�
        this.securiteInfosZone();

        // Test si l'�l�ment est dans le tableau
        if (!this.zone_concerne.getInfos()[this.indice].alternance) {
            $super();
        }

        // Sinon on alterne
        else {

            // Test si on change d'indice
            if (this.indice_alternance === (this.nombre_alternance - 1)) {

                // On incr�mente l'indice
                this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

            }

            // On incr�mente l'indice alternance
            this.indice_alternance = (this.indice_alternance + 1) % this.nombre_alternance;

            // On change la couleur
            this.changeDesign();

            // Si on est au d�but de l'application
            if (this.indice === 0 && this.indice_alternance === 0) {

                // Si on est revenu au d�but on test si ca on peut faire une requete
                if ((new Date().getTime() - this.last_request) > 120000) {

                    // On stocke la nouvelle requete
                    this.last_request = new Date().getTime();

                    // On lance la requ�te
                    this.zone_concerne.request();

                }

            }

            // On appelle le changement d'�l�ment
            this.goto(this.indice);

        }

    }

});

/**
 *  Rights :
 *
 *      Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 *      All rights reserved. This program and the 
 *      accompanying materials are made available under the 
 *      terms of the GNU Public License v3.0 which accompanies 
 *      this distribution, and is available at
 *      http://www.gnu.org/licenses/gpl.html
 *
 *  Informations :
 *
 *      La classe comportement alternance réutilise la classe
 *      comportement et alterne une infinité de styles différends.
 *      Par exemple pour la maquette de Clément Ader, on alterne
 *      un style noir avec un style Jaune.
 *
 *  Versions :
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Classe
var ComportementAlternanceSmoothCA = Class.create(ComportementAlternanceSmooth, {
    /**
     *  Constructeur par défaut
     *
     *  @param indice_debut : permet de préciser le 
     *  début du comportement. Si aucune information
     *  n'est renseignée, l'indice est égal à 0. On
     *  stocke un indice pour l'aternance. Si l'indice
     *  est égal à 0, le style est noir; si l'indice 
     *  est égal à 1, le style est jaune.
     *  
     *  @param $super H�ritage
     */
    initialize: function($super) {

        // Constructeur par défaut
        $super(2);

    },
    /**
     *	Cette fonction est appelé pour l'alternance.
     *
     *	Ici on alterne un style Jaune et un style Noir.
     */
    changeDesign: function() {

        // Changer en jaune
        if (this.indice_alternance === 1) {

            for (var index = 0; index < document.styleSheets.length; index++) {
                if (document.styleSheets[index].ownerNode.id.search('ca_render_menu') !== -1)
                    var rules = (document.styleSheets[index].cssRules) ? document.styleSheets[index].cssRules : document.styleSheets[index].rules;
                else
                    var rules = new Array();
            }

            var i = 0;
            while (rules[i]) {
                if (rules[i].selectorText === 'hr') {
                    rules[i].style.backgroundColor === "blue";
                    break;
                }
                i++;
            }

            // On change le background en jaune
            document.body.style.backgroundColor = "yellow";

            // On change la couleur de texte en bleu
            var zone = document.getElementById(this.zone_concerne.id);
            zone.style.color = "blue";

            // On change la date
            document.getElementById('date_time').style.color = "blue";

        }

        // Changer en noir
        else {



            for (var index = 0; index < document.styleSheets.length; index++) {
                if (document.styleSheets[index].ownerNode.id.search('ca_render_menu') !== -1)
                    var rules = (document.styleSheets[index].cssRules) ? document.styleSheets[index].cssRules : document.styleSheets[index].rules;
                else
                    var rules = new Array();
            }

            var i = 0;
            while (rules[i]) {
                if (rules[i].selectorText === 'hr') {
                    rules[i].style.backgroundColor === "white";
                    break;
                }
                i++;
            }

            // On change le background en jaune
            document.body.style.backgroundColor = "black";

            // On change la couleur de texte en bleu
            document.getElementById(this.zone_concerne.id).style.color = "white";

            // On change la date
            document.getElementById('date_time').style.color = "white";

        }

    }

});

// Classe Inactivit�
var ComportementInactivite = Class.create(Comportement, {
    /**
     * Constructeur
     */
    initialize: function($super) {

        // Constructeur par défaut
        $super();

        // Timeout de la boucle d'inactivit�
        this.timeout_inactivite = null;

    },
    /**
     *	Lance le comportement
     *
     *	Cette fonction est lancÃ©e que si le comportement
     *	est arrÃªtÃ©e. Elle repasse la variable marche Ã 
     * 	true et appelle la fonction goto Ã  l'indice oÃ¹
     *	le comportement s'Ã©tait arrÃªtÃ©.
     */
    run: function($super) {

        // Il faut r�cup�rer les donn�es
        // TODO Faire en sorte d'avoir la bonne url ici
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

                        // On parse et on stock le JSon
                        this.json_conf = JSON.parse(textContent);
                        
                    }

                    // Un erreur est survenue
                    catch (e) {

                        throw new Exception("controler.js", "Le fichier JSon de configuration n'est pas correct." + e, new Error().lineNumber);

                    }

                }

            },
            onFailure: function(transport) {

                // Création d'une exception
                throw new Exception("controler.js", "L'url de la configuration n'est pas correct (" + transport + ") donc le chargement se fera par rapport aux paramètres", new Error().lineNumber);

            }

        });

        // Si on est dans les bornes On lance le run
        // TODO 
        if (date_between_date(pause[i].begin, pause[i].end, new Date())) {
            $(this.zone_conerne.id).show();
            $super();
        } 
        
        // Sinon on cache la zone
        else {
            $(this.zone_conerne.id).hide();
        }

    }

});

