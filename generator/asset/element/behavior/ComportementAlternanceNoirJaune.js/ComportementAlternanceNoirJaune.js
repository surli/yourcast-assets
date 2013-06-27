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

// Chargement du comportement
loadScript(BEHAVIOUR_PATH + "/utils/ComportementAlternanceTransition.js");

// Classe
var ComportementAlternanceNoirJaune = Class.create(ComportementAlternanceTransition, {

    /**
     *  Constructeur par défaut
     *
     *  @param indice_debut : permet de préciser le 
     *  début du comportement. Si aucune information
     *  n'est renseignée, l'indice est égal à 0. On
     *  stocke un indice pour l'aternance. Si l'indice
     *  est égal à 0, le style est noir; si l'indice 
     *  est égal à 1, le style est jaune.
     */
    initialize: function($super) {
        
        // Constructeur par défaut
        $super();

        // Initialisation de l'indice d'alternance
        this.indice_alternance = 0;

        // Nombre d'alternance
        this.nombre_alternance = 2;

    },

    /**
     *  Passage à l'élément suivant
     *
     *  Le passage à l'élément suivant ne peut se faire
     *  que si le comportement est en route. Sinon elle
     *  ne fait rien. Lorsque la boucle arrive à la fin
     *  des informations de la zone, elle retourne au 
     *  début. Elle alterne deux styles différends.
     */
    next: function($super) {

        // Sécurité
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // Test si l'élément est dans le tableau
        if(!this.zone_concerne.getInfos()[this.indice].alternance) {
            $super();
        }

        // Sinon on alterne
        else {

            // Test si on change d'indice
            if(self.indice_alternance == (this.nombre_alternance - 1)) {

                // On incrémente l'indice
                self.indice = (self.indice + 1) % self.zone_concerne.getInfos().length;

            }

            // On incrémente l'indice alternance
            self.indice_alternance = (self.indice_alternance + 1) % this.nombre_alternance;

            // On change la couleur
            self.changerCouleur();

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
            self.goto(self.indice);

        }

    },

	/**
	 *	Cette fonction est appelé pour l'alternance.
	 *
	 *	Ici on alterne un style Jaune et un style Noir.
	 */
	changerCouleur: function() {

		// Changer en jaune
		if(this.indice_alternance == 1) {

	        for(var index = 0 ; index < document.styleSheets.length ; index++) {
	            if(document.styleSheets[index].ownerNode.id.search('ca_render_menu') != -1)
	                var rules = (document.styleSheets[index].cssRules)?document.styleSheets[index].cssRules:document.styleSheets[index].rules;
	        }

	        var i = 0;
	        while(rules[i]){
	            if(rules[i].selectorText=='hr') {
	                rules[i].style.backgroundColor== "blue";
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

	        for(var index = 0 ; index < document.styleSheets.length ; index++) {
	            if(document.styleSheets[index].ownerNode.id.search('ca_render_menu') != -1)
	                var rules = (document.styleSheets[index].cssRules)?document.styleSheets[index].cssRules:document.styleSheets[index].rules;
	        }

	        var i = 0;
	        while(rules[i]){
	            if(rules[i].selectorText=='hr') {
	                rules[i].style.backgroundColor== "white";
	                break;
	            }
	            i++;
	        }

	        // On change le background en jaune
	        document.body.style.backgroundColor = "black";

	        // On change la couleur de texte en bleu
	        document.getElementById('mainzone').style.color = "white";

	        // On change la date
	        document.getElementById('date_time').style.color = "white";
				
		}

	}


});
