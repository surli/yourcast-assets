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

loadScript(BEHAVIOUR_PATH+"/ComportementBoucle.js");

// Classe
var ComportementAlerte = Class.create(ComportementBoucle, {

    /**
     *  Initialise le temps entre chaque requête à 10
     *  secondes.
     */
    intialize: function($super) {

        $super(10);

    },

    /**
     *  Met l'alerte zone en z-index obligatoirement.
     *
     *  On met l'alerte en position absolute car le 
     *  z-index ne marche qu'avec cette position (à
     *  cause du nombre d'élément qui sont dans cette
     *  position).
     */
    setZone: function($super, nouvelle_zone) {

        $super(nouvelle_zone);

        $(this.zone_concerne.id).setStyle({ 
            "z-index" : "100",
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
        if(this.zone_concerne.getInfos().length > 0) {

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

    }

});
