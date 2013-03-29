<select name="city">
  <g:each in="${listOfCities}">
      <option value="${it.name},${it.country},${it.latitude}/${it.longitude}">${it.name}-${it.country}</option>
  </g:each>
</select> 
