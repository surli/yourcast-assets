<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Picasa- Edit Album</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
                      
      <g:render template="/templates/picasaMenuTemplate"/>
      <table class="principal">
        <tr>  
          <td>
             <p class="message"> Edit the album information</p>
          </td>  
         </tr>
         <tr> 
           <td>
             <g:form name="picasaEditAlbumForm" controller="Picasa">
                 <g:hiddenField name="callId" value="${album.renderer}" />
                 <g:hiddenField name="position" value="${position}" />
                 <g:hiddenField name="current" value="${current}" />
              <table>
                 <tr>
                   <td class="basic-label" title="">
                    Renderer
                  </td> 
                  <td>
                    <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the pictures in order to be correctly displayed"/>
                  </td> 
                  <td>
                      <g:render template="/templates/renderersWithOptionSelectedTemplate" model="${[listOfRenderers:listOfRenderers,current:album.renderer]}"/>
                  </td> 
                 </tr>
                 <tr>
                   <td class="basic-label" title="">
                      Album URL
                   </td>
                   <td>
                    <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a URL following the format https://picasaweb.google.com/..."/>
                   </td> 
                   <td class="basic-url" title="">
                      ${prefix}
                   </td>  
                   <td>
                     <g:textField name="url" value="${album.path}" />
                   </td>
                 </tr>
                 <tr> 
                   
                    <td colspan="4" align="center">    
                      <table>
                        <tr>
                          <td align="center" colspan="2">
                            <g:actionSubmitImage value="Save" action="editAlbum" src="${resource(dir: 'images/skin', file: 'save.png')}" title="Save"/>  
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
  </body>
</html>
