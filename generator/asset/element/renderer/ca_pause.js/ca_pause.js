
//IUT de Nice / Departement informatique / Projet tuteur� 
//Annee 2012_2013

//Projet YourCastStore

//calendar - Renderer calendrier

//+ Version 0.0.0 : Version initiale  
//+ Version 1.0.0 : Changement de l'affichage des �v�nements
//+ Version 1.1.0 :  Prise en compte des nouvelles demandes, nouvelle fonction d�di� pour l'irsam, ajout de commentaires
//+ Version 1.2.0 : R�glage d'un probleme d'�v�nement pass�s, le titre de l'�v�nement s'affiche en haut, ajout d'un filtre pour ne pas afficher les aux, chez, � ... pour le lieu
//                  Si l'�v�nement est en cours alors le titre est affich� en rouge, modification du fichier style.less pour changer la taille de la police et la r�partition du texte sur l'�cran.


//Auteur : Simon Urli 
//Y. Seree ( a partir de la version 1.0.0)

function irsam_render_calendar(collection, zone, timeInfo) {

    for(var i = 0; i < collection.length ; i++) {
        var dico = {"begin": collection[i].begin, "end": collection[i].end, "callId": "pause"};
        zone.pushInfo(dico);
    }

}