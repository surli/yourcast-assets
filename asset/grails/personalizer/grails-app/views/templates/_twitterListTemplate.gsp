<table class="content">
  <tr class="content-title">
    <td align="center" title="">
      Zone <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the zone in the screen displaying the tweets"/>
    </td> 
    <td align="center" title="">
      Renderer <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the tweets in order to be correctly displayed"/>
    </td> 
    <td align="center" title="">
      User/Search<img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the user/search employed to retrieve the tweets"/>
    </td>
    <td align="center" title="">
      Number of Tweets <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the maximal number of tweets to be retrieved by query"/> 
    </td>
    <td align="center" title="">
      Criteria Sort <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the path to the album/ the query to retrieve the photos"/> 
    </td>
    <td align="center" colspan="2" title="">
      Actions <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="you can remove and edit the listed users/searches"/>
    </td> 
  </tr>
  <g:set var="counter" value="${0}" />
  <g:set var="currentSource" value="TwitterSearch"/>
  <g:set var="currentRenderer" value=""/>
  <g:each in="${listOfTweets}">
    
      <g:if test="${!currentSource.equals(it.source)}">
        <g:set var="counter" value="${0}" />
        <g:set var="currentSource" value="${it.source}"/>
      </g:if>
    
      <g:if test="${!currentRenderer.equals(it.identifier)}">
        <g:set var="counter" value="${0}" />
        <g:set var="currentRenderer" value="${it.identifier}"/>
      </g:if>
    
      <tr>
        <td  class="content-cell">
          ${it.provider}
        </td>
        <td  class="content-cell">
          ${it.identifier}
        </td> 
        <td  class="content-cell">
          ${it.userSearch}
        </td>  
          
        <td class="content-cell">
          ${it.max}
        </td>
        <td class="content-cell">
          ${it.sort}
        </td>
        <g:form name="twitterForm-${it.identifier}-operation" controller="Twitter">
          <g:hiddenField name="callId" value="${it.identifier}" />
          <g:hiddenField name="source" value="${it.source}" />
          <g:hiddenField name="position" value="${counter}" />
          <g:hiddenField name="current" value="${current}" />
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.identifier}" action="remove" src="${resource(dir: 'images/skin', file: 'remove.png')}" title="Remove"/> 
          </td>
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.identifier}" action="edit" src="${resource(dir: 'images/skin', file: 'edit.png')}" title="Edit"/> 
          </td>
        </g:form>  
        <td>
        </td>
      </tr>
      <g:set var="counter" value="${counter + 1}" />  
  </g:each>

</table>  
