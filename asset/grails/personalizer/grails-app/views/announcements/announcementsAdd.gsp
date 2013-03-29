<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Annoucements- Add Target Public</title>
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
                   <p class="message"> Complete the information to add the target public </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="announcementsForm" controller="Announcements">
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the announcements in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersTemplate" model="listOfRenderers:${listOfRenderers}"/>
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
                           <g:textField name="target" value=""/>
                         </td>  
                       </tr>
                       <tr> 
                        <td colspan="3" align="center">    
                          <g:actionSubmitImage value="add" action="addTarget" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
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
