package fr.unice.yourcast.personalizer

import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.twitter.TwitterInfo
import fr.unice.yourcast.sources.twitter.TwitterInfo
import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.ServiceCall
import fr.unice.yourcast.sources.ServiceInfo


/**
* Controller providing the functionality related to the twitter source
* @author Daniel Romero
*/

class TwitterController extends AbstractController {
    
    /*---CONTANTS---*/
    private final static def SERVICE_NAME="TwitterTL"
    
    private final static def SERVICE_NAME_SEARCH="TwitterSearch"
    
    private final static def USER_PARAM="user"
    
    private final static def SEARCH_PARAM="search"
    
    private final static def SORT_PARAM="sort"
    
    private final static def MAXIMAL_NUMBER_PARAM="max"
    
    private final static def DEFAULT_MAXIMAL_NUMBER=10
    
    private final static def TWITTER_SEARCH_PREFIX="twitterSearch"
    
    private final static def SCREEN_NAME_PARAM="screen_name"
    
    private final static def COUNT_PARAM="count"
   
    private final static def Q_PARAM="q"
    
    private final static def RPP_PARAM="rpp"
    
    private final static def EMPTY_SORT_VALUE="-"
    
    private final static def RESULT_TYPE_PARAM="result_type"
    
    /*---METHODS---*/
    
    /**
     * Display the page to list the twitter calls
     **/
    def list()
    {
        def listOfCalls = null
        
        if(personalizerService.getIsInitialized())
            listOfCalls = getListOfCallsComplete()
            
        render(view:"twitterShowList", model:[listOfRenderers:listOfCalls])
    
    }
    
    /**
     * Display the page to edit a twitter call
     **/
    def edit()
    {
        log.debug "Renderer "+params.callId
        def pos= Integer.parseInt(params.position)
        def call= personalizerService.getCallByIdAndService(params.source, params.callId)
        
        def theParams= call.parameters.get(pos)
        
        
        def twitterInfo= createTwitterInfo(theParams, call)
        
        
        
        if(theParams.get(Constants.QUERY_PARAM).get(SCREEN_NAME_PARAM)!=null)
        {
            render(view:"twitterEditUser", model:[listOfRenderers:getListOfCallsUser(), twitterInfo:twitterInfo,position:pos,current:params.current])
        }
        else
        {
            render(view:"twitterEditSearch", model:[listOfRenderers:getListOfCallsSearch(), twitterInfo:twitterInfo,position:pos,current:params.current, listOfCriteria:getListOfCriteria()])
        }    

    }
    
