package fr.unice.yourcast.sources.weather2


/**
* Contains the info related to a city
* @author Daniel Romero
*/
class City {
    
    /*---ATRIBUTES---*/  
    /**
    * The city name
    **/ 
    String name
    
    /**
    * The country name
    **/ 
    String country
    
    /**
    * The longitude of the city
    **/ 
    double longitude
    
    /**
    * The latitude of the city
    **/ 
    double latitude
    
    /**
    * Indicate if the city is a capital
    **/ 
    boolean capital
    
    /**
    * The number of days for the predictions
    **/ 
    int forecast
    
    /**
    * The provider or zone
    **/ 
    String provider
    
    /**
    * The renderer id
    **/ 
    String renderer
    
    static mapWith="mongo"
    
    static constraints = {
    }
}
