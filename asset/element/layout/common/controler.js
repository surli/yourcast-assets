/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/

var Zone = Class.create();
Zone.prototype = {		
	/* 
	* Constructor to an object Zone. It takes :
	* - An id: must be coherent with the HTML (if the given id is 'foo' the html must contain an element with the id 'foo': <div id='foo'>)
	* - A map given the binding between informations and renderers functions to use (e.g: { 'myJsonKey': my_renderer_to_use })
	* - The URL of the service given json informations 
	* - A pointer on a behaviour function
	*/
		
	initialize: function(id, map_renderers, map_time, url, anim_func, request_timeout) {
		
		// put a default value if the request timeout is not defined
		request_timeout = typeof request_timeout !== 'undefined' ? request_timeout : DEFAULT_REQUEST_TIMEOUT;
		
		this.id = id;
		this.map_renderers = map_renderers;
		this.map_time = map_time;
		
		// we can't do cross-site request, so we don't give complete URL, just the path
		this.url = DOMAIN_PATH+url;
		this.anim_func = anim_func;
		
		// to put datas in document
		this.divMarquee = document.getElementById(id);
		this.htmlinit = this.divMarquee.innerHTML;
		
		// used by the behaviour
		this.indiceEltAnim = 0;
		this.indiceNext = 0;
		
		this.timeout = null;
		
		this.request_timeout = request_timeout;
		
		// elements of the zone
		this.infoList = new Array();
		
		// initialize the counter of informations
		this.counterInfo = 0; 
		
		this.img_loaded = 0;
		this.array_img = {};
		
		this.wait_end_behaviour = true;
		this.behaviour_running = true;
		this.req_timeout = null;
		
		this.is_master = false;
		
		this.timeout_list = {};
		this.specificActionWhenRequestWorks = function() {};
		this.specificActionWhenRequestFails = function() {};

	},
	
	// function call to load the image before the launch
	loadImage: function(imgsrc) {
		this.array_img[imgsrc] = new Image();
		var self = this;
		this.array_img[imgsrc].onload = function() {self.incrementImageLoadedAndLaunchBehaviour();};
		this.array_img[imgsrc].src = imgsrc;
	},
	
	// increment the number of images we need to load
	incrementImageLoadedAndLaunchBehaviour: function() {
		this.img_loaded++;
		if (this.imagesAreLoaded())
			this.initBehaviour();
		
	},
	
	// define if the images are loaded
	imagesAreLoaded: function() {
		return Object.keys(this.array_img).length == this.img_loaded;
	},
	
	// put the infos in the infoList of the zone for the behavior
	pushInfo: function(dico) {
		this.infoList.push(dico);
		this.counterInfo++;
	},
	
	// change the content, but keep the base of the zone and add the new html
	changeContent: function(html) {
		this.divMarquee.innerHTML = this.htmlinit + html; 
	},
	
	 // add to the content, but keep the base of the zone
	addContent: function(html) {
		this.divMarquee.innerHTML = html + this.divMarquee.innerHTML; 
	},
	
	// put to true, the behaviour is started
	behaviour_start: function() {
		this.behaviour_running = true;
	},
	
	// put to false, the behaviour is stoped
	behaviour_stop: function() {
		this.behaviour_running = false;
	},
	
	// set the zone to master for the loading state
	set_master: function(val) {
		this.is_master = true;
	},
	
	/*
	* This function is called by the callback of the request.
	* It prepares the datas to be used by the behaviour. Then it launches the behaviour function.
	*/
	initBehaviour : function() {
		if (this.imagesAreLoaded() && this.infoList.length > 0) {
			this.clear_timeout("timeoutBehav");
			var self = this;
			
			if (this.timeout === null)
				// timeout on the request
				this.timeout = setInterval(function() { self.request(); }, this.request_timeout);
			if (this.is_master)
				// hide the logo loading
				document.getElementById("logo_loading").style.display = 'none';
			// launch the behaviour function
			this.anim_func(this, true);
			
			
		}
	},
	
	/*
	* Callback function of the request : transport is an object given by the request
	* It uses the map of renderers to call the appropriate renderer function for each information, then it put the results in document and launches behaviour.
	*/
	receive: function(json) {
		var self = this;
		// if the timeout is null, launch the request for a define interval
		if (this.timeout === null)
			this.timeout = setInterval(function() { self.request(); }, this.request_timeout);
			
		var init_renderer = false;
		this.reset_zone();
		if (json.informations) {
			if (json.informations.length !== 0) {
				// if the zone is an alert and not null
				if(this.id == "zoneAlert"){
					// put the zone in visible
					document.getElementById(this.id).style.visibility="visible";
					// for all the others zone, we reset, stop the behaviour and stop the request
					for(var i in this.all_zone){
						this.all_zone[i].reset_zone();
						this.all_zone[i].anim_func(this, false);
						this.all_zone[i].stop_request();
					}
				}
				for (var indice = 0; indice < json.informations.length; indice++) {
					var elements = json.informations[indice];
					for (var cle in this.map_renderers) {
						if (elements[cle]) {
							for (var index = 0; index < elements[cle].length; index++) {
								try {
									this.map_renderers[cle](elements[cle][index], this, this.map_time[cle]);
								} catch(err) {
									console.log(init_renderer);
									debug.add_message("Error in loading renderer : "+cle+" : "+err);
								}
								
							}
						}
					}
				}
			
				try {
					this.initBehaviour();
				} catch(err) {
					debug.add_message("Error in loading behaviour : "+this.anim_func.name+" : "+err);
				}
			}else {
				this.reset_zone();
			}
		}else {
			this.reset_zone();
		}
	},
	
	/*
	* It just creates an Ajax.Request object with the appropriate callback and url.
	*/
	request: function() {
		var self = this;
		new Ajax.Request(this.url,
		{
			method:'get',
			onSuccess: function(transport) {
				if (transport.status == 200) {
					var textContent = transport.responseText;
					var json = JSON.parse(textContent);	
					self.specificActionWhenRequestWorks();
					self.receive(json);
				} else {
					self.actionOnRequestFailure("Statut : "+transport.status);
				}
			},
			onFailure: function(transport) { 
				self.actionOnRequestFailure(transport); 
			}
		});
	},
	
	setSpecificActionsForRequest: function(fWhenWorks, fWhenFails) {
		this.specificActionWhenRequestWorks = fWhenWorks;
		this.specificActionWhenRequestFails = fWhenFails;
	},
	
	actionOnRequestFailure: function(err) {
		this.specificActionWhenRequestFails();
		debug.add_message("Error when getting informations: "+err);
		set_timeout("requestTimeout", function() { self.request(); }, self.request_timeout);
	},
	
	// reset the zone
	reset_zone: function() {
		if (this.timeout_list.timeoutBehav) 
			this.clear_timeout("timeoutBehav");
		this.infoList = new Array();
		this.changeContent("");
		this.counterInfo = 0;
		this.img_loaded = 0;
		this.array_img = {};
	},
	

	// stop the request by the delete of the interval
	stop_request: function() {
		if(this.timeout)
			clearInterval(this.timeout);
	},
	
	// function for manage the timeout
	set_timeout: function(name, func, time){
		
		// if the timeout exist, it is cleared
		if(this.timeout_list[name]){
			this.clear_timeout(name);
		}
		
		//if the debug is in verbose
		if(debug.type == "verbose"){
			var self=this;
			// function for the timeout with the message to store for debug
			var f = function(){
				func();
				var msg = "creation of the timeout : "+name+" on "+self.id;
				debug.add_message(msg);
			};
		}
		
		// TODO
		if(debug.type == "silent"){var f = function(){func();};}
		
		// creation of the timeout
		var t = setTimeout(f, time);
		//storage of the timeout in the timeout_list
		this.timeout_list[name] = t;
	},
	
	// function to clear a timeout
	clear_timeout: function(name){
		
		if(debug.type == "verbose"){
			var msg = "delete the timeout : "+name;
			debug.add_message(msg);
		}
		if (this.timeout_list[name]) {
			clearTimeout(this.timeout_list[name]);
		}
	}
	
	
};

