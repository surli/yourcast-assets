package fr.unice.yourcast.service.personalizer

import fr.unice.yourcast.sources.ServiceCall
import fr.unice.yourcast.sources.ProviderInfo
import fr.unice.yourcast.sources.ServiceInfo

import net.sf.json.JSONObject
import net.sf.json.JSONNull

import net.sf.ehcache.Cache
import net.sf.ehcache.CacheManager
import net.sf.ehcache.Element
import fr.unice.yourcast.util.CacheManagerYourCast
import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.ProviderFlag
import fr.unice.yourcast.db.DBFlag

import java.io.FileReader


/**
* The service to personalize the source calls
* @author Daniel Romero
*/
class PersonalizerService {
    
    
    /*---CONSTANTS---*/    
    private static final String DEFAULT_URL = "http://localhost:8080"
    
    private static final String PROVIDERS_CACHE="providersCache"
    
    private static final String PROVIDERS="providers"
   
    private static Cache providersCache= CacheManagerYourCast.getCacheManager().createCache(PROVIDERS_CACHE)
    

    
    /*---METHODS---*/

    def serviceMethod() {

    }
    
    /**
     * Save a new renderer
     * @param serviceCallInstance The renderer
     * @return true if the renderer was saved or false on the contrary
     **/
    def saveServiceCall(ServiceCall serviceCallInstance)
    {
       return serviceCallInstance.save(flush: true)
    }
    
    
    /**
     * Save a new renderer
     * @param callId The renderer id
     * @param provider The related zone
     * @param callId The list of paramaters of the source
     * @param provider The zone
     * @param parameters The list of calls of the renderer
     * @return true if the renderer was saved or false on the contrary
     **/
    def saveServiceCall(String callId, String source, String provider, List parameters)
    {
        def theService= getService(source)
        
        log.debug "Personalizer Service service "+ theService
        
        def theProvider= getProvider(provider) 
        
        
        log.debug "Personalizer Service provider "+ theProvider
        
        
        log.debug "Personalizer Service callId "+ callId
        
        
        log.debug "Personalizer Service parameters "+ parameters.size()
                    
        def serviceCallInstance = new ServiceCall(callId:callId, provider:theProvider, source:theService,parameters:parameters)
                    
        return serviceCallInstance.save(flush: true)
    }
    
    
    /**
     * Save a new call
     * @param callId The renderer id
     * @param source The related source
     * @param parameters The list of paramaters for the call
     * @return true if the call was saved or false on the contrary
     **/
    def saveServiceCall(String callId, String source, Map parameters)
    {
        def theService= getService(source)
        
        log.debug "Personalizer Service service "+ theService
        
        //def theProvider= getProvider(provider) 
        
        
        //System.out.println("Personalizer Service provider "+ theProvider)
        
        
        log.debug "Personalizer Service callId "+ callId
        
        
        log.debug "Personalizer Service parameters "+ parameters.size()
        
        
        def theCall= getCallByIdAndService(source,callId)
        
        if(theCall!=null)
        {
            theCall.parameters.add(parameters)
            return theCall.save(flush:true)
            //return true
        }
        
        return false
             
        //def serviceCallInstance = new ServiceCall(callId:callId, provider:theProvider, source:theService,parameters:parameters)
                    
        //return serviceCallInstance.save(flush: true)
    }
    
