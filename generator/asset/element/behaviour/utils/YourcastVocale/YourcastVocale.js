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
 *	Librairie Yourcast pour la synth�se vocale. Ce fichier importe les 
 *	fonctions n�cessaires au bon fonctionnement du client voclale Yourcast.
 *	
 *	Il y a des d�pendances obligatoire : SoundManager qui permet de lire le 
 *	son dans n'importe quel navigateur et VoiceRSS qui fait la synth�se 
 *	d'une cha�ne.
 *      
 *  <b>Fonctions :</b>
 *      
 *      <ul>
 *          <li>createSound(<i>cha�ne � synth�tiser</i>)</li>
 *          <li>createAndPlaySound(<i>cha�ne � synth�tiser</i>, <i>fonction � 
 *          appeller lorsque le son a �t� jou�</i>)</li>
 *          <li>playSound(<i>son � jouer</i>, <i>fonction � appeller lorsque le 
 *          son a �t� jou�</i>)</li>
 *      </ul>
 *      
 *  <b>Versions :</b>
 *      
 *      1.0.0 : Cr�ation d'une librairie fonctionnelle.
 *      
 *  <b>Contributors :</b>
 *      
 *	Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */


// ===================================================
//  VARIABLES GLOBALES
// ===================================================


// Cr�ation de l'instance du SoundManager2
soundManager.setup({
    url: 'js/behaviours/utils/SoundManager/swf/',
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
 *  Cr�e un son dans soundManager et le renvoie.
 *  
 *  @param {type} string    Cha�ne � cr�er.
 */
function createSound(string) {

    // Transformation dela cha�ne
    string = encodeURIComponent(string);

    // Cr�er le son
    var sound = soundManager.createSound({
        
        // Url de r�cup�ration du mp3 de la cha�ne
        url: "http://api.voicerss.org?" + "key=7aedb3da61c14aa9bfe4f6c2fd781519&src=" + string + "&hl=fr-fr&f=44khz_16bit_stereo"
        
    });

    // Retourne le son
    return sound;

}

/**
 *  <b>CreateAndPlaySound</b>
 *  
 *  Cr�e et joue un son cr�e dans soundManager.
 *  
 *  @param {type} string    Cha�ne � jouer.
 */
function createAndPlaySound(string) {

    // Transformation dela cha�ne
    string = encodeURIComponent(string);

    // Cr�er le son
    mySound = soundManager.createSound({
        url: "http://api.voicerss.org?" + "key=7aedb3da61c14aa9bfe4f6c2fd781519&src=" + string + "&hl=fr-fr&f=44khz_16bit_stereo",
        autoPlay: true,
        
        // Lorsque le son a fini de jouer
        onfinish: function() {
            
            // On test si le callback est d�fini
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
 *  Joue un son cr�e auparavant dans soundManager.
 *  
 *  @param {type} sound     Son � jouer.
 *  @param {type} callback  Fonction appel� lorsque le son a fini d'�tre jou�.
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
            
            // On test si le callback est d�fini
            if(callback) {
                
                // On appelle le callback
                callback();
                
            }
            
        }
        
    });

}
