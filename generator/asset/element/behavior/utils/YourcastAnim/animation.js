/**************************************************************
 *
 *  FRAMEWORK D'ANIMATION - YourCastAnim
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
 *      Toutes les animations ci-dessous sont réalisées avec 
 *      les feuilles de styles css. De ce fait, vous devez
 *      être sur d'avoir les bon styles sur les éléments pour
 *      que tout fonctionne correctement. Exemple avec les
 *      déplacements, ceux-ci ne fonctionnent que si l'élément
 *      est en position "absolute". Ce framework nécessite donc
 *		de grosses connaissances en css.
 *
 *      Ce fichier ne contient que les imports vers les
 *      fonctions d'animations du framework.
 *
 *		Avec les transition-transform vous pouvez réaliser des 
 *		animations plus évolués, voir le lien ci-dessous :
 *			- cubic-bezier.com
 *
 *  Versions :
 *
 *      (Juin 2013) 1.0.0 : Création d'un framework fonctionnel 
 *      avec le maximum de fonctions utiles.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 *
 **************************************************************/

var YOURCASTANIM_PATH = MOTEUR_PATH + "/libs/YourCastAnim/"

/*
 *  Import les fonctions utiles
 */
loadScript(YOURCASTANIM_PATH + "fonctions.js");

/*
 *  Import les animations de scrolling
 */
loadScript(YOURCASTANIM_PATH + "scrolling.js");

/*
 *  Import les déplacements
 */
loadScript(YOURCASTANIM_PATH + "move.js");

/*
 *  Import les apparitions
 */
loadScript(YOURCASTANIM_PATH + "apparition.js");

/*
 *  Import les transformations
 */
loadScript(YOURCASTANIM_PATH + "transformation.js");

/**************************************************************
 *
 *  FIN DU FRAMEWORK
 *  
 **************************************************************/