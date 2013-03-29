package fr.unice.yourcast.service.cities

import fr.unice.yourcast.sources.weather2.City


import net.sf.ehcache.Cache
import net.sf.ehcache.CacheManager
import net.sf.ehcache.Element
import fr.unice.yourcast.util.CacheManagerYourCast

/**
* The service to deal with the cities
* @author Daniel Romero
*/
class CityService 
{
    /*---CONSTANTS---*/     
    private static final String CITIES_CACHE="citiesCache"
    
    private static final String CITIES="cities"
    
    private static final String CAPITALS="capitals"
    
    private static Cache citiesCache= CacheManagerYourCast.getCacheManager().createCache(CITIES_CACHE)
    
   
    /*---METHODS---*/     
    
    /**
    * Retrieve the completed list of cities 
    * @return the list of cities 
    **/
    def getCities()
    {
        def result = City.findAll()
        
        return result
    }
    
    /**
    * Retrieve the  list of cities related to the specified country
    * @param country The country name 
    * @return the list of cities
    **/
    def getCities(String country)
    {
        def result= null
        if(this.citiesCache.get(country))
        {
            result= this.citiesCache.get(country).getObjectValue() 
        }
        else
        {
        
            result= City.findAllByCountry(country)
            
            citiesCache.put(new Element(country,result))
            
        } 
        
        return result 
    }

    /**
    * Retrieve the  list of capitals
    * @return the list of cities
    **/    
    def getCapitals()
    {
        def result= null
        if(this.citiesCache.get(CAPITALS))
        {
            result= this.citiesCache.get(CAPITALS).getObjectValue() 
        }
        else
        {
        
            result= City.findAllByCapital(true)
            
            citiesCache.put(new Element(CAPITALS,result))
            
        } 
        
        return result
    }

    /**
    * Retrieve the  city with the specified name and country
    * @param name The city name
    * @param country The country name 
    * @return the city
    **/    
    def getCity(String name, String country)
    {
        return City.findByNameAndCountry(name, country)
    }
    
    /**
    * Retrieve the city related to the specified coordinates
    * @param latitude The city latitude
    * @param longitude The city longitude
    * @return the city
    **/
    def getCity(double latitude, double longitude)
    {
        return City.findByLatitudeAndLongitude(latitude,longitude)
    }

    /**
    * Retrieve a random city 
    * @return the city
    **/    
    def getRandomCity()
    {
        def noc= City.count()
        
        log.debug "The number of cities "+noc
        
        Random numberGenerator= new Random()
        
        def id= numberGenerator.nextInt(noc)+1
        
        log.debug "The id "+id
        
        def city= City.get(id)
        
        log.debug "The city "+city
        
        return city
    }     
    
    private static String CITIES_FILE="."+File.separator+"web-app"+File.separator+"extras"+File.separator+"cities.txt"
       
    private static String CITIES_FILE_ALT=File.separator+"extras"+File.separator+"cities.txt"
    
    
    /**
    * Initialize the database with the cities described in a .txt file
    **/
    def init()
    {
        BufferedReader bf= null
        
        File file= new File(CITIES_FILE)
        
        if(file.exists())
        {
            bf= new BufferedReader(new FileReader(CITIES_FILE))
        }
        else
        {
            bf= new BufferedReader(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(CITIES_FILE_ALT)))
        }
        
        
        String line= bf.readLine()
        
        while(line!=null)
        {
            log.debug "Creating... "+line
            String[] cityInfo= line.split(",")
            log.debug "Creating... "+cityInfo.length
            if(cityInfo.length==8)
            {
                def city= new City(name:cityInfo[2],country:cityInfo[0],capital:Boolean.valueOf(cityInfo[7]),latitude:Double.parseDouble(cityInfo[5]),longitude:Double.parseDouble(cityInfo[6]), forecast:2,provider:"",renderer:"")
                
                log.debug "Result "+city.save()
            }
                
            
            line= bf.readLine()
        }
        
        bf.close()
    }
    
    
    def saveCity(String name, String country, boolean capital, double lat, double lng )
    {
        def city= new City(name:name,country:country,capital:capital,latitude:lat,longitude:lng, forecast:2,provider:"")
        
        city.save()
                
    }
    
}
