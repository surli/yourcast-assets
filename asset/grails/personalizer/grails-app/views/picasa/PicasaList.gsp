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
      
      <div class="tabber" id="tab1">
          
        <div class="tabbertab">
          <h2> Picasa </h2>
          <!--g:render model="PicasaModel" template="/picasa/PicasaList"/-->

          <!--g:include controller="Picasa" action="list"/-->
            <table>
              <tr>
                <td>
                  <g:render template="/templates/picasaMenuTemplate"/>
                 </td>   
                 <td>
                  <table>
                    <tr>
                      <td>
                        Provider
                      <td> 
                      <td>
                        
                        <g:form name="icasaAlbumForm" controller="Picasa">
                            <g:render template="/templates/providersTemplate" model="listOfProviders:${listOfProviders}"/>
                            <g:actionSubmit value="List" action="listAlbums"/> 
                         </g:form>
                      </td>
                    </tr>
                  </table>
                </td>   
              </tr>
             </table>
        </div>  

        <div class="tabbertab">
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
        </div>
                


        
      </div> 
            
  </body>
</html>
