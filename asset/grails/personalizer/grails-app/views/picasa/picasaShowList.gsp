<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Picasa- List</title>
  </head>
  <body>
    
      <g:render template="/templates/mainMenuTemplate"/>    
      <div class="tabber" id="container">
            <g:render template="/templates/picasaMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Select a renderer to display the albums and searches</p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="picasaAlbumForm" controller="Picasa">
                      <table>
                       <tr>
                        <td class="basic-label">
                          Renderer
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers,current:current]}"/>
                            <g:actionSubmit value="List" action="listAlbums"/> 
                        </td>
                       </tr>
                    </table>
                  </g:form>

                </td>   
              </tr>
              <tr>
                <td colspan="2">
                  
                  <g:render template="/templates/picasaAlbumListTemplate" model="${[listOfAlbums:listOfAlbums,current:current]}"/>
                     
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
