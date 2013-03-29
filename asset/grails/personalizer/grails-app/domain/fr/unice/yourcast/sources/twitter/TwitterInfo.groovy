package fr.unice.yourcast.sources.twitter


/**
* Contains the info related to a twitter call
* @author Daniel Romero
*/
class TwitterInfo {
    /*---ATRIBUTES---*/ 
    
    /**
    * The twitter user/search
    **/ 
    String userSearch
    
    /**
    * The max number of tweets
    **/ 
    int max
    
    /**
    * The criteria sort
    **/ 
    String sort
    
    /**
    * The providero or zone
    **/ 
    String provider
    
    /**
    * The renderer id
    **/ 
    String identifier
    
    
    /**
    * The source
    **/ 
    String source

    static constraints = {
    }
}
