<!doctype html>
<html>
	<head>
		<!--meta name="layout" content="main"/-->
                <link rel="stylesheet" href="${resource(dir: 'css', file: 'yourcast.css')}" type="text/css" media="screen">
                <link rel="stylesheet" href="${resource(dir: 'css', file: 'tabber.css')}" type="text/css" media="screen">

                <g:javascript src="tabber.js"/>
               
	</head>
	<body>
              
          <g:include controller="Picasa" action="list" />
		
		<!--div id="page-body" role="main"-->
          <div class="tabber" id="tab1">
              <div class="tabbertab">
                <h2> Picasa </h2>
                <table>
                  <tr>  
                    <td>
                      <p class="message"> Select a Provider to display the Picasa albums </p>
                    </td>  
                  </tr>
                  <tr> 
                    <td>
                      <g:form name="picasaAlbumForm" controller="Picasa">
                          <table>
                          <tr>
                            <td class="provider">
                              Provider
                            </td> 
                            <td>
                                <g:render template="/templates/providersTemplate" model="listOfProviders:${listOfProviders}"/>
                                <g:actionSubmit value="List" action="listAlbums"/> 
                            </td>
                          </tr>
                        </table>
                      </g:form>

                    </td>   
                  </tr>
                  <tr>
                    <td colspan="2">

                      <g:render template="/templates/picasaAlbumListTemplate" model="listOfAlbums:${listOfAlbums}"/>

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
              <!--/div-->  
          </div>            

	</body>
</html>
