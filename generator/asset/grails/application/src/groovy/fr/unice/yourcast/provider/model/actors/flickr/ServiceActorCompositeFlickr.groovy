/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.provider.model.actors.flickr

import net.sf.json.*;
import fr.unice.yourcast.provider.model.actors.ServiceActorComposite;
import java.awt.geom.Point2D;
import java.util.Date;
import java.text.SimpleDateFormat;
import fr.unice.i3s.modalis.yourcast.sources.picturealbum.sharing.*;
import fr.unice.i3s.modalis.yourcast.sources.utils.json.JSONDateValueProcessor;

/**
 *
 * @author urli
 */
class ServiceActorCompositeFlickr extends ServiceActorComposite {

    // Size code of FlickR API from bigger to smaller pictures
    // According to the API : http://www.flickr.com/services/api/misc.urls.html
    // Careful: For now (08/05/12) the documentation contains some mistakes
    private final static List SIZE_ORDER = ['o','l','c','z','m','n','s','t','q','sq']
    ServiceActorCompositeFlickr(String providerName, String serviceName) {
        super(providerName,serviceName);
    }
    
    protected JSON transformResponse(JSON result) {
        JSONObject root = result.getJSONObject("photos");
        JSONArray photos = root.getJSONArray("photo");
        
        SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        
        List pictures = [];
        for (int i = 0; i < photos.size(); i++) {
            JSONObject pic = photos.get(i);
            String name = pic.getString("title");
            JSONObject descjson = pic.getJSONObject("description");
            String desc = descjson.getString("_content");
            Date date = null;
            if (pic.has("datetaken"))
                date = dateformat.parse(pic.getString("datetaken"));
            int height = 0;
            int width = 0;
            String url = null;
            List thumbs = [];
            for (size in SIZE_ORDER) {
                if (pic.has("url_"+size)) {
                    if (url == null) {
                        url = pic.getString("url_"+size);
                        height = pic.getInt("height_"+size);
                        width = pic.getInt("width_"+size);
                    } else {
                        PictureThumbnail th = new PictureThumbnail(
                                                    pic.getString("url_"+size),
                                                    pic.getInt("width_"+size),
                                                    pic.getInt("height_"+size)
                                                    );
                        thumbs.add(th);
                    }
                }
            }
            double longitude = pic.getDouble("longitude");
            double latitude = pic.getDouble("latitude");
            Point2D localisation = new Point2D.Double(latitude,longitude);
            long size = 0;
            pictures.add(new Picture(name,desc,url,date,localisation,size,height,width,thumbs));
        }
        PictureAlbum album = new PictureAlbum("",pictures,new Date());
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Picture.class, "date", new JSONDateValueProcessor());
        jsonConfig.registerJsonValueProcessor(PictureAlbum.class, "date", new JSONDateValueProcessor());
        return JSONSerializer.toJSON(album,jsonConfig);
    }
    
}

