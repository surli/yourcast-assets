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
loadScript(BEHAVIOUR_PATH + "/utils/SpecificBehavior/ComportementAlternanceSmooth.js");
loadScript(BEHAVIOUR_PATH + "/utils/functions.js");

// Classe
var ComportementAlternanceSmoothIrsam = Class.create(ComportementAlternanceSmooth, {

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
    initialize: function($super, 2) {
        
        // Constructeur par défaut
        $super(2);

    },

	/**
	 *	Cette fonction est appelé pour l'alternance.
	 *
	 *	Ici on alterne un style Jaune et un style Noir.
	 */
	changerCouleur: function() {

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
