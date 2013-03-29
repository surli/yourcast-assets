package fr.unice.yourcast.personalizer

import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.ServiceCall

/**
* Controller providing the functionality related to the icalreader source
* @author Daniel Romero
*/
class ICalReaderController extends AbstractController {
    
    /*---CONSTANTS---*/
    private final static def SERVICE_NAME="ICalReader"
    
    private final static def RENDERER_PARAM="renderer"
    
    private final static def CALENDAR_ID_PARAM="calendarId"
    
    private final static def URL_PARAM="calendarUrl"
    
    private final static def START_PARAM="start"
    
    private final static def END_PARAM="end"
    
    private final static def ICAL_PREFIX="https://www.google.com/calendar/ical/"
    
    static{
        //TimeZone.setDefault(TimeZone.getTimeZone("Europe/Paris"))
        //TimeZone.setDefault(TimeZone.getTimeZone("GTM"))
        
       
    }    
    
   
    /*---METHODS---*/
    /**
     * Display the page to list the icalreader calls
     **/
    def list() 
    { 
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)
        
        //log.debug "Time zones:::::: "+TimeZone.getAvailableIDs()
       
        render(view:"icalReaderShowList", model:[listOfRenderers:listOfCallIds])
        
         
    }
    
    /**
     * Display the page to add a new icalreader call
     **/
    def add()
    {
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
            
        render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds])
    }
    
    /**
     * Delete a specified icalreader call
     **/
    def remove()
    {
        personalizerService.deleteCall(SERVICE_NAME, params.callId, Integer.parseInt(params.position))

        params.renderer= params.current
        listCalendars()
    }
    
    /**
     * List the icalreader calls
     **/
    def listCalendars()
    {
        def listOfCallIds = null
        
        def calendars= null
        
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)

            def renderer= params.renderer

            def calls= null

            if(renderer.equals(Constants.ALL))
            {
                def list=  personalizerService.getCalls(SERVICE_NAME)
                 calendars= new ArrayList()

                for(ServiceCall call:list)
                {

                    def calendarTemp= getCalendars(call)
                    calendars.addAll(calendarTemp)

                }

            }
            else
            {
                calls= personalizerService.getCallByIdAndService(SERVICE_NAME,renderer)

                if(calls!=null)
                {
                    calendars= getCalendars(calls)
                }
                else
                    calendars= new ArrayList()

            }

            log.debug "Calendars size "+calendars.size()

            render(view:"icalReaderShowList", model:[listOfRenderers:listOfCallIds,listOfCalendars:calendars, current:renderer])
        }
        else
            render(view:"icalReaderShowList", model:[listOfRenderers:listOfCallIds,listOfCalendars:calendars, messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
    }
    
    /**
     * Add a new icalreader call
     **/
    def addCalendar()
    {
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
        {
            def renderer= params.get(RENDERER_PARAM) 
            def url= params.get(URL_PARAM)
            def start= params.get(START_PARAM)
            def end= params.get(END_PARAM)

            listOfCallIds = getListOfCallIds(SERVICE_NAME)

            if(renderer==null || renderer.equals(""))
                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!"])
            else if(url==null || url.trim().equals(""))    
                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The calendar URL has to be defined!"])
            else if(start==null )    
                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The start date has to be defined!"])
            else if(end==null )    
                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The end date has to be defined!"])    
            else
            {
                url= url.trim()
                if(!url.startsWith(ICAL_PREFIX))
                {
                    url= ICAL_PREFIX+url

                }
                if(!isValidUrl(url))
                {
                    render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The URL of the calendar is not valid!"])
                }
                else
                {
                    def theCall= personalizerService.getCallByIdAndService(SERVICE_NAME,renderer)

                    if(theCall==null)
                        render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer does not exist!"])

                    else
                    {


                        log.debug "Start "+start.getClass()

                        if(start.compareTo(end)<0)
                        {

                            def paramsHash= createCalendarParams(start, end, url) 

                            def saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME, paramsHash) 

                            if(saved)
                            {
                                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The calendar has been added!"])
                                personalizerService.updateProviderFlag(theCall.provider.name, SERVICE_NAME, true)
                            }
                            else
                                render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the calendar. Try again!"])
                        }
                        else
                            render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The end date has to be after the start date!"])

                    }

                }
            }
        }
        else
            render(view:"icalReaderAdd", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
        
    }
    
    /*protected def getListOfProviders()
    {
        
        def providers= getListOfProvidersComplete()
        
        return providers.subList(1,providers.size())
    }
    
    def getListOfProvidersComplete()
    {
        return personalizerService.getListOfProviderNames()
    }*/
    
    /**
     * Reload the list page by displaying the calls of the last selected renderer
     **/
    def back()
    {
        params.renderer= params.current
        
        listCalendars()
    }
    
    /**
     * Display the page to edit a icalreader call
     **/
    def edit()
    {
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,params.callId)
        
        def parameters= call.parameters.get(Integer.parseInt(params.position))
        
        def calendarInfo= createCalendar(parameters, call)
        
        render(view:"icalReaderEdit", model:[listOfRenderers:getListOfCallIds(SERVICE_NAME), current:params.current, calendarInfo:calendarInfo, position:params.position])
    }
    
    /**
     * Edit a specific icalreader call
     **/
    def editCalendar()
    {
        def newRenderer= params.get(RENDERER_PARAM) 
        def previousRenderer= params.callId

        def url= params.get(URL_PARAM)
        def start= params.get(START_PARAM)
        def end= params.get(END_PARAM)
        
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        def pos= Integer.parseInt(params.position)
        
        
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME,previousRenderer)
        
        def map= call.parameters.get(pos)
        
        def calendarInfo= createCalendar(map, call)
        
        
        if(newRenderer==null || newRenderer.equals(""))
            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",current:params.current, calendarInfo:calendarInfo, position:params.position])
        else if(url==null || url.trim().equals(""))    
            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The calendar URL has to be defined!",current:params.current, calendarInfo:calendarInfo, position:params.position])
        else if(start==null )    
            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The start date has to be defined!",current:params.current, calendarInfo:calendarInfo, position:params.position])
        else if(end==null )    
            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The end date has to be defined!",current:params.current, calendarInfo:calendarInfo, position:params.position])    
        else
        {
            url= url.trim()
            if(!url.startsWith(ICAL_PREFIX))
            {
                url= ICAL_PREFIX+url
                
            }
            
            if(!isValidUrl(url))
            {
                render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The URL of the calendar is not valid!",current:params.current, calendarInfo:calendarInfo, position:params.position])
            }
            else
            {
                
              
                if(start.compareTo(end)<0)
                {
                   
                    
                    map= createCalendarParams(start, end, url)
                    
                    
                    if(newRenderer.equals(previousRenderer))
                    {
                        def updated= personalizerService.updateServiceCall(previousRenderer, SERVICE_NAME, map, pos)
                        
                        if(updated)
                        {
                            personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                            calendarInfo= createCalendar(map, call)
                            
                            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The calendar information has been updated!",current:params.current, calendarInfo:calendarInfo, position:params.position])
                        }
                        else
                            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the calendar information. Try again!",current:params.current, calendarInfo:calendarInfo, position:params.position])
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
                            calendarInfo= createCalendar(map, call)
                            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The calendar information has been updated!",current:params.current, calendarInfo:calendarInfo, position:call.parameters.size()-1])
                        }
                        else
                        {
                            render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the calendar information. Try again!",current:params.current, calendarInfo:calendarInfo, position:params.position])
                        }   
                    }


                    
                }
                else
                    render(view:"icalReaderEdit", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The end date has to be after the start date!",current:params.current, calendarInfo:calendarInfo, position:params.position])


            
                    
                    
                

            }
        }
    }
    
    /*---AUX METHODS---*/
    
    /**
     * Retrieve the calls related to the specified renderer
     * @param call The renderer
     * @return The calls of the renderer
     **/
    protected def getCalendars(def call)
    {         
        def calendars= new ArrayList() 
         
        for(Map p:call.parameters)
        {
            def theCalendar= createCalendar(p, call) 
            calendars.add(theCalendar)           
        }
        
        return calendars
        
    }
    
    /**
     * Create a new calendar by using an icalreader call 
     * @param map The parameters of the call
     * @param call The renderer related to the call
     * @return The calendar related to the paremeters
     **/
    protected def createCalendar(def map, def call)
    {
        def dateInfos= map.get(Constants.PATH_PARAM).split("/")
        
        //def timeZoneInfos= map.get(Constants.TIME_ZONE_INFO).split(":")

        log.debug "**** "+ dateInfos[0]

        log.debug "hour " +dateInfos[1]


        log.debug "n "+dateInfos[2]
        
        //def calendar= Calendar.getInstance()
        
        //calendar.setTimeZone(TimeZone.getTimeZone(timeZoneInfos[0]))
        //calendar.setTimeInMillis(Long.parseLong(dateInfos[1]))

        def start= new Date(map.get(Constants.START_TIME))//new Date(Long.parseLong(dateInfos[1])*1000)
        def n= Integer.parseInt(dateInfos[2])
        
        //calendar.setTimeZone(TimeZone.getTimeZone(timeZoneInfos[1]))
        //calendar.setTimeInMillis(map.get("end"))
        def end= new Date(map.get(Constants.END_TIME))//new Date((n*3600000)+start.getTime())

        def theCalendar= new fr.unice.yourcast.icalreader.Calendar(renderer:call.callId,url:map.get(Constants.BODY_PARAM),provider:call.provider.name,start:start, theEnd:end, hours:n)
        
        
        log.debug "Start "+theCalendar.start.toString()
        
        log.debug "End "+theCalendar.theEnd.toString()
        
        return theCalendar

    }
    
    /**
     * Create a map containing the parameters of a icalreader call
     * @param start The start date of the call
     * @param end The end date of the call
     * @param url The url of the calendar
     * @return The map with the parameters
     **/
    
    def protected createCalendarParams(def start, def end, def url)
    {
        
        log.debug "Creating calndar params-- Start "+start.toString()
        
        log.debug "Creating calndar params-- End "+end.toString()
        
        
        //def calendar= Calendar.getInstance()
        //calendar.setTime(start)
        //def startTZ= calendar.getTimeZone()
    
        //calendar.setTime(end)
        //def endTZ= calendar.getTimeZone()
        
        def startTime= start.getTime()

        def endTime= end.getTime()

        def n= (endTime-startTime)/3600000

        def hours= startTime/1000

        def paramsHash= new Hashtable()


        paramsHash.put(Constants.METHOD_PARAM,Constants.POST)
        paramsHash.put(Constants.PATH_PARAM,"hours/"+hours+"/"+n)
        paramsHash.put(Constants.BODY_PARAM, url)
        //paramsHash.put(Constants.TIME_ZONE_INFO,startTZ.getID() +":"+endTZ.getID())
        paramsHash.put(Constants.START_TIME,startTime)
        paramsHash.put(Constants.END_TIME,endTime)
        
        //log.debug "Creating calendar params-- Time Zone "+startTZ.getID() +":"+endTZ.getID()
        
        
        return paramsHash
    }
}
