<table class="content">
  <tr class="content-title">
    <td align="center" title="">
      Zone <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the zone in the screen displaying the album or photos"/>
    </td>
    <td align="center" title="">
      Renderer <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the pictures in order to be correctly displayed"/>
    </td>
    <td align="center" title="">
      Album Path/Query <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the path to the album/ the query to retrieve the photos"/> 
    </td> 
    <td align="center" colspan="2" title="">
      Actions <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="you can remove and edit the listed albums/searches"/>
    </td> 
  </tr>
  <g:set var="counter" value="${0}" />
  <g:set var="currentRenderer" value="" />
  <g:each in="${listOfAlbums}">
    
      <g:if test="${!it.renderer.equals(currentRenderer)}">
        <g:set var="counter" value="${0}" />
        <g:set var="currentRenderer" value="${it.renderer}"/>
      </g:if>
      <tr>
        <td  class="content-cell">
          ${it.provider}
        </td>  
          
        <td class="content-cell">
          ${it.renderer}
        </td>
        <td class="content-cell">
          ${it.path}
        </td>
        <g:form name="picasaAlbumForm-album-${counter}-operation" controller="Picasa">
          <g:hiddenField name="callId" value="${it.renderer}" />
          <g:hiddenField name="position" value="${counter}" />
          <g:hiddenField name="current" value="${current}" />
          <td class="content-cell">
            <g:actionSubmitImage value="${it.renderer}" action="remove" src="${resource(dir: 'images/skin', file: 'remove3.png')}" title="Remove"/> 
          </td>
          <td class="content-cell">
            <g:actionSubmitImage value="${it.renderer}" action="edit" src="${resource(dir: 'images/skin', file: 'edit.png')}" title="Edit"/> 
          </td>
        </g:form>  
        <td>
        </td>
      </tr>
      <g:set var="counter" value="${counter + 1}" />
  </g:each>

</table>  
