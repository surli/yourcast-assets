/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.util

import groovyx.net.http.RESTClient
import groovyx.net.http.HttpResponseException
import groovyx.net.http.HttpResponseDecorator
/**
 *
 * @author danielromero
 */
class RESTServiceClient {
    
    
    public static String GEO_LOCATION_SERVICE="http://api.hostip.info/get_json.php"
    
    public static String REQUEST_CONTENT_TYPE_PARAM="requestContentType"
    
    public static String QUERY_PARAM="query"
    
    public static String CONTENT_TYPE_JSON= "application/json"
    
    public static def invokeGet(String uri, Map params)
    {
        
        def client = new RESTClient(uri)
        
        def result = client.get(query:params)
       
        return result.getData()
    }
	
}

