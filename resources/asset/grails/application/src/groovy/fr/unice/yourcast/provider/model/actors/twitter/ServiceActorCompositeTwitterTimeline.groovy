/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.unice.yourcast.provider.model.actors.twitter

import fr.unice.yourcast.provider.model.actors.ServiceActorComposite;
import net.sf.json.*;
import fr.unice.i3s.modalis.yourcast.sources.twitter.sharing.*;
import java.util.Date;
import java.util.Locale;
import java.text.SimpleDateFormat;
import fr.unice.i3s.modalis.yourcast.sources.utils.json.JSONDateValueProcessor;

/**
 *
 * @author urli
 */
class ServiceActorCompositeTwitterTimeline extends ServiceActorComposite {

    ServiceActorCompositeTwitterTimeline(String providerName, String serviceName) {
        super(providerName,serviceName);
    }
    
    protected JSON transformResponse(JSON result) {
        ArrayList<Tweet> listT = new ArrayList<Tweet>();
        JSONArray root = (JSONArray)result;
        Tweet t;
        User u;
        SimpleDateFormat dateformat = new SimpleDateFormat("EEE MMM d HH:mm:ss Z yyyy",Locale.US);
        for (JSONObject element : root) {
            JSONObject user = element.getJSONObject("user");
            long idu = user.getLong("id");
            String name = user.getString("name");
            String screen_name = user.getString("screen_name");
            String profile_image_url = user.getString("profile_image_url");
            u = new User(idu,name,screen_name,profile_image_url);
            
            Date created_at = dateformat.parse(element.getString("created_at"));
            long idt = element.getLong("id");
            String text = element.getString("text");
            listT.add(new Tweet(created_at,idt,u,text));
        }
        TweetList tl = new TweetList("Timeline de "+u.getName(), listT);
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Tweet.class, "created_at", new JSONDateValueProcessor());
        return JSONSerializer.toJSON(tl,jsonConfig);
    }
}

