/**
 *  <b>Rights :</b>
 *      
 * 	Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *      
 * 	All rights reserved. This program and the 
 *	accompanying materials are made available under the 
 *	terms of the GNU Public License v3.0 which accompanies 
 *	this distribution, and is available at
 * 	http://www.gnu.org/licenses/gpl.html
 *              
 *  <b>Informations :</b>
 *              
 *	Ce renderer est particulier à la vocalisation des clients
 *	Yourcast. 
 *
 *  <b>Versions :</b>
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *
 *  <b>Contributors :</b>
 *
 *	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

/**
 *  Parcours le tableau et ajoute les sons qui sont à l'intérieur.
 *  
 * @param {type} table Tableau à parcourir.
 * @param {type} zone Zone concernée.
 */
function add_New_Sounds(table, zone) {
    
    // Boucle sur le tableau
    for (var cpt = 0; cpt < table.length; cpt++) {

        // Si le title ou le contenu n'est pas défini
        if (table[cpt] || table[cpt] !== "" ) {

            // On envoie le son à la zone
            zone.newSound(table[cpt] + ".");

        }

    }
    
}

/**
 *  Renderer vocale des menus.
 *  
 *  @param {type} tableau Tableau des annonces.
 *  @param {type} zone Zone concernée.
 */
function render_Vocale_Menu(tableau, zone) {

    // Test d'un titre
    zone.newSound("Le menu.");

    // On boucle sur les informations
    for (var indice = 0; indice < tableau.length; indice++) {
        
        // On récupère l'annonce
        var elements = tableau[indice];

        // Type du repas
        if(elements.type && elements.type !== "") {
            zone.newSound(elements.type);
        }

        // Test si un repas existe
        if(elements.repas && elements.repas !== null) {

            // Stockage du repas
            var repas = elements.repas;

            // ===================
            // LES ENTREES
            // ===================

            // Test si des entrées existent
            if(repas.entree && repas.entree.length !== 0) {
                
                // Annonce des entrées
                zone.newSound("Les entrées.");
                
                // On boucle sur les entrées
                add_New_Sounds(repas.entree, zone);

            }

            // ===================
            // LES PLATS
            // ===================

            // Test si des plats existent
            if(repas.plat && repas.plat.length !== 0) {
                
                // Annonce des entrées
                zone.newSound("Les plats.");
                
                // On boucle sur les plats
                add_New_Sounds(repas.plat, zone);

            }

            // ===================
            // LES DESSERTS
            // ===================

            // Test si des plats existent
            if(repas.dessert && repas.dessert.length !== 0) {
                
                // Annonce des entrées
                zone.newSound("Les desserts.");
                
                // On boucle sur les plats
                add_New_Sounds(repas.dessert, zone);

            }

        }

    }

}
