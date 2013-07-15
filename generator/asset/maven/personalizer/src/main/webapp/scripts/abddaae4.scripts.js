"use strict";angular.module("personalizerApp",["ngResource"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/tab/:service",{templateUrl:"views/onglet.html",controller:"OngletCtrl"}).when("/tab/:service/:zone",{templateUrl:"views/zone.html",controller:"ZoneCtrl"}).when("/tab/:service/:zone/add/:callID",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/tab/:service/:zone/edit/:callID/:id",{templateUrl:"views/edit.html",controller:"EditCtrl"}).when("/error",{templateUrl:"views/error.html",controller:"MainCtrl"}).otherwise({redirectTo:"/error"})}]),angular.module("personalizerApp").controller("MainCtrl",["$rootScope","$scope","Manager",function(a,b,c){a.services=[],a.tabs=[],a.dbName=null,b.start=function(){c.initDB().then(function(){c.initPersonalizer().then(function(b){a.services=b.services,console.log(a.services);for(var c in a.services)a.tabs.push(c);b.dbName&&(a.dbName=b.dbName)},function(){window.alert("l'initialisation du personalizer a échoué !")})},function(){window.alert("l'initialisation de la base a échoué !")})},b.start()}]),angular.module("personalizerApp").controller("OngletCtrl",["$rootScope","$scope","$routeParams",function(a,b,c){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.service=a.services[b.tab],b.zones=[],b.numberCalls=0,b.setZone=function(a){window.location.href="#/tab/"+b.tab+"/"+a},b.getZones=function(){for(var a=0;a<b.service.length;a++){var c=b.service[a];b.zones.push(c.zone)}},b.getNumberOfCalls=function(a){for(var b=0,c=0;c<a.length;c++)for(var d=a[c],e=0;e<d.calls.length;e++)d.calls[e].params&&(b+=d.calls[e].params.length);return b},b.startTab=function(){b.getZones(),b.numberCalls=0},b.startTab()}]),angular.module("personalizerApp").controller("StartCtrl",["$scope",function(a){a.openMain=function(){window.location.href="#/perso"}}]),angular.module("personalizerApp").factory("PersoConstants",function(){return{DOMAIN_URL:"http://localhost",PORT:"8080",PATH:document.location.pathname+"rest",PERSO_DOMAIN_URL:"http://"+document.location.hostname,PERSO_PORT:document.location.port,PERSO_PATH:document.location.pathname+"resources",PERSO_FILENAME:"personalizer.json"}}),angular.module("personalizerApp").factory("mongoService",["$http","PersoConstants",function(a,b){return{getCallIDZoneSource:function(c,d){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/scall/source/"+c+"/zone/"+d+"/").then(function(a){return a.data})},getCallsCallID:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/callID/"+c+"/").then(function(a){return a.data})},getIdentifiedCall:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/"+c+"/").then(function(a){return a.data})},addCall:function(c,d){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/add/"+c+"/",d).then(function(a){return a.data})},deleteCall:function(c,d){return a.delete(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/delete/"+c+"/"+d+"/").then(function(a){return a.data})},updateCall:function(c,d,e){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/edit/"+c+"/"+d+"/",e).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})}}}]),angular.module("personalizerApp").controller("ZoneCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],a.calls=[],b.newModal=!1,b.mySelectedCallID=null,b.getCallsOfZone=function(){console.log("hello"),d.getCallIDZoneSource(b.tab,b.zone).then(function(b){console.log(b),a.calls=b},function(){window.alert("get callID de la zone "+b.zone+" a échoué")})},b.addNewCall=function(a){void 0!==a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/add/"+a)},b.options={backdropFade:!0,dialogFade:!0,keyboard:!1,show:!1,backdropClick:!1},b.editCall=function(a,c){c&&a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/edit/"+c+"/"+a)},b.removeCall=function(a,c){void 0!==c&&void 0!==a&&d.deleteCall(a,c).then(function(){window.alert(" appel supprimé !"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("suppression appel echoué")})},b.getOtherZones=function(){for(var a=[],c=0;c<b.service.length;c++){var d=b.service[c];d.zone!==b.zone&&a.push(d.zone)}return a},b.getCallIDFromResource=function(){for(var a=[],c=0;c<b.service.length;c++){var d=b.service[c];if(d.zone===b.zone&&d.calls)for(var e=0;e<d.calls.length;e++)a.push(d.calls[c].callID)}return a},b.cancelAddCall=function(){b.newModal=!1},b.openAddNewCall=function(){b.newModal=!0},b.validateAddCall=function(){null===b.mySelectedCallID?window.alert("Veuillez choisir un CallID "):(b.newModal=!1,b.addNewCall(b.mySelectedCallID))},b.setChoice=function(a){b.mySelectedCallID=a},b.hasOtherZone=function(){return b.getOtherZones().length>0},b.changeZone=function(a){a&&(window.location.href="#/tab/"+b.tab+"/"+a)},b.startZone=function(){b.getCallsOfZone()},b.startZone()}]),angular.module("personalizerApp").directive("tabs",function(){return{templateUrl:"views/tabs.html",restrict:"E",controller:["$scope",function(a){a.isActive=function(b){return a.tab?a.tab===b?"active":"":void 0}}]}}),angular.module("personalizerApp").controller("AddCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],b.callID=c.callID,b.parameters={},b.values=[],b.getParams=function(a){for(var c={},d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===b.zone)for(var f=e.calls,g=0;g<f.length;g++){var h=f[g];h.callID===a&&(c=h)}}return console.log(c),c},b.initValues=function(a){for(var c=[],d=0;d<a.length;d++)c[a[d].id]="";b.values=c},b.getParamProperties=function(a){var c=b.parameters.params,d={};if(c)for(var e=0;e<c.length;e++){var f=c[e];f.id===a&&(d=f)}return d},b.setOption=function(a,c){if(c)for(var d in b.values)d===a&&(b.values[a]=c)},b.validate=function(){console.log(b.values);var a=b.buildCall(b.values);d.addCall(b.callID,a).then(function(){window.alert("appel ajouté"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("ajout appel echoué")})},b.cancel=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler l'ajout d'un nouveau appel ?");a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/")},b.getPathParams=function(a){var c="";if(b.parameters.pathParam){var d=b.parameters.pathParam;if(d.length>0){var e="";if(b.parameters.pathPrefix){var f=b.parameters.pathPrefix;a[f]&&(e+=a[f])}for(var g=0;g<d.length;g++)a[d[g]]&&(e+=a[d[g]]+"/");c=e}else b.parameters.pathPrefix&&(c+=b.parameters.pathPrefix)}return c},b.getQueryParams=function(a){var c={};if(b.parameters.queryParam){var d=b.parameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e];console.log(f);var g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return console.log(c),c},b.getHeaderParams=function(a){var c={};if(b.parameters.headerParam){var d=b.parameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:""};return c.path=b.getPathParams(a),b.parameters.method&&(c.method=b.parameters.method),c.query=b.getQueryParams(a),c.headers=b.getHeaderParams(a),c},b.startAdd=function(){b.parameters=b.getParams(b.callID),b.initValues(b.parameters.params)},b.startAdd()}]),angular.module("personalizerApp").controller("EditCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],b.callID=c.callID,b.id=c.id,b.parameters={},b.values=[],b.currentCall={},b.getParams=function(a){for(var c=[],d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===b.zone)for(var f=e.calls,g=0;g<f.length;g++){var h=f[g];h.callID===a&&(c=h)}}return c},b.getCurrentCall=function(){for(var c=null,d=0;d<a.calls.length;d++){var e=a.calls[d];if(console.log(e),e.parameters)for(var f=0;f<e.parameters.length;f++){var g=e.parameters[f];console.log(g),g.id===b.id&&(c=g)}}return c},b.validate=function(){console.log(b.values);var a=b.buildCall(b.values);d.updateCall(b.callID,b.id,a).then(function(){window.alert("appel modifié avec succés"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("la modification de l'appel a echoué")})},b.cancel=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler la modification de l'appel ?");a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/")},b.initParams=function(a,b,c){var d=a.split("/");if(console.log("callPath "+a),console.log(d),d.length>0&&(b.pathPrefix&&(b.pathPrefix=a.substr(0,b.pathPrefix.length)),b.pathParam))for(var e=0;e<d.length;e++)""!==d[e]&&(c[b.pathParam[e]]=d[e])},b.initQuery=function(a,b,c){if(b.queryParam)for(var d in a)c[d]=a[d]},b.initHeaders=function(a,b,c){if(b.headerParam)for(var d in a)c[d]=a[d]},b.initValues=function(a,c){var d=[];c&&(c.path&&b.initParams(c.path,a,d),c.query&&b.initQuery(c.query,a,d),c.headers&&b.initHeaders(c.headers,a,d)),b.values=d,console.log(b.values)},b.setOption=function(a,c){if(c)for(var d in b.values)d===a&&(b.values[a]=c)},b.getPathParams=function(a){var c="";if(b.parameters.pathParam){var d=b.parameters.pathParam;if(d.length>0){var e="";if(b.parameters.pathPrefix){var f=b.parameters.pathPrefix;a[f]&&(e+=a[f])}for(var g=0;g<d.length;g++)a[d[g]]&&(e+=a[d[g]]+"/");c=e}else b.parameters.pathPrefix&&(c+=b.parameters.pathPrefix)}return c},b.getQueryParams=function(a){var c={};if(b.parameters.queryParam){var d=b.parameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e];console.log(f);var g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return console.log(c),c},b.getHeaderParams=function(a){var c={};if(b.parameters.headerParam){var d=b.parameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:""};return c.path=b.getPathParams(a),b.parameters.method&&(c.method=b.parameters.method),c.query=b.getQueryParams(a),c.headers=b.getHeaderParams(a),c},b.startEdit=function(){b.parameters=b.getParams(b.callID),b.currentCall=b.getCurrentCall(),b.initValues(b.parameters,b.currentCall)},b.startEdit()}]);