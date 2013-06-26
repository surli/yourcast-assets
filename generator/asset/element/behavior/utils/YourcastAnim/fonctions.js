

/**
 *  Ajout l'animation d'une zone
 */
function ajouterAnimation(id, duration, nom_anim, nom_timing) {

    enleverAnimation(id);

    $(id).setStyle({
        transition: nom_anim + " " + duration + " " + nom_timing
    });

}

/**
 *  Enlève l'animation d'une zone
 */
function enleverAnimation(id) {

    $(id).setStyle({
        transition: "none"
    });

}

/**
 *  Cette fonction met la position de l'élément récupérée
 *  par rapport à l'id en "absolute".
 */
function testPositionAbsolute(id) {

    // On test si l'élément est en position "absolute"
    console.log($(id).getStyle('position'));

}
