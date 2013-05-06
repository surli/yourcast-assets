/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*
*Credits icon:
*    Climacons (http://adamwhitcroft.com/climacons/)
*/
var dicoMeteo = {
	0 : {
		text : "ciel clair",
		day_icon : "sun",
		night_icon : "moon"
	},
	1 : {
		text : "partiellement nuageux",
		day_icon : "cloud sun",
		night_icon : "cloud moon"
	},
	2 : {
		text : "nuageux",
		day_icon : "cloud",
		night_icon : "cloud moon"
	},
	3 : {
		text : "ciel couvert",
		day_icon : "fog",
		night_icon : "gof moon"
	},
	10 : {
		text : "brouillard",
		day_icon : "haze",
		night_icon : "haze moon"
	},
	21 : {
		text : "quelques pluies possible",
		day_icon : "showers sun",
		night_icon : "showers moon"
	},
	22 : {
		text : "neige possible",
		day_icon : "flurries sun",
		night_icon : "flurries moon"
	},
	23 : {
		text : "grele possible",
		day_icon : "sleet sun",
		night_icon : "sleet moon"
	},
	24 : {
		text : "verglas possible",
		day_icon : "haze sun",
		night_icon : "haze moon"
	},
	29 : {
		text : "orages possible",
		day_icon : "lightning sun",
		night_icon : "lightning moon"
	},
	38 : {
		text : "quelques neiges",
		day_icon : "snow sun",
		night_icon : "snow moon"
	},
	39 : {
		text : "tempete de neige",
		day_icon : "flurries",
		night_icon : "flurries mmon"
	},
	45 : {
		text : "brouillard",
		day_icon : "haze sun",
		night_icon : "haze moon"
	},
	49 : {
		text : "brouillard frais",
		day_icon : "fog sun",
		night_icon : "fog moon"
	},
	50 : {
		text : "bruine legere",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	51 : {
		text : "faible bruine",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	56 : {
		text : "bruine verglas",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	57 : {
		text : "beaucoup de verglas",
		day_icon : "haze",
		night_icon : "haze moon"
	},
	60 : {
		text : "legeres pluies a quelques endroits",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	61 : {
		text : "legeres pluies",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	62 : {
		text : "quelques pluies par endroit ",
		day_icon : "hail ",
		night_icon : "hail moon"
	},
	63 : {
		text : "quelques pluies",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	64 : {
		text : "beaucoup de pluie par endroit",
		day_icon : "rain",
		night_icon : "rain moon"
	},
	65 : {
		text : "fortes pluies",
		day_icon : "downpour",
		night_icon : "downpour moon"
	},
	66 : {
		text : "legeres pluies verglacante",
		day_icon : "hail",
		night_icon : "hail moon"
	},
	67 : {
		text : "fortes pluies verglacante",
		day_icon : "downpour",
		night_icon : "downpour moon"
	},
	68 : {
		text : "legeres greles",
		day_icon : " flurries",
		night_icon : "flurries moon"
	},
	69 : {
		text : "fortes tombees de grele",
		day_icon : "sleet",
		night_icon : "sleet moon"
	},
	70 : {
		text : "quelques neiges a certains endroits",
		day_icon : "snow sun",
		night_icon : "snow moon"
	},
	71 : {
		text : "quelques neiges",
		day_icon : "snow",
		night_icon : "snow moon"
	},
	72 : {
		text : "un peu de neige à certains endroits",
		day_icon : "snow sun",
		night_icon : "snow moon"
	},
	73 : {
		text : "quelques neiges",
		day_icon : "snow",
		night_icon : "snow moon"
	},
	74 : {
		text : "beaucoup de neiges par endroit",
		day_icon : "snow",
		night_icon : "snow moon"
	},
	75 : {
		text : "beaucoup de neige",
		day_icon : "snow",
		night_icon : "snow moon"
	},
	79 : {
		text : "greles",
		day_icon : "sleet",
		night_icon : "sleet moon"
	},
	80 : {
		text : "quelques averses",
		day_icon : " showers sun",
		night_icon : "showers moon"
	},
	81 : {
		text : "beaucoup de pluies",
		day_icon : " downpour ",
		night_icon : "downpour moon"
	},
	82 : {
		text : "enormement de pluie",
		day_icon : "downpour",
		night_icon : "downpour moon"
	},
	83 : {
		text : "quelque averses de grele",
		day_icon : "sleet sun",
		night_icon : "sleet moon"
	},
	84 : {
		text : "beaucoup de grele",
		day_icon : "sleet",
		night_icon : "sleet moon"
	},
	85 : {
		text : "quelques chutes de neige",
		day_icon : "flurries",
		night_icon : "flurries moon"
	},
	86 : {
		text : "de forte chutes de neige",
		day_icon : "snow",
		night_icon : "snow moon"
	},
	87 : {
		text : "legeres tombes de grele",
		day_icon : "sleet sun",
		night_icon : "sleet moon"
	},
	88 : {
		text : "forte tombes de grele",
		day_icon : "sleet",
		night_icon : "sleet moon"
	},
	91 : {
		text : "quelques pluies avec orages",
		day_icon : " lightning",
		night_icon : "lightning moon"
	},
	92 : {
		text : "beaucoup de pluies avec orages",
		day_icon : "lightning",
		night_icon : "lightning moon"
	},
	93 : {
		text : "un peu de neige avec orages",
		day_icon : "flurries",
		night_icon : "flurries moon"
	},
	94 : {
		text : "beaucoup de neiges avec orages",
		day_icon : "lightning",
		night_icon : "lightning moon"
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
