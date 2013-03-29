<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Picasa- Add Album</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
        <!--div class="tabbertab">
  
            
            <h2> Picasa </h2!-->
            
            <g:render template="/templates/picasaMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Complete the information to add the new album </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="picasaAlbumForm" controller="Picasa">
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the pictures in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersTemplate" model="listOfRenderers:${listOfRenderers}"/>
                        </td> 
                       </tr>
                       <!--tr>
                         <td class="basic-label" title="">
                          Album Id
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a customized identifier for the album"/>
                        </td> 
                         <td>
                           <g:textField name="albumId" value=""/>
                         </td>  
                       </tr-->
                       <tr>
                         <td class="basic-label" title="">
                          Album URL
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="A URL following the format https://picasaweb.google.com/..."/>
                         </td>
                         <td class="basic-url" title="">
                            ${prefix}
                         </td>
                         <td>
                           <g:textField name="albumPath" value="" />
                         </td>
                       </tr>
                       <tr> 
                        <td colspan="4" align="center">    
                          <g:actionSubmitImage value="add" action="addAlbum" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
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

        <!--div class="tabbertab">
          <h2> Twitter </h2>
          <p> info</p>
        </div> 

        <div class="tabbertab">
          <h2> Weather2 </h2>
          <p> info</p>
        </div> 



        <div class="tabbertab">
          <h2> Announcement </h2>
          <p> info</p>
        </div> 

        <div class="tabbertab">
          <h2> ICalReader </h2>
          <p> info</p>
        </div-->
  </body>
</html>
