




/**
 *	Modifie la hauteur d'une zone
 */
function scaleY(id, value, duration) {

	enleverAnimation(id);
    ajouterAnimation(id, duration+"s", 'height', 'ease-out');
    $(id).setStyle({ 'height': value });

}