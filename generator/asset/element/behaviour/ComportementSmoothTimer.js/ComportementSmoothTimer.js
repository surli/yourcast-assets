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
 *      comportement et alterne deux styles différends de
 *      couleur pour la maquette de Clément Ader.
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
loadScript(BEHAVIOUR_PATH + "/utils/YourcastAnim/transformation.js");

// Classe
var ComportementSmoothTimer = Class.create(Comportement, {
    /**
     *	Boucle du comportement
     *
     *	La boucle sert �  changer les éléments d'une zone par 
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
        clearTimeout(this.timeout_progressbar);

        // On récupère les informations
        var info = self.zone_concerne.getInfos()[self.indice];
        
        // On test si une zone "_content" existe
        if (!$(this.zone_concerne.id + "_content")) {
            $(this.zone_concerne.id).insert("<div id='" + this.zone_concerne.id + "_content'></div>");
        }
        
        // On test si une zone new_appear existe
        if (!$(this.zone_concerne.id + "_new_appear")) {
            $(this.zone_concerne.id + "_content").update("<div id='" + this.zone_concerne.id + "_new_appear'></div>");
        }
        
        // Met le nouveau block en opacité 0
        if ($(this.zone_concerne.id + "_content")) {

            $(this.zone_concerne.id + "_new_appear").update(info.content);
            $(this.zone_concerne.id + "_title").update(info.title);
            $(this.zone_concerne.id + "_logo").update(info.logo);
            $(this.zone_concerne.id + "_content").setOpacity(0);

            if($('progressbar')) {
                enleverAnimation('progressbar');
                $('progressbar').setStyle({
                    "height": "0%"
                });

                // Transition d'apparition des informations
                this.timeout_progressbar = setTimeout(function() {
                    scaleY('progressbar', '97%', info.time + 2, "linear");
                }, 1);
            }
            
            this.timeout_fadeIn = setTimeout(function() {
                fadeIn(self.zone_concerne.id + "_content", 1, "linear");
            }, 1);
            this.timeout_fadeOut = setTimeout(function() {
                fadeOut(self.zone_concerne.id + "_content", 1, "linear");
            }, info.time*1000 - 2000);

        }

        // On test si le comportement est en marche
        if (this.isRunning())
            self.timeout = setTimeout(function() {
                self.next();
            }, info.time * 1000);

    },
    /**
     *  Setter de la zone
     *
     *  Permet de chancer la zone du comportement. 
     *
     *  /!\ Cette fonction doit être appelée lors du 
     *  lancement du comportement sous peine d'avoir 
     *  une erreur critique.
     */
    setZone: function($super, nouvelle_zone) {

        // On execute le super
        $super(nouvelle_zone);

    }

});
