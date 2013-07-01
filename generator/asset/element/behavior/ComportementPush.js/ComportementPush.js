/**
 *  Rights :
 *
 *      Copyright (c) 2013 YourCast - I3S/CNRS ADAM/INRIA.
 *
 *      All rights reserved. This program and the 
 *      accompanying materials are made available under the 
 *      terms of the GNU Public License v3.0 which accompanies 
 *      this distribution, and is available at
 *      http://www.gnu.org/licenses/gpl.html
 *
 *  Informations :
 *
 *      La classe comportement pushzone réutilise la classe
 *      comportement et effectue une sorte de menu déroulant
 *      infini. On l'utilise notamment pour l'instant dans
 *      le client de l'EPU. Pour éviter les pertes de 
 *      performances à force d'ajouter des blocks d'infos, 
 *      une purge des blocks non visible dans l'affichage a 
 *      été mis en place.
 *
 *  Versions :
 *
 *      1.0.0 : Création d'une classe fonctionnelle.
 *
 *  Contributors :
 *
 *      Simon Urli (simon.urli@gmail.com)
 *      Guillaume Golfieri (golfieri.guillaume@gmail.com)
 */

// Load le script d'animation'
loadScript(BEHAVIOUR_PATH + "/utils/YourcastAnim/move.js");

// Classe
var ComportementPush = Class.create(Comportement, {
    
    /**
     *  Boucle du comportement
     *
     *  La boucle sert à changer les éléments d'une zone par 
     *  rapport aux informations que contient la zone. Pour 
     *  cela, elle récupère les enfants de la zone et compare
     *  leur id au tableau info de la zone. Si un id n'est 
     *  pas défini, alors on cache l'élément.
     */
    loop: function() {

        // Sécurité
        this.securiteInfosZone();

        // On stocke le this
        var self = this;

        // On clear tout d'abord les timeouts stockés
        clearTimeout(this.timeout);

        // On récupère les informations
        var info = self.zone_concerne.getInfos()[self.indice];

        // Test si bloc est défini dans le renderer
        if(info.bloc) {

            // On enlève le content
            if(this.main_zone)
                this.main_zone.remove();

        }

        else {

            // Pas de block supplémentaire inutile
            if($$('.' + this.id_push).length > 6)
                $$('.' + this.id_push)[6].remove();

            // On change le contenu de l'info
            content_push = '<div class="' + this.id_push + '">' + info.content + '</div>';

        }

        // Enlève les animations
        enleverAnimation(this.main_zone.id);

        // On prend la hauteur courante
        hauteur_content = this.main_zone.getHeight();

        // On ajoute l'information
        self.zone_concerne.addContent(content_push);

        // On calcule la hauteur de l'information ajoutée
        hauteur_content_ajout = hauteur_content - this.main_zone.getHeight();

        // On place le content au bon endroit
        this.main_zone.setStyle({
            'top': hauteur_content_ajout+"px"
        });

        // On déplace le contenu
        setTimeout(function() { moveTop(self.main_zone.id, 0, 4) }, 10);

        // On test si le comportement est en marche
        if(self.isRunning())
            self.timeout = setTimeout(function() { self.next(); }, info.time * 1000);

    },

    /**
     *  Setter de la zone
     *
     *  Permet de chancer la zone du comportement. 
     *
     *  /!\ Cette fonction doit être appelée lors du 
     *  lancement du comportement sous peine d'avoir 
     *  une erreur critique.
     */
    setZone: function($super, nouvelle_zone) {

        // On execute le super
        $super(nouvelle_zone);

        // Style nécessaire au bon fonctionnement du push
        $(this.zone_concerne.id).setStyle({
            "overflow": "hidden",
            "position": "absolute"
        });

        // On ajoute un nouveau div
        this.zone_concerne.addContent('<div id="' + this.zone_concerne.id + '_content" ></div>');

        // Nouvelle valeur dans la classe
        this.id_push = 'comportementpush_' + this.zone_concerne.id;

        // Stockage de la mainzone
        this.main_zone = $(this.zone_concerne.id + "_content");

    }

});

