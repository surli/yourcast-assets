package fr.unice.yourcast.provider.model.actors

import groovyx.gpars.actor.DefaultActor

import net.sf.json.*
import groovyx.net.http.RESTClient
import groovyx.net.http.HttpResponseException
import groovyx.net.http.HttpResponseDecorator
import org.apache.http.Header
import org.apache.http.util.EntityUtils

/**
 *  Simple actor that contains the logic to make a call on a source
* @author Daniel Romero
*/
class ServiceActor extends DefaultActor {

    /*---ATTRIBUTES---*/

    private JSON result

    //The REST client to execute the call
    private RESTClient client

    //The arguments to make the call
    private Map args
    
    private Map params

    //The id of the call
    private String callId
    
    private String method;

    /*---CONSTRUCTORS---*/
    /**
    * Constructor with parameters. The source is called using the URI url+"/"+path
    * @param callId The id of the call
    * @param url The url base to execute the call
    * @param path The path of to the source
    */
    ServiceActor(callId, args, params)
    {
        this.client = new RESTClient()
       
        this.args = args.clone()
        this.callId = callId
        updateParams(params)
        /*this.params = params

        if (this.params == [:])
            this.method = 'get';

        else {
            if (this.params['path'] != null)
                this.args['path'] += this.params['path'];
            if (this.params['query'] != null)
                this.args['query'] += this.params['query'];

            this.method = this.params['method'];

            if (this.method == 'post') {
                if (this.params['body'] != null)
                this.args['body'] = this.params['body'];
                this.args['requestContentType'] = 'application/json';
            }

        }*/
        //System.out.println("Actor avec args : "+args+"\nParams:"+params+"\n"+callId);
    }
    
    public def updateParams(params)
    {
        this.params = params
        if (this.params == [:])
            this.method = 'get';

        else 
        {
            if (this.params['path'] != null)
                this.args['path'] += this.params['path']
            if (this.params['query'] != null)
                this.args['query'] += this.params['query']

            this.method = this.params['method']

            if (this.method == 'post') 
            {
                if (this.params['body'] != null)
                this.args['body'] = this.params['body']
                this.args['requestContentType'] = 'application/json'
            }

        }
    }

    /*---BUSINESS METHODS---*/

    /**
     * Method act of the actuator
     */
    void act()
    {
        //Once started, the actor is always running waiting for messages
        loop
        {
            //Once a message if received, the body of react is executed
            react()
            {
                //The waited message
                msg->
                //The body is only executed if the message received is a CALL_SERVICE message
                if(msg== ServiceActorComposite.CALL_SERVICE)
                {   log.debug "ServiceActor- Executing the call with id "+callId
                    try {
                        def response = null
                        this.result = null 
                        if (this.method == 'post')
                            response = this.client.post(this.args)
                        else
                            response = this.client.get(this.args)
                        
                        
                        //JSON object with th response of the source
                        this.result = response.getData()
                    } catch(HttpResponseException e) {
                        log.debug e.getMessage()
                        log.debug "Error : "+e.getMessage()
                        HttpResponseDecorator response = e.getResponse()
                        log.debug "HTTPResponseException :"
                        log.debug "Args : "+this.args
                        log.debug "Params : "+this.params
                        log.debug "Status : "+response.getStatus()
                        for (Header h : response.getHeaders())
                            log.debug "Header "+h.getName()+" : "+h.getValue()
                        //String content = EntityUtils.toString(response.getEntity());
                        //System.out.println("Content : "+content);
			log.error "The source to execute the "+callId+" call is not available"
                        
                        
                    } catch(Exception e) {
                        e.printStackTrace();
                        //this.result = new JSONObject()
                        
                        log.error "The source to execute the "+callId+" call is not available"
                    }

                    //Reply to the msg sender
                    reply this.result
                     
                }
                
            } 
        }

    }

   /*---GETTERS AND SETTERS METHODS---*/

    /**
    * Returns the last retrieved information
    *
    * @return The last retrieved information
    */
    public JSON getResult()
    {
        return this.result
    }

    /**
    * Returns the call id
    *
    * @return The call id
    */
    public String getCallId()
    {
        return callId
    }
}
