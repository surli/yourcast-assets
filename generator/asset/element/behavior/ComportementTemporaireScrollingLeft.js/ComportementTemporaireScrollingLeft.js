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
 *
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


var ComportementBoucle = Class.create(Comportement, {
    initialize: function($super, time_loop_request) {

        /** Zone concernée */
        $super();

        /** Stocke le temps de transition entre deux diapositives */
        this.time_loop_request = typeof time_loop_request !== 'undefined' ? time_loop_request : 10;

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
        if (this.securiteInfosZone()) {

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
        this.timeout_loop_request = setInterval(function() {
            self.loop_request();
        }, self.time_loop_request * 1000);

    }

});

// Classe
var ComportementTemporaireScrollingLeft = Class.create(ComportementBoucle, {
    /**
     *  Met l'alerte zone en z-index obligatoirement.
     *
     *  On met l'alerte en position absolute car le 
     *  z-index ne marche qu'avec cette position (à
     *  cause du nombre d'élément qui sont dans cette
     *  position).
     */
    setZone: function($super, nouvelle_zone) {

        this.time_loop_request = 10; // 10 Secondes entre chaque requ�tes

        $super(nouvelle_zone);

        $(this.zone_concerne.id).setStyle({
            "z-index": "100",
            "position": "absolute"
        });

    },
    /**
     *  Si la zone contient des information on l'affiche
     *  sinon on la cache.
     */
    next: function() {

        // Sécurité
        this.securiteInfosZone();

        // On incrémente l'indice
        if (this.zone_concerne.getInfos().length > 0) {

            // On montre la zone
            $(this.zone_concerne.id).show();

            // Effectue le next
            this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

            // On appelle le changement d'élément
            this.goto(this.indice);

        }

        else {

            // On cache la zone
            $(this.zone_concerne.id).hide();

        }

    },
    /**
     *  Boucle du comportement
     *
     *  La boucle sert à changer les éléments d'une zone par 
     *  rapport aux informations que contient la zone. Pour 
     *  cela, elle récupère les enfants de la zone et compare
     *  leur id au tableau info de la zone. Si un id n'est 
     *  pas défini, alors on cache l'élément.
     */
    loop: function() {

        // Sécurité
        this.securiteInfosZone();

        // On clear tout d'abord les timeouts stockés
        clearTimeout(this.timeout);
        clearTimeout(this.interval_timeout);

        // Contenu de la barre de scrolling
        var content = "";
        var time = 0;
        var info;

        // On récupère les informations
        for (var i = 0; i < this.zone_concerne.counterInfo; i++) {

            // On stocke l'info
            info = this.zone_concerne.getInfos()[i];

            // On ajoute le content au content
            content += info.content;

            // On ajoute le temps d'affichage
            time += info.time;

        }

        content = "<div class='scrollContentLeft'><span class='scrollContent toLeft' id='scrollcontent_" + this.zone_concerne.id + "'>" + content + "</span></div>";
        var dicoInfo = {"content": content};
        this.zone_concerne.changeContent(dicoInfo);

        // Récupération de la taille du span
        var tailleSpan = document.getElementById('scrollcontent_' + this.zone_concerne.id).offsetWidth;

        // Calcule du pourcentage pour la scrollbar
        var leftPourcent = (tailleSpan * 100) / this.zone_concerne.divMarquee.offsetWidth;

        // Crée un nouveau style
        var style = create_or_replace_behaviour_style_zone();

        // Ajout des animations
        style.innerHTML = "#" + this.zone_concerne.id + " span#scrollcontent_" + this.zone_concerne.id + " { ";

        style.innerHTML += " -webkit-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -moz-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -ms-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " -o-animation: fromLeft " + time + "s linear 0s infinite;";
        style.innerHTML += " animation: fromLeft " + time + "s linear 0s infinite; }";

        // Ajout des keyframes left et right
        style.innerHTML += "@-webkit-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-moz-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-ms-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@-o-keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";
        style.innerHTML += "@keyframes fromLeft { from { left: 100%; } to { left: -" + leftPourcent + "%; } }";

        // Ajout du style au head
        document.head.appendChild(style);

        var self = this;
        this.interval_timeout = setTimeout(function() {
            self.zone_concerne.request();
        }, time * 1000);

    }

});
