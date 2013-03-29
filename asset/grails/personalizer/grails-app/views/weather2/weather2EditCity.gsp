<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Weather2- Edit City</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
            
            <g:render template="/templates/weather2MenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Edit the forecast information </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="weather2EditCityForm" controller="Weather2">
                      <g:hiddenField name="callId" value="${cityInfo.renderer}" />
                      <g:hiddenField name="position" value="${position}" />
                      <g:hiddenField name="current" value="${current}" />
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the weather information in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers, current:cityInfo.renderer]}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          City
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a city to query the forecasts"/>
                        </td> 
                         <td>
                           <g:render template="/templates/citySelectedTemplate" model="${[listOfCities:listOfCities,current:cityInfo]}"/>
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
                           <g:render template="/templates/forecastSelectedTemplate" model="${[listOfDays:listOfDays,current:cityInfo.forecast]}"/>
                         </td>  
                       </tr>
                       
                        <tr> 

                           <td colspan="4" align="center">   
                             
                             <table>
                              
                               <tr>
                                 <td align="center" colspan="2">
                                   <g:actionSubmitImage value="Save" action="editCity" src="${resource(dir: 'images/skin', file: 'save.png')}" title="Save"/>  
                                 </td>  
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td colspan="2" align="center">    
                                   <g:actionSubmitImage value="Back" action="back" src="${resource(dir: 'images/skin', file: 'back.png')}" title="Back"/>  
                                 </td>
                               </tr>
                             </table>
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
