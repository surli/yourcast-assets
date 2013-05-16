 /*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.provider.util

import net.sf.ehcache.Cache
import net.sf.ehcache.CacheManager
import net.sf.ehcache.Element

/**
 *
 * @author Daniel Romero
 */
class CacheManagerYourCast 
{
    
    
    //The quantity of elements to hold in memory
    private static int DEFAULT_MAX_ELEMENENTS_MEMORY= 10

    //The default amount of time to live for an element from its creation date
    private static int DEFAULT_TIME_TO_LIVE_SECONDS= 300

    //the default amount of time to live for an element from its last accessed or modified date
    private int DEFAULT_TIME_TO_LIVE_IDLE_SECONDS= 120
    
    private static CacheManagerYourCast manager= null; 
    
    //The manager of the caches
    private static CacheManager cacheManager = CacheManager.create()
    
    
    private CacheManagerYourCast()
    {
        //TODO LOAD ALL THE INFO FROM THE DATABASE
    }
    
    
    static CacheManagerYourCast getCacheManager()
    {
        synchronized(this)
        {
            if(!this.manager)
                this.manager= new CacheManagerYourCast()
        }
        return this.manager; 
            
    }
    
    
    Cache createCache(String cacheId)
    {
        log.debug "creating cache of the service "+cacheId
        
        Cache cache= new Cache(cacheId, DEFAULT_MAX_ELEMENENTS_MEMORY, false, false, DEFAULT_TIME_TO_LIVE_SECONDS, DEFAULT_TIME_TO_LIVE_IDLE_SECONDS)
        
        this.cacheManager.addCache(cache)
        
        log.debug "cache of the service "+cacheId+" created"
        
        return cache
    }
	
}

