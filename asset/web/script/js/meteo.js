/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/
var dicoMeteo = {
	0 : {
		text : "ciel clair",
		day_icon : IMAGE_PATH+"/weather_icons/soleil.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit.png"
	},
	1 : {
		text : "partielllement nuageux",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_nuagesMoins.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_nuages_moins.png"
	},
	2 : {
		text : "nuageux",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_nuagesPlus.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_nuagesPlus.png"
	},
	3 : {
		text : "ciel couvert",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_nuages.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_nuages.png"
	},
	10 : {
		text : "brouillard",
		day_icon : IMAGE_PATH+"/weather_icons/brouillard.png",
		night_icon : IMAGE_PATH+"/weather_icons/brouillard.png"
	},
	21 : {
		text : "quelques pluies possible",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	22 : {
		text : "neige possible",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	23 : {
		text : "grele possible",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	24 : {
		text : "verglas possible",
		day_icon : IMAGE_PATH+"/weather_icons/froid.png",
		night_icon : IMAGE_PATH+"/weather_icons/froid.png"
	},
	29 : {
		text : "orages possible",
		day_icon : IMAGE_PATH+"/weather_icons/Orages.png",
		night_icon : IMAGE_PATH+"/weather_icons/Orages.png"
	},
	38 : {
		text : "quelques neiges",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	39 : {
		text : "tempete de neige",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige_grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige_grele.png"
	},
	45 : {
		text : "brouillard",
		day_icon : IMAGE_PATH+"/weather_icons/brouillard.png",
		night_icon : IMAGE_PATH+"/weather_icons/brouillard.png"
	},
	49 : {
		text : "brouillard frais",
		day_icon : IMAGE_PATH+"/weather_icons/brouillard.png",
		night_icon : IMAGE_PATH+"/weather_icons/brouillard.png"
	},
	50 : {
		text : "bruine legere",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	51 : {
		text : "faible bruine",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	56 : {
		text : "bruine verglas",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	57 : {
		text : "beaucoup de verglas",
		day_icon : IMAGE_PATH+"/weather_icons/froid.png",
		night_icon : IMAGE_PATH+"/weather_icons/froid.png"
	},
	60 : {
		text : "legeres pluies a quelques endroits",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	61 : {
		text : "legeres pluies",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	62 : {
		text : "quelques pluies par endroit ",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	63 : {
		text : "quelques pluies",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	64 : {
		text : "beaucoup de pluie par endroit",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	65 : {
		text : "fortes pluies",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	66 : {
		text : "legeres pluies verglacante",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	67 : {
		text : "fortes pluies verglacante",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	68 : {
		text : "legeres greles",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	69 : {
		text : "fortes tombees de grele",
		day_icon : IMAGE_PATH+"/weather_icons/neige_grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/neige_grele.png"
	},
	70 : {
		text : "quelques neiges a certains endroits",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	71 : {
		text : "quelques neiges",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	72 : {
		text : "un peu de neige à certains endroits",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	73 : {
		text : "quelques neiges",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	74 : {
		text : "beaucoup de neiges par endroit",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	75 : {
		text : "beaucoup de neige",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	79 : {
		text : "greles",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	80 : {
		text : "quelques averses",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_pluie.png"
	},
	81 : {
		text : "beaucoup de pluies",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	82 : {
		text : "enormement de pluie",
		day_icon : IMAGE_PATH+"/weather_icons/pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/pluie.png"
	},
	83 : {
		text : "quelque averses de grele",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	84 : {
		text : "beaucoup de grele",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	85 : {
		text : "quelques chutes de neige",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neige.png"
	},
	86 : {
		text : "de forte chutes de neige",
		day_icon : IMAGE_PATH+"/weather_icons/nuages_neigePlus.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuages_neigePlus.png"
	},
	87 : {
		text : "legeres tombes de grele",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	88 : {
		text : "forte tombes de grele",
		day_icon : IMAGE_PATH+"/weather_icons/grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/grele.png"
	},
	91 : {
		text : "quelques pluies avec orages",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_orages_pluie.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_orages_pluie.png"
	},
	92 : {
		text : "beaucoup de pluies avec orages",
		day_icon : IMAGE_PATH+"/weather_icons/OragesPlus.png",
		night_icon : IMAGE_PATH+"/weather_icons/OragesPlus.png"
	},
	93 : {
		text : "un peu de neige avec orages",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_nuages_neige_grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_nuages_neige_grele.png"
	},
	94 : {
		text : "beaucoup de neiges avec orages",
		day_icon : IMAGE_PATH+"/weather_icons/soleil_nuages_neige_grele.png",
		night_icon : IMAGE_PATH+"/weather_icons/nuit_nuages_neige_grele.png"
	}
};

function dayOfWeek(date) {
    var elem = date.split('-'); 
    var year = elem[0]; 
    var month = elem[1]-1; 
    var day = elem[2];
    var currentDate = new Date(year, month, day);
    var currentDay = get_a_day(currentDate.getDay());
    return currentDay;
}
