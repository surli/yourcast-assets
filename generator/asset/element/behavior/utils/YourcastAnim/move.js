

function pullDown(id, value, duration) {

    ajouterAnimation(id, duration+"s", 'height', 'ease-out');
    $(id).setStyle({ 'height': value+"px" });

}

function moveTop(id, value, duration) {
	
    ajouterAnimation(id, duration+"s", 'top', 'ease-out');
    $(id).setStyle({ 'top': value+"px" });

}

function moveBot(id, value, duration) {

    ajouterAnimation(id, duration+"s", 'bottom', 'ease-out');
    $(id).setStyle({ 'bottom': value+"px" });

}

function moveLeft(id, value, duration) {

    if(transition == "Lineaire") {
        ajouterAnimation(id, duration+"s", 'left', 'linear');
    }
    else {
        ajouterAnimation(id, duration+"s", 'left', 'ease-out');
    }
    
    $(id).setStyle({ 'left': value+"px" });

}

function moveRight(id, value, transition, duration) {

    if(transition == "Lineaire") {
        ajouterAnimation(id, duration+"s", 'right', 'linear');
    }
    else {
        ajouterAnimation(id, duration+"s", 'right', 'ease-out');
    }

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
