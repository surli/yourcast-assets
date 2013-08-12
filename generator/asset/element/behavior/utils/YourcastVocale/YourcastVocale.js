/**
 *                              <b>YOURCAST VOCALE</b>
 *      
 *  <b>Rights :</b>
 *      
 * 	Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *      
 * 	All rights reserved. This program and the accompanying materials are 
 * 	made available under the terms of the GNU Public License v3.0 which 
 * 	accompanies this distribution, and is available at
 * 	http://www.gnu.org/licenses/gpl.html
 *      
 *  <b>Informations :</b>
 *      
 *	Librairie Yourcast pour la synthèse vocale. Ce fichier importe les 
 *	fonctions nécessaires au bon fonctionnement du client voclale Yourcast.
 *	
 *	Il y a des dépendances obligatoire : SoundManager qui permet de lire le 
 *	son dans n'importe quel navigateur et VoiceRSS qui fait la synthèse 
 *	d'une chaîne.
 *      
 *  <b>Fonctions :</b>
 *      
 *      <ul>
 *          <li>createSound(<i>chaîne à synthètiser</i>)</li>
 *          <li>createAndPlaySound(<i>chaîne à synthètiser</i>, <i>fonction à 
 *          appeller lorsque le son a été joué</i>)</li>
 *          <li>playSound(<i>son à jouer</i>, <i>fonction à appeller lorsque le 
 *          son a été joué</i>)</li>
 *      </ul>
 *      
 *  <b>Versions :</b>
 *      
 *      1.0.0 : Création d'une librairie fonctionnelle.
 *      
 *  <b>Contributors :</b>
 *      
 *	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */


// ===================================================
//  VARIABLES GLOBALES
// ===================================================


// Création de l'instance du SoundManager2
soundManager.setup({
    url: 'lib/SoundManager/swf/',
    onready: function() {
        // Callback si besoin
    }
});


// ===================================================
//  YOURCAST VOCALE
// ===================================================


/**
 *  <b>CreateSound</b>
 *  
 *  Crée un son dans soundManager et le renvoie.
 *  
 *  @param {type} string    Chaîne à créer.
 */
function createSound(string) {

    // Transformation dela chaîne
    string = encodeURIComponent(string);

    // Créer le son
    var sound = soundManager.createSound({
        
        // Url de récupération du mp3 de la chaîne
        url: "http://api.voicerss.org?" + "key=7aedb3da61c14aa9bfe4f6c2fd781519&src=" + string + "&hl=fr-fr&f=44khz_16bit_stereo"
        
    });

    // Retourne le son
    return sound;

}

/**
 *  <b>CreateAndPlaySound</b>
 *  
 *  Crée et joue un son crée dans soundManager.
 *  
 *  @param {type} string    Chaîne à jouer.
 */
function createAndPlaySound(string) {

    // Transformation dela chaîne
    string = encodeURIComponent(string);

    // Créer le son
    mySound = soundManager.createSound({
        url: "http://api.voicerss.org?" + "key=7aedb3da61c14aa9bfe4f6c2fd781519&src=" + string + "&hl=fr-fr&f=44khz_16bit_stereo",
        autoPlay: true,
        
        // Lorsque le son a fini de jouer
        onfinish: function() {
            
            // On test si le callback est défini
            if(callback) {
                
                // On appelle le callback
                callback();
                
            }
            
        }
        
    });

}

/**
 *  <b>PlaySound</b>
 *  
 *  Joue un son crée auparavant dans soundManager.
 *  
 *  @param {type} sound     Son à jouer.
 *  @param {type} callback  Fonction appelé lorsque le son a fini d'être joué.
 */
function playSound(sound, callback) {

    // Test sound
    if(!sound || sound === null) {
        return false;
    }

    // On joue le son
    sound.play({
        
        // Lorsque le son a fini de jouer
        onfinish: function() {
            
            // On test si le callback est défini
            if(callback) {
                
                // On appelle le callback
                callback();
                
            }
            
        }
        
    });

}
