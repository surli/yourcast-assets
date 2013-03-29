package fr.unice.yourcast.provider.model.actors

import groovyx.gpars.dataflow.Promise

/**
* The response of a source containing the promise and the call Id
* @author Daniel Romero
*/
class ServiceResponse
{

    /*---ATTRIBUTES---*/
    //The call id
    private String callId

    // The response from the source
    private Promise response


    /*---CONSTRUCTORS---*/
    /**
    * Contructor with parameters
    * @param callId the call id
    * @param response The response from the source
    */
    ServiceResponse(String callId, Promise response)
    {
        this.callId= callId
        this.response= response
    }

   /*---GETTERS AND SETTERS METHODS---*/

    /**
    * Returns the call id
    *
    * @return The call id
    */
    public String getCallId()
    {
        return this.callId
    }

    /**
    * Returns the response
    *
    * @return The response
    */
    public Promise getResponse()
    {
        return this.response
    }

}
