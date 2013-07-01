

function pullDown(id, value, duration) {

    ajouterAnimation(id, duration+"s", 'height', 'ease-out');
    $(id).setStyle({ 'height': value+"px" });

}

/**
 *  Déplace la zone par rapport au haut du père
 */
function moveTop(id, value, duration, transition) {
	
    transition = typeof transition === 'undefined' ? 'ease-out' : transition;
    ajouterAnimation(id, duration+"s", 'top', transition);
    $(id).setStyle({ 'top': value+"px" });

}

/**
 *  Déplace la zone par rapport au bas du père
 */
function moveBot(id, value, duration, transition) {

    transition = typeof transition === 'undefined' ? 'ease-out' : transition;
    ajouterAnimation(id, duration+"s", 'bottom', transition);
    $(id).setStyle({ 'bottom': value+"px" });

}

/**
 *  Déplace la zone par rapport à la gauche du père
 */
function moveLeft(id, value, duration, transition) {

    transition = typeof transition === 'undefined' ? 'ease-out' : transition;
    ajouterAnimation(id, duration+"s", 'left', transition);
    $(id).setStyle({ 'left': value+"px" });

}

/**
 *  Déplace la zone par rapport à la droite du père
 */
function moveRight(id, value, duration, transition) {

    transition = typeof transition === 'undefined' ? 'ease-out' : transition;
    ajouterAnimation(id, duration+"s", 'right', transition);
    $(id).setStyle({ 'right': value+"px" });

}

function blindDown(id, value, duration) {

	// Vérification des paramètres
	if(!id)
		return false;

	// Par défaut
	if(!duration) duration = 5;
	if(!transformation) transformation = 'ease-out';

	// On montre l'élément
	$(id).show();

	// Ajoute une animation
    ajouterAnimation(id, duration+"s", 'opacity', transformation);

    // On change l'opacité
    $(id).setStyle({ opacity: 0.99 });

}
