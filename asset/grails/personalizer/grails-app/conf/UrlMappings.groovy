class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
                /*"/Picasa/list"{
                    controller="Picasa"
                    action="listAlbums"
                }*/
                
                "/"(controller: 'Main', action: 'index')
        
                "/calls/$provname/$servname" (controller: 'Main', action: 'getCalls')
        
        
                "/params/$servname" (controller: 'Main', action: 'getParamService')
        
                "/flags/update/$provname/$servname/$value" (controller: 'Main', action: 'updateProviderFlags')
        
                "/flags/$provname/$servname" (controller: 'Main', action: 'getProviderFlags')
                
                /*"/"(controller: 'Picasa', action: 'List')*/

                /*"/personalizer/"(controller: "product") {
                action = [GET: "show", PUT: "update", DELETE: "delete", POST: "save"]
                }*/
	}
}
