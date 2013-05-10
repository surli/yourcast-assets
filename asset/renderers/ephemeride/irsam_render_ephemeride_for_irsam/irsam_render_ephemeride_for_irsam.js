//
// IUT de Nice / Departement informatique / Projet tuteur� 
// Annee 2012_2013
//
// Projet YourCastStore
//
// ephemeride - Renderer ephemerides. Ce renderer affiche le(s) saint(s) du jour
//   
//       + Version 0.0.0 : Version initiale
//       + Version 1.0.0 : ajout d'un filtre pour pouvoir n'afficher que les saints que l'on souhaite  
//       + Version 1.1.0 : simplification du fichier JSon -> code a modifier
//       + Version 1.2.0 : Suppression du logo et du titre ephemeride, et changement d'affichage
//       + Version 1.3.0 : Un seul saint est choisit al�atoirement (en conservant toujours le filtre), modification totale de l'affichage pour s'adapter au demandes du client, 
//                         modification du fichier style.less pour changer la taille de la police et la r�partition du texte sur l'�cran. 
//                         Renommage de la fonction en "render_epehemeride_for_irsam" pour conserver la version d'origine du renderer.
// 
// Auteur : Y. Seree ( a partir de la version 1.0.0)
//
loadLess(LESS_ROOT+"/irsam_render_ephemeride_for_irsam.less");

function irsam_render_ephemeride_for_irsam(datas, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 3;	
	var logo = "";
	zone.loadImage("img/logos/absence.png");
	var title = "";
	var time = timeInfo;
	content = "";
	//var saintDuJour = false;
	var aleatoire;	


	/*lire dans le fichier JSon*/
	/*var xmlhttp = new XMLHttpRequest();	
	xmlhttp.open("GET", "filtre.json", false); 
	xmlhttp.send(null);	
	if (xmlhttp.readyState == 4 && xmlhttp.status==200){
		doc = JSON.parse(xmlhttp.responseText); */
//	var day = datas.day;
//	var month = get_a_month(datas.month - 1);
//	var month = get_a_month(datas.month);
	content += "<div class='main_div_zone1' >";		

	/* R�cup�rer la date du jour*/
	var currentDate = new Date().getTime();	
	currentDate = get_date_from_timestamp(currentDate);
	var jour = currentDate.day;
	var day2 = get_day();
	var day = day2.charAt(0).toUpperCase();
	day += day2.substr(1,day2.length);
	
	var month2 = get_month();	
	var month = month2.charAt(0).toUpperCase();
	month += month2.substr(1,month2.length);
	month.charAt(0).toUpperCase();
	var heure = get_time();
	

	content += "<div class = 'ephemDateIrsam'>"+day +" "+ jour+" "+ month+"</div>";
	content +="<div id='ephemTitleIrsam'><b>"+ heure+" </b></div>";
	//compteur = 0;

	//nb = doc.saints.length;	



	//for (var indice = 0; indice < datas.saints.length; indice++) {
	/*		 while(saintDuJour==false){	

			  Tirer un nombre al�atoire parmis le nombre de saints disponibles
			aleatoire = Math.floor((Math.random()*(datas.saints.length-1)));			
			exception = false;	


			Comparer le saint choisit al�atoirement avec les saints d'exception 
			for(var j=0; j<nb;j++) {
				if(doc.saints[j] == datas.saints[aleatoire].name){
					compteur++;
					exception = true;

				}  
			}		*/		

	//aleatoire = Math.floor((Math.random()*(datas.names.length-1)));
	/* afficher le saint, s'il n'est pas contenu dans le fichier JSon d'exception, sinon tirer � nouveau un saint au hasard*/
	//if(exception == false){				
	content += "<div class='ephemSaintIrsam'>Bonne f\352te "+datas.names[0]+"</div>";
	content += "</div>";		
	var dico = {"content": content, "logo": logo, "title": title, "time" : time};		
	zone.pushInfo(dico);
}


