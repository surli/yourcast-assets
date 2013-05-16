<select name="renderer">
  <g:each in="${listOfRenderers}">
    <g:if test="${it.callId.equals(current)}">
      <option value="${it.callId}:${it.source.name}" selected="selected">${it.callId}</option>
    </g:if>
    <g:else>
      <option value="${it.callId}:${it.source.name}">${it.callId}</option>
  </g:else>
  </g:each>
</select>
