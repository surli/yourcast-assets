/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.provider.model.actors

import net.sf.ehcache.Cache
import net.sf.ehcache.CacheManager
import net.sf.ehcache.Element
import net.sf.json.*
import groovyx.gpars.actor.DefaultActor
import groovyx.gpars.group.DefaultPGroup
import groovyx.gpars.dataflow.Promise
import fr.unice.yourcast.provider.model.personalization.Personalizer
import fr.unice.yourcast.provider.util.CacheManagerYourCast

/**
 * Main actor related to a source. It Contains the logic to execute different calls on the same source
 * according to the infor provided by the Persolizer service
 * @author urli
 * @author Daniel Romero
 */
class ServiceActorComposite extends DefaultActor 
{
    
    /*---CONSTANTS---*/
    //The default URL to make the calls
    public static String DEFAULT_URL="http://localhost:8080/"

    //Message that indicates that it is necessary to execute the calls
    public static int EXECUTE_CALLS=0;

    //Message that indicates that it is necessary yo execute the call
    public static int CALL_SERVICE=1;

    /*---ATTRIBUTES---*/
    
    private String providerName;
    
    //The name of the service
    private String serviceName=""


    //The list the actors related to calls of the source. For each call there is an actor
    protected List actors= null;

    //Group of actors related to this service and sharing 10 threads
    private DefaultPGroup actorsGroup = new DefaultPGroup(10)

    
    private Map args

    private JSONObject theResults
    
    private Personalizer personalizer
    
    private Cache cache
    
    
    


    /*---CONSTRUCTORS---*/

    /**
     * Constructor with parameters
     * @param serviceName The name of the source
     */
    ServiceActorComposite(String providerName, String serviceName)
    {
        this.providerName = providerName
        this.serviceName = serviceName
        this.personalizer = new Personalizer()
        this.initializeCache()
        
        //createActors()
    }

    /*---AUXILIAR METHODS---*/

    /**
     * Creates the actors of the different calls. The calls related to the source are provided
     * by the Persolizer service. 
     */
    protected void createActors()
    {
        
        
        
        if (this.args == null)
            this.args = personalizer.getParamService(serviceName)
        
        if(this.args!=null)
        {
            this.actors = []
            log.debug "Args composite "+this.args
            //Maps with the calls 
            def mapcalls = personalizer.getCalls(providerName, serviceName)

            //Creation of an actor for each call specified by the personalizer
            for (callid in mapcalls.keySet())
            {
                def params = mapcalls[callid]

                if (params.equals(JSONNull.getInstance()))
                {
                    createActor(callid, this.args, [:])
                }
                else
                {
                    for(Map map:params)
                    {
                         createActor(callid, this.args, map)
                    }
                }

                /*if (params.equals(JSONNull.getInstance()))
                    params = [:]
                ServiceActor actor = new ServiceActor(callid, this.args, params)
                actor.parallelGroup = actorsGroup
                this.actors.add(actor)*/
            }
        }   
        
        cache.removeAll()
    }
    
    
    protected void createActor(def callId, def args, def params)
    {
        ServiceActor actor = new ServiceActor(callId, args, params)
        actor.parallelGroup = actorsGroup
        this.actors.add(actor)
    }
    
    /**
     * Retrieve the callIds in order to consider the changes make in the personalizer
     *
     **/
    protected void updateActors()
    {
        log.debug "Update actors..."
        if(personalizer.hasProviderChanged(providerName, serviceName))
        {
            log.debug "Stopping actors..."
            personalizer.updateProviderFlag(providerName, serviceName, false)
            for(ServiceActor actor:this.actors)
            {
                actor.terminate()
            }
            actors.clear()
            createActors() 
        }
        
        
    }
    
    
    protected void initializeCache()
    {
        log.debug "Creating the cache..."
        cache= CacheManagerYourCast.getCacheManager().createCache(this.serviceName)
        //cache= new Cache(this.serviceName, maxElementsMemory, false, false, timeToLiveSeconds, timeToIdleSeconds)
        //cacheManager.addCache(cache)
        log.debug "Cache created..."
    }


    /*---BUSINESS METHODS---*/

    /**
     * Method act of the actuator
     */
    void act()
    {
        //Once started, the actor is always running waiting for messages
        loop()
        {
            //Once a message if received, the body of react is executed
            react()
            {
               //The waited message
               msg->
               //The body is only executed if the message received is a EXECUTE_CALLS message
               if(msg==EXECUTE_CALLS)
               {
                   
                    //Create the actors
                    if(!actors)
                    {
                        createActors()
                        //personalizer.updateProviderFlag(providerName, serviceName, false)
                    }    
                    else
                        updateActors()
                   
                    log.debug "ServiceActorComposite- Actors of the "+serviceName+" source "+actors
                    
                   if(actors!=null) //Check if the actors have been initilized. Required if the Personalizer is not available
                   { 
                        //The list of responses from the calls
                        List responses= []

                        //Execution of each actor/call
                        executeCalls(responses)

                        //The result of the different calls
                        JSONObject finalResult = new JSONObject()


                        //Waits for every actor finish its work before replying the answer
                        for(response in responses)
                        {
                             JSON jsonResponse = transformResponse(response.getResponse().get())

                             def calls= finalResult.get(response.getCallId())

                             if(calls==null)
                             {
                                 calls= new ArrayList()

                                 //finalResult.put(response.getCallId(), jsonResponse)
                             } 

                             if(jsonResponse==null)
                             {
                                 jsonResponse = new JSONObject()

                                 jsonResponse.put("ERROR", "The execution call with ID "+response.getCallId()+" does not retrieve any information. It is possible that the "+serviceName+" source is not available.")
                             }

                             calls.add(jsonResponse)
                             finalResult.put(response.getCallId(), calls)
                        }

                        //Reply with to the sender with the result of the different calls
                        this.reply finalResult
                   }
                   else
                   {
                       JSONObject errorObject = new JSONObject()
                       
                       errorObject.put("ERROR","The actors are not initilized. The calls for the "+serviceName+" source were not executed.")  
                       
                        
                       log.error "The actors for the "+serviceName+" source are not initialized. It is not possible to execute the calls" 
                       
                        
                       this.reply errorObject
                   }
   
               }   
            }   
        }
    }


    /**
     *Executes the different calls by sending the CALL_SERVICE message to the different actuators
     *
     */
    protected void executeCalls(List responses)
    {
        log.debug "Executing calls..."
       //Execution of each actor/call
       for(actor in this.actors)
       {
           //If the actor is not actived, it is activated
           if(!actor.isActive())
                actor.start()
           
            Promise result= null
           
           log.debug "If cache" 
           if(this.cache.get(actor.toString()))
           {
               log.debug "using the cache..."
               result= this.cache.get(actor.toString()).getObjectValue() 
           }
           else
           {
                //The actor calls the source
                log.debug "calling the service..."
                result= actor.sendAndPromise(CALL_SERVICE)
                cache.put(new Element(actor.toString(), result))
           }
            

            //The response from the actor with the callId and the promise
            ServiceResponse response= new ServiceResponse(actor.getCallId(), result)
            responses.add(response)
       }
    }
    
    /**
     * to ease the inheritance
     */
    protected JSON transformResponse(JSON result) {
        return result;
    }
    
    /*---GETTERS AND SETTERS METHODS---*/

    /**
    * Returns the name of source
    *
    * @return The name of the source
    */
    public String getServiceName() {
        return this.serviceName
    }

}

