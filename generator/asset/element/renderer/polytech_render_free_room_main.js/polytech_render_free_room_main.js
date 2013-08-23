/**
 * Created with IntelliJ IDEA.
 * User: clement0210
 * Date: 21/08/13
 * Time: 09:13
 * To change this template use File | Settings | File Templates.
 */

loadLess(LESS_ROOT+"/polytech_render_free_room_main.less");

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function polytech_render_free_room_main(collection, zone, timeInfo) {
    timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 15;
    var tableau = shuffle(collection);
    var time = timeInfo;
    var max_elms=12;
    var i=0;
    
    var content = "<div class='rooms'>";
    content += "<table class='roomsTable' border='0'>";
    while(max_elms>2 && i<tableau.length){
        content += "<tr >";
        content += "<td class='tableRoom'>" + tableau[i++] + "</td>";
        content += "<td class='tableRoom'>" + tableau[i++] + "</td>";
        content += "<td class='tableRoom'>" + tableau[i++] + "</td>";
        content += "</tr>";
        max_elms-=3;
        
    }
    content += "<tr >";
    while(max_elms>0 && i<tableau.length){
        content += "<td class='tableRoom'>" + tableau[i++] + "</td>";
        max_elms--;
    }
    content += "</tr>";


    var dico = {"content": content, "title": "Salles Libres", "time": time};
    zone.pushInfo(dico);
}