/*
 *
 *
 */

loadLess(LESS_ROOT+"/polytech_render_RSS_for_main.less");
 
function polytech_render_RSS_for_main(tableau, zone, timeInfo) {
	timeInfo = typeof timeInfo !== 'undefined' ? timeInfo : 10;
	var time = timeInfo;
	
	var titleFeed = tableau.title;
	var mainTitle = tableau.title;
    	var number_of_lines=12;
	var title_size=50;

	for (var indice = 0; indice < tableau.content.length; indice++) {
		var elements = tableau.content[indice];

		var title = elements.title;

        var split_title=title.split(":");
        var j=1;
        var titre="";
        while(j<split_title.length){
            var t;
            if(j!=split_title.length -1){
                t=split_title[j]+":";
            }
            else{
                t=split_title[j];
            }
            titre+=t;
            j++;
        }
        var reg=new RegExp("(\n)", "g");
        var regP=new RegExp("(<p>)", "g");
        var regPEnd=new RegExp("(</p>)", "g");
        var regVspace=new RegExp("(vspace=)(\").{1}(\")", "g");
        var regHspace=new RegExp("(hspace=)(\").{1}(\")", "g");
        var regalign=new RegExp("(align=)(\"left\")", "g");
        var regTooBR=new RegExp("(<br/>)\s*(<br/>)", "g");
        var regTooSpacesBR=new RegExp("\s*(<br/>)", "g");
        var contentAnnounces1 = elements.content.replace(reg, "");
        var contentAnnounces2 = contentAnnounces1.replace(regP, "<br />");
        var contentAnnounces3 = contentAnnounces2.replace(regPEnd, "");
        var contentAnnounces4 = contentAnnounces3.replace(regVspace, "");
        var contentAnnounces5 = contentAnnounces4.replace(regHspace, "");
        var contentAnnounces6 = contentAnnounces5.replace(regalign, "");
        var contentAnnounces7 = contentAnnounces6.replace(regTooBR, "");
        var contentAnnounces8 = contentAnnounces7.replace(regTooSpacesBR, "<br />");
        var contentAnnounces = contentAnnounces8.replace(regTooBR, "");


        while(contentAnnounces.length!=0){
            var reg_br=contentAnnounces.match(new RegExp("<br */>", "g"));
            var count=0;
            if(reg_br){
                count=reg_br.length;
            }
            var split_content=contentAnnounces.split("<br />");
            var i=0;
            var content="";
            content += "<div class='header_div' >";
            content += "<div class='rss_body'>";
            content += "<div class='rss_Title'>"+titre+"</div>";    
            content += "<div class='rss_Content'>"
            var nb_lines=number_of_lines;
            while(i<nb_lines && i<split_content.length){
                var reg_li=split_content[i].match(new RegExp("<li *>", "g"));
                if(reg_li){
                        nb_lines-=reg_li.length;

                }
                c=split_content[i]+"<br />";
                content+=c;
                i++;
            }
            content+="</div>";
            content+="</div>";
            contentAnnounces="";
            while(i<split_content.length){
                var c=split_content[i]+"<br />";
                contentAnnounces+=c;
                i++;
            }
            var dico = {"content": content, "logo": "", "title": titleFeed, "time": time};
            zone.pushInfo(dico);

        }

		
		

		
	}
}