    /**
     * Display the page to add a new twitter call based of a twitter user
     **/
    def addByUser()
    {
        def listOfCalls = null
        
        if(personalizerService.getIsInitialized())
            listOfCalls=getListOfCallsUser()
        
        render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls])
    }
    
    /**
     * Display the page to add a new twitter call based of a twitter search
     **/
    def addBySearch()
    {
        def listOfCalls = null
        
         if(personalizerService.getIsInitialized())
            listOfCalls=getListOfCallsSearch()
        
        def listOfCriteria = getListOfCriteria()
        
        render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls, listOfCriteria:listOfCriteria])
    
    }
    
    /**
     * Add a new twitter call by using a twitter user
     **/
    def addUser()
    {
        def listOfCalls = null
        if(personalizerService.getIsInitialized())
        {
            def rendererInfo= params.renderer
            def infos= rendererInfo.split(":")
            def renderer= infos[0]

            log.debug "Renderer "+infos[0]

            def user= params.get(USER_PARAM)
            def max= params.get(MAXIMAL_NUMBER_PARAM)

            listOfCalls = getListOfCallsUser()


            if(renderer==null || renderer.trim().equals(""))
                render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!"])
            else if(user==null || user.trim().equals(""))    
                render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The user has to be defined!"])
            else
            {
                int maxNumber= DEFAULT_MAXIMAL_NUMBER
                if(max!=null && !max.trim().equals(""))
                {
                    try{
                        maxNumber= Integer.parseInt(max.trim())

                        if(maxNumber>0)
                        {
                            renderer= renderer.trim()
                            user= user.trim()

                            def theCall= personalizerService.getCallByIdAndService(SERVICE_NAME, renderer)

                            if(theCall==null)
                                render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!"])

                            else
                            {


                                def map= createUserParams(user, maxNumber)


                                boolean saved= personalizerService.saveServiceCall(renderer, SERVICE_NAME, map) 

                                if(saved)
                                {
                                    personalizerService.updateProviderFlag(theCall.provider.name, SERVICE_NAME, true)
                                    render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The user has been added!"])

                                }
                                else
                                    render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,serviceCallInstance:serviceCallInstance, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the user. Try again!"])

                            }
                        }
                        else
                            render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!"])
                    }
                    catch(Exception e)
                    {
                        render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!"])
                        return
                    }

                }
                else
                   render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!"]) 


            }
        }
        else
        render(view:"twitterAddByUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR]) 
    }
    
    /**
     * Add a new twitter call by using a twitter search
     **/
    def addSearch()
    {
        def listOfCalls = null
        if(personalizerService.getIsInitialized())
        {
            def rendererInfo= params.renderer
            def infos= rendererInfo.split(":")
            def renderer= infos[0]
            def search= params.get(SEARCH_PARAM)
            def max= params.get(MAXIMAL_NUMBER_PARAM)
            def sort= params.get(SORT_PARAM)

            def listOfCriteria = getListOfCriteria()

            listOfCalls = getListOfCallsSearch()

            if(renderer==null || renderer.trim().equals(""))
                render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",listOfCriteria:listOfCriteria])
            else if(search==null || search.trim().equals(""))    
                render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The search has to be defined!",listOfCriteria:listOfCriteria])
            else
            {
                def maxNumber= DEFAULT_MAXIMAL_NUMBER
                if(max!=null && !max.trim().equals(""))
                {
                    try{
                        maxNumber= Integer.parseInt(max.trim())

                        if(maxNumber>0)
                        {
                            renderer= renderer.trim()
                            search= search.trim()

                            def theCall= personalizerService.getCallByIdAndService(SERVICE_NAME_SEARCH, renderer)

                            if(theCall==null)
                                 render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!",listOfCriteria:listOfCriteria])

                            else
                            {

                                def map= createSearchParams(search, maxNumber, sort) 


                                def saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME_SEARCH, map) 

                                if(saved)
                                {
                                    personalizerService.updateProviderFlag(theCall.provider.name, SERVICE_NAME_SEARCH, true)
                                    render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The search has been added!",listOfCriteria:listOfCriteria])
                                }
                                else
                                    render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the search. Try again!",listOfCriteria:listOfCriteria])


                            }
                        }
                        else
                            render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",listOfCriteria:listOfCriteria])
                    }
                    catch(Exception e)
                    {
                        render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",listOfCriteria:listOfCriteria])
                        return
                    }

                }
                else
                    render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",listOfCriteria:listOfCriteria])


            }
        }
        else
            render(view:"twitterAddBySearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR,listOfCriteria:listOfCriteria])
    }
           
    /**
     * List the twitter calls 
     **/
    def listTweetsInfo()
    {
         def listOfCalls = null
        if(personalizerService.getIsInitialized())
        {
            def rendererInfo= params.renderer
            def infos= rendererInfo.split(":")
            def renderer= infos[0]
            def source= infos[1]


            def tweets= new ArrayList()

            listOfCalls = getListOfCallsComplete()

            if(renderer.equals(Constants.ALL))
            {
                def list= listOfCalls.subList(1,listOfCalls.size())


                for(ServiceCall call:list)
                {
                    def tweetTemp= getTweets(call)
                    tweets.addAll(tweetTemp)
                }                        
            }
            else
            {

                def theCall= personalizerService.getCallByIdAndService(source, renderer)

                if(theCall!=null)
                {
                    def tweetTemp= getTweets(theCall)

                    tweets.addAll(tweetTemp)
                }
            }

            render(view:"twitterShowList", model:[listOfRenderers:listOfCalls, listOfTweets:tweets, current:renderer])
        }
        else
            render(view:"twitterShowList", model:[listOfRenderers:listOfCalls, listOfTweets:null, messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
    
    }
    
    /**
     * Edit a twitter call associated to a user
     **/
    def editUser()
    {
        def rendererInfo= params.renderer
        def infos= rendererInfo.split(":")
        def newRenderer= infos[0]
       
        //def newRenderer= params.renderer
        def user= params.get(USER_PARAM)
        def max= params.get(MAXIMAL_NUMBER_PARAM)
        def previousRenderer= params.callId
        
        def listOfCalls = getListOfCallsUser()
        
        //The origal call parameters
        def pos= Integer.parseInt(params.position)
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,previousRenderer)
        
        def theParams= call.parameters.get(pos)
        
        
        def twitterInfo= createTwitterInfo(theParams, call)
        
         log.debug "New "+newRenderer
         
        log.debug "Previous "+previousRenderer
        
        if(newRenderer==null || newRenderer.trim().equals(""))
            render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",twitterInfo:twitterInfo,position:pos,current:params.current])
        else if(user==null || user.trim().equals(""))    
            render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The user has to be defined!",twitterInfo:twitterInfo,position:pos,current:params.current])
        else
        {
            
            if(max!=null && !max.trim().equals(""))
            {
                try{
                    int maxNumber= Integer.parseInt(max.trim())
                    
                    if(maxNumber>0)
                    {
                        user= user.trim()
                        
                        def map= createUserParams(user,maxNumber)
                    
                        if(previousRenderer.equals(newRenderer))
                        {
                            
                            def updated= personalizerService.updateServiceCall(previousRenderer, SERVICE_NAME, map, pos)
                            
                            if(updated)
                            {
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                                
                                twitterInfo= createTwitterInfo(map, call)
                                render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The user information has been updated!",twitterInfo:twitterInfo,position:pos,current:params.current])
                            
                            }    
                            else
                                render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem with the update. Please try again!",twitterInfo:twitterInfo,position:pos,current:params.current])
                        }
                        else
                        {                                                                                                 
                            def saved= personalizerService.saveServiceCall(newRenderer, SERVICE_NAME, map) 

                            if(saved)
                            {
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                                
                                personalizerService.deleteCall(SERVICE_NAME, previousRenderer, pos)    
                                
                                call= personalizerService.getCallByIdAndService(SERVICE_NAME,newRenderer)
                                
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                                
                                twitterInfo= createTwitterInfo(map, call)
                                
                                render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The user information has been updated!",twitterInfo:twitterInfo,position:call.parameters.size()-1,current:params.current])
                            }   
                            else
                             render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem with the update. Please try again!",twitterInfo:twitterInfo,position:pos,current:params.current])
                        }
                    
                    }
                    else
                        render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current])
                
                }
                catch(Exception e)
                {
                    log.debug "problem with the number format "+max.trim()+e.getMessage()
                    render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current])
                    return
                }
                
            }
            else
            {
                render(view:"twitterEditUser", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current])
            }
                              
        }
    }
    
    /**
     * Edit a twitter call associated to a search
     **/
    def editSearch()
    {
        def rendererInfo= params.renderer
        def infos= rendererInfo.split(":")
        def newRenderer= infos[0]
       
        def search= params.get(SEARCH_PARAM)
        def max= params.get(MAXIMAL_NUMBER_PARAM)
        def sort= params.get(SORT_PARAM)
        def previousRenderer= params.callId
        
        def listOfCalls = getListOfCallsSearch()
        
        def listOfCriteria = getListOfCriteria()
        
        //The origal call parameters
        def pos= Integer.parseInt(params.position)
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME_SEARCH,previousRenderer)
        
        def theParams= call.parameters.get(pos)
        
        
        def twitterInfo= createTwitterInfo(theParams, call)
        
        log.debug "New "+newRenderer
         
        log.debug "Previous "+previousRenderer
        
        if(newRenderer==null || newRenderer.trim().equals(""))
            render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
        else if(search==null || search.trim().equals(""))    
            render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The search has to be defined!",twitterInfo:twitterInfo,position:pos,current:params.current,,listOfCriteria:listOfCriteria])
        else
        {
            
            if(max!=null && !max.trim().equals(""))
            {
                try{
                    int maxNumber= Integer.parseInt(max.trim())
                    
                    if(maxNumber>0)
                    {
                        search= search.trim()
                        
                        def map= createSearchParams(search,maxNumber,sort)
                    
                        if(previousRenderer.equals(newRenderer))
                        {
                            
                            def updated= personalizerService.updateServiceCall(previousRenderer, SERVICE_NAME_SEARCH, map, pos)
                            
                            if(updated)
                            {
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME_SEARCH, true)
                                
                                twitterInfo= createTwitterInfo(map, call)
                                render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The search information has been updated!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
                            
                            }    
                            else
                                render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem with the update. Please try again!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
                        }
                        else
                        {
                
                            def saved= personalizerService.saveServiceCall(newRenderer, SERVICE_NAME_SEARCH, map) 

                            if(saved)
                            {
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME_SEARCH, true)
                                
                                personalizerService.deleteCall(SERVICE_NAME_SEARCH, previousRenderer, pos)    
                                
                                call= personalizerService.getCallByIdAndService(SERVICE_NAME_SEARCH,newRenderer)
                                
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME_SEARCH, true)
                                
                                twitterInfo= createTwitterInfo(map, call)
                                
                                render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The search information has been updated!",twitterInfo:twitterInfo,position:call.parameters.size()-1,current:params.current,listOfCriteria:listOfCriteria])
                            }   
                            else
                             render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem with the update. Please try again!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
                        }
                    
                    }
                    else
                        render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
                
                }
                catch(Exception e)
                {
                    log.debug "problem with the number format "+max.trim()+e.getMessage()
                    render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
                    return
                }
                
            }
            else
            {
                render(view:"twitterEditSearch", model:[listOfRenderers:listOfCalls,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The maximun number of tweets is not valid!",twitterInfo:twitterInfo,position:pos,current:params.current,listOfCriteria:listOfCriteria])
            }
                
        }
    }
    
    /**
     * Delete a specified call
     * 
     **/
    def remove()
    {
        log.debug "remove Source "+params.source 
        
        
        personalizerService.deleteCall(params.source, params.callId, Integer.parseInt(params.position))
        
        def call= personalizerService.getCallByIdAndService(params.source,params.callId)
        
        personalizerService.updateProviderFlag(call.provider.name, params.source, true)
        
        params.renderer= params.current+":"+params.source
        listTweetsInfo()
    }
    
    /**
     * Reload the list page by displaying the calls of the last selected renderer
     **/
    def back()
    {
        params.renderer= params.current+":"+params.source
        
        listTweetsInfo()
    }
    
    
    /*---AUX METHODS---*/
    
    /**
     * Create the parameters (map) to create a twitter call based on a user
     * @param user The twitter user
     * @param maxNumber The maximun number of tweets to retrieve from the user
     * @return The map containing the call parameters (screen name, etc.)
     **/
    protected def createUserParams(def user, def maxNumber)
    {
        def map= new HashMap() 


        map.put(Constants.METHOD_PARAM,Constants.GET)

        def mapQuery= new HashMap() 

        mapQuery.put(SCREEN_NAME_PARAM,user)

        mapQuery.put(COUNT_PARAM,maxNumber)

        map.put(Constants.QUERY_PARAM, mapQuery)
        
        return map
        
    }
    
    /**
     * Create the parameters (map) to create a twitter call based on a search
     * @param search The twitter search
     * @param maxNumber The maximun number of tweets to retrieve from the search
     * @param sort The criteria sort
     * @return The map containing the call parameters (query, criteria sort, etc.)
     **/
    protected def createSearchParams(def search, def maxNumber, def sort)
    {
        def map= new HashMap() 


        map.put(Constants.METHOD_PARAM,Constants.GET)

        def mapQuery= new HashMap() 

        mapQuery.put(Q_PARAM,search)

        mapQuery.put(RPP_PARAM,maxNumber)


        if(sort!=null && !sort.equals(EMPTY_SORT_VALUE))
            mapQuery.put(RESULT_TYPE_PARAM,sort)

        map.put(Constants.QUERY_PARAM, mapQuery)
                
        return map
    }
    
    /**
     * Retrieve the renderers related to twitter users
     * @return The list of renderers
     **/
    protected def getListOfCallsUser()
    {
        return personalizerService.getCalls(SERVICE_NAME)
    }
    
    /**
     * Retrieve the renderers related to twitter searches
     * @return The list of renderers
     **/
    protected def getListOfCallsSearch()
    {
        return personalizerService.getCalls(SERVICE_NAME_SEARCH)
    }
    
    /**
     * Retrieve the renderers related to twitter
     * @return The list of renderers
     **/
    protected def getListOfCalls()
    {
        
        def calls= new ArrayList()
        
        calls.addAll(getListOfCallsUser())
        calls.addAll(getListOfCallsSearch())
        
        return calls
    }
    
    /**
     * Retrieve the renderers related to twitter and add the ALL to the begining of the list
     * @return The list of renderers with ALL
     **/
    protected def getListOfCallsComplete()
    {
        def calls= getListOfCalls()
        
        ServiceInfo source=new ServiceInfo(name:Constants.ALL)
        
        calls.add(0,new ServiceCall(callId:Constants.ALL, source:source))
        
        return calls
    }
    
    /**
     * Retrieve the list of calls related to a renderer
     * @param call The renderer containing the calls
     * @return The list of calls
     **/
    protected def getTweets(ServiceCall call)
    { 
        def tweets= new ArrayList() 
         
        for(def p:call.parameters)
        {
            
            tweets.add(createTwitterInfo(p,call))
 
        }
        
        log.debug "Size "+tweets.size()
        
        return tweets
    }
    
    /**
     * Retrieve the information related to a call
     * @param parameters The parameters to execute the call
     * @param call The renderer
     * @return The list of calls
     **/
    protected def createTwitterInfo(def parameters, def call)
    {
        def query= parameters.get(Constants.QUERY_PARAM)
            
        if(query.get(SCREEN_NAME_PARAM)!=null)
        {

            return new TwitterInfo(identifier:call.callId, userSearch:query.get(SCREEN_NAME_PARAM), max:query.get(COUNT_PARAM), provider:call.provider.name, sort:EMPTY_SORT_VALUE, source:SERVICE_NAME)
        }    
        else
        {
            def sort= EMPTY_SORT_VALUE

            if(query.get(RESULT_TYPE_PARAM)!=null)
                sort= query.get(RESULT_TYPE_PARAM)

            return new TwitterInfo(identifier:call.callId, userSearch:query.get(Q_PARAM), max:query.get(RPP_PARAM), provider:call.provider.name, sort:sort, source:SERVICE_NAME_SEARCH)
        }    
    }


    
    /*protected def getListOfProvidersComplete()
    {
        return personalizerService.getListOfProviderNames()
    }
    
    protected def getListOfProviders()
    {
        //def listOfProviders = [ALL, "zone1", "zone2"]
        def providers= getListOfProvidersComplete()
        
        return providers.subList(1,providers.size())
    }*/
    
    /**
     * Retrieve the list of criteria sort
     * @return The list of criteria sort
     **/
    protected def getListOfCriteria()
    {
        def criteria= new ArrayList()
        
        criteria.add(EMPTY_SORT_VALUE)
        criteria.add("recent")
        
        return criteria
    }
}