    /**
     * Update the service call related to the specified pos
     * @param callId The renderer id
     * @param source The related source
     * @param parameters The new list of paramaters for the call
     * @param pos The position of the service call to update
     * @return true if the call was updated or false on the contrary
     **/
    def updateServiceCall(String callId, String source, Map parameters, int pos)
    {
        def theService= getService(source)
        
        log.debug "Personalizer Service service "+ theService
        
        //def theProvider= getProvider(provider) 
        
        
        //System.out.println("Personalizer Service provider "+ theProvider)
        
        
        log.debug "Personalizer Service callId "+ callId
        
        
        log.debug "Personalizer Service parameters "+ parameters.size()
        
        
        def theCall= getCallByIdAndService(source,callId)
        
        if(theCall!=null)
        {
            theCall.parameters.remove(pos)
            theCall.parameters.add(pos,parameters)
            return theCall.save(flush:true)
            //return true
        }
        
        return false
             
        //def serviceCallInstance = new ServiceCall(callId:callId, provider:theProvider, source:theService,parameters:parameters)
                    
        //return serviceCallInstance.save(flush: true)
    }
    

    
    def init()
    {
        log.debug "Calling init"
        //Providers
        def zone1= new ProviderInfo(name:"zone1")
        def result= zone1.save()
        
        log.debug "zone1 :"+result
        
        def zone2= new ProviderInfo(name:"zone2")
        result= zone2.save()
        
        log.debug "zone2 :"+result
        
        //Picasa
        def argsPicasa= new Hashtable()
        
        argsPicasa.put("uri", DEFAULT_URL)
        argsPicasa.put("path","/fr.unice.i3s.modalis.yourcast.sources.picturealbum.picasa/")
        
        ServiceInfo picasa = new ServiceInfo(name:"Picasa", args:argsPicasa)
        
        picasa.save()
        
       
        def parametersPicasa= new ArrayList() {{
			add(new HashMap() {{
				put("method","get");
				put("path","album/106664018239891640265/5742732035849898049/Gv1sRgCPL909uNx8vzMw");
			}})}}
        ServiceCall picasaSponsors = new ServiceCall(callId:"PicasaSponsors", source:picasa, provider:zone1, parameters:parametersPicasa)
        
        picasaSponsors.save()
        
        
        ServiceCall picasaSponsors2 = new ServiceCall(callId:"PicasaSponsors2", source:picasa, provider:zone1, parameters:new ArrayList())
        
        picasaSponsors2.save()
        
        //Weather 2
        def argsWeather2= new Hashtable()
        
        argsWeather2.put("uri", DEFAULT_URL)
        argsWeather2.put("path","/fr.unice.i3s.modalis.yourcast.sources.forecast.weather2/rest/")
        
        ServiceInfo weather2 = new ServiceInfo(name:"Weather2",args:argsWeather2)

																					
	weather2.save()
        
        ServiceCall weatherRennes = new ServiceCall(callId:"weatherRennes", source:weather2, provider:zone1, parameters:new ArrayList() {{
            add(new HashMap() {{
                put("method","get")
                put("path","48.111981/-1.674291")
                put("forecast","2")
            }})
        }})

        weatherRennes.save()
        
        
        ServiceCall weatherLille = new ServiceCall(callId:"weatherLille", source:weather2, provider:zone2, parameters:new ArrayList())
        weatherLille.save()
        
        //Announces
        def argsAnnounces= new Hashtable()
        
        argsAnnounces.put("uri", DEFAULT_URL)
        
        argsAnnounces.put("path","/fr.unice.i3s.modalis.yourcast.sources.announcement/rest/")
        
	ServiceInfo announces = new ServiceInfo(name:"Announces", args:argsAnnounces)

        announces.save()
        
        ServiceCall announcesCall = new ServiceCall(callId:"announces", source:announces, provider:zone1, parameters:new ArrayList())
	announcesCall.save()
        
        ServiceCall announcesCall2 = new ServiceCall(callId:"announces2", source:announces, provider:zone2, parameters:new ArrayList())
	announcesCall2.save()
        
        
        ServiceCall announcesCall3 = new ServiceCall(callId:"announces3", source:announces, provider:zone1, parameters:new ArrayList())
	announcesCall3.save()
        
																		
        //Twitter TL
        def argsTwitter= new Hashtable()
        
        argsTwitter.put("uri", "https://api.twitter.com")
        argsTwitter.put("path","/1/statuses/user_timeline.json")
        argsTwitter. put("query",new HashMap() {{
                            put("include_entities","true");
                            }})
     
	ServiceInfo twitterTL = new ServiceInfo(name:"TwitterTL", args:argsTwitter)
																														
        twitterTL.save()
        
        
        ServiceCall twitterTLGPL = new ServiceCall(callId:"twitterTLGPL", source:twitterTL, provider:zone2, parameters:new ArrayList() {{
                add(new HashMap() {{
                        put("method","get");
                        put("query",new HashMap() {{
                                put("screen_name","GPL2012");
                                put("count",5);
                        }});
                }});
        }});
        
        twitterTLGPL.save()
        
        
        ServiceCall twitterTLGPL2 = new ServiceCall(callId:"twitterTLGPL2", source:twitterTL, provider:zone2, parameters:new ArrayList() )
        
        twitterTLGPL2.save()
           
        //Twitter search
        def argsTwitterSearch= new HashMap() 
        
        argsTwitterSearch.put("uri", "http://search.twitter.com")
        argsTwitterSearch.put("path","/search.json")
        
        argsTwitterSearch.put("query",new HashMap() {{
                                put("include_entities","true");
                                }})
        
        
        ServiceInfo twitterSearch= new ServiceInfo(name:"TwitterSearch", args:argsTwitterSearch)
																														
        twitterSearch.save()
        
        ServiceCall twitterSearchGPL = new ServiceCall(callId:"twitterSearchGPL", source:twitterSearch, provider:zone2, parameters:new ArrayList() {{
                add(new HashMap() {{
                        put("method","get");
                        put("query",new HashMap() {{
                                put("q","#GPL2012");
                                put("result_type","recent");
                                put("rpp",10);
                        }});
                }});
        }})

        
        twitterSearchGPL.save()
        
        
        ServiceCall twitterSearchGPL2 = new ServiceCall(callId:"twitterSearchGPL2", source:twitterSearch, provider:zone2, parameters:new ArrayList())

        
        twitterSearchGPL2.save()
        
        //Icalreader
        
        ServiceInfo icalreader= new ServiceInfo(name:"ICalReader", args:new HashMap() {{
                        put("uri", DEFAULT_URL);
                        put("path","/fr.unice.i3s.modalis.yourcast.sources.calendar.icalreader/");
                        }})
        icalreader.save()
        
        ServiceCall icalReaderGDRGPL = new ServiceCall(callId:"icalreaderAll", source:icalreader, provider:zone1, parameters:new ArrayList() {{
			add(new HashMap() {{
				put("method","post");
				put("path","hours/12/1");
				put("body","https://www.google.com/calendar/ical/vpd9psgi66nuoad1h586s77ffg%40group.calendar.google.com/private-14b83e20d01a54d7d43eb1de278b6c1f/basic.ics");
			}});
		}})
        icalReaderGDRGPL.save()
        
        ServiceCall icalReaderGDRGPL2 = new ServiceCall(callId:"icalreaderAll2", source:icalreader, provider:zone2, parameters:new ArrayList() {{
                add(new HashMap() {{
                        put("method","post");
                        put("path","hours/12/1");
                        put("body","https://www.google.com/calendar/ical/vpd9psgi66nuoad1h586s77ffg%40group.calendar.google.com/private-14b83e20d01a54d7d43eb1de278b6c1f/basic.ics");
                }});
        }})
        icalReaderGDRGPL2.save()
    }

    
    def saveProvider(ProviderInfo providerInfoInstance)
    {
        return providerInfoInstance.save(flush: true)
    }
    
    
    def saveService(ServiceInfo serviceInfoInstance)
    {
        return serviceInfoInstance.save(flush:true)
    }
    
