
// Renderer pour le scrolling de données RSS
function universite_render_RSS_scrolling(collection, zone, timeInfo) {

    // Debug du temps d'information
    var time_info = typeof timeInfo !== 'undefined' ? timeInfo : 50;

    // Variables
    var logo = '<img src="img/logos/rss.png" align="top"/>';
    var time = 0;
    var content = "";

    // On charge les images
    zone.loadImage("img/logos/rss.png");
    zone.loadImage("img/left_arrow.png");

	if (typeof collection === "object" && Array.isArray(collection.content)) {
		
	    // On parcours les éléments du fil rss
	    for (var indice = 0; indice < collection.content.length; indice++) {
	
	        // Récupération des sous-éléments
	        var elements = collection.content[indice];
	
	        // Déclaration de l'html
	        content += logo + "<img src='img/left_arrow.png' />";
	        content += "<span class='tweet'> <span class='twitter_title'>" + collection.title + " : </span>";
	        content += "<span class='twitter_Content'>" + elements.title + " </span></span>";
	
	        // Augmentation du temps d'affichage
	        time += time_info;
	
	    }
	
	    // Déclaration du dictionnaire
	    var dico = {
	        content: content,
	        logo: logo,
	        time: time
	    };
	
	    // On push le contenu généré dans la zone qui se chargera de l'afficher
	    zone.pushInfo(dico);
	}

}