// class alert overwriting the zone class
var AlertZone = Class.create(Zone, {
	// initialize the zone by calling the $super element and store the others zone
	initialize: function($super, id, map_renderers, map_time, path, anim_func, request_timeout, all_zone) {
		$super(id, map_renderers, map_time, path, anim_func, request_timeout);
		this.all_zone = all_zone;
		document.getElementById(this.id).style.visibility="hidden";
	},
	
	// reset the zone by calling the $super element, hide the alert zone and do the reset and the request for all the others zone
	reset_zone: function($super) {
		$super();
		document.getElementById(this.id).style.visibility="hidden";
		for(var i in this.all_zone){
			this.all_zone[i].reset_zone();
			this.all_zone[i].request();
		}
	}
});


//class notif overwriting the zone class
var NotifZone = Class.create(Zone, {
	
	initialize: function($super, id, map_renderers, map_time, path, anim_func, request_timeout, allZone) {
		$super(id, map_renderers, map_time, path, anim_func, request_timeout);
		this.all_zone = allZone;
		this.tabNotif = new Array();
		document.getElementById(this.id).style.visibility="hidden";
	},
	
	// reset the zone by calling the $super element, hide the alert zone and do the reset and the request for all the others zone
	reset_zone: function($super) {
		$super();
		document.getElementById(this.id).style.visibility="hidden";
		for(var i in this.all_zone){
			this.all_zone[i].reset_zone();
		}
	},

	receive: function(transport) {
		var self = this;
		// if the timeout is null, launch the request for a define interval
		if (this.timeout === null)
			this.timeout = setInterval(function() { self.request(); }, this.request_timeout);
		var textContent = transport.responseText;
		var json = JSON.parse(textContent);
		this.tabNotif = new Array();
		for (var indice = 0; indice < json.informations.length; indice++) {
			var information = json.informations[indice];
			for(var cle in information){
				var element = information[cle];
				this.tabNotif.push(element);
			}
		}
		setInterval(function(){self.check_notifTab();}, 60000);
	},	
	
	check_notifTab: function(){
		for(var i=0; i<this.tabNotif.length; i++){
			console.log("dedans");
			var date_notif = get_date_from_timestamp_int(this.tabNotif[i].begin);
			var date_current = get_current_date_int();
			
			var d1 = new Date(date_notif.year, date_notif.month - 1, date_notif.day, date_notif.hour, date_notif.min, 0);
			var d2 = new Date(date_current.year, date_current.month - 1, date_current.day, date_current.hour, date_current.min, 0);
			
			if(date_notif.day == date_current.day && date_notif.month == date_current.month && date_notif.year == date_current.year && date_notif.hour == date_current.hour && date_notif.min == date_current.min){
				var json = this.tabNotif[i].info;
				var init_renderer = false;
				this.reset_zone();
				if (json.length !== 0) {
					// put the zone in visible
					document.getElementById(this.id).style.visibility="visible";
					// for all the others zone, we reset, stop the behaviour and stop the request
					for(var j = 0; j<this.all_zone.length; j++){
						this.all_zone[j].reset_zone();
						this.all_zone[j].anim_func(this, false);
						this.all_zone[j].stop_request();
					}
					for (var indice = 0; indice < json.length; indice++) {
						elements = json[indice];
						for (var cle in this.map_renderers) {
							if (elements[cle]) {
								try {
									this.map_renderers[cle](elements[cle], this, this.map_time[cle]);
								} catch(err) {
									console.log(init_renderer);
									debug.add_message("Error in loading renderer : "+cle+" : "+err);
								}
							}
						}
					}
				
					try {
						this.initBehaviour();
					} catch(err) {
						new debug.add_message("Error in loading behaviour : "+this.anim_func.name+" : "+err);
					}
				}else {
					this.reset_zone();
				}
				
			}
		}
	}
});

var Debug = Class.create({
	initialize: function(type) {
		this.type = type;
		this.list_msg = new Array();
	},
	
	add_message: function(msg, date) {
		var str = "MSG: "+msg+" | Date : "+new Date();
		console.debug(str);
		this.list_msg.push(str);
	}
});

//create the debug element with the type for argument (VERBOSE_DEBUG or SILENT_DEBUG)
//var debug = new Debug(SILENT_DEBUG);

// for the tests Unit there is a bug ONLY ON CHROME, debug doesn't work with the global SILENT and VERBOSE
var debug = new Debug("silent");