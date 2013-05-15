package fr.unice.yourcast.personalizer


import fr.unice.yourcast.util.Constants

/**
* Abstract controller containing functionality used by several controllerS
* @author Daniel Romero
*/
class  AbstractController {
    
    /*---ATRIBUTES---*/
    /**
     * The service to access the database 
     **/
    def personalizerService
    
    /*---METHODS---*/
    
    /**
     * Return the renderes related to the specified service/source
     * @param service The source information
     * @return The list of renderers
     **/
    def getListOfCallIdsComplete(String service)
    {
        List ids= personalizerService.getCallIds(service)
        ids.add(0,Constants.ALL)
        
        return ids
    }
    
    /**
     * Return the ids of renderes related to the specified service/source
     * @param service The source information
     * @return The list of renderer ids
     **/
    def getListOfCallIds(String service)
    {
        return personalizerService.getCallIds(service)
    }
    
    /*---AUX METHODS---*/
    /**
     * Indicate if a url is valid
     * @param url The url
     * @return true if the url is valid, false on the contrary 
     **/
    protected def isValidUrl(String url)
    {
         URL theURL= new URL(url)
         
         try{
           
            theURL.toURI()
            return true
         }
         catch(Exception e)
         {
             return false
         }
        
    }
    
}