    /**
     * Return the list of providers
     * @return List of providers
     **/
    def getListOfProviders()
    {
        def result= null
        if(this.providersCache.get(PROVIDERS))
        {
            result= this.providersCache.get(PROVIDERS).getObjectValue() 
        }
        else
        {
        
            result= ProviderInfo.findAll()
            
            providersCache.put(new Element(PROVIDERS,result))
            
        }    
        
        
        return result
    }
    
    
    /**
     * Return the list of providers
     * @return List of providers
     **/
    def getListOfProviderNames()
    {
        //def listOfProviders = [ALL, "zone1", "zone2"]
        
        List providers= getListOfProviders()
        
        List providersNames= new ArrayList()
        
        providersNames.add(Constants.ALL)
        
        
        for(ProviderInfo p:providers)
        {
            providersNames.add(p.getName())
        }
        
        
        
        return providersNames
    }
    
        
    def initFromFile()
    {
        def message=null
        BufferedReader bf= null
        
        File file= new File(Constants.ZONES_SOURCES_FILE)
        
        File file2= new File(Constants.ZONES_SOURCES_FILE_ALT)
        
        if(file.exists())
        {
            bf= new BufferedReader(new FileReader(Constants.ZONES_SOURCES_FILE))
        }
        else if(file2.exists())
        {
            try{
                bf= new BufferedReader(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(Constants.ZONES_SOURCES_FILE_ALT)))
            }
            catch(Exception e)
            {
                
                String filePath = ""
				java.net.URL url = PersonalizerService.class.getResource("PersonalizerService.class")
				String className = url.getFile()
				filePath = className.substring(0,className.indexOf(Constants.WEB_APP_DIR) + Constants.WEB_APP_DIR.length()) 
				
				File file3= new File(filePath,Constants.ZONES_SOURCES_FILE_ALT)
				
				if(file3.exists())
				{
				 try{
		                bf= new BufferedReader(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(file3.getAbsolutePath())))
		            }
		            catch(Exception e1)
		            {
		                log.error "PersonalizerService- The Files "+Constants.ZONES_SOURCES_FILE+", "+Constants.ZONES_SOURCES_FILE_ALT+" and "+ filePath +" not found! The DB can not be initiliazed "
		                message= "The DB can not be initialized."
		            }
				}
		                
		                
            }
            
        }
        else
        {
            
                
            
            String filePath = ""
			java.net.URL url = PersonalizerService.class.getResource("PersonalizerService.class")
			String className = url.getFile()
			log.debug "PersonalizerService- Class name "+className
			
			filePath = className.substring(0,className.indexOf(Constants.WEB_APP_DIR) + Constants.WEB_APP_DIR.length()) 
			
			log.debug "PersonalizerService- Using the file path "+filePath
			
			File file3= new File(filePath,Constants.ZONES_SOURCES_FILE_ALT)
			
			if(file3.exists())
			{
			 try{
	                bf= new BufferedReader(new FileReader(file3.getAbsolutePath()))
	            }
	            catch(Exception e1)
	            {
	                log.error "PersonalizerService- The Files "+Constants.ZONES_SOURCES_FILE+", "+Constants.ZONES_SOURCES_FILE_ALT+" and "+ filePath +" not found! The DB can not be initiliazed "
	                message= "The DB can not be initialized."
	            }            
            }
        
        }
        
        
        if(bf)
        {
            
            def line= bf.readLine()
            
            //def zones= new Hashtable()
            
            while(line.trim().equals(""))
            {
                line= bf.readLine()
            }
        
            if(line.trim().startsWith("#Zones"))
            {
                
                def zonesMap= new Hashtable()
                line= bf.readLine()
                //Zones
                while(!line.trim().startsWith("#Sources"))
                {
                    def zoneName= line.trim()
                    def theZone= new ProviderInfo(name:zoneName)
                    theZone.save()
                    zonesMap.put(zoneName,theZone)
                    
                    line= bf.readLine()
                } 
                
                
                def sourcesMap= new Hashtable()
                line= bf.readLine()
                
                //Sources
                while(!line.trim().startsWith("#Service Call parameters"))
                {
                    if(!line.trim().equals(""))
                    {
                        def infos= line.split(Constants.ZONES_SOURCES_SEPARATOR) //format sourceName;argName0|value;argName1|value;... 
                    
                        def sourceName= infos[0]
                    
                        def args= new Hashtable()
                    
                    
                        for(def i=1;i<infos.length;i++) 
                        {
                            addParameterValue(args,infos[i])
                        }
                    
                        def serviceInfo= new ServiceInfo(name:sourceName, args:args)
                        serviceInfo.save()
                        sourcesMap.put(sourceName,serviceInfo)
                    }

                    
                    line= bf.readLine()
                    
                } 
                
                //Call Parameters
                def callParametersMap= new Hashtable()
                line= bf.readLine()
                
                while(!line.trim().startsWith("#Service calls"))
                {
                     if(!line.trim().equals(""))
                     {
                        def infos= line.trim().split(Constants.ZONES_SOURCES_SEPARATOR) 
                    
                        def paramatersId= infos[0].trim()
                    
                        def params= new ArrayList()
                    
                        for(def i=1;i<infos.length;i++)
                        {
                            def map= createMapFromString(infos[i])
                        
                            params.add(map)
                        }
                    
                        callParametersMap.put(paramatersId, params)
                     }

                    
                    line= bf.readLine()
                    
                }
                
                
                //Calls
                line= bf.readLine()
                
                while(line!=null)
                {
                    if(!line.trim().equals(""))
                    {
                        def infos= line.trim().split(Constants.ZONES_SOURCES_SEPARATOR) //callId;sourceName;providerName;parametersId

                        def callId= infos[0].trim()

                        def sourceName= infos[1].trim()

                        def providerName= infos[2].trim()

                        def parametersId= infos[3].trim()

                        def serviceCall= new ServiceCall(callId:callId, source:sourcesMap.get(sourceName), provider:zonesMap.get(providerName), parameters:callParametersMap.get(parametersId)) 

                        serviceCall.save()
                    }    
                    
                    line= bf.readLine()
                    
                }
                
                bf.close()
                
                        
     
            }
            else
            {
                log.error "PersonalizerService- Error en the file format. The zonesSources.txt does not contain the zones"
                 message= "The DB can not be initialized."
            }
                
        }
	else
        {
            log.error "PersonalizerService- Files "+Constants.ZONES_SOURCES_FILE+" and "+Constants.ZONES_SOURCES_FILE_ALT+" not found! The DB can not be initiliazed"
            message= "The DB can not be initialized."
        }
        
           
 
        return message; 
    }
    
    
    protected def addParameterValue(def map, def paramValue)
    {
        log.debug "PersonalizerService- The paramvalue "+paramValue
        def infos= paramValue.split(Constants.ZONES_SOURCES_PARAM_VALUE_SEPARATOR)
        
         log.debug "PersonalizerService- Infos "+infos
        
        def val= infos[1].trim()
        
        def paramName= infos[0].trim()
        
        if(val.trim().startsWith("["))
        {
            val= createMapFromString(val)
        }
        
        map.put(paramName,val)
        
    }
    
    protected def createMapFromString(String mapString)
    {
        log.debug "PersonalizerService- createMapfromString- mapString "+mapString
        def mapStringWS= mapString.trim()
        
        def mapInfo= mapStringWS.substring(1,mapStringWS.size()-1)
        
        def infos= mapInfo.split(Constants.ZONES_SOURCES_MAP_SEPARATOR)
        
        def map= new Hashtable()
        
        
        
        for(def info:infos)
        {
            log.debug "PersonalizerService- createMapfromString- info "+info
            def paramValue= info.trim().split(Constants.ZONES_SOURCES_MAP_KEY_VALUE_SEPARATOR)
            
            log.debug "PersonalizerService- createMapfromString- paramValue "+paramValue
            
            map.put(paramValue[0],paramValue[1])
        }
        
        
        return map
        
    }
    
    
    def drop()
    {
        ServiceInfo.collection.getDB().dropDatabase()
    }
    
    /**
     * Retrieve the renderers related to the specifed zone and source
     * @param providerName The name of the zone
     * @param serviceName The source
     * @return  The list of renderers
     **/
    def getCalls(String providerName, String serviceName) 
    {
        def serviceInfo= getService(serviceName)
        def providerInfo= getProvider(providerName)
        
        //def ServiceCall serviceCallInfo= new ServiceCall(provider:providerInfo, source:serviceInfo)
        
        def calls= ServiceCall.findAllByProviderAndSource(providerInfo,serviceInfo)
               
        return calls
    }
    
    
    /**
     * Retrieve the renderers related to the specified source
     * @param serviceName the source name
     * @return The list of renderers 
     **/
    def getCalls(String serviceName) 
    {
        def serviceInfo= getService(serviceName)
        
        //def ServiceCall serviceCallInfo= new ServiceCall(provider:providerInfo, source:serviceInfo)
        
        def calls= ServiceCall.findAllBySource(serviceInfo)
               
        return calls
    }
    
    /**
     * Retrieve the renderer ids related to the specified source
     * @param serviceName the source name
     * @return The list of ids  
     **/
    def getCallIds(String serviceName)
    {
        def calls= getCalls(serviceName)
        
        ArrayList ids= new ArrayList()
        
        for(ServiceCall call:calls)
        {
            ids.add(call.callId)
        }
        
        return ids
    }
    
    /**
     * Retrieve the parameters of the calls related to the zone and source specified
     * @param providerName the provider name
     * @param serviceName The source name
     * @return The list of call parameters
     **/
    def getCallParameters(String providerName, String serviceName) 
    {
        def result= [:]

        def calls= getCalls(providerName, serviceName)
        
        for(ServiceCall call:calls)
        {
            if(call.parameters!=null)
            {
                //for(Object o:call.parameters)
                //    result.put(call.callId,o)
                result.put(call.callId,call.parameters)
            }
            
        }
        
        if(result.size()==0)
            return null
           
        return result
    }
    
    /**
     * Retrieve the parameters of the calls related to the specified source 
     * @param serviceName The source name
     * @return The list of call parameters 
     **/
    def getCallParameters(String serviceName) 
    {
        def result= [:]

        def calls= getCalls(serviceName)
        
        for(ServiceCall call:calls)
        {
            if(call.parameters!=null)
            {
                //for(Object o:call.parameters)
                result.put(call.callId,call.parameters)
            }
            
        }
        
        if(result.size()==0)
            return null
           
        return result
    }
    
    /**
     * Retrieve the specified zone
     *@param name The zone name
     *@return The zone
     **/
    def getProvider(String name)
    {
        def providerInfo= new ProviderInfo(name:name)
        return ProviderInfo.find(providerInfo)
    }
    
    /**
     * Retrieve the specified source
     *@param name The source name
     *@return The source
     **/
    def getService(String name)
    {
        def serviceInfo= new ServiceInfo(name:name)
        return ServiceInfo.find(serviceInfo)
    }
    
    /**
     * Retrieve the renderer with the id, source and provider specified
     *@param provider The zone name
     *@param service The source name
     *@param callid The renderer id
     *@return The renderer
     **/
    def getCall(String provider, String service, String callId)
    {
        def serviceInfo= getService(service)
        def providerInfo= getProvider(provider)
       
        return ServiceCall.findByCallIdAndProviderAndSource(callId,providerInfo,serviceInfo)
    }
    
    /**
     * Retrieve the renderer with the id, and source specified
     *@param service The source name
     *@param callid The renderer id
     *@return The renderer
     **/
    def getCallByIdAndService(String service, String callId)
    {
        def serviceInfo= getService(service)
       
        return ServiceCall.findByCallIdAndSource(callId,serviceInfo)
    }
    
    /**
     * Retrieve the renderer with the id specified
     *@param callid The renderer id
     *@return The renderer
     **/
    def getCallById(String callId)
    {
        return ServiceCall.findByCallId(callId)
    }
    
    /**
     * Delete the renderer with the id, source and provider specified
     *@param provider The zone name
     *@param service The source name
     *@param callid The renderer id
     **/
    def deleteCall(String provider, String service, String callId)
    {
        log.debug "Provider "+provider
        
        log.debug "Service "+service
        
        log.debug "Call id "+callId
        
        def callInfo= getCall(provider,service, callId)
        callInfo.delete(flush:true)
    }
    
    /**
     * Delete the call related to the specified renderer, source and position 
     *@param service The source name
     *@param callid The renderer id
     *@param position The call position in the list of calls
     **/
    def deleteCall(String service, String callId, int position)
    {        
        log.debug "Service "+service
        
        log.debug "Call id "+callId
        
        log.debug "position "+position
        
        def callInfo= getCallByIdAndService(service, callId)
        
        
        if(callInfo.parameters.size()>position)
        {
            callInfo.parameters.remove(position)
            callInfo.save(flush: true)
            //callInfo.delete(flush:true)
        }
        
        
    }
    
    /**
     * Retrieve the parameters of the specified source
     *@param name The source name
     *@param position The map of parameters or null if the source does not exist
     **/
    def getParamService(String name) 
    {
        def service= getService(name)
        
        if(service!=null)
        {
            return service.args
        } else
            return null
    }
    
    /**
     * Retrieve the parameters of the source related to the specified zone
     *@param providerName The zone name
     *@param name The source name
     *@param position The map of parameters or null if the source does not exist
     **/
    def getParamService(String providerName, String name) 
    {
        return getCallParameters(providerName,name)
    }
     
    def getCallsByParameterValue(String providerName, String serviceName, String paramName, Object paramValue)
    {
        
        def result= new ArrayList()
        def calls= getCalls(providerName, serviceName)
        
        for(ServiceCall call:calls)
        {
            def val= call.parameters.get(paramName)
            
            if(val!=null)
            {
                if(val.equals(paramValue))
                result.add(call)
            }
        }
        
        return result
    }
    
    def updateProviderFlag(provider, source, value)
    {
        def providerInfo= getProvider(provider)
         
        def providerFlags= ProviderFlag.findByProvider(providerInfo)
        
        if(providerFlags==null)
        {
            providerFlags= new ProviderFlag(provider:providerInfo, flags:new Hashtable())
        }
        
        providerFlags.flags.put(source,value)
        
        try{
            providerFlags.save(flush:true)
            
            return true
        }
        catch(Exception e)
        {
            return false
        }
    }
    
    def getProviderFlags(provider, source)
    {
        def providerInfo= getProvider(provider)
        def providerFlags= ProviderFlag.findByProvider(providerInfo)
        
        if(providerFlags!=null && providerFlags.flags.get(source)!=null)
        {
            return providerFlags.flags.get(source)
        }
        
        return false
    }
    
    
    def getIsInitialized()
    {
        def dbflag= DBFlag.findByDbName(DBFlag.collection.getDB().getName())
        
        if(dbflag)
        {
            return dbflag.init
        }
        
        return false
    }
    
    def setInitialized(def val)
    {
        def dbflag= DBFlag.findByDbName(DBFlag.collection.getDB().getName())
        
        if(dbflag)
        {
            dbflag.init=val
        }
        else
        {
            dbflag= new DBFlag(init:val, dbName:DBFlag.collection.getDB().getName())
        }
        
        dbflag.save(flush:true)
        
    }
}
