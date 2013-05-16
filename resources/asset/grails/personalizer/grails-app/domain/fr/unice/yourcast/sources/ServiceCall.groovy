package fr.unice.yourcast.sources

/**
* Contains the info related to a renderer
* @author Daniel Romero
*/
class ServiceCall {
    /*---ATRIBUTES---*/   
    
    /**
    * The renderer id
    **/ 
    String callId

    /**
    * The related source
    **/     
    ServiceInfo source

    /**
    * The related zone or provider
    **/ 
    ProviderInfo provider

    /**
    * The list of calls. Each item in the list is a map
    **/     
    List parameters

    static mapWith="mongo"
    
    static constraints = {
        
        /*'*'(nullable: false)*/
        callId(blank: false)
    }
}
