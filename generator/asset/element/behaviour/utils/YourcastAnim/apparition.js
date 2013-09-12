/**************************************************************
 *
 *  APPARITION - YourCastAnim
 *  
 **************************************************************
 *
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
 *      Les animations de ce fichier sont les suivants :
 *		  - fadeIn : qui permet de faire apparaître un élément
 *		  - fadeOut : qui permet de faire disparaître un élément
 *		  - fade : qui permet de modifier l'opacité d'un élément
 *
 *  Versions :
 *
 *      (Juin 2013) 1.0.0 : Création d'un fichier fonctionnel
 *
 *  Contributors :
 *
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 *
 **************************************************************/

/**
 *	FadeIn
 *
 *	Celui-ci doit avoir une opacité égale à 0 pour pouvoir
 *	fade in sinon il ne se passera rien. Un fadeIn est un
 *	élément qui passe de l'opacité < 1 à 1 dans une durée
 *	donnée avec une impression d'apparition.
 *
 *	@param id : l'id de la zone à fade.
 *	@param duration : durée du fade
 *	@param transformations : la transformation du fade, cad
 *		   linéaire, ease-out, etc.
 */
function fadeIn(id, duration, transformation) {

	/*
	 *	Gestion des erreurs
	 */

	// Vérification de l'identifiant
	if(!id) return false;

	// Vérification de la durée
	if(!duration) duration = 5;

	// Vérification de la transformation
	if(!transformation) transformation = 'ease-out';

	// On montre l'élément dans le cas où il n'est pas affiché
	$(id).show();

	/*
	 *	FadeIn de la zone
	 */

	// Ajoute une animation
    ajouterAnimation(id, duration+"s", 'opacity', transformation);

    // On change l'opacité
    $(id).setStyle({ opacity: 0.99 });

}

/**
 *	FadeOut
 *
 *	Celui-ci doit avoir une opacité > 0 pour pouvoir fade
 *	out sinon il ne se passera rien. Un fadeOut est un
 *	élément qui passe de l'opacité > 0 à 0 dans une durée
 *	donnée avec une impression de disparition. À la fin du
 *	fade out, si fade vaut true, l'élément est caché.
 *
 *	@param id : l'id de la zone à fade.
 *	@param duration : durée du fade
 *	@param transformations : la transformation du fade, cad
 *		   linéaire, ease-out, etc.
 */
function fadeOut(id, duration, transformation, remove) {

	/*
	 *	Gestion des erreurs
	 */

	// Vérification de l'identifiant
	if(!id) return false;

	// Vérification de la durée
	if(!duration) duration = 5;

	// Vérification de la transformation
	if(!transformation) transformation = 'ease-out';

	// Vérification du remove
	if(!remove) remove = false;

	// On montre l'élément dans le cas où il n'est pas affiché
	$(id).show();

	/*
	 *	FadeOut de la zone
	 */

	// Ajoute une animation
    ajouterAnimation(id, duration+"s", 'opacity', transformation);

    // On change l'opacité
    $(id).setStyle({ opacity: 0 });

    // On cache l'élément après l'animation si remove est égal à true
    if(remove)
    	
    	setTimeout(function() { $(id).hide(); }, (duration+1)*1000);

}

/**
 *	Fade
 *
 *	Un fade est un élément qui passe à une opacité dans une 
 *	durée donnée.
 *
 *	@param id : l'id de la zone à fade.
 *	@param duration : durée du fade
 *	@param transformations : la transformation du fade, cad
 *		   linéaire, ease-out, etc.
 */
function fade(id, value, duration, transformation) {

	/*
	 *	Gestion des erreurs
	 */

	// Vérification de l'identifiant
	if(!id) return false;

	// Vérification de la durée
	if(!duration) duration = 5;

	// Vérification de la transformation
	if(!transformation) transformation = 'ease-out';

	// On montre l'élément dans le cas où il n'est pas affiché
	$(id).show();

	/*
	 * Test de l'opacité
	 */

	// FadeIn
	if(value >= 1)

		fadeIn(id, duration, transformation);

	// FadeOut
	else if(value <= 0)

		fadeOut(id, duration, transformation);

	// Fade
	else {

		/*
		 *	Fade de la zone
		 */

		// Ajoute une animation
	    ajouterAnimation(id, duration+"s", 'opacity', transformation);

	    // On change l'opacité
	    $(id).setStyle({ opacity: value });

	}

}

