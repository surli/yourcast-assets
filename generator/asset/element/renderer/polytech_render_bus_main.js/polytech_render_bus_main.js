/**
 * Created with IntelliJ IDEA.
 * User: clement0210
 * Date: 01/08/13
 * Time: 09:39
 * To change this template use File | Settings | File Templates.
 */

loadLess(LESS_ROOT+"/polytech_render_bus_main.less");
loadScript(RENDERER_PATH+"/utils/calendar.js",true);
/*
 * work on icalreader1 source
 * display the calendar of the day on the zone1 (main)
 * the content is modified but the logo and the title are the same given the name of the calendar
 * function uses :
 * 		- transform_in_days(tableau) -> renderers/utils/calendar.js
 * 		- render_date_edt(element) -> js/date.js
 * 		- get_date_from_timestamp(hours) -> js/date.js
 *
 * CSS classes :
 * - main_div_zone1
 * - calendar_dates_multiple_element_hour_top
 * - calendar_one_day_all_event
 * - calendarTable
 * - inProgress_synth
 * - tableDate
 * - calendar_edt_hours
 * - tableSum
 * - tableLoc
 * - smooth
 */

function my_terminus_format(str){
    var i=0;
    var prev=" ";
    var res="";
    str=str.toLowerCase();
    while(i<str.length){
        var ch=str.substring(i,i+1);

        if((ch!=" " && prev==" ") || (ch!="-" && prev=="-") || (ch!="'" && prev=="'")){
          res+=ch.toUpperCase();
        }
        else{
            res+=ch;
        }
        prev=ch;
        i++;
    }
    return res;
}
function request_colors(url,callback) {

    var res;
    // Effecture la requête Ajax
    new Ajax.Request(url, {

        // On utilise un get
        method:'get',
        asynchronous:false,

        // Si la requête est un succès
        onSuccess: function(transport) {

            // On vérifie que le status est bon
            if (transport.status == 200) {

                // On récupère la réponse du JSon
                var textContent = transport.responseText;
                // On essaie de le traiter
                try {
                    var json = JSON.parse(textContent);
                    callback(json);
                    res=json;

                }

                    // Un erreur est survenue
                catch (e) {
                    console.log(e);

                }

            } else {

                // Création d'une exception
                throw new Exception("[moteur/js/controler_zone.js] request", transport.statusText);

            }
        },

        onFailure: function(transport) {

            // Création d'une exception
            throw new Exception("[moteur/js/controler_zone.js] request", "La requête vers l'url donné a échouée.");

        },

        onException: function(transport, exception) {

            // Création d'une exception
            throw new Exception("[moteur/js/controler_zone.js] request", exception.message);

        },

        onComplete: function(transport) {


        }

    });
    return res;

}
function polytech_render_bus_main(collection, zone, timeInfo) {

    var BUS_IMG_PATH="img/bus/";
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 20;
    var tableau = collection.passages;
    var time = timeInfo;
    var content;
    var eventsNum=0;
    var elements_per_time=6;


    content = "<div class='bus'>";
    content += "<table class='passageTable' border='0'>";
    for (var i = 0; i < tableau.length; i++) {
        var passage = tableau[i];
        var h=passage.time.hours.toString().length==1?"0"+passage.time.hours.toString():passage.time.hours.toString();
        var m=passage.time.minutes.toString().length==1?"0"+passage.time.minutes.toString():passage.time.minutes.toString();
        var stop=passage.stop.stopName;
        var terminus=passage.line.terminus;
        var line=passage.line.name;
        var json=request_colors(DOMAIN_PATH+"/"+JS_ROOT+"/Bus_colors.json",function(json){});
                eventsNum++;
                if ((eventsNum) % elements_per_time == 0) {

                    content += "<tr >";
                    content += "<td class='tableLine'>" + line + "</td>";
                    if(json ){
                        var color=json[line];
                        if(color){

                            content+="<td id='tableColor' style='background:"+color+";'></td>"


                        }
                        else{
                            content+="<td id='tableColor'></td>";
                        }
                    }
                    else{
                        content+="<td id='tableColor'></td>";
                    }
                    content += "<td class='tableTerminus'>" + my_terminus_format(terminus) + "</td>";
                    content += "<td class='tableTime'>" + h+" h "+ m+ "</td>";
                    content += "</tr>";
                    content += "</table>";
                    content += "</div>";
                    content += "<div class='smooth'> </div>";
                    var dico = {"content": content, "title": "Bus à l'arrêt "+stop, "time": time};
                    zone.pushInfo(dico);


                    content = "<div class='bus'>";
                    content += "<table class='passageTable'>";
                }
                else {
                    content += "<tr >";
                    content += "<td class='tableLine'>" + line + "</td>";
                    if(json ){
                        var color=json[line];
                        if(color){

                            content+="<td id='tableColor' style='background:"+color+";'></td>"


                        }
                        else{
                            content+="<td id='tableColor'></td>";
                        }
                    }
                    else{
                        content+="<td id='tableColor'></td>";
                    }
                    content += "<td class='tableTerminus'>" + my_terminus_format(terminus) + "</td>";
                    content += "<td class='tableTime'>" + h+" h "+ m+ "</td>";
                    content += "</tr>";
                }
                if (i + 1 == tableau.length) {
                    if ((eventsNum) % elements_per_time != 0) {
                        content += "</table>";
                        content += "</div>";
                        content += "<div class='smooth'> </div>";
                        var dico = {"content": content, "title": "Bus à l'arrêt "+stop, "time": time};
                        zone.pushInfo(dico);
                    }
                }
    }
}
