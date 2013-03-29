<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <g:render template="/templates/headTemplate"/>
    <title>Twitter- Add By Search</title>
  </head>
  <body>
    <g:render template="/templates/mainMenuTemplate"/>
    <div id="container">
          
            <g:render template="/templates/twitterMenuTemplate"/>
            <table class="principal">
              <tr>  
                <td>
                   <p class="message"> Complete the information to add a Twitter search </p>
                </td>  
               </tr>
               <tr> 
                 <td>
                   <g:form name="twitterUserForm" controller="Twitter">
                      <table>
                       <tr>
                         <td class="basic-label" title="">
                          Renderer
                        </td> 
                        <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the entity given a correct format to the tweets in order to be correctly displayed"/>
                        </td> 
                        <td>
                            <g:render template="/templates/renderersWithSourceTemplate" model="listOfRenderers:${listOfRenderers}"/>
                        </td> 
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Search
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the search to retrieve the tweets"/>
                        </td> 
                         <td>
                           <g:textField name="search" value=""/>
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
                            <g:render template="/templates/criteriaSortTemplate" model="listOfCriteria:${listOfCriteria}"/>
                         </td>  
                       </tr>
                       <tr>
                         <td class="basic-label" title="">
                          Max. Number
                         </td>
                         <td>
                          <img src="${resource(dir: 'images/skin', file: 'question.png')}" alt="Help" title="the maximal number of tweets to retrieve"/>
                        </td> 
                         <td>
                           <g:textField name="max" value=""/>
                         </td>  
                       </tr>
                       <tr> 
                        <td colspan="3" align="center">    
                          <g:actionSubmitImage value="addBySearch" action="addSearch" src="${resource(dir: 'images/skin', file: 'add.png')}" title="Add"/>  
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
        </div>  
  </body>
</html>

