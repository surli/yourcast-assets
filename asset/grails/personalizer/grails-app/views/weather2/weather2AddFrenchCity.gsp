<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Weather2- Add French City</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
            
            <g:render template="/templates/weather2MenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Select a renderer, a city to query the weather and a number of days for the forecast </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="weather2AddFrenchCityForm" controller="Weather2">
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the weather information in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersTemplate" model="listOfRenderers:${listOfRenderers}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          French city
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a city to query the forecasts"/>
                        </td> 
                         <td>
                           <g:render template="/templates/cityTemplate" model="listOfCities:${listOfCities}"/>
                         </td>  
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Forecast
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the number of days for the forecasts"/>
                        </td> 
                         <td>
                           <g:render template="/templates/forecastTemplate" model="listOfDays:${listOfDays}"/>
                         </td>  
                       </tr>
                       
                       <tr> 
                        <td colspan="3" align="center">  
                           <g:hiddenField name="home" value="false"/>
                          <g:actionSubmitImage value="add" action="addFrenchCity" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
                        </td>
                       </tr>
                    </table>
                  </g:form>

                </td>   
              </tr>    
              <tr>
                <td class="${messageClass}">
                  <p> ${message} </p>
                </td>
              </tr>
             </table>
      </div>  
  </body>
</html>
