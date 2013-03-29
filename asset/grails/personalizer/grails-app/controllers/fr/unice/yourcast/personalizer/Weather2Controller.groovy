package fr.unice.yourcast.personalizer

import fr.unice.yourcast.util.Constants
import fr.unice.yourcast.sources.weather2.City
import fr.unice.yourcast.util.RESTServiceClient
import fr.unice.yourcast.sources.ServiceCall

/**
* Controller providing the functionality related to the weather2 source
* @author Daniel Romero
*/
class Weather2Controller extends AbstractController {
    
    /*---CONSTANTS---*/    
    private final static String FRANCE="France"
    
    private final static String WEATHER_PREFIX="weather"
    
    private final static String SERVICE_NAME="Weather2"
    
    public static String GEO_LOCATION_SERVICE="http://api.hostip.info/get_json.php"
    
    /*---ATTRIBUTES---*/    
    def cityService

    /*---METHODS---*/ 
    /**
    * Display the page to list the the weather2 calls
    **/
    def list() 
    {
        
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)
        
        render(view:"weatherShowList", model:[listOfRenderers:listOfCallIds])
    
    }
    
    /**
    * Add a new weather2 call by using the city related to the current ip
    **/
    def addLocalCity()
    {
        def listOfCallIds = null
        
        
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
            log.debug "Calling Local City"
            if(params.city!=null)
            {
                def cityInfo= params.city.split(",")

                if(cityInfo[0].trim().equals("") || cityInfo[1].trim().equals(""))
                {
                    render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:""),messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The local city has not been identified!"])
                }
                else
                {

                    def gps= cityInfo[2].split("/")

                    def currentCity= new City(name:cityInfo[0],country:cityInfo[1],latitude:Double.parseDouble(gps[0]),longitude:Double.parseDouble(gps[1]),capital:false)
                    def renderer= params.renderer
                    if(renderer==null || renderer.equals(""))
                        render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",listOfDays:getListOfDays(), theCity:currentCity])
                    else if(params.forecast==null || params.forecast.equals(""))    
                    render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The number of days for the forecast has to be defined!",listOfDays:getListOfDays(),theCity:currentCity])
                    else
                    {

                        log.debug "City info "+params.city+" "+cityInfo[0]+" "+cityInfo[1]+" "+cityInfo[2]

                        def calls=personalizerService.getCallByIdAndService(SERVICE_NAME, renderer)

                        if(calls!=null)
                        {

                            def parametersWeather2= new Hashtable()

                            def forecast= params.forecast

                            parametersWeather2.put(Constants.METHOD_PARAM,Constants.GET) 

                            parametersWeather2.put(Constants.PATH_PARAM,cityInfo[2])

                            parametersWeather2.put(Constants.FORECAST,forecast)


                            def saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME, parametersWeather2) 

                            if(saved)
                            {
                                if(cityService.getCity(currentCity.latitude, currentCity.longitude)==null)
                                {
                                    cityService.saveCity(currentCity.name, currentCity.country, currentCity.capital, currentCity.latitude, currentCity.longitude)

                                }
                                def call=personalizerService.getCallByIdAndService(SERVICE_NAME, renderer)
                                personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                                render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The city has been added!",listOfDays:getListOfDays(),theCity:currentCity])
                            }    
                            else
                                render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,serviceCallInstance:serviceCallInstance, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the city. Try again!",listOfDays:getListOfDays(),theCity:currentCity])

                        }
                        else
                            render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:"The renderer does not exist!", theCity:currentCity])


                    }


                }
            }    
            else
            { 
                def localParams= new Hashtable()
                localParams.put("position", true)

                try{
                    log.debug "Calling Local City - Trying to retrieve the city"
                    def result= RESTServiceClient.invokeGet(GEO_LOCATION_SERVICE,localParams)

                    def country= result.get("country_name")
                    country= country.toLowerCase()
                    def theCountry= country.substring(0,1).toUpperCase()
                    theCountry= theCountry.concat(country.substring(1))

                    def city= result.get("city")
                    def lat= result.get("lat")
                    def longitude= result.get("lng")

                    log.debug result

                    log.debug city

                    log.debug lat

                    log.debug longitude

                    if(lat!=null && longitude!=null && !lat.equals("null") && !longitude.equals("null"))
                        render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:city,country:theCountry,longitude:Double.parseDouble(longitude), latitude:Double.parseDouble(lat),capital:false)])
                    else 
                        render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false)])



                }
                catch(Exception e)
                {
                    log.debug e.getMessage()
                    render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:""),messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The local city has not been identified!"])
                }


            }  
        }
        else if(!params.home)
            render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false)])
        else
            render(view:"weather2AddLocalCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false),messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
    }
    
    
    /**
     * Add a new weather2 call 
     * @param view The view to display the result of the addition
     * @param cities The list of cities to display in the page    
     * 
     **/
    protected def addCity(String view, List cities)
    {
        def listOfCallIds = null
        
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIds(SERVICE_NAME)

            if(params.city!=null)
            {
                def renderer= params.renderer
                if(renderer==null || renderer.equals(""))
                    render(view:view, model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",listOfDays:getListOfDays(),listOfCities:cities])
                else if(params.forecast==null || params.forecast.equals(""))    
                    render(view:view, model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The number of days for the forecast has to be defined!",listOfDays:getListOfDays(),listOfCities:cities])
                else
                {

                    def cityInfo= params.city.split(",")

                    //System.out.println("City info "+params.city+" "+cityInfo[0]+" "+cityInfo[1]+" "+cityInfo[2])
                    //String callId= WEATHER_PREFIX+cityInfo[0]+cityInfo[1]
                    def calls=personalizerService.getCallByIdAndService(SERVICE_NAME, renderer)

                    if(calls!=null)
                    {

                        def parametersWeather2= createCityParams(cityInfo[2], params.forecast)


                        boolean saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME, parametersWeather2) 

                        if(saved)
                        {
                            render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The city has been added!",listOfDays:getListOfDays()])
                            personalizerService.updateProviderFlag(calls.provider.name, SERVICE_NAME, true)
                        }
                        else
                            render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the city. Try again!",listOfDays:getListOfDays()])

                    }
                    else
                        render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities,listOfDays:getListOfDays(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:"The renderer does not exist!"])

                }

            }
            else
                render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities,listOfDays:getListOfDays()])
        }
        else if(!params.home)
            render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities,listOfDays:getListOfDays()])
        else 
            render(view:view, model:[listOfRenderers:listOfCallIds,listOfCities:cities,listOfDays:getListOfDays(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
    }
    
    
    /**
    * Add a new weather2 call by using a french city
    **/
    def addFrenchCity()
    {
        if(personalizerService.getIsInitialized())
            addCity("weather2AddFrenchCity",cityService.getCities(FRANCE))
        else
             addCity("weather2AddFrenchCity",null)

    }
    
    /**
    * Add a new weather2 call by using a capital
    **/
    def addCapital()
    {
        if(personalizerService.getIsInitialized())
            addCity("weather2AddCapital",cityService.getCapitals())
        else
            addCity("weather2AddCapital",null)

    }
    
    
    /**
    * Add a new weather2 call by using a random city
    **/
    def addRandom()
    {
        def listOfCallIds = null
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIds(SERVICE_NAME)

            if(params.city!=null)
            {
                def renderer= params.renderer
                if(renderer==null || renderer.equals(""))
                    render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",listOfDays:getListOfDays(),theCity:cityService.getRandomCity()])
                else if(params.forecast==null || params.forecast.equals(""))    
                    render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The number of days for the forecast has to be defined!",listOfDays:getListOfDays(),theCity:cityService.getRandomCity()])
                else
                {

                    def cityInfo= params.city.split(",")

                    if(cityInfo[0].equals("") || cityInfo[1].equals("") || cityInfo[2].equals(""))
                        render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:"The city has to be defined!"])
                    else
                    {
                        log.debug "City info "+params.city+" "+cityInfo[0]+" "+cityInfo[1]+" "+cityInfo[2]
                        //String callId= WEATHER_PREFIX+cityInfo[0]+cityInfo[1]
                        def calls=personalizerService.getCallByIdAndService(SERVICE_NAME, renderer)

                        if(calls!=null)
                        {

                            def parametersWeather2= new Hashtable()

                            def forecast= params.forecast

                            parametersWeather2.put(Constants.METHOD_PARAM,Constants.GET) 
                            parametersWeather2.put(Constants.PATH_PARAM,cityInfo[2])
                            parametersWeather2.put(Constants.FORECAST,forecast)


                            def saved= personalizerService.saveServiceCall(renderer,SERVICE_NAME, parametersWeather2) 

                            if(saved)
                            {
                                personalizerService.updateProviderFlag(calls.provider.name, SERVICE_NAME, true)
                                render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity(),messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The city has been added!",listOfDays:getListOfDays()])

                            }
                            else
                                render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem saving the city. Try again!",listOfDays:getListOfDays()])

                        }
                        else
                            render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity(),listOfDays:getListOfDays(),messageClass:Constants.ERROR_MESSAGE_CLASS, message:"The renderer does not exist!"])
                    }
                }

            }
            else
                render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity()])
        }
        
        else if(!params.home)
            render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false)])
        else
            render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false),messageClass:Constants.ERROR_MESSAGE_CLASS, message:Constants.DB_MESSAGE_ERROR])
    }
    
    /**
    * List the weather2 calls
    **/
    def listCities()
    {
        def listOfCallIds = null
        
        def cities= null
        
        if(personalizerService.getIsInitialized())
        {
            listOfCallIds = getListOfCallIdsComplete(SERVICE_NAME)

            def callId= params.renderer

            def calls= null

            if(callId.equals(Constants.ALL))
            {
                def list= listOfCallIds.subList(1,listOfCallIds.size())

                for(def p:list)
                {
                    calls= personalizerService.getCalls(SERVICE_NAME)

                    if(calls!=null)
                    {
                        log.debug "Calls size "+calls.size()
                        cities= getCities(calls)
                    }

                }

            }
            else
            {
                calls= personalizerService.getCallByIdAndService(SERVICE_NAME, callId)

                if(calls!=null)
                {
                    List listOftheCalls= new ArrayList()
                    listOftheCalls.add(calls)
                    cities= getCities(listOftheCalls)
                }

                else
                    cities= new ArrayList()
            }

            render(view:"weatherShowList", model:[listOfRenderers:listOfCallIds,listOfCities:cities,current:callId])
        }
        else
            render(view:"weatherShowList", model:[listOfRenderers:listOfCallIds,listOfCities:cities,messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
    }
    
    /**
    * Display the page to edit a weather2 call
    **/
    def edit()
    {
        def call= personalizerService.getCallByIdAndService(SERVICE_NAME, params.callId)
        
        def parameters= call.parameters.get(Integer.parseInt(params.position))
        
        def gps= parameters.get(Constants.PATH_PARAM).split("/")
                
        def currentCity= cityService.getCity(Double.parseDouble(gps[0]),Double.parseDouble(gps[1]))
        
        currentCity.renderer= params.callId
        
        currentCity.forecast= parameters.get(Constants.FORECAST)
               
        render(view:"weather2EditCity", model:[listOfRenderers:getListOfCallIds(SERVICE_NAME),listOfCities:cityService.getCities(),listOfDays:getListOfDays(), cityInfo:currentCity, current:params.current, position:params.position])
        
        
    }
    
    /**
    * Delete a weather2 call
    **/
    def remove()
    {
        log.debug "renderer "+params.renderer
        log.debug "call id "+params.callId
        log.debug "position "+params.position
        
        personalizerService.deleteCall(SERVICE_NAME, params.callId, Integer.parseInt(params.position))
        
        def call=personalizerService.getCallByIdAndService(SERVICE_NAME, params.callId)
        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)

        params.renderer= params.current
        listCities()
    }
    
    /**
    * Select a city randomly
    **/
    def selectRandomly()
    {
        def listOfCallIds = null
        if(personalizerService.getIsInitialized())
        {
            log.debug "Calling randomly!"
            listOfCallIds = getListOfCallIds(SERVICE_NAME)
            render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:cityService.getRandomCity()])
        }
        else
            render(view:"weather2AddRandomCity", model:[listOfRenderers:listOfCallIds,listOfDays:getListOfDays(),theCity:new City(name:"",country:"",longitude:0, latitude:0,capital:false),messageClass:Constants.ERROR_MESSAGE_CLASS,message:Constants.DB_MESSAGE_ERROR])
    }
    
    /**
     * Reload the list page by displaying the calls of the last selected renderer
     **/
    def back()
    {
        params.renderer= params.current
        
        listCities()
    }
    
    /**
     * Edit a weather2 call
     **/
    def editCity()
    {
        def listOfCallIds = getListOfCallIds(SERVICE_NAME)
        
        def cities= cityService.getCities()
        
        def cityInfo= params.city.split(",")
        
        def gps= cityInfo[2].split("/")
        
        def currentCity= cityService.getCity(Double.parseDouble(gps[0]),Double.parseDouble(gps[1]))
        
        currentCity.renderer= params.callId
        
        currentCity.forecast= params.forecast
        
        if(params.city!=null)
        {
            def newRenderer= params.renderer
            def previousRenderer= params.callId
            
            if(newRenderer==null || newRenderer.trim().equals(""))
                render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The renderer has to be defined!",listOfDays:getListOfDays(),listOfCities:cities, current:params.current, position:params.position, cityInfo:currentCity])
            else if(params.forecast==null || params.forecast.trim().equals(""))    
                render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,messageClass:Constants.ERROR_MESSAGE_CLASS,message:"The number of days for the forecast has to be defined!",listOfDays:getListOfDays(),listOfCities:cities,current:params.current, position:params.position, cityInfo:currentCity])
            else
            {
                def pos= Integer.parseInt(params.position)
                
                
                
                def map= createCityParams(cityInfo[2], params.forecast)
                
                if(newRenderer.equals(previousRenderer))
                {
                    def updated= personalizerService.updateServiceCall(previousRenderer, SERVICE_NAME, map, pos)
                    
                    if(updated)
                    {
                        def call=personalizerService.getCallByIdAndService(SERVICE_NAME, previousRenderer)
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        
                        render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,listOfCities:cities,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The city information has been updated!",listOfDays:getListOfDays(),current:params.current, position:params.position, cityInfo:currentCity])
                    }
                    else
                        render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,listOfCities:cities, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the city information. Try again!",listOfDays:getListOfDays(),current:params.current, position:params.position, cityInfo:currentCity])

                    
                }
                else
                {                                      
                    def saved= personalizerService.saveServiceCall(newRenderer,SERVICE_NAME, map) 
                
                    if(saved)
                    {
                        def call=personalizerService.getCallByIdAndService(SERVICE_NAME, previousRenderer)
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        personalizerService.deleteCall(SERVICE_NAME, previousRenderer, pos)
                        
                        call=personalizerService.getCallByIdAndService(SERVICE_NAME, newRenderer)
                        personalizerService.updateProviderFlag(call.provider.name, SERVICE_NAME, true)
                        currentCity.renderer= newRenderer
                        render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,listOfCities:cities,messageClass:Constants.RESPONSE_MESSAGE_CLASS, message:"The city information has been updated!",listOfDays:getListOfDays(),current:params.current, position:call.parameters.size()-1, cityInfo:currentCity])
                    }
                        
                    else
                        render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,listOfCities:cities, messageClass:Constants.ERROR_MESSAGE_CLASS, message:"There was a problem updating the city information. Try again!",listOfDays:getListOfDays(),current:params.current, position:params.position, cityInfo:currentCity])
                }
                
                
                
            }

        }
        else
            render(view:"weather2EditCity", model:[listOfRenderers:listOfCallIds,listOfCities:cities,listOfDays:getListOfDays(),current:params.current, position:params.position, cityInfo:currentCity])
    }
    
     /*---AUX METHODS---*/   
     
    /**
    * Retrieve the list of calls related to the specified renderers
    * @param calls The list of renderers
    * @return The list of calls
    **/
    protected def getCities(List calls)
    {
         
        def cities= new ArrayList() 
         
        for(ServiceCall call:calls)
        {
            
            def parameters= call.parameters
            
            
            for(Map p:parameters)
            {
                 if(p.get(Constants.PATH_PARAM)!=null)
                 {
                    String[] gps= p.get(Constants.PATH_PARAM).split("/")
                    log.debug "Lat/long "+gps[0]+" "+gps[1]
                    def theCity= cityService.getCity(Double.parseDouble(gps[0]),Double.parseDouble(gps[1]))
                    log.debug "The city "+theCity
                    
                     if(theCity!=null)
                     {
                        def cityCopy= new City(forecast:Integer.parseInt(p.get(Constants.FORECAST)),provider:call.provider.name,name:theCity.name,country:theCity.country,renderer:call.callId)  
                        cities.add(cityCopy)
                     }   
                } 
            }
            
              
        }
        
        log.debug "Size "+cities.size()
        
        return cities
        
    }
    
    /*protected def getListOfProviders()
    {
        //def listOfProviders = [ALL, "zone1", "zone2"]
        def providers= getListOfProvidersComplete()
        
        return providers.subList(1,providers.size())
    }
    
    protected def getListOfProvidersComplete()
    {
        return personalizerService.getListOfProviderNames()
    }*/
    
    
    /**
    * 
    * Returns the list of days supported for weather2
    **/
    protected def getListOfDays()
    {
        def days= new ArrayList()
        days.add("2")
        days.add("7")
        return days
    }
    
    
    /**
    *
    * Create a map with the parameters of a weather2 call
    * @param coordinates lat/longitude
    * @param forecast The number of the days for the forecast
    * @return The map of paramaters
    **/
    protected def createCityParams(def coordinates, def forecast)
    {
        def parametersWeather2= new Hashtable()
                   
        parametersWeather2.put(Constants.METHOD_PARAM,Constants.GET) 
        parametersWeather2.put(Constants.PATH_PARAM,coordinates)
        parametersWeather2.put(Constants.FORECAST,forecast)
        
        return parametersWeather2
    }
   
}
