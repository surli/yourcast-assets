
<%@ page import="fr.unice.yourcast.sources.twitter.TwitterTL" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'twitterTL.label', default: 'TwitterTL')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-twitterTL" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-twitterTL" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="maxTweets" title="${message(code: 'twitterTL.maxTweets.label', default: 'Max Tweets')}" />
					
						<g:sortableColumn property="userName" title="${message(code: 'twitterTL.userName.label', default: 'User Name')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${twitterTLInstanceList}" status="i" var="twitterTLInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${twitterTLInstance.id}">${fieldValue(bean: twitterTLInstance, field: "maxTweets")}</g:link></td>
					
						<td>${fieldValue(bean: twitterTLInstance, field: "userName")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${twitterTLInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
