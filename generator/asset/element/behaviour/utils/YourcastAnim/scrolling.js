


/**
 *  FadeIn
 *
 *  Celui-ci doit avoir une opacité égale à 0 pour pouvoir
 *  fade in sinon il ne se passera rien. Un fadeIn est un
 *  élément qui passe de l'opacité < 1 à 1 dans une durée
 *  donnée avec une impression d'apparition.
 *
 *  @param id : l'id de la zone à fade.
 *  @param duration : durée du fade
 *  @param transformations : la transformation du fade, cad
 *         linéaire, ease-out, etc.
 */
function scrollingLeft(id, duration, transformation) {

    /*
     *  Gestion des erreurs
     */

    // Vérification de l'identifiant
    if(!id) return false;

    // Vérification de la durée
    if(!duration) duration = 10;

    // Vérification de la transformation
    if(!transformation) transformation = 'linear';

    // On montre l'élément dans le cas où il n'est pas affiché
    $(id).show();

    var child = document.getElementById(id);
    var parent = document.getElementById(id).parentNode;

    child.style.zIndex = 1;
    parent.style.zIndex = 10;
    parent.style.position = "relative";

    /*
     *  Attributs de le parent et le child pour le scroll
     */

    // On met l'élément à se place
    $(id).setStyle({
        "position": "absolute",
        "top": "0px",
        "left": "0px",
        "animation": "deplacementDroite " + duration + "s linear",
        "-webkit-animation": "deplacementDroite " + duration + "s linear"
    });

    var child = document.getElementById(id);
    var parent = document.getElementById(id).parentNode;

    child.style.zIndex = 1;
    parent.style.zIndex = 10;
    parent.style.position = "relative";

    setTimeout(function() {
        $(id).remove();
    }, duration*1000);

}

/**
 *  FadeIn
 *
 *  Celui-ci doit avoir une opacité égale à 0 pour pouvoir
 *  fade in sinon il ne se passera rien. Un fadeIn est un
 *  élément qui passe de l'opacité < 1 à 1 dans une durée
 *  donnée avec une impression d'apparition.
 *
 *  @param id : l'id de la zone à fade.
 *  @param duration : durée du fade
 *  @param transformations : la transformation du fade, cad
 *         linéaire, ease-out, etc.
 */
function scrollingRight(id, duration, transformation) {

    /*
     *  Gestion des erreurs
     */

    // Vérification de l'identifiant
    if(!id) return false;

    // Vérification de la durée
    if(!duration) duration = 10;

    // Vérification de la transformation
    if(!transformation) transformation = 'linear';

    // On montre l'élément dans le cas où il n'est pas affiché
    $(id).show();

    /*
     *  Attributs de le parent et le child pour le scroll
     */

    // On met l'élément à se place
    $(id).setStyle({
        "position": "absolute",
        "top": "0px",
        "left": "0px",
        "animation": "deplacementGauche " + duration + "s linear",
        "-webkit-animation": "deplacementGauche " + duration + "s linear"
    });

    setTimeout(function() {
        $(id).remove();
    }, duration*1000);

}


//     /*
//      *  Gestion des erreurs
//      */

//     // Vérification de l'identifiant
//     if(!id) return false;

//     // Vérification de la durée
//     if(!duration) duration = 10;

//     // Vérification de la transformation
//     if(!transformation) transformation = 'linear';

//     // On montre l'élément dans le cas où il n'est pas affiché
//     $(id).show();

//     /*
//      *  Attributs de le parent et le child pour le scroll
//      */

//     var child = document.getElementById(id);
//     var parent = document.getElementById(id).parentNode;

//     child.style.zIndex = 1;
//     parent.style.zIndex = 10;
//     parent.style.position = "relative";

//     $(id).update($(id).innerHTML + $(id).innerHTML);

//     $$(".scrollingclone").each(function(content) {
//         content.setStyle({
//             "heigth": parent.offsetHeight + "px"
//         });
//     })

//     // On met l'élément à se place
//     $(id).setStyle({
//         "width": (child.innerHTML.length * 10) + "px",
//         "position": "absolute",
//         "top": "0px",
//         "heigth": parent.offsetHeight + "px",
//         "right": child.offsetWidth + "px"
//     })

//     setTimeout(function() {

//         // Ajoute une animation
//         ajouterAnimation(id, duration+"s", 'right', transformation);

//         // On change l'opacité
//         $(id).setStyle({ "right": - child.offsetWidth + "px" });

//     }, 100);

//     setInterval(function() {
//         scrollinRightLoop(id, duration, transformation);
//     }, duration);

// }

// function scrollinRightLoop() {



// }

