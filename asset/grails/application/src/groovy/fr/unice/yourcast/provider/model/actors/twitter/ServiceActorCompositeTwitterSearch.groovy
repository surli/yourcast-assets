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
class ServiceActorCompositeTwitterSearch extends ServiceActorComposite {
	
    ServiceActorCompositeTwitterSearch(String providerName, String serviceName) {
        super(providerName,serviceName);
    }
    
    protected JSON transformResponse(JSON result) {
        ArrayList<Tweet> listT = new ArrayList<Tweet>();
        JSONObject root = (JSONObject)result;
        String query = root.getString("query");
        Tweet t;
        User u;
        SimpleDateFormat dateformat = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss Z",Locale.US);
        for (JSONObject element : root.getJSONArray("results")) {
            long idu = element.getLong("from_user_id");
            String name = element.getString("from_user");
            String screen_name = element.getString("from_user_name");
            String profile_image_url = element.getString("profile_image_url");
            u = new User(idu,name,screen_name,profile_image_url);
            
            Date created_at = dateformat.parse(element.getString("created_at"));
            long idt = element.getLong("id");
            String text = element.getString("text");
            listT.add(new Tweet(created_at,idt,u,text));
        }
        TweetList tl = new TweetList("Recherche sur "+query, listT);
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Tweet.class, "created_at", new JSONDateValueProcessor());
        return JSONSerializer.toJSON(tl,jsonConfig);
    }
}

