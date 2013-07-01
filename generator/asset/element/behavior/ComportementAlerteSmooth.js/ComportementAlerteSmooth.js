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

// Classe
var ComportementSimpleAppearance = Class.create(ComportementBoucle, {

	intialize: function($super) {

		$super(10);

	},

	setZone: function($super, nouvelle_zone) {

		$super(nouvelle_zone);

		this.zone_concerne.setStyle({ "z-index" : 100 });

	},

	next: function() {

		// Sécurité
		this.securiteInfosZone();

		// On incrémente l'indice
		if(this.zone_concerne.getInfos().length > 0) {

			this.zone_concerne.show();

			this.indice = (this.indice + 1) % this.zone_concerne.getInfos().length;

		}

		else {

			this.zone_concerne.hide();

		}

		// On appelle le changement d'élément
		this.goto(this.indice);

	},

});

