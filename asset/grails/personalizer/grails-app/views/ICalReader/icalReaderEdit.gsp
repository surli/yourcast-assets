<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>ICalReader- Edit Calendar</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">            
            <g:render template="/templates/icalReaderMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Edit the information of the calendar </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="icalReaderEditForm" controller="ICalReader">
                      <g:hiddenField name="callId" value="${calendarInfo.renderer}" />
                      <g:hiddenField name="position" value="${position}" />
                      <g:hiddenField name="current" value="${current}" />
                      <table>
                        
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the calendars in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers,current:calendarInfo.renderer]}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Calendar URL
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="The URL of the calendar"/>
                        </td> 
                        <td>
                            <g:textField name="calendarUrl" value="${calendarInfo.url}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Start time
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the start date to retrieve the calendar information"/>
                        </td> 
                        <td>
                          <g:datePicker name="start" value="${calendarInfo.start}" years="${2012..2112}" precision="hour"/>  
                        </td>
                       </tr>
                        <tr>
                         <td class="basic-label" title="">
                          End time
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the end date to retrieve the calendar information"/>
                        </td> 
                        <td>
                            <g:datePicker name="end" value="${calendarInfo.theEnd}" years="${2012..2112}" precision="hour"/>  
                        </td> 
                       </tr>
                       <tr> 
                        <tr> 

                           <td colspan="4" align="center">   
                             
                             <table>
                              
                               <tr>
                                 <td align="center" colspan="2">
                                   <g:actionSubmitImage value="Save" action="editCalendar" src="${resource(dir: 'images/skin', file: 'save.png')}" title="Save"/>  
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
