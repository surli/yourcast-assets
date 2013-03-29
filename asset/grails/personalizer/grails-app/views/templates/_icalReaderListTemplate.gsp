<table class="content">
  <tr class="content-title">
    <td align="center" title="">
      Zone <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the zone in the screen displaying the calendar"/>
    </td>
    <td align="center" title="">
      Renderer <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the calendars in order to be correctly displayed"/> 
    </td>
    <td align="center" title="">
      URL <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the URL related to the calendar"/>
    </td>
    <td align="center" title="">
      Start Time <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the initial date to retrieve the calendar"/>
    </td> 
    <td align="center" title="">
      End Time <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the final date to retrieve the calendar"/>
    </td>
    <td align="center" title="">
      Duration <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the number of hours that the calendar will be displayed"/>
    </td> 
    <td align="center" colspan="2" title="">
      Actions <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="you can remove and edit the calendars"/>
    </td> 
  </tr>
  <g:set var="counter" value="${0}" />
  <g:set var="currentRenderer" value=""></g:set>
  <g:each in="${listOfCalendars}">
    
      <g:if test="${!it.renderer.equals(currentRenderer)}">
        <g:set var="counter" value="${0}" />
        <g:set var="currentRenderer" value="${it.renderer}" />
      </g:if>
      <tr>  
        <td class="content-cell">
          ${it.provider}
        </td>
        <td class="content-cell">
          ${it.renderer}
        </td>
        <td class="content-cell">
          ${it.url}
        </td>
        <td class="content-cell">
          ${it.start.toString()}
        </td>
        <td class="content-cell">
          ${it.theEnd.toString()}
        </td>
        <td class="content-cell">
          ${it.hours}
        </td>
        <g:form name="icalReaderListForm-operation" controller="ICalReader">
          <g:hiddenField name="callId" value="${it.renderer}" />
          <g:hiddenField name="position" value="${counter}" /> 
          <g:hiddenField name="current" value="${current}" />
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.renderer}" action="remove" src="${resource(dir: 'images/skin', file: 'remove.png')}" title="Remove"/> 
          </td>
          <td class="content-cell-action">
            <g:actionSubmitImage value="${it.renderer}" action="edit" src="${resource(dir: 'images/skin', file: 'edit.png')}" title="Edit"/> 
          </td>
        </g:form>  
        <td>
        </td>
      </tr>
      <g:set var="counter" value="${counter + 1}" />  
  </g:each>
</table> 
