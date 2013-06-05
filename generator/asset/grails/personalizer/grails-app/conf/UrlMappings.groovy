class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
                
                "/"(controller: 'Main', action: 'index')
        
                "/calls/$provname/$servname" (controller: 'Main', action: 'getCalls')
        
        
                "/params/$servname" (controller: 'Main', action: 'getParamService')
        
                "/flags/update/$provname/$servname/$value" (controller: 'Main', action: 'updateProviderFlags')
        
                "/flags/$provname/$servname" (controller: 'Main', action: 'getProviderFlags')
                
 		"/rateLimit/$servname" (controller: 'Main', action: 'getServiceRateLimit')
 		
 		"/callCount/$provname/$servname" (controller: 'Main', action: 'getServiceCallCount')
 		
 		"/callCount/update/$provname/$servname/$value" (controller: 'Main', action: 'updateServiceCallCount')
	}
}
