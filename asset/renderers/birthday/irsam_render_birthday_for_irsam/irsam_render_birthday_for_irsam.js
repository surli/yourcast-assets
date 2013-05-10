//
// IUT de Nice / Departement informatique / Projet tuteur� 
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

loadLess(LESS_ROOT+"/irsam_render_birthday_for_irsam.less");

function irsam_render_birthday_for_irsam(datas, zone, timeInfo) {
	console.log("call birthday with" + datas);
	if (datas.length == 0)
		return;
	
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 3;	
	var logo = '<img src="img/logos/birthday.png"/>';
	zone.loadImage("img/logos/birthday.png");
	var title = "";
	//var time = timeInfo;
	content = "";

	content += "<div class='main_div_zone1' >";		

	content += "<div class = 'birthdayTitleIRSAM'>"+ "Bon anniversaire" +"</div><br/>";
	console.log("datas : " + datas + datas.length);
	for (var indice = 0; indice < datas.length; indice++) {
		console.log("indice : " + indice);
		
		content += "<br/><div class='birthdayNameIRSAM'>"+firstLettertoUpperCase(datas[indice].name)+"</div>";
	}
	content += "</div>";		
	var dico = {"content": content, "logo": logo, "title": title, "time" : timeInfo};		
	zone.pushInfo(dico);
}

