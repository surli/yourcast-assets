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

var ComportementAlternance = Class.create(Comportement, {

    initialize: function($super, nombre_alternance) {
        
        // Constructeur par défaut
        $super();

        // Initialisation de l'indice d'alternance
        this.indice_alternance = 0;

        // Nombre d'alternance
        this.nombre_alternance = 2;

    },

    next: function($super) {

        // Sécurité
        this.securiteInfosZone();

        // Test si l'élément est dans le tableau
        if(!this.zone_concerne.getInfos()[this.indice].alternance) {
            $super();
        }

        // Sinon on alterne
        else {

            // Test si on change d'indice
            if(this.indice_alternance == (this.nombre_alternance - 1)) {

                // On incrémente l'indice
                this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

            }

            // On incrémente l'indice alternance
            this.indice_alternance = (this.indice_alternance + 1) % this.nombre_alternance;

            // On change la couleur
            this.changeDesign();

            // Si on est au début de l'application
            if(this.indice == 0 && this.indice_alternance == 0) {

                // Si on est revenu au début on test si ca on peut faire une requete
                if((new Date().getTime() - this.last_request) > 120000) {

                    // On stocke la nouvelle requete
                    this.last_request = new Date().getTime();

                    // On lance la requête
                    this.zone_concerne.request();

                }

            }

            // On appelle le changement d'élément
            this.goto(this.indice);

        }

    }
});

