"use strict";angular.module("personalizerApp",["ngResource","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/tab/:service",{templateUrl:"views/onglet.html",controller:"OngletCtrl"}).when("/tab/:service/:zone",{templateUrl:"views/zone.html",controller:"ZoneCtrl"}).when("/tab/:service/:zone/add/:callID",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/tab/:service/:zone/edit/:callID/:id",{templateUrl:"views/edit.html",controller:"EditCtrl"}).when("/error",{templateUrl:"views/error.html",controller:"MainCtrl"}).when("/client",{templateUrl:"views/client.html",controller:"ClientCtrl"}).when("/client/:service/:zone",{templateUrl:"views/zoneClient.html",controller:"ZoneClientCtrl"}).otherwise({redirectTo:"/error"})}]),angular.module("personalizerApp").controller("MainCtrl",["$rootScope","$scope","Manager",function(a,b,c){a.services=[],a.tabs=[],a.dbName=null,a.showClient=!1,b.start=function(){c.initDB().then(function(){c.initPersonalizer().then(function(b){a.services=b.services,console.log(a.services);for(var c in a.services)a.tabs.push(c);b.dbName&&(a.dbName=b.dbName)},function(){window.alert("l'initialisation du personalizer a échoué !")})},function(){window.alert("l'initialisation de la base a échoué !")})},b.start()}]),angular.module("personalizerApp").controller("OngletCtrl",["$rootScope","$scope","$routeParams",function(a,b,c){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.service=a.services[b.tab],b.zones=[],b.numberCalls=0,b.setZone=function(a){window.location.href="#/tab/"+b.tab+"/"+a},b.getZones=function(){for(var a=0;a<b.service.length;a++){var c=b.service[a];b.zones.push(c.zone)}},b.getNumberOfCalls=function(a){for(var b=0,c=0;c<a.length;c++)for(var d=a[c],e=0;e<d.calls.length;e++)d.calls[e].params&&(b+=d.calls[e].params.length);return b},b.startTab=function(){b.getZones(),b.numberCalls=0},b.startTab()}]),angular.module("personalizerApp").controller("StartCtrl",["$scope",function(a){a.openMain=function(){window.location.href="#/perso"}}]),angular.module("personalizerApp").factory("PersoConstants",function(){return{DOMAIN_URL:"http://localhost",PORT:"8080",PATH:document.location.pathname+"rest",PERSO_DOMAIN_URL:"http://"+document.location.hostname,PERSO_PORT:document.location.port,PERSO_PATH:document.location.pathname+"resources",PERSO_FILENAME:"personalizer.json"}}),angular.module("personalizerApp").factory("mongoService",["$http","PersoConstants",function(a,b){return{getCallIDZoneSource:function(c,d){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/scall/source/"+c+"/zone/"+d+"/").then(function(a){return a.data})},getCallsCallID:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/callID/"+c+"/").then(function(a){return a.data})},getIdentifiedCall:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/"+c+"/").then(function(a){return a.data})},addCall:function(c,d){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/add/"+c+"/",d).then(function(a){return a.data})},deleteCall:function(c,d){return a.delete(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/delete/"+c+"/"+d+"/").then(function(a){return a.data})},updateCall:function(c,d,e){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/edit/"+c+"/"+d+"/",e).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})}}}]),angular.module("personalizerApp").controller("ZoneCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],a.calls=[],b.parameters=[],b.values=[],b.parametersValuesByCall=[],b.showSelectCallID=!1,b.mySelectedCallID=null,b.addNewCallModal=!1,b.editCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.idEditingCall=null,b.currentCall={},b.getCallsOfZone=function(){console.log("hello"),d.getCallIDZoneSource(b.tab,b.zone).then(function(c){console.log(c),a.calls=c,b.initParameters()},function(){window.alert("get callID de la zone "+b.zone+" a échoué")})},b.options={backdropFade:!0,dialogFade:!0,keyboard:!1,show:!1,backdropClick:!1},b.removeCall=function(a,c){void 0!==c&&void 0!==a&&d.deleteCall(a,c).then(function(){window.alert(" appel supprimé !"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("suppression appel echoué")})},b.getOtherZones=function(){for(var a=[],c=0;c<b.service.length;c++){var d=b.service[c];d.zone!==b.zone&&a.push(d.zone)}return a},b.getCallIDFromResource=function(){for(var a=[],c=0;c<b.service.length;c++){var d=b.service[c];if(d.zone===b.zone&&(console.log("zone === "+d.zone),d.calls)){console.log("calls of zone"),console.log(d.calls);for(var e=0;e<d.calls.length;e++)d.calls[c]&&d.calls[c].callID&&a.push(d.calls[c].callID)}}return a},b.validateSelectedCallID=function(){null===b.mySelectedCallID?window.alert("Veuillez choisir un CallID "):(b.showSelectCallID=!1,b.newCallParameters=b.getParams(b.mySelectedCallID),b.initNewCallValues(b.newCallParameters.params),b.showAddNewCallForm=!0)},b.openAddNewCallModal=function(){var a=b.getCallIDFromResource();a.length>0?(b.addNewCallModal=!0,b.showSelectCallID=!0):window.alert("Impossible d'ajouter un nouveau appel : PAS D'IDENTIFIANT D'APPEL dans "+b.zone)},b.setChoice=function(a){b.mySelectedCallID=a},b.hasOtherZone=function(){return b.getOtherZones().length>0},b.changeZone=function(a){a&&(window.location.href="#/tab/"+b.tab+"/"+a,b.startZone())},b.getPathParams=function(a,b,c){var d=a.split("/");if(console.log("callPath "+a),console.log(d),d.length>0){var e="";if(b.pathPrefix&&(e=a.substr(0,b.pathPrefix.length),console.log("prefix "+e),b.pathPrefix=e),b.pathParam)if(""!==e)for(var f=0;f<b.pathParam.length;f++)""!==d[f+1]&&(c[b.pathParam[f]]=d[f+1]);else for(var g=0;g<d.length;g++)""!==d[g]&&(c[b.pathParam[g]]=d[g])}},b.getQueryParams=function(a,b,c){if(b.queryParam)for(var d in a)c[d]=a[d]},b.getHeaderParams=function(a,b,c){if(b.headerParam)for(var d in a)c[d]=a[d]},b.getParametersValues=function(a,c){var d={};return c&&(c.path&&b.getPathParams(c.path,a,d),c.query&&b.getQueryParams(c.query,a,d),c.headers&&b.getHeaderParams(c.headers,a,d)),d},b.getValues=function(a,c){var d=[];if(c.parameters)for(var e=0;e<c.parameters.length;e++){var f=c.parameters[e];b.parametersValuesByCall[f.id]={};var g=b.getParametersValues(a,f);d.push(g),b.parametersValuesByCall[f.id]=g}return console.log(b.parametersValuesByCall),d},b.getParamValues=function(a){return console.log("id"===a),b.parametersValuesByCall[a]?b.parametersValuesByCall[a]:void 0},b.getValueByID=function(a,c){var d=null;if(console.log("id = "+c),b.values[a])for(var e=0;e<b.values[a].length;e++){var f=b.values[a][e];console.log("currentValue"),console.log(f);for(var g in f)g===c&&(console.log("key === id"),d=f[g])}return console.log(d),d},b.getParamHumanNameByID=function(a,c){var d="";if(b.parameters[a]&&b.parameters[a].params)for(var e=b.parameters[a].params,f=0;f<e.length;f++){var g=e[f];g.id===c&&(d=g.humanName)}return d},b.getParamHumanNameByCallID=function(a){var c={};if(b.parameters[a]&&b.parameters[a].params){var d=b.parameters[a].params;d.sort();for(var e=0;e<d.length;e++){var f=d[e];c[f.id]=f.humanName}}return c},b.getParams=function(a){for(var c=[],d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===b.zone){console.log("zone === "+b.zone);var f=e.calls;console.log("calls of "+e.zone),console.log(f);for(var g=0;g<f.length;g++){var h=f[g];h.callID===a&&(c=h)}}}return c},b.initParameters=function(){console.log(a.calls);for(var c=0;c<a.calls.length;c++){var d=a.calls[c];if(d.callID){b.parameters[d.callID]=[],b.values[d.callID]=[];var e=b.getParams(d.callID);b.parameters[d.callID]=e,b.values[d.callID]=b.getValues(e,d)}}},b.startZone=function(){b.getCallsOfZone()},b.initNewCallValues=function(a){for(var c=[],d=0;d<a.length;d++)c[a[d].id]="";b.newCallValues=c},b.getAddNewParamProperties=function(a){var c=b.newCallParameters.params,d={};if(c)for(var e=0;e<c.length;e++){var f=c[e];f.id===a&&(d=f)}return d},b.setOptionInNewCall=function(a,c){if(c)for(var d in b.newCallValues)d===a&&(b.newCallValues[a]=c)},b.validateAddNewCall=function(){var a=b.isFormCompleted(b.newCallValues);if(console.log(b.newCallValues),a===!0){var c=b.buildCall(b.newCallValues);d.addCall(b.mySelectedCallID,c).then(function(){window.alert("appel ajouté"),b.addNewCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.startZone()},function(){window.alert("ajout appel echoué")})}else window.alert("Veuillez compléter tous les champs du formulaire ?")},b.isFormCompleted=function(a){var b=!0;for(var c in a)if(""===a[c])return b=!1,void 0;return b},b.cancelAddNewCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler l'ajout d'un nouveau appel ?");a&&(b.addNewCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null)},b.getNewCallPathParams=function(a){var c="";if(b.newCallParameters.pathParam){var d=b.newCallParameters.pathParam;if(d.length>0){var e="";if(b.newCallParameters.pathPrefix){var f=b.newCallParameters.pathPrefix;a[f]&&(e+=a[f])}for(var g=0;g<d.length;g++)a[d[g]]&&(e+=a[d[g]]+"/");c=e}else b.newCallParameters.pathPrefix&&(c+=b.newCallParameters.pathPrefix)}return c},b.getNewCallQueryParams=function(a){var c={};if(b.newCallParameters.queryParam){var d=b.newCallParameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e];console.log(f);var g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return console.log(c),c},b.getNewCallHeaderParams=function(a){var c={};if(b.newCallParameters.headerParam){var d=b.newCallParameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:""};return c.path=b.getNewCallPathParams(a),b.newCallParameters.method&&(c.method=b.newCallParameters.method),c.query=b.getNewCallQueryParams(a),c.headers=b.getNewCallHeaderParams(a),c},b.openEditCallModal=function(a,c){b.idEditingCall=c,console.log("call to edit "+b.idEditingCall),b.mySelectedCallID=a,console.log("callID "+b.mySelectedCallID),b.newCallParameters=b.getParams(b.mySelectedCallID),console.log("$scope.newCallParameters"),console.log(b.newCallParameters),b.currentCall=b.getCurrentEditingCall(b.idEditingCall),console.log("currentCall"),console.log(b.currentCall),b.initUpdatedCallValues(b.newCallParameters,b.currentCall),console.log("$scope.newCallValues"),console.log(b.newCallValues),b.editCallModal=!0},b.cancelEditCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler la modification de l'appel ?");a&&(b.editCallModal=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.idEditingCall=null)},b.getCurrentEditingCall=function(b){for(var c=null,d=0;d<a.calls.length;d++){var e=a.calls[d];if(console.log(e),e.parameters)for(var f=0;f<e.parameters.length;f++){var g=e.parameters[f];console.log(g),g.id===b&&(c=g)}}return c},b.initUpdatedCallPathParams=function(a,b,c){var d=a.split("/");if(console.log("callPath "+a),console.log(d),d.length>0){var e="";if(b.pathPrefix&&(e=a.substr(0,b.pathPrefix.length),console.log("prefix "+e),b.pathPrefix=e),b.pathParam)if(""!==e)for(var f=0;f<b.pathParam.length;f++)""!==d[f+1]&&(c[b.pathParam[f]]=d[f+1]);else for(var g=0;g<d.length;g++)""!==d[g]&&(c[b.pathParam[g]]=d[g])}},b.initUpdatedCallQueryParams=function(a,b,c){if(b.queryParam)for(var d in a)c[d]=a[d]},b.initUpdatedCallHeaderParams=function(a,b,c){if(b.headerParam)for(var d in a)c[d]=a[d]},b.initUpdatedCallValues=function(a,c){var d=[];c&&(c.path&&b.initUpdatedCallPathParams(c.path,a,d),c.query&&b.initUpdatedCallQueryParams(c.query,a,d),c.headers&&b.initUpdatedCallHeaderParams(c.headers,a,d)),b.newCallValues=d},b.buildEditCall=function(a){var c={id:"",path:"",query:{},headers:{},method:""};return c.path=b.getPathParams(a),c.id=b.idEditingCall,b.parameters.method&&(c.method=b.parameters.method),c.query=b.getQueryParams(a),c.headers=b.getHeaderParams(a),c},b.validateEditCall=function(){var a=b.buildEditCall(b.newCallValues);d.updateCall(b.mySelectedCallID,b.idEditingCall,a).then(function(){window.alert("appel modifié avec succés"),b.editCallModal=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.idEditingCall=null,b.startZone()},function(){window.alert("la modification de l'appel a echoué")})},b.startZone()}]),angular.module("personalizerApp").directive("tabs",function(){return{templateUrl:"views/tabs.html",restrict:"E",controller:["$scope",function(a){a.isActive=function(b){return a.tab?a.tab===b?"active":"":void 0}}]}}),angular.module("personalizerApp").controller("AddCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],b.callID=c.callID,b.newCallParameters={},b.newCallValues=[],b.getParams=function(a){for(var c={},d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===b.zone)for(var f=e.calls,g=0;g<f.length;g++){var h=f[g];h.callID===a&&(c=h)}}return console.log(c),c},b.initNewCallValues=function(a){for(var c=[],d=0;d<a.length;d++)c[a[d].id]="";b.newCallValues=c},b.getAddNewParamProperties=function(a){var c=b.newCallParameters.params,d={};if(c)for(var e=0;e<c.length;e++){var f=c[e];f.id===a&&(d=f)}return d},b.setOption=function(a,c){if(c)for(var d in b.newCallValues)d===a&&(b.newCallValues[a]=c)},b.validateAddNewCall=function(){console.log(b.newCallValues);var a=b.buildCall(b.newCallValues);d.addCall(b.callID,a).then(function(){window.alert("appel ajouté"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("ajout appel echoué")})},b.cancelAddNewCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler l'ajout d'un nouveau appel ?");a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/")},b.getNewCallPathParams=function(a){var c="";if(b.newCallParameters.pathParam){var d=b.newCallParameters.pathParam;if(d.length>0){var e="";if(b.newCallParameters.pathPrefix){var f=b.newCallParameters.pathPrefix;a[f]&&(e+=a[f])}for(var g=0;g<d.length;g++)a[d[g]]&&(e+=a[d[g]]+"/");c=e}else b.newCallParameters.pathPrefix&&(c+=b.newCallParameters.pathPrefix)}return c},b.getNewCallQueryParams=function(a){var c={};if(b.newCallParameters.queryParam){var d=b.newCallParameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e];console.log(f);var g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return console.log(c),c},b.getNewCallHeaderParams=function(a){var c={};if(b.newCallParameters.headerParam){var d=b.newCallParameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:""};return c.path=b.getNewCallPathParams(a),b.newCallParameters.method&&(c.method=b.newCallParameters.method),c.query=b.getNewCallQueryParams(a),c.headers=b.getNewCallHeaderParams(a),c},b.startAdd=function(){b.newCallParameters=b.getParams(b.callID),b.initNewCallValues(b.newCallParameters.params)},b.startAdd()}]),angular.module("personalizerApp").controller("EditCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],b.callID=c.callID,b.id=c.id,b.parameters={},b.newCallValues=[],b.currentCall={},b.getParams=function(a){for(var c=[],d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===b.zone)for(var f=e.calls,g=0;g<f.length;g++){var h=f[g];h.callID===a&&(c=h)}}return c},b.getCurrentCall=function(){for(var c=null,d=0;d<a.calls.length;d++){var e=a.calls[d];if(console.log(e),e.parameters)for(var f=0;f<e.parameters.length;f++){var g=e.parameters[f];console.log(g),g.id===b.id&&(c=g)}}return c},b.validateEditCall=function(){console.log(b.newCallValues);var a=b.buildCall(b.newCallValues);d.updateCall(b.callID,b.id,a).then(function(){window.alert("appel modifié avec succés"),window.location.href="#/tab/"+b.tab+"/"+b.zone},function(){window.alert("la modification de l'appel a echoué")})},b.cancelEditCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler la modification de l'appel ?");a&&(window.location.href="#/tab/"+b.tab+"/"+b.zone+"/")},b.initUpdatedCallPathParams=function(a,b,c){var d=a.split("/");if(console.log("callPath "+a),console.log(d),d.length>0){var e="";if(b.pathPrefix&&(e=a.substr(0,b.pathPrefix.length),console.log("prefix "+e),b.pathPrefix=e),b.pathParam)if(""!==e)for(var f=0;f<b.pathParam.length;f++)""!==d[f+1]&&(c[b.pathParam[f]]=d[f+1]);else for(var g=0;g<d.length;g++)""!==d[g]&&(c[b.pathParam[g]]=d[g])}},b.initUpdatedCallQueryParams=function(a,b,c){if(b.queryParam)for(var d in a)c[d]=a[d]},b.initUpdatedCallHeaderParams=function(a,b,c){if(b.headerParam)for(var d in a)c[d]=a[d]},b.initUpdatedCallValues=function(a,c){var d=[];c&&(c.path&&b.initUpdatedCallPathParams(c.path,a,d),c.query&&b.initUpdatedCallQueryParams(c.query,a,d),c.headers&&b.initUpdatedCallHeaderParams(c.headers,a,d)),b.newCallValues=d,console.log(b.newCallValues)},b.setOptionEdit=function(a,c){if(c)for(var d in b.newCallValues)d===a&&(b.newCallValues[a]=c)},b.getPathParams=function(a){var c="";if(b.parameters.pathParam){var d=b.parameters.pathParam;if(d.length>0){var e="";if(b.parameters.pathPrefix){var f=b.parameters.pathPrefix;a[f]&&(e+=a[f])}for(var g=0;g<d.length;g++)a[d[g]]&&(e+=a[d[g]]+"/");c=e}else b.parameters.pathPrefix&&(c+=b.parameters.pathPrefix)}return c},b.getQueryParams=function(a){var c={};if(b.parameters.queryParam){var d=b.parameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e];console.log(f);var g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return console.log(c),c},b.getHeaderParams=function(a){var c={};if(b.parameters.headerParam){var d=b.parameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:""};return c.path=b.getPathParams(a),b.parameters.method&&(c.method=b.parameters.method),c.query=b.getQueryParams(a),c.headers=b.getHeaderParams(a),c},b.startEdit=function(){b.parameters=b.getParams(b.callID),b.currentCall=b.getCurrentCall(),b.initUpdatedCallValues(b.parameters,b.currentCall)},b.startEdit()}]),angular.module("personalizerApp").controller("ClientCtrl",["$rootScope","$scope",function(a,b){b.zones=[],b.tab="client",void 0===a.services&&(window.location.href="#/"),b.getAllZones=function(){for(var c in a.services)for(var d=a.services[c],e=0;e<d.length;e++){var f=d[e];b.zones.push({zone:f.zone,service:c})}},b.startClient=function(){b.getAllZones()},b.startClient()}]),angular.module("personalizerApp").controller("ZoneClientCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/"),b.tab=c.service,b.zone=c.zone,b.service=a.services[b.tab],a.calls=[],b.mySelectedCallID=null,b.getCallsOfZone=function(){d.getCallIDZoneSource(b.tab,b.zone).then(function(b){console.log(b),a.calls=b},function(){window.alert("get callID de la zone "+b.zone+" a échoué")})},b.getCallNumber=function(b){var c=a.calls.indexOf(b);return c+1},b.setChoice=function(a){b.mySelectedCallID=a},b.startZoneClient=function(){b.getCallsOfZone()},b.startZoneClient()}]);