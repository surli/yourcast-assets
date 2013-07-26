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
 *      La classe comportement alternance r√©utilise la classe
 *      comportement et alterne deux styles diff√©rends de
 *      couleur pour la maquette de Cl√©ment Ader.
 *
 *  Versions :
 *
 *      1.0.0 : Cr√©ation d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Chargement du comportement
loadScript(BEHAVIOUR_PATH + "/utils/functions.js");
loadScript(BEHAVIOUR_PATH + "/utils/YourcastAnim/apparition.js");

// Classe
var ComportementSmooth = Class.create(Comportement, {
    /**
     *	Boucle du comportement
     *
     *	La boucle sert √† changer les √©l√©ments d'une zone par 
     *	rapport aux informations que contient la zone. Pour 
     *	cela, elle r√©cup√®re les enfants de la zone et compare
     *	leur id au tableau info de la zone. Si un id n'est 
     *	pas d√©fini, alors on cache l'√©l√©ment.
     */
    loop: function() {

        // S√©curit√©
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // On clear tout d'abord les timeouts stock√©s
        clearTimeout(this.timeout);
        clearTimeout(this.timeout_fadeIn);
        clearTimeout(this.timeout_fadeOut);

        // On r√©cup√®re les informations
        var info = this.zone_concerne.getInfos()[this.indice];

        // On change le content
        this.zone_concerne.changeContent(info);

        // Met le nouveau block en opacit√© 0
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
 *      La classe comportement alternance rÈutilise la classe
 *      comportement et alterne deux styles diffÈrends de
 *      couleur pour la maquette de ClÈment Ader.
 *
 *  Versions :
 *
 *      1.0.0 : CrÈation d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

var ComportementAlternanceSmooth = Class.create(ComportementSmooth, {
    /**
     *  Constructeur par dÈfaut
     *
     *  @param indice_debut : permet de prÈciser le 
     *  dÈbut du comportement. Si aucune information
     *  n'est renseignÈe, l'indice est Ègal ‡ 0. On
     *  stocke un indice pour l'aternance. Si l'indice
     *  est Ègal ‡ 0, le style est noir; si l'indice 
     *  est Ègal ‡ 1, le style est jaune.
     */
    initialize: function($super, nombre_alternance) {

        // Constructeur par dÈfaut
        $super();

        // Initialisation de l'indice d'alternance
        this.indice_alternance = 0;

        // Nombre d'alternance
        this.nombre_alternance = typeof nombre_alternance === 'undefined' ? 2 : nombre_alternance;

    },
    /**
     *  Passage ‡ l'ÈlÈment suivant
     *
     *  Le passage ‡ l'ÈlÈment suivant ne peut se faire
     *  que si le comportement est en route. Sinon elle
     *  ne fait rien. Lorsque la boucle arrive ‡ la fin
     *  des informations de la zone, elle retourne au 
     *  dÈbut. Elle alterne deux styles diffÈrends.
     */
    next: function($super) {

        // SÈcuritÈ
        this.securiteInfosZone();

        // Test si l'ÈlÈment est dans le tableau
        if (!this.zone_concerne.getInfos()[this.indice].alternance) {
            $super();
        }

        // Sinon on alterne
        else {

            // Test si on change d'indice
            if (this.indice_alternance === (this.nombre_alternance - 1)) {

                // On incrÈmente l'indice
                this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

            }

            // On incrÈmente l'indice alternance
            this.indice_alternance = (this.indice_alternance + 1) % this.nombre_alternance;

            // On change la couleur
            this.changeDesign();

            // Si on est au dÈbut de l'application
            if (this.indice === 0 && this.indice_alternance === 0) {

                // Si on est revenu au dÈbut on test si ca on peut faire une requete
                if ((new Date().getTime() - this.last_request) > 120000) {

                    // On stocke la nouvelle requete
                    this.last_request = new Date().getTime();

                    // On lance la requÍte
                    this.zone_concerne.request();

                }

            }

            // On appelle le changement d'ÈlÈment
            this.goto(this.indice);

        }

    }

});

// Classe
var ComportementAlternanceSmoothIrsam = Class.create(ComportementAlternanceSmooth, {

    /**
     *  Constructeur par d√©faut
     *
     *  @param indice_debut : permet de pr√©ciser le 
     *  d√©but du comportement. Si aucune information
     *  n'est renseign√©e, l'indice est √©gal √† 0. On
     *  stocke un indice pour l'aternance. Si l'indice
     *  est √©gal √† 0, le style est noir; si l'indice 
     *  est √©gal √† 1, le style est jaune.
     */
    initialize: function($super, 2) {
        
        // Constructeur par d√©faut
        $super(2);

    },

    /**
     *	Cette fonction est appel√© pour l'alternance.
     *
     *	Ici on alterne un style Jaune et un style Noir.
     */
    changeDesign: function() {

        var lien_css;
        removeLessStyles();
        less.sheets = styles.clone();

        // Changer en jaune
        if(this.indice_alternance == 1) {

            lien_css = document.createElement('link');
            lien_css.href = "less/black.less";
            lien_css.rel = "stylesheet/less";
            less.sheets.push(lien_css);
            less.refresh(false);

        }

        // Changer en noir
        else {

            lien_css = document.createElement('link');
            lien_css.href = "less/yellow.less";
            lien_css.rel = "stylesheet/less";
            less.sheets.push(lien_css);
            less.refresh(false);

        }

    }


});
