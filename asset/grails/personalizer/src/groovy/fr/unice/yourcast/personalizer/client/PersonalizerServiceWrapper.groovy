/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.personalizer.client

import groovyx.net.http.RESTClient

import java.util.HashMap

import net.sf.json.*


/**
 *
 * @author danielromero
 */
class PersonalizerServiceWrapper 
{
    
    private static final String URL = "http://localhost:8080/fr.unice.i3s.modalis.yourcast.personalizer/"
        
    private static final String PATH_PARAMS = "params/"

    private static final String PATH_CALLS = "calls/"

    private RESTClient client

    //Singleton
    private static PersonalizerServiceWrapper personalizer= null



    private PersonalizerServiceWrapper() 
    {
        this.client = new RESTClient(URL)            
    }
    
    public static PersonalizerServiceWrapper getPersonalizer()
    {
        if(personalizer==null)
            personalizer= new PersonalizerServiceWrapper()
        
        return personalizer 
    }

    Map getCalls(providerName, name) 
    {
        def result= [:]


        System.out.println("Calling the personalizer service for retrieving calls!")
        Map params = ['path':PATH_CALLS+providerName+"/"+name]
        def response = this.client.get(params)
        System.out.println("The response call data "+response.getData())
        if (response.getData()!=null && !response.getData().equals(JSONNull.getInstance()))
        {
            result= new HashMap(response.getData())
        }
        
         return result
    }
    
    Map getCallsProviders(providerList, name) 
    {
        
        Map result= new Hashtable()
        
        for(String p:providerList)
        {
            result.putAll(getCalls(p,name))
        }
        
        return result
    }


       
}
        
        

	


