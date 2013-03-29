<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Weather2- List</title>
  </head>
  <body>
    
      <g:render template="/templates/mainMenuTemplate"/>
    
      <div class="tabber" id="container">
          
            <g:render template="/templates/weather2MenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Select a renderer to show the cities of the weather being displayed</p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="weather2ListForm" controller="Weather2">
                      <table>
                       <tr>
                        <td class="basic-label">
                          Renderer
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers,current:current]}"/>
                            <g:actionSubmit value="List" action="listCities"/> 
                        </td>
                       </tr>
                    </table>
                  </g:form>

                </td>   
              </tr>
              <tr>
                <td colspan="2">
                  
                  <g:render template="/templates/weather2CityListTemplate" model="listOfCities:${listOfCities}"/>
                     
                </td>  
              </tr>  
              <tr>
                <td class="${messageClass}">
                  <p> ${message} </p>
                </td>
              </tr>
             </table>
        <!--/div-->  

        <!--div class="tabbertab">
          <h2> <g:link url="[action:'list',controller:'book']">Twitter</g:link></h2>
          <p> info</p>
        </div> 

        <div class="tabbertab">
          <h2> <g:link url="[action:'list',controller:'Weather2']">Weather2</g:link></h2>
        </div> 



        <div class="tabbertab">
          <h2> Announcement </h2>
        </div> 

        <div class="tabbertab">
          <h2> ICalReader </h2>
        </div>
                


        
      </div--> 
  </body>
</html>
