




/**
 *	Modifie la hauteur d'une zone
 */
function scaleY(id, value, duration, transition) {

	enleverAnimation(id);
    ajouterAnimation(id, duration+"s", 'height', transition);
    $(id).setStyle({ 'height': value });

}