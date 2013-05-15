package fr.unice.yourcast.sources

/**
* Contains the info related to a provider
* @author Daniel Romero
*/
class ProviderInfo {

    /*---ATRIBUTES---*/   
    
    /**
    * The name/id of the provider
    **/ 
    String name
    
    static mapWith="mongo"

    static constraints = {
        
        /*'*'(nullable: false)*/
        name(blank: false)
    }
}
