<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Picasa- Add Album By Search</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
        <!--div class="tabbertab"-->
  
            <!--g:img dir="images/skin" file="picasa.png" width="16" height="16"/--> 
            <!--h2> Picasa </h2-->
            
            <g:render template="/templates/picasaMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Complete the information to search a group of photos by using a query</p>
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
                          Search Id
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a customized identifier for the query"/>
                        </td> 
                         <td>
                           <g:textField name="queryId" value=""/>
                         </td>  
                       </tr-->
                       <tr>
                         <td class="basic-label" title="">
                          Query
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="a Picasa query"/>
                         </td>                          
                         <td>
                           <g:textField name="query" value="" />
                         </td>
                       </tr>
                       <tr> 
                        <td colspan="3" align="center">    
                          <g:actionSubmitImage value="add" action="addPhotosByQuery" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
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
        <!--/div-->  

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
