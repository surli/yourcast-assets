/*
 * render_planning :
 * 		Displays the planning of the current day
 * 
 * Author : Micha�l Gianfaldone
 *        : Emilie Nuyen Van
 * 			
 * 
 */
function irsam_render_workers(datas, zone, timeInfo) {
	
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 5;
	
	var logo = '<img src="img/logos/edt.png"/>';
	zone.loadImage("img/logos/edt.png");
	
	var title = " " ;
	var time = timeInfo;
	var rendererContent = "";
	
	rendererContent += "<div class='main_div_zone1 planning'>";
	
	//pick the current time in order to determinate the period(morning/afternoon)
	var today = new Date();
	
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	
	var workers = new Array();
	
	if ( h < 12 ) {
		workers.push(datas[0]);
		workers.push(datas[1]);
	} else if ( h == 12 && m == 0 && s == 0 ) {
		workers.push(datas[1]);
		workers.push(datas[2]);
	} else {
		workers.push(datas[1]);
		workers.push(datas[2]);
	}
	
	//Table which contains the name of the different worker
	var workersTab;
	var day;
	var n;
	
	//Fills the content of the renderer with the different informations to display
	for (var i = 0; i<workers.length; i++) {
		
		workersTab = workers[i].intervenants.split(" . ");
		day = workers[i].jour;
		n = day.indexOf(".");
		title += day.substr(0,n);
		 
		for (var j = 0; j<workersTab.length; j++) {
			rendererContent += "<div class='workers'>" + workersTab[j] + "</div>";
		}
		
		rendererContent += "</div>";
		dico = {"content": rendererContent, "logo": logo, "title": title, "time" : time};
		zone.pushInfo(dico);
		title = " " ;
		rendererContent = "<div class='main_div_zone1 planning'>";
	}
	
}