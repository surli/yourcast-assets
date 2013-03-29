<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Twitter- Edit Search</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
                      
      <g:render template="/templates/twitterMenuTemplate"/>
      <table class="principal">
        <tr>  
          <td>
             <p class="message"> Edit the Twitter search information</p>
          </td>  
         </tr>
         <tr> 
           <td>
             <g:form name="twitterEditUserForm" controller="Twitter">
                 <g:hiddenField name="callId" value="${twitterInfo.identifier}" />
                 <g:hiddenField name="position" value="${position}" />
                 <g:hiddenField name="current" value="${current}" />
                 <g:hiddenField name="source" value="${twitterInfo.source}" />
              <table>
                 <tr>
                   <td class="basic-label" title="">
                    Renderer
                  </td> 
                  <td>
                    <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the tweets in order to be correctly displayed"/>
                  </td> 
                  <td>
                      <g:render template="/templates/renderersWithSourceTemplate" model="${[listOfRenderers:listOfRenderers,current:twitterInfo.identifier]}"/>
                  </td> 
                 </tr>
                 <tr>
                   <td class="basic-label" title="">
                      Search
                   </td>
                   <td>
                    <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the user to retrieve the tweets"/>
                   </td> 
                   <td >
                      <g:textField name="search" value="${twitterInfo.userSearch}"/>
                   </td>  
                 </tr>
                  <tr>
                   <td class="basic-label" title="">
                    Criteria Sort
                   </td>
                   <td>
                    <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the criteria to order the retrieved tweets"/>
                  </td> 
                   <td>
                      <g:render template="/templates/criteriaSortSelectedTemplate" model="${[listOfCriteria:listOfCriteria,current:twitterInfo.sort]}"/>
                   </td>  
                 </tr>
                 <tr>
                 <tr>
                    <td class="basic-label" title="">
                     Max. Number
                    </td>
                    <td>
                     <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the maximal number of tweets to retrieve"/>
                   </td> 
                    <td>
                      <g:textField name="max" value="${twitterInfo.max}"/>
                    </td>  
                  </tr>
                 <tr> 
                   
                    <td colspan="4" align="center">    
                      <table>
                        <tr>
                          <td align="center" colspan="2">
                            <g:actionSubmitImage value="Save" action="editSearch" src="${resource(dir: 'images/skin', file: 'save.png')}" title="Save"/>  
                          </td>  
                          <td></td>
                          <td></td>
                          <td></td>
                          <td colspan="2" align="center">    
                            <g:actionSubmitImage value="Back" action="back" src="${resource(dir: 'images/skin', file: 'back.png')}" title="Back"/>  
                          </td>
                        </tr>
                      </table>
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
  </body>
</html>