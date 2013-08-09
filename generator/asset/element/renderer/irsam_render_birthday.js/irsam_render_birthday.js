//
// IUT de Nice / Departement informatique / Projet tuteuré
// Annee 2012_2013
//
// Projet YourCastStore
//
// Birthday - Renderer Birthday. Ce renderer affiche le(s) anniversaire(s) du jour
//   
//       + Version 0.0.0 : Version initiale
// 
// Auteur : M. Blay-Fornarino 
//

/**
 *  <b>RenderBirthdayForIrsam</b>
 *  
 *  @param {type} datas
 *  @param {type} zone
 *  @param {type} timeInfo
 */
function irsam_render_birthday(datas, zone, timeInfo) {

    // Test si la collection est null ou indéfini
    if(typeof datas === 'undefined' || datas === null) {
        throw new Exception("irsam_render_birthday.js", "The informations are not correct", 25);
    }
    
    // Test si la collection est vide
    if(datas.length === 0) {
        throw new Information("irsam_render_birthday.js", "The informations are empty", 30);
    }

    // Test si la collection est null ou indéfini
    if(typeof zone === 'undefined' || zone === null) {
        throw new Exception("irsam_render_birthday.js", "The zone are not correct", 35);
    }

    // Temps d'affichage
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 10;
    
    // Logo du renderer
    var logo = '<img src="img/logos/birthday.png"/>';
    
    // Chargement de l'image
    zone.loadImage("img/logos/birthday.png");
    
    // On définit le titre
    var title = "Anniversaires";
    
    // Content
    var content = "<div class = 'birthdayTitleIRSAM'>" + "Bon anniversaire" + "</div><br/>";
    
    // Boucle sur les informations
    for (var indice = 0; indice < datas.length; indice++) {
        content += "<br/><div class='birthdayNameIRSAM'>" + firstLettertoUpperCase(datas[indice].name) + "</div>";
    }
    
    // Fin du content
    content += "</div>";
    
    // Déclaration du dictionnaire
    var dico = {"content": content, "logo": logo, "title": title, "time": timeInfo};
    
    // Push le dictionnaire
    zone.pushInfo(dico);
    
}
