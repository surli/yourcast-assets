1. To use the Personalizer put the war file into the webapps folder in Tomcat.
2. Initilize the DB by using the following links: 

http://localhost:8080/fr.unice.i3s.modalis.yourcast.personalizer/Main/init

http://localhost:8080/fr.unice.i3s.modalis.yourcast.personalizer/Main/initCities

Mongo DB has to run on the port 27017

The former creates the sources and providers. The latter creates the cities used for the weather.
To initiliaze the cities the files extras/cities.txt has to be in the WEB-INF/classes/extras in the application folder in Tomcat 

3. Access the Personalizer service. Use the link 

http://localhost:8080/fr.unice.i3s.modalis.yourcast.personalizer/

4. To detect the local city in the Weather2 tab, an Internet connection is required. If the city is not recognized, you need to add it in the http://www.hostip.info/index.html page. 

  