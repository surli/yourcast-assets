/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.personalizer.client

/**
 *
 * @author danielromero
 */
class AlbumInfo {
        
    String path
    
    String provider
    
    String renderer
    
    public AlbumInfo(String path, String provider)
    {
        this.path= path
        this.provider= provider
        this.renderer= null
    }
    
    public AlbumInfo(String path, String provider, String renderer)
    {
        this.path= path
        this.provider= provider
        this.renderer= renderer
    }
    	
}

