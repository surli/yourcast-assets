package fr.unice.yourcast.sources


/**
* Contains the info related to a information source
* @author Daniel Romero
*/
class ServiceInfo {
    /*---ATRIBUTES---*/ 
    
    /**
    * The source name/id
    **/ 
    String name
    
    /**
    * The map of arguments expected by a call of the source
    **/ 
    Map<String,Object> args

   	RateLimit rateLimit
    
    static mapWith="mongo"

    static constraints = {
        
        /*'*'(nullable: false)*/
        
        name(blank: false)
    }
}
