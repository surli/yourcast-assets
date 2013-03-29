<%@ page import="fr.unice.yourcast.sources.twitter.TwitterTL" %>



<div class="fieldcontain ${hasErrors(bean: twitterTLInstance, field: 'maxTweets', 'error')} ">
	<label for="maxTweets">
		<g:message code="twitterTL.maxTweets.label" default="Max Tweets" />
		
	</label>
	<g:textField name="maxTweets" value="${twitterTLInstance?.maxTweets}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: twitterTLInstance, field: 'userName', 'error')} required">
	<label for="userName">
		<g:message code="twitterTL.userName.label" default="User Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="userName" required="" value="${twitterTLInstance?.userName}"/>
</div>

