<table class="content">
  <tr class="content-title">
    <td align="center" title="">
      Zone <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the zone in the screen displaying the weather information of the city"/>
    </td> 
    <td align="center" title="">
      Renderer <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the weather information in order to be correctly displayed"/>
    </td> 
    <td align="center" title="">
      City <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="cities to display the weather"/>
    </td>
    <td align="center" title="">
      Country <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="country of the city"/>
    </td>
    <td align="center" title="">
      Forecast (days) <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="number of days for the forecast"/> 
    </td>
    <td align="center" colspan="2" title="">
      Actions <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="you can remove and edit the listed cities"/>
    </td> 
  </tr>
  <g:set var="counter" value="${0}" />
  <g:set var="currentRenderer" value=""></g:set>
  <g:each in="${listOfCities}">
    
      <g:if test="${!it.renderer.equals(currentRenderer)}">
        <g:set var="counter" value="${0}" />
        <g:set var="currentRenderer" value="${it.renderer}"/>
      </g:if>
      <tr>
        <td class="content-cell">
          ${it.provider}
        </td>
        <td class="content-cell">
          ${it.renderer}
        </td>
        <td  class="content-cell">
          ${it.name}
        </td>  
         <td  class="content-cell">
          ${it.country}
        </td>   
        <td class="content-cell">
          ${it.forecast}
        </td>
        <g:form name="weather2Form-city-${it.name}-operation" controller="Weather2">
          <g:hiddenField name="callId" value="${it.renderer}" />
          <g:hiddenField name="position" value="${counter}" />
          <g:hiddenField name="current" value="${current}" />
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.name}" action="remove" src="${resource(dir: 'images/skin', file: 'remove.png')}" title="Remove"/> 
          </td>
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.name}" action="edit" src="${resource(dir: 'images/skin', file: 'edit.png')}" title="Edit"/> 
          </td>
        </g:form>  
        <td>
        </td>
      </tr>
      <g:set var="counter" value="${counter + 1}" />  
  </g:each>

</table> 
