<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Announcements- List Public</title>
  </head>
  <body>
    
      <g:render template="/templates/mainMenuTemplate"/>
      
      <div class="tabber" id="container">
         
            <g:render template="/templates/announcementsMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Select a renderer to display the target public for the announcements</p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="annoucementsTargetForm" controller="Announcements">
                      <table>
                       <tr>
                        <td class="basic-label">
                          Renderer
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers,current:current]}"/>
                            <g:actionSubmit value="List" action="listTargets"/> 
                        </td>
                       </tr>
                    </table>
                  </g:form>

                </td>   
              </tr>
              <tr>
                <td colspan="2">
                  
                  <g:render template="/templates/announcementsListTemplate" model="listOfAnnoucements:${listOfAnnoucements}"/>
                     
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
