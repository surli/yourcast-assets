/**
 * Created with IntelliJ IDEA.
 * User: clement0210
 * Date: 01/08/13
 * Time: 09:39
 *
 * work on hyperplanning source
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

loadLess(LESS_ROOT+"/polytech_render_hyperplanning_main.less");
loadScript(RENDERER_PATH+"/utils/calendar.js",true);


/**
 * This method reduce (or not) th text on center div to optimize space
 * @param subject       a subject
 * @param promos        groups
 * @returns {string}
 */

function optimize_center_div(subject,promos){
    var div="";
    var basic_text_size=60;
    var max_subject_size=25;
    var delim1=" : ";
    var delim2=" - "
    var current_size=promos.length+delim2.length+subject.length;
    if(current_size>basic_text_size){
        if(subject.length>max_subject_size){
            subject=subject.substring(0,max_subject_size-1)+".";
        }
        var size=basic_text_size-subject.length;
        var split1=promos.split(delim1);
        if(split1.length>0){
            size=size-split1[0].length-delim1.length;
            div+= "<div class='tableProm'>"+  split1[0]+delim1;
        }
        if(split1.length>1){

            var groups=split1[1].split(delim2);

            var size_per_group=parseInt(size/groups.length);
            for(var i=0;i<groups.length;i++){
                if(i!=groups.length-1){
                    if(groups[i].length>size_per_group){
                        var group=groups[i].substring(0,size_per_group-delim2.length-1)+".";
                    }
                    else{
                        var group=groups[i];
                    }

                    div+=group+delim2;
                }
                else{

                    if(groups[i].length>size_per_group){
                        var group=groups[i].substring(0,size_per_group-1)+".";
                    }
                    else{
                        var group=groups[i];
                    }

                    div+=group;
                }

            }
            div+="</div>";
            div+=delim2+subject;
        }
        else{
            div+="</div>";
            div+=delim2+subject;
        }
    }
    else{
        div+="<div class='tableProm'>"+promos+"</div>"+delim2+subject;
    }

    return div;

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

function polytech_render_hyperplanning_main(collection, zone, timeInfo) {

    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 20;
    var logo = '<img src="img/logos/calendar.png"/>';
    zone.loadImage("img/logos/calendar.png");
    var name = collection.name;
    var tableau = collection.events;
    var eventsNum = 0;
    var time = timeInfo;
    var content;
    var elements_per_time=5;
    var json=request_colors(DOMAIN_PATH+"/"+JS_ROOT+"/HP_colors.json",function(json){});
    var eventsByDays = transform_in_days(tableau);

    var daysSort = Object.keys(eventsByDays).sort();

    for (var idays = 0; idays < daysSort.length; idays++) {
        var days = daysSort[idays];
        var sortObjectStart = function(a, b) {
            return (a.start - b.start);
        };

        eventsByDays[days][days].sort(sortObjectStart);

        var elementsCollec = eventsByDays[days];

        var start = elementsCollec['days'][0];
        var elementsArray = elementsCollec[start];

        var date = get_date_from_timestamp(start);
        eventsNum = 0;


        if (is_same_date(date, get_current_date()))
            var title = "<div class='calendar_dates_multiple_element_hour_top'>Prochains Cours</div>";
        else
            var title = "<div class='calendar_dates_multiple_element_hour_top'>" + date.day + " " + date.month + "</div>";


        content = "<div id='ICalReader' class='main_div_zone1'>";


        content = "<div class='calendar_one_day_all_event'>";
        content += "<table class='calendarTable' border='0'>";

        for (var indice = 0; indice < elementsArray.length; indice++) {
            var elements = elementsArray[indice];

            if (!pastEvent(elements)) {
                eventsNum++;
                if ((eventsNum) % elements_per_time == 0) {
                    var summary = elements.summary;
                    var teachers=elements.teachers;
                    var type=elements.category;
                    var groups=elements.groups;
                    //var description=teachers+" - "+type;
                    //summary=summary+" - "+description;



                    if (inProgress(elements))
                        content += "<tr class='inProgress_synth'>";
                    else
                        content += "<tr >";
                    content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>";
                    var split1=groups.split(" : ");
                    if(json && split1.length>=0){
                         var color=json[split1[0]];
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

                    if (elements.location) {
                        content += "<td class='tableSum'>"+optimize_center_div(summary,groups)+ "</td>";
                        content += "<td class='tableLoc'>" + elements.location.substring(0, 16) + "</td>";
                    }
                    else {
                        content += "<td class='tableSum'>"+optimize_center_div(summary,groups)+ "</td>";
                    }
                    content += "</tr>";

                    content += "</table>";
                    content += "</div>";
                    content += "</div>";
                    content += "<div class='smooth'> </div>";


                    var dico = {"content": content, "logo": logo, "title": title, "time": time};
                    zone.pushInfo(dico);

                    content = "<div id='ICalReader' class='main_div_zone1'>";

                    if (is_same_date(date, get_current_date()))
                        var title= "<div class='calendar_dates_multiple_element_hour_top'>Prochains Cours</div>";
                    else
                        var title= "<div class='calendar_dates_multiple_element_hour_top'>" + date.day + " " + date.month + "</div>";

                    content += "<div class='calendar_one_day_all_event'>";
                    content += "<table class='calendarTable'>";
                }
                else {
                    var summary = elements.summary;
                    var teachers=elements.teachers;
                    var type=elements.category;
                    var groups=elements.groups;
                    //var description=teachers+" - "+type;
                    //summary=summary+" - "+description;


                    if (inProgress(elements))
                        content += "<tr class='inProgress_synth'>";
                    else
                        content += "<tr >";
                    content += "<td class='tableDate'>" + render_date_edt_synth(elements) + "</td>";
                    var split1=groups.split(" : ");
                    if(json && split1.length>=0){
                        var color=json[split1[0]];
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

                    if (elements.location) {
                        content += "<td class='tableSum'>"+optimize_center_div(summary,groups)+ "</td>";
                        content += "<td class='tableLoc'>" + elements.location.substring(0, 16) + "</td>";
                    }
                    else {
                        content += "<td class='tableSum'>"+optimize_center_div(summary,groups)+ "</td>";
                    }
                    content += "</tr>";
                }

            }
        }
    }
}