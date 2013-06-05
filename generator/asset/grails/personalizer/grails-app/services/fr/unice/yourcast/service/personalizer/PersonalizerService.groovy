package fr.unice.yourcast.service.personalizer

import fr.unice.yourcast.sources.ServiceCall
import fr.unice.yourcast.sources.ProviderInfo
import fr.unice.yourcast.sources.ServiceInfo
import fr.unice.yourcast.sources.RateLimit
import fr.unice.yourcast.sources.CallCount

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
                
        log.debug "Personalizer Service callId "+ callId
        
        
        log.debug "Personalizer Service parameters "+ parameters.size()
        
        
        def theCall= getCallByIdAndService(source,callId)
        
        if(theCall!=null)
        {
            theCall.parameters.remove(pos)
            theCall.parameters.add(pos,parameters)
            return theCall.save(flush:true)
        }
        
        return false
             
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
	                log.error "PersonalizerService- The File "+file3.getAbsolutePath() +" can not be found! The DB can not be initiliazed "
	                message= "The DB can not be initialized."
	            }            
            }
			else
			{
				filePath = className.substring(0,className.indexOf(Constants.WEB_INF_DIR_TOMCAT) + Constants.WEB_INF_DIR_TOMCAT.length())
				
				log.debug "PersonalizerService- Using the file path "+filePath
				
				file3= new File(filePath,Constants.ZONES_SOURCES_FILE_TOMCAT)
				
				if(file3.exists())
				{
				 try{
						bf= new BufferedReader(new FileReader(file3.getAbsolutePath()))
					}
					catch(Exception e1)
					{
						log.error "PersonalizerService- The File "+file3.getAbsolutePath() +" can not be found! The DB can not be initiliazed "
						message= "The DB can not be initialized."
					}
				}
			}
        
        }
        
        
        if(bf)
        {
            
            def line= bf.readLine()
            
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
                        def infos= line.split(Constants.ZONES_SOURCES_SEPARATOR) //format sourceName;requests;minutes;argName0|value;argName1|value;... 
                    															//requests,minutes=>RateLimit. default value (-1,-1)
                        def sourceName= infos[0]
                        
                        def requests= infos[1]
                        
                        def minutes= infos[2]
                        
                        def RateLimit rl= new RateLimit(requests:requests, minutes:minutes)
                        
                        rl.save()
                    
                        def args= new Hashtable()
                    
                    
                        for(def i=3;i<infos.length;i++) 
                        {
                            addParameterValue(args,infos[i])
                        }
                    
                        def serviceInfo= new ServiceInfo(name:sourceName, args:args, rateLimit:rl)
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
                
                while(!line.trim().startsWith("#Call count"))
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
                
                //Call Counts
                line= bf.readLine()
                
                while(line!=null)
                {
                    if(!line.trim().equals(""))
                    {
                        def infos= line.trim().split(Constants.ZONES_SOURCES_SEPARATOR) //sourceName;providerName;value

                       
                        def sourceName= infos[0].trim()

                        def providerName= infos[1].trim()

                        def value= infos[2].trim()

                        def callCount= new CallCount(source:sourcesMap.get(sourceName), provider:zonesMap.get(providerName), callExecuted:value) 

                        callCount.save()
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
     * Retrieve the specified source
     *@param name The source name
     *@return The source
     **/
    def getServiceRateLimit(String name)
    {
        def serviceInfo= new ServiceInfo(name:name)
        
        def service= ServiceInfo.find(serviceInfo)
        
        if(service)
        	return service.rateLimit
        
        return null
    }
    
    def getCallCount(String provider, String service)
    {
        def serviceInfo= getService(service)
        def providerInfo= getProvider(provider)
        return CallCount.findByProviderAndSource(providerInfo,serviceInfo)
    }
    
    def updateCallCount(String provider, String source, int value)
    {
        def providerInfo= getProvider(provider)
        def serviceInfo= getService(source)
         
        def callCount= CallCount.findByProviderAndSource(providerInfo,serviceInfo)
        
        if(callCount==null)
        {
            return false
        }
        
       callCount.callExecuted=value
        
        try{
            callCount.save(flush:true)
            
            return true
        }
        catch(Exception e)
        {
            return false
        }
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
