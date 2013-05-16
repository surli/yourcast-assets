package fr.unice.yourcast.icalreader

/**
* Contains the info related to a icalreader call
* @author Daniel Romero
*/
class Calendar {
    /*---ATRIBUTES---*/
    
   /**
    * The renderer id
    **/
    String renderer
    
    /**
    * The calendar url
    **/
    String url
    
    /**
    * The zone or provider
    **/
    String provider

    /**
    * The beginning date to display the calendar
    **/    
    Date start

    /**
    * The end date to display the calendar
    **/     
    Date theEnd
    
    /**
    * The number of hours to display the calendar
    **/ 
    int hours

    static constraints = {
    }
}
