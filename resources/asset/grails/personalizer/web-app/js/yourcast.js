function initTabs()
{
    
    var mainMenuDiv = document.getElementById("menu-div");
    
    var mainMenuUl= mainMenuDiv.getElementsByTagName("ul");
    
    //alert(mainMenuUl.length);

    var lis= mainMenuUl[0].getElementsByTagName("li");

    //alert(lis.length);

    for(var i=0; i<lis.length; i++)
    {
        var as= lis[i].getElementsByTagName("a");
        
        //alert(as.length);

        for(var j=0; j<as.length; j++)
        {
            as[j].onclick= updateBackGround;
            
            /*as[j].onblur=function() {
                as[j].style.background="crimson"
}*/
        }
    }    
 }
 
 
 function updateBackGround()
 {
     var mainMenu= this.parentNode.parentNode; //ul/li
     
     var lis= mainMenu.getElementsByTagName("li");
     
    for(var i=0; i<lis.length; i++)
    {
        var as= lis[i].getElementsByTagName("a");

        for(var j=0; j<as.length; j++)
        {
            as[j].className= "unselected";
        }
    }
    
    this.className= "selected";
    
    //this.style.background= "crimson";
     
     
 }
 
//window.onload = initTabs();