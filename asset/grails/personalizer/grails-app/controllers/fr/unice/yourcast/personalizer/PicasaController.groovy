package fr.unice.yourcast.personalizer

import fr.unice.yourcast.personalizer.client.AlbumInfo
import fr.unice.yourcast.service.personalizer.PersonalizerService
import fr.unice.yourcast.sources.ServiceCall
import fr.unice.yourcast.util.Constants

/**
* Controller providing the functionality related to the picasa source
* @author Daniel Romero
*/
class PicasaController extends AbstractController {
    
    /*---CONSTANTS---*/
    private final static String PICASA_URL_PREFIX="https://picasaweb.google.com/"
    
    private final static String SERVICE_NAME="Picasa" 
    
    private final static String ALBUM_ID_PARAM="albumId"
    
    private final static String QUERY_ID_PARAM="queryId"
    
    private final static String ALBUM_PATH_PARAM="albumPath"
    
    /*---METHODS---*/        
    
    /**
     * Display the page to list the picasa calls
     **/
    def list() 
    {
        
        def listOfCallIds = new ArrayList()
        
        if(personalizerService.getIsInitialized())
            listOfCallIds=getListOfCallIdsComplete(SERVICE_NAME)
        
        render(view:"picasaShowList", model:[listOfRenderers:listOfCallIds])
    
    }
    
    
    /**
     * Display the page to add a new picasa album call
     *
     **/
    def add()
    {
      
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
        render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,prefix:PICASA_URL_PREFIX])
    }
    
    /**
     *Display the page to add new picasa query call
     **/
    def addByQuery()
    {
      
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
        render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds])
    }
    
    
    /**
     * Add a new picasa album call
     **/
    def addAlbum()
    {
        def listOfCallIds = null
        if(personalizerService.getIsInitialized())
        {
            def callId= params.get(Constants.CALL_ID_PARAM) 
            def albumPath= params.get(ALBUM_PATH_PARAM)

            listOfCallIds = getListOfCallIds(SERVICE_NAME)


            if(callId==null || callId.trim().equals(""))
                render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",prefix:PICASA_URL_PREFIX])

            else if(albumPath==null || albumPath.trim().equals("") || albumPath.trim().equals(PICASA_URL_PREFIX))    
                render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The album URL has to be defined!",prefix:PICASA_URL_PREFIX])
            else
            {

                def url= albumPath.trim()

                if(!url.startsWith(PICASA_URL_PREFIX))
                    url=PICASA_URL_PREFIX+url

                def valid= isValidUrl(url)

                if(valid)
                {
                    def path= parseAlbumUrl(url)
                    log.debug "Path "+path

                    callId= callId.trim()
                    albumPath=albumPath.trim()
                    def theCall= personalizerService.getCallByIdAndService(SERVICE_NAME,callId)

                    if(theCall==null)
                        render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!",prefix:PICASA_URL_PREFIX])

                    else
                    {

                        def callParameters= createCallPathParams(path)

                        def saved= personalizerService.saveServiceCall(callId,SERVICE_NAME, callParameters) 

                        if(saved)
                        {
                            render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The album has been added!",prefix:PICASA_URL_PREFIX])
                            personalizerService.updateProviderFlag(theCall.provider.name, SERVICE_NAME, true)
                        }
                        else
                            render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the album. Try again!",prefix:PICASA_URL_PREFIX])

                    }



                }
                else
                    render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The album URL has to be valid!",prefix:PICASA_URL_PREFIX])

            }
        }
        else
        {
            render(view:"picasaAddAlbum", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR,prefix:PICASA_URL_PREFIX])
        }
    }
    
    /**
     * Add a new picasa search call
     **/     
    def addPhotosByQuery()
    {
        def listOfCallIds = null
        if(personalizerService.getIsInitialized())
        {
            def callId= params.get(Constants.CALL_ID_PARAM) 

            def query= params.get(Constants.QUERY_PARAM)

            listOfCallIds = getListOfCallIds(SERVICE_NAME)

            if(callId==null || callId.trim().equals(""))
                render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!"])
            else if(query==null || query.trim().equals(""))    
                render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The query has to be defined!"])
            else
            {

                def theCall= personalizerService.getCallByIdAndService(SERVICE_NAME,callId)

                if(theCall==null)
                    render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!"])

                else
                {


                    def callParameters= createCallSearchParams(query)

                    def saved= personalizerService.saveServiceCall(callId,SERVICE_NAME, callParameters) 

                    if(saved)
                    {
                        personalizerService.updateProviderFlag(theCall.provider.name, SERVICE_NAME, true)
                        render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The search has been added!"])

                    }
                    else
                        render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the search. Try again!"])

                }
            }
        }
        else
            render(view:"picasaAddAlbumBySearch", model:[listOfRenderers:listOfCallIds, messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
    }
    
    
    /**
     * Delete an specific picasa call
     **/
    def remove()
    {
        
        log.debug "Renderer "+params.callId
        personalizerService.deleteCall(SERVICE_NAME, params.callId, Integer.parseInt(params.position))
        
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,params.callId)
        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
        
        params.renderer= params.current
        listAlbums()
    }
    

    /**
     * Display the page to edit a picasa call
     **/
    def edit()
    {
        log.debug "Renderer "+params.callId
        def pos= Integer.parseInt(params.position)
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME, params.callId)
        
        def theParams= call.parameters.get(pos)
        
        
        def album= createAlbum(call, theParams)
        
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        
        //if(theParams.get(Constants.PATH_PARAM)!=null)
        if(theParams.get(Constants.PATH_PARAM).startsWith("album/"))
            render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX, current:params.current])
        else         
            render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:pos, current:params.current])
       
    }
    
    /**
     * Edit a picasa album call
     **/
    def editAlbum()
    {
        //Expected parameters
        def pos= Integer.parseInt(params.position)
        def previousCallId= params.callId
        def newCallId=params.renderer 
        def url= params.url
        
        
        //Call ids
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        //Album Information 
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME, previousCallId)
        def originalParams= call.parameters.get(pos)
        def album= createAlbum(call, originalParams)
        
        //Verify if The url has be specified
        if(url==null || url.trim().equals("") || url.trim().equals(PICASA_URL_PREFIX) )
            render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The album URL has to be defined!",current:params.current]) 
        else    
        {
            //Verify that the URL is valid
            def theURL= url.trim()
            
            if(!theURL.startsWith(PICASA_URL_PREFIX))
                theURL= PICASA_URL_PREFIX+theURL
               
            
            if(isValidUrl(theURL))
            {
                def newPath= parseAlbumUrl(theURL)
                def parameters= createCallPathParams(newPath)
                //Verify if the album has another callId associated
                if(!previousCallId.equals(newCallId))
                {
                    
                    def saved= personalizerService.saveServiceCall(newCallId,SERVICE_NAME, parameters)
                    
                    if(saved)
                    {
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        personalizerService.deleteCall(SERVICE_NAME, previousCallId, pos)
                        
                        call= personalizerService.getCallByIdAndService(SERVICE_NAME, newCallId)
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        
                        album= createAlbum(call, parameters)
                        render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:call.parameters.size()-1, prefix:PICASA_URL_PREFIX,messageClass:Constants.RESPONSE_MESSAGE_CLASS,message:"The album information has beed updated",current:params.current]) 
                    }
                    else
                        render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem updating the album information. Please try again!",current:params.current]) 
                    
                }
                else
                {
                    def updated=personalizerService.updateServiceCall(previousCallId, SERVICE_NAME, parameters, pos)
                    
                    if(updated)
                    {
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        
                        album= createAlbum(call, parameters)
                    
                        render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX,messageClass:Constants.RESPONSE_MESSAGE_CLASS,message:"The album information has beed updated",current:params.current]) 
                    
                    }
                    else
                    {
                        render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem updating the album information. Please try again!",current:params.current]) 
                    }
                    
                }
            }
            else
                render(view:"picasaEditAlbum", model:[listOfRenderers:listOfCallIds, album:album,position:pos, prefix:PICASA_URL_PREFIX,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The album URL has to be valid!",current:params.current]) 
            
        }
    }
    
    /**
     * Edit picasa search call
     **/
    def editAlbumBySearch()
    {
        //Expected parameters
        def pos= Integer.parseInt(params.position)
        def previousCallId= params.callId
        def newCallId=params.renderer 
        def search= params.query
        
        
        //Call ids
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        //Album Information 
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME, previousCallId)
        def originalParams= call.parameters.get(pos)
        def album= createAlbum(call, originalParams)
        
        //Verify if The url has be specified
        if(search==null || search.trim().equals(""))
            render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:pos, messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The query has to be defined!",current:params.current]) 
        else    
        {
            //Obtain the search without white spaces
            def theSearch= search.trim()
            def parameters= createCallSearchParams(theSearch)
                //Verify if the album has another callId associated
                if(!previousCallId.equals(newCallId))
                {
                    
                    def saved= personalizerService.saveServiceCall(newCallId,SERVICE_NAME, parameters)
                    
                    if(saved)
                    {
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        personalizerService.deleteCall(SERVICE_NAME, previousCallId, pos)
                        
                        call= personalizerService.getCallByIdAndService(SERVICE_NAME, newCallId)
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        album= createAlbum(call, parameters)
                        render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:call.parameters.size()-1,messageClass:Constants.RESPONSE_MESSAGE_CLASS,message:"The album information has beed updated",current:params.current]) 
                    }
                    else
                        render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:pos, messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem updating the album information. Please try again!",current:params.current]) 
                    
                }
                else
                {
                    def updated=personalizerService.updateServiceCall(previousCallId, SERVICE_NAME, parameters, pos)
                    
                    if(updated)
                    {
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        
                        album= createAlbum(call, parameters)
                    
                        render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:pos,messageClass:Constants.RESPONSE_MESSAGE_CLASS,message:"The album information has beed updated",current:params.current]) 
                    
                    }
                    else
                    {
                        render(view:"picasaEditAlbumBySearch", model:[listOfRenderers:listOfCallIds, album:album,position:pos,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"There was a problem updating the album information. Please try again!",current:params.current]) 
                    }
                    
                }
            
            
        }
    }
    
    /**
     * Reload the list page by displaying the calls of the last selected renderer
     **/
    def back()
    {
        params.renderer= params.current
        listAlbums()
    }
    
    /**
     * List the picasa calls
     **/
    def listAlbums()
    {
        def listOfCallIds = null
        def albums= null
        if(personalizerService.getIsInitialized())
        {
            def renderer= params.renderer
            log.debug "Albums "+renderer


            //PersonalizerServiceWrapper personalizer= PersonalizerServiceWrapper.getPersonalizer()

            def calls= null

            

            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)

            if(renderer.equals(Constants.ALL))
            {
                def list= listOfCallIds.subList(1,listOfCallIds.size())
                albums= new ArrayList()

                for(String p:list)
                {
                    //calls= personalizer.getCalls(p,SERVICE_NAME)
                    def call= personalizerService.getCallByIdAndService(SERVICE_NAME,p)
                    if(call!=null)
                    {
                        calls= new ArrayList()
                        calls.add(call)
                        def albumsTemp= getAlbumsIdsAndPaths(calls)
                        albums.addAll(albumsTemp)
                    }
                }

            }
            else
            {
                //calls= personalizer.getCalls(provider,SERVICE_NAME)
                def call= personalizerService.getCallById(renderer)
                if(call!=null)
                {
                    calls=new ArrayList()
                    calls.add(call)
                    albums= getAlbumsIdsAndPaths(calls)
                }

                else
                    albums= new ArrayList()

            }
            
            render(view:"picasaShowList", model:[listOfRenderers:listOfCallIds, listOfAlbums:albums, current:renderer])
        }    
        else
            render(view:"picasaShowList", model:[listOfRenderers:listOfCallIds, listOfAlbums:albums, messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
        
        
    }
    
    /*def getListOfCallIdsComplete()
    {
        List ids= personalizerService.getCallIds()
        ids.add(0,Constants.ALL)
        
        return ids
    }*/
    
    /*def getListOfCallIds()
    {
        return personalizerService.getCallIds()
    }*/
    
    
        /*---AUX METHODS---*/
    /**
     * Create a map with the params related to a picasa search call 
     * @param search The picasa search 
     * @return The map with the parameters of the call
     **/
    protected def createCallSearchParams(String search)
    {
        def callParameters= new Hashtable()
        
        callParameters.put("method","get")
        if(!search.startsWith("search/"))  
             callParameters.put(Constants.PATH_PARAM, "search/"+search)        
        
        else
            callParameters.put(Constants.PATH_PARAM, search)
        
        return callParameters
    }
    
    /**
     * Create a map with the params related to a picasa album call 
     * @param path The picasa album path 
     * @return The map with the parameters of the call
     **/
    protected def createCallPathParams(String path)
    {
        def callParameters= new Hashtable()
                    
        callParameters.put("method","get")
        
        if(!path.startsWith("album/"))
            callParameters.put(Constants.PATH_PARAM, "album/"+path)
        else
            callParameters.put(Constants.PATH_PARAM, path)
        
        return callParameters
    }
    
    /*def getListOfProvidersComplete()
    {
        return personalizerService.getListOfProviderNames()
    }
    
    protected def getListOfProviders()
    {
        def providers= getListOfProvidersComplete()
        
        return providers.subList(1,providers.size())
    }*/
    
    /*protected def getAlbumsIdsAndPaths(Map calls, String provider)
    {
        def keys= calls.keySet()
         
        def albums= new ArrayList() 
         
        for(String k:keys)
        {
            System.out.println("Adding "+k)
            
            if(calls.get(k).get(Constants.PATH_PARAM)!=null)
                albums.add(new AlbumInfo(k, calls.get(k).get(Constants.PATH_PARAM), provider))
            else
                albums.add(new AlbumInfo(k, calls.get(k).get(Constants.QUERY_PARAM), provider))
        }
        
        System.out.println("Size "+albums.size())
        
        return albums
        
    }*/
    
    /**
     * Retrieve the list of calls related to the specified renderes
     * @param calls List of renderers
     * @return The list of picasa calls (album and search mixed)
     **/
    protected def getAlbumsIdsAndPaths(List calls)
    {
         
        def albums= new ArrayList() 
         
        for(ServiceCall call:calls)
        {
            List callParameters= call.parameters
            
            if(callParameters!=null)
            {
                for(Map parameters: callParameters)
                {
                   
                    albums.add(createAlbum(call, parameters))
                           
                }
            }
            
            
        }
        
        log.debug "Size "+albums.size()
        
        return albums
        
    }
    
    /**
     * Create a new album by using the specified parameters
     * @param call The renderer
     * @param paremeters map with the paremeters
     * @return The album associated with the specified parameters
     **/    
    protected def createAlbum(def call, def parameters)
    {
        if(parameters.get(Constants.PATH_PARAM)!=null)
            return new AlbumInfo(parameters.get(Constants.PATH_PARAM), call.provider.name,call.callId)
        else
            return new AlbumInfo(parameters.get(Constants.QUERY_PARAM), call.provider.name,call.callId)
    }
    
    /**
     * Return an url without the prefix PICASA_URL_PREFIX or null if the url does not contain such prefix
     * @param url The url
     * @return The url without PICASA_URL_PREFIX or null if it does not contain the prefix 
     **/
    protected def parseAlbumUrl(String url)
    {
        def baseUrlPos= url.trim().indexOf(PICASA_URL_PREFIX); 
        
        if(baseUrlPos==-1)
            return null
        else
            return url.trim().substring(baseUrlPos+PICASA_URL_PREFIX.length()) 
    }
    

}
