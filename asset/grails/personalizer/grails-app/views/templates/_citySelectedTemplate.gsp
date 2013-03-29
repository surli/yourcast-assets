<select name="city">
  <g:each in="${listOfCities}">
    <g:if test="${current.name.equals(it.name) && current.country.equals(it.country) }">
      <option value="${it.name},${it.country},${it.latitude}/${it.longitude}" selected="selected">${it.name}-${it.country}</option>
    </g:if>
    <g:else>
      <option value="${it.name},${it.country},${it.latitude}/${it.longitude}">${it.name}-${it.country}</option>
    </g:else>  
  </g:each>
</select> 
