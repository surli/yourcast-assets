<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>ICalReader- Add Calendar</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">            
            <g:render template="/templates/icalReaderMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Complete the information to add the calendar </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="icalReaderAddForm" controller="ICalReader">
                      <table>
                        
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the calendars in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersTemplate" model="listOfRenderers:${listOfRenderers}"/>
                        </td> 
                       </tr>
                       <!--tr>
                         <td class="basic-label" title="">
                          Calendar Id
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a costumized identifier for the calendar"/>
                        </td> 
                        <td>
                            <g:textField name="calendarId" value=""/>
                        </td> 
                       </tr-->
                       <tr>
                         <td class="basic-label" title="">
                          Calendar URL
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="The URL of the calendar"/>
                        </td> 
                        <td>
                            <g:textField name="calendarUrl" value=""/>
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
                          <g:datePicker name="start" value="${new Date()}" years="${2012..2112}" precision="hour"/>  
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
                            <g:datePicker name="end" value="${new Date()}" years="${2012..2112}" precision="hour"/>  
                        </td> 
                       </tr>
                       <tr> 
                        <td colspan="3" align="center">    
                          <g:actionSubmitImage value="add" action="addCalendar" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
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
