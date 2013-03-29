<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Annoucements- Edit Target Public</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
        <!--div class="tabbertab">
  
            
            <h2> Picasa </h2!-->
            
            <g:render template="/templates/announcementsMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Edit the information of the target public </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="announcementsEditForm" controller="Announcements">
                      <g:hiddenField name="callId" value="${announcementInfo.renderer}" />
                      <g:hiddenField name="position" value="${position}" />
                      <g:hiddenField name="current" value="${current}" />
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the announcements in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers, current:announcementInfo.renderer]}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Target
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the target public for the announcemnts"/>
                        </td> 
                         <td>
                           <g:textField name="target" value="${announcementInfo.target}"/>
                         </td>  
                       </tr>
                        <tr> 

                           <td colspan="4" align="center">   
                             
                             <table>
                              
                               <tr>
                                 <td align="center" colspan="2">
                                   <g:actionSubmitImage value="Save" action="editAnnouncement" src="${resource(dir: 'images/skin', file: 'save.png')}" title="Save"/>  
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
