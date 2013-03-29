package fr.unice.yourcast.personalizer

import fr.unice.yourcast.announcements.AnnouncementInfo
import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.ServiceCall


/**
* Controller providing the functionality related to the announcement source
* @author Daniel Romero
*/
class AnnouncementsController extends AbstractController {

    
    /*---CONSTANTS---*/
    private static String TARGET_PARAM="target"
    
    private static String SERVICE_NAME="Announcements"
    
    private static String TARGET_PUBLIC_PREFIX="public"
    

    /*---METHODS---*/
    
   /**
     * Display the page to list the announcements calls
     **/
    def list() 
    { 
          
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)
        
        log.debug "Showing the announcements"
        render(view:"announcementsShowList", model:[listOfRenderers:listOfCallIds])
    
    }
    
    /**
     * Display the page to add a new announcement call
     **/
    def add()
    {
            
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
   
        
        render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds])
    }
    
    /**
     * Add a new announcement call
     **/
    def addTarget()
    {
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
            def renderer= params.renderer
            def target= params.get(TARGET_PARAM)

            if(renderer==null || renderer.trim().equals(""))
                render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!"])
            else if(target==null || target.trim().equals(""))    
                render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The target public has to be defined!"])
            else
            {

                renderer= renderer.trim()

                target= target.trim()

                def calls= personalizerService.getCallByIdAndService(SERVICE_NAME,renderer)

                if(calls==null)
                {
                    render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!"])
                }
                else
                {

                    def map= createPublicParameters(target.trim())


                    boolean saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME, map) 

                    if(saved)
                    {
                        personalizerService.updateProviderFlag(calls.provider.name, SERVICE_NAME, true)
                        render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The target public has been added!"])
                    }   
                    else
                        render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the target public. Try again!"])

                }
            }
        }
        else
            render(view:"announcementsAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
               
    }
    
    def getListOfProvidersComplete()
    {
        return personalizerService.getListOfProviderNames()
    }
    
    /**
     * List the announcement calls
     **/
    def listTargets()
    {
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
        {
            def renderer= params.renderer

            //PersonalizerServiceWrapper personalizer= PersonalizerServiceWrapper.getPersonalizer()

            def calls= null

            def targets= null

            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)

            if(renderer.equals(Constants.ALL))
            {
                def list= personalizerService.getCalls(SERVICE_NAME)
                targets= new ArrayList()

                for(ServiceCall call:list)
                {
                    //calls= personalizer.getCalls(p,SERVICE_NAME)
                    //calls= personalizerService.getCallByIdAndService(SERVICE_NAME,callId)

                    //if(calls!=null)

                    def targetTemp= getAnnouncements(call)
                    targets.addAll(targetTemp)
                }

            }
            else
            {
                //calls= personalizer.getCalls(provider,SERVICE_NAME)
                calls= personalizerService.getCallByIdAndService(SERVICE_NAME,renderer)
                if(calls!=null)
                    targets= getAnnouncements(calls)
                else
                    targets= new ArrayList()
            }

            //def resp= client.get(path: provider+"/"+SERVICE_NAME)

            render(view:"announcementsShowList", model:[listOfRenderers:listOfCallIds, listOfPublic:targets, current:renderer])
        }  
        else
            render(view:"announcementsShowList", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
    }
    
    /**
     * Delete a concrete announcement call
     **/
    def remove()
    {
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,params.callId)
        personalizerService.deleteCall(SERVICE_NAME, params.callId, Integer.parseInt(params.position))
        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
        params.renderer= params.current
        listTargets()
    }
    
    /**
     *  Display the page to edit an announcement call
     **/
    def edit()
    {
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,params.callId)
        
        def parameters= call.parameters.get(Integer.parseInt(params.position))
        
        def announcementInfo= createAnnouncement(call, parameters)
        
        render(view:"announcementsEdit", model:[listOfRenderers:getListOfCallIds(SERVICE_NAME), current:params.current, announcementInfo:announcementInfo, position:params.position])
    }
    
    /**
     * Edit the announcement call
     **/
    def editAnnouncement()
    {
        def newRenderer= params.renderer
        
        def previousRenderer= params.callId
        
        def pos= Integer.parseInt(params.position)
        
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        def target= params.get(TARGET_PARAM)
        
        
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,previousRenderer)
        
        def map= call.parameters.get(pos)
        
        def announcementInfo= createAnnouncement(call, map)
        
        
        
        if(newRenderer==null || newRenderer.trim().equals(""))
            render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",current:params.current, announcementInfo:announcementInfo, position:params.position])
        else if(target==null || target.trim().equals(""))    
            render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The target public has to be defined!",current:params.current, announcementInfo:announcementInfo, position:params.position])
        else
        {
            
            newRenderer= newRenderer.trim()
            
            target= target.trim()
            
            map= createPublicParameters(target.trim())

            if(newRenderer.equals(previousRenderer))
            {
                def updated= personalizerService.updateServiceCall(previousRenderer, SERVICE_NAME, map, pos)
                
                if(updated)
                {
                    announcementInfo= createAnnouncement(call, map)
                    personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                    render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The target public has been updated!",current:params.current, announcementInfo:announcementInfo,position:params.position])
                }
                else
                {
                    
                    render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the target public. Try again!",current:params.current, announcementInfo:announcementInfo,position:params.position])
         
                }
                
            }
            else
            {
                def saved= personalizerService.saveServiceCall(newRenderer,SERVICE_NAME, map) 

                if(saved)
                {
                    personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                    personalizerService.deleteCall(SERVICE_NAME, previousRenderer, pos)
                    
                    call= personalizerService.getCallByIdAndService(SERVICE_NAME,newRenderer)
                    personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                    announcementInfo= createAnnouncement(call, map)
                    render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The target public has been updated!",current:params.current, announcementInfo:announcementInfo,position:call.parameters.size()-1])
                }
                else
                    render(view:"announcementsEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the target public. Try again!",current:params.current, announcementInfo:announcementInfo,position:params.position])
         
            }
               
                


                

            
        }     
    }
    
    /**
     * Reload the list page by displaying the calls of the last selected renderer
     **/
    def back()
    {
        params.renderer= params.current
        
        listTargets()
    }
    
    /*---AUX METHODS---*/
    
    /**
     * Create a map with the parameters of a announcement call
     * @param target The target public of the call
     * @return The map of parameters
     **/
    protected def createPublicParameters(String target)
    {
        def map= new HashMap() 

        map.put(TARGET_PARAM,target.trim())
        
        return map
    }
    

    /*protected def getListOfProviders()
    {
        def providers= getListOfProvidersComplete()
        
        return providers.subList(1,providers.size())
    }*/
    
    /**
     * Retrieve the calls of the specified renderer
     * @param call The renderer
     * @return the list of calls 
     **/
    protected def getAnnouncements(ServiceCall call)
    {
        //def keys= calls.keySet()
         
        def announcements= new ArrayList() 
         
        for(Map p:call.parameters)
        {
            //System.out.println("Adding "+k)
            
            announcements.add(createAnnouncement(call,p))
            /*if(p.get(TARGET_PARAM)!=null)
                announcements.add(new AnnouncementInfo(target:p.get(TARGET_PARAM),provider:call.provider.name,renderer:call.callId))
            else
                announcements.add(new AnnouncementInfo(target:"-",provider:call.provider.name,renderer:call.callId))*/
        }
        
        log.debug "Size "+announcements.size()
        
        return announcements
    }
    
    /**
     * Create a new announcement 
     * @param call The renderer
     *  @param map The parameters of the call
     * @return The announcement 
     **/
    protected def createAnnouncement(def call, def map)
    {
        if(map.get(TARGET_PARAM)!=null)
            return new AnnouncementInfo(target:map.get(TARGET_PARAM),provider:call.provider.name,renderer:call.callId)
        else
            announcements.add(new AnnouncementInfo(target:"-",provider:call.provider.name,renderer:call.callId))
    }
    

}
