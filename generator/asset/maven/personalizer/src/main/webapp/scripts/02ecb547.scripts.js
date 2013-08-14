"use strict";angular.module("personalizerApp",["ngResource","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/start.html",controller:"StartCtrl"}).when("/perso",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/tab/:service",{templateUrl:"views/zone.html",controller:"ZoneCtrl"}).when("/error",{templateUrl:"views/error.html",controller:"MainCtrl"}).when("/client",{templateUrl:"views/client.html",controller:"ClientCtrl"}).otherwise({redirectTo:"/error"})}]),angular.module("personalizerApp").controller("MainCtrl",["$rootScope","$scope","Manager",function(a,b,c){a.services=[],a.tabs=[],a.dbName=null,a.showClient=!1,b.start=function(){c.initPersonalizer().then(function(b){a.services=b.services,console.log(a.services);for(var c in a.services)a.tabs.push(c);b.dbName&&(a.dbName=b.dbName),b.client&&(a.showClient=b.client)},function(){window.alert("l'initialisation du personalizer a échoué !")})},b.start()}]),angular.module("personalizerApp").controller("StartCtrl",["$scope","$rootScope","Manager",function(a,b,c){a.login="",a.password="",a.authentificate=!1,b.token=null,a.connect=function(){if(""!==a.login&&""!==a.password){var d=a.password;c.connect(a.login,d).then(function(a){console.log(a),a===!1?window.alert("Login ou mot de passe invalide(s) ! "):(b.token=a,window.location.href="#/perso")},function(){window.alert("La Connexion a échoué, veuillez réessayer ! ")})}else window.alert("Veuillez saisir un login et un mot de passe !")},a.initializeBD=function(){c.initDB().then(function(){console.log("DB initialisation")},function(){window.alert("l'initialisation de la base a échoué !")})},a.initializeBD()}]),angular.module("personalizerApp").factory("PersoConstants",function(){return{DOMAIN_URL:"http://"+document.location.hostname,PORT:"8080",PATH:document.location.pathname+"rest",PERSO_DOMAIN_URL:"http://"+document.location.hostname,PERSO_PORT:document.location.port,PERSO_PATH:document.location.pathname+"resources",PERSO_FILENAME:"personalizer.json"}}),angular.module("personalizerApp").factory("mongoService",["$http","PersoConstants",function(a,b){return{getCallIDZoneSource:function(c,d){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/scall/source/"+c+"/zone/"+d+"/").then(function(a){return a.data})},getCallsCallID:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/callID/"+c+"/").then(function(a){return a.data})},getIdentifiedCall:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/"+c+"/").then(function(a){return a.data})},addCall:function(c,d,e){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/add/"+d+"?token="+c,e).then(function(a){return a.data})},deleteCall:function(c,d,e){return a.delete(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/delete/"+d+"/"+e+"?token="+c).then(function(a){return a.data})},updateCall:function(c,d,e,f){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/call/edit/"+d+"/"+e+"?token="+c,f).then(function(a){return a.data})},getClientProperties:function(c){return a.get(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/client/"+c+"/").then(function(a){return a.data})},setClientTime:function(c,d,e,f){return a.put(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/client/"+d+"/"+e+"/"+f+"?token="+c).then(function(a){return a.data})},setCallIDOrder:function(c,d,e){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/client/"+d+"/mapOrder/"+"?token="+c,e).then(function(a){return a.data})},setClientRequest:function(c,d,e,f){return a.post(b.DOMAIN_URL+":"+b.PORT+b.PATH+"/client/"+d+"/"+e+"?token="+c,f).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})},connect:function(c,d){return b.post(a.DOMAIN_URL+":"+a.PORT+a.PATH+"/login/"+c+"/",d).then(function(a){return a.data})}}}]),angular.module("personalizerApp").factory("Manager",["PersoConstants","$http",function(a,b){return{initDB:function(){return b.get(a.DOMAIN_URL+":"+a.PORT+a.PATH).then(function(a){return a.data})},initPersonalizer:function(){return b.get(a.PERSO_DOMAIN_URL+":"+a.PERSO_PORT+a.PERSO_PATH+"/"+a.PERSO_FILENAME).then(function(a){return a.data})},connect:function(c,d){return b.post(a.DOMAIN_URL+":"+a.PORT+a.PATH+"/login/"+c+"/",d).then(function(a){return a.data})}}}]),angular.module("personalizerApp").controller("ZoneCtrl",["$rootScope","$scope","$routeParams","mongoService",function(a,b,c,d){void 0===a.services&&(window.location.href="#/perso"),b.tab=c.service,b.service=a.services[b.tab],a.calls=[],b.parameters=[],b.values=[],b.parametersValuesByCall=[],b.showSelectZone=!1,b.showSelectCallID=!1,b.mySelectedZone=null,b.mySelectedCallID=null,b.addNewCallModal=!1,b.editCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.idEditingCall=null,b.currentCall={},b.valueTypes=[],b.getZones=function(){for(var a=[],c=0;c<b.service.length;c++){var d=b.service[c];a.push(d.zone)}return a},b.getCalls=function(a){for(var c=0;c<a.length;c++){var d=a[c];b.getCallsOfZone(d)}},b.getCallsOfZone=function(c){console.log("get calls of zone"),d.getCallIDZoneSource(b.tab,c).then(function(d){console.log(d),a.calls[c]=d,b.initParameters(c,d)},function(a){401===a.status?window.location.href="#/":window.alert("get callID de la zone "+c+" a échoué")})},b.options={backdropFade:!0,dialogFade:!0,keyboard:!1,show:!1,backdropClick:!1},b.removeCall=function(c,e){void 0!==e&&void 0!==c&&d.deleteCall(a.token,c,e).then(function(){window.alert(" appel supprimé !"),window.location.href="#/tab/"+b.tab+"/"},function(a){401===a.status?window.location.href="#/":window.alert("suppression appel echoué")})},b.getCallIDFromResource=function(a){for(var c=[],d=0;d<b.service.length;d++){var e=b.service[d];if(e.zone===a&&e.calls)for(var f=0;f<e.calls.length;f++)e.calls[f]&&e.calls[f].callID&&c.push(e.calls[f].callID)}return c},b.validateSelectedCallID=function(){null===b.mySelectedCallID?window.alert("Veuillez choisir un CallID "):(b.showSelectCallID=!1,b.newCallParameters=b.getParams(b.mySelectedZone,b.mySelectedCallID),b.initNewCallValues(b.newCallParameters.params),b.initValueTypes(b.newCallParameters.params),b.showAddNewCallForm=!0)},b.openAddNewCallModal=function(){b.addNewCallModal=!0,b.showSelectZone=!0},b.validateSelectedZone=function(){if(null!==b.mySelectedZone&&void 0!==b.mySelectedZone){var a=b.getCallIDFromResource(b.mySelectedZone);a.length>0?(b.showSelectZone=!1,b.showSelectCallID=!0):window.alert("Impossible d'ajouter un nouveau appel : PAS D'IDENTIFIANT D'APPEL dans "+b.mySelectedZone)}else window.alert("Veuillez choisir une zone pour votre appel")},b.setChoice=function(a){b.mySelectedCallID=a},b.changeZone=function(a){b.mySelectedZone=a},b.getPathParams=function(a,b,c){var d=a.split("/");if(d.length>0){var e="";if(b.pathPrefix&&(e=a.substr(0,b.pathPrefix.length),console.log("prefix "+e),b.pathPrefix=e),b.pathParam)if(""!==e)for(var f=0;f<b.pathParam.length;f++)""!==d[f+1]&&(c[b.pathParam[f]]=d[f+1]);else for(var g=0;g<d.length;g++)""!==d[g]&&(c[b.pathParam[g]]=d[g])}},b.getQueryParams=function(a,b,c){if(b.queryParam)for(var d in a)c[d]=a[d]},b.getHeaderParams=function(a,b,c){if(b.headerParam)for(var d in a)c[d]=a[d]},b.getPostParams=function(a,b,c){var d=a.split(" ");if(d.length>0&&b.postParams)for(var e=0;e<d.length;e++)""!==d[e]&&(c[b.postParams[e]]=d[e])},b.getParametersValues=function(a,c){var d={};return c&&(c.path&&b.getPathParams(c.path,a,d),c.query&&b.getQueryParams(c.query,a,d),c.headers&&b.getHeaderParams(c.headers,a,d),c.body&&b.getPostParams(c.body,a,d)),d},b.getValues=function(a,c){var d=[];if(c.parameters)for(var e=0;e<c.parameters.length;e++){var f=c.parameters[e];b.parametersValuesByCall[f.id]={};var g=b.getParametersValues(a,f);d.push(g),b.parametersValuesByCall[f.id]=g}return d},b.sortValuesByID=function(a){var b=[],c={};for(var d in a)b.push(d);b.sort();for(var e=0;e<b.length;e++){var f=b[e];a[f]&&(c[f]=a[f])}return c},b.getRowParams=function(a,c){for(var d=[],e=0;e<b.service.length;e++){var f=b.service[e];if(f.zone===a)for(var g=f.calls,h=0;h<g.length;h++){var i=g[h];i.callID===c&&(d=i.params)}}return d},b.getParamValues=function(a){return console.log("id"===a),b.parametersValuesByCall[a]?b.parametersValuesByCall[a]:void 0},b.getValueByID=function(a,c){var d=null;if(b.values[a])for(var e=0;e<b.values[a].length;e++){var f=b.values[a][e];for(var g in f)g===c&&(d=f[g])}return d},b.$watch("newCallParameters.params",function(){if(console.log("watch"),b.newCallValues)for(var a in b.newCallValues)if(b.valueTypes[a]){var c=b.valueTypes[a];console.log("type of "+a+"=== "+c),"INT"===c.toString()?b.newCallValues[a]=b.newCallValues[a].replace(/[^0-9\.]+/g,""):("DOUBLE"===c||"LONG"===c)&&(b.newCallValues[a]=b.newCallValues[a].replace(/[^0-9.,]/g,""))}}),b.getValueType=function(a){var c="";if(b.newCallParameters.params)for(var d=b.newCallParameters.params,e=0;e<d.length;e++){var f=d[e];f.id===a&&(c=f.type)}return c},b.getParamHumanNameByID=function(a,c){var d="";if(b.parameters[a]&&b.parameters[a].params)for(var e=b.parameters[a].params,f=0;f<e.length;f++){var g=e[f];g.id===c&&(d=g.humanName)}return d},b.getParamHumanNameByCallID=function(a){var c=[];if(b.parameters[a]&&b.parameters[a].params){var d=b.parameters[a].params;d.sort();for(var e=0;e<d.length;e++){var f=d[e];c.push(f.humanName)}}return c.sort()},b.getParams=function(a,c){for(var d=[],e=0;e<b.service.length;e++){var f=b.service[e];if(f.zone===a){var g=f.calls;console.log("calls of "+f.zone),console.log(g);for(var h=0;h<g.length;h++){var i=g[h];i.callID===c&&(d=i)}}}return d},b.initParameters=function(a,c){for(var d=0;d<c.length;d++){var e=c[d];if(e.callID){b.parameters[e.callID]=[],b.values[e.callID]=[];var f=b.getParams(a,e.callID);b.parameters[e.callID]=f,b.values[e.callID]=b.getValues(f,e)}}},b.startZone=function(){b.zones=b.getZones(),b.getCalls(b.zones)},b.initNewCallValues=function(a){for(var c=[],d=0;d<a.length;d++)c[a[d].id]="";b.newCallValues=c},b.initValueTypes=function(a){for(var c=[],d=0;d<a.length;d++){var e=a[d];c[e.id]=e.type}b.valueTypes=c},b.getAddNewParamProperties=function(a){var c=b.newCallParameters.params,d={};if(c)for(var e=0;e<c.length;e++){var f=c[e];f.id===a&&(d=f)}return d},b.setOptionInNewCall=function(a,c){if(c)for(var d in b.newCallValues)d===a&&(b.newCallValues[a]=c)},b.validateAddNewCall=function(){var c=b.isFormCompleted(b.newCallValues);if(console.log(b.newCallValues),c===!0){var e=b.buildCall(b.newCallValues);d.addCall(a.token,b.mySelectedCallID,e).then(function(){window.alert("appel ajouté"),b.addNewCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.startZone()},function(a){401===a.status?window.location.href="#/":window.alert("ajout appel echoué")})}else window.alert("Veuillez compléter tous les champs du formulaire ?")},b.isFormCompleted=function(a){var b=!0;for(var c in a)if(""===a[c]||void 0===a[c])return b=!1,void 0;return b},b.cancelAddNewCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler l'ajout d'un nouveau appel ?");a&&(b.addNewCallModal=!1,b.showAddNewCallForm=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null)},b.getNewCallPathParams=function(a){var c="";if(b.newCallParameters.pathParam){var d=b.newCallParameters.pathParam;if(d.length>0){var e="";b.newCallParameters.pathPrefix&&(e+=b.newCallParameters.pathPrefix);for(var f=0;f<d.length;f++)a[d[f]]&&(e+=a[d[f]]+"/");c=e}else b.newCallParameters.pathPrefix&&(c+=b.newCallParameters.pathPrefix)}return c},b.getNewCallPostParams=function(a){var c="";if(b.newCallParameters.postParams){var d=b.newCallParameters.postParams;if(null!==d&&void 0!==d&&d.length>0){for(var e="",f=0;f<d.length;f++){var g=d[f];null!==g&&void 0!==g&&a[g]&&(e+=a[g]+" ")}c=e}}return c},b.getNewCallQueryParams=function(a){var c={};if(b.newCallParameters.queryParam){var d=b.newCallParameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.getNewCallHeaderParams=function(a){var c={};if(b.newCallParameters.headerParam){var d=b.newCallParameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getAddNewParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.buildCall=function(a){var c={path:"",query:{},headers:{},method:"",body:""};return c.path=b.getNewCallPathParams(a),b.newCallParameters.method&&(c.method=b.newCallParameters.method),c.query=b.getNewCallQueryParams(a),c.headers=b.getNewCallHeaderParams(a),c.body=b.getNewCallPostParams(a),c},b.openEditCallModal=function(a,c,d){b.idEditingCall=d,b.mySelectedCallID=c,b.mySelectedZone=a,b.newCallParameters=b.getParams(b.mySelectedZone,b.mySelectedCallID),b.currentCall=b.getCurrentEditingCall(b.mySelectedZone,b.idEditingCall),b.initUpdatedCallValues(b.newCallParameters,b.currentCall),b.initValueTypes(b.newCallParameters.params),b.editCallModal=!0},b.cancelEditCall=function(){var a=window.confirm("Êtes vous sûr de vouloir annuler la modification de l'appel ?");a&&(b.editCallModal=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.idEditingCall=null)},b.getCurrentEditingCall=function(b,c){var d=null;if(a.calls[b])for(var e=a.calls[b],f=0;f<e.length;f++){var g=e[f];if(g.parameters)for(var h=0;h<g.parameters.length;h++){var i=g.parameters[h];i.id===c&&(d=i)}}return d},b.initUpdatedCallPathParams=function(a,b,c){var d=a.split("/");if(d.length>0){var e="";if(b.pathPrefix&&(e=a.substr(0,b.pathPrefix.length),console.log("prefix "+e),b.pathPrefix=e),b.pathParam)if(""!==e)for(var f=0;f<b.pathParam.length;f++)""!==d[f+1]&&(c[b.pathParam[f]]=d[f+1]);else for(var g=0;g<d.length;g++)""!==d[g]&&(c[b.pathParam[g]]=d[g])}},b.initUpdatedCallQueryParams=function(a,b,c){if(b.queryParam&&b.queryParam.length>0){var d=0;for(var e in a)if(b.queryParam[d]){var f=b.queryParam[d];c[f]=a[e],d+=1}}},b.initUpdatedCallHeaderParams=function(a,b,c){if(b.headerParam&&b.headerParam.length>0){var d=0;for(var e in a)if(b.headerParam[d]){var f=b.headerParam[d];c[f]=a[e],d+=1}}},b.initUpdatedCallValues=function(a,c){var d=[];c&&(c.path&&b.initUpdatedCallPathParams(c.path,a,d),c.query&&b.initUpdatedCallQueryParams(c.query,a,d),c.headers&&b.initUpdatedCallHeaderParams(c.headers,a,d),c.body&&b.getPostParams(c.body,a,d)),b.newCallValues=d},b.buildEditCall=function(a){var c={id:"",path:"",query:{},headers:{},method:"",body:""};return c.path=b.getEditCallPathParams(a),c.id=b.idEditingCall,b.newCallParameters.method&&(c.method=b.newCallParameters.method),c.body=b.getEditCallPostParams(a),c.query=b.getEditCallQueryParams(a),c.headers=b.getEditCallHeaderParams(a),c},b.validateEditCall=function(){var c=b.buildEditCall(b.newCallValues);d.updateCall(a.token,b.mySelectedCallID,b.idEditingCall,c).then(function(){window.alert("appel modifié avec succés"),b.editCallModal=!1,b.newCallParameters={},b.newCallValues=[],b.mySelectedCallID=null,b.idEditingCall=null,b.startZone()},function(a){401===a.status?window.location.href="#/":window.alert("la modification de l'appel a echoué")})},b.getEditCallPathParams=function(a){var c="";if(b.newCallParameters.pathParam){var d=b.newCallParameters.pathParam;if(d.length>0){var e="";b.newCallParameters.pathPrefix&&(e+=b.newCallParameters.pathPrefix);for(var f=0;f<d.length;f++)a[d[f]]&&(e+=a[d[f]]+"/");c=e}else b.newCallParameters.pathPrefix&&(c+=b.newCallParameters.pathPrefix)}return c},b.getEditCallQueryParams=function(a){var c={};if(b.newCallParameters.queryParam){var d=b.newCallParameters.queryParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getEditCallParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.getEditCallHeaderParams=function(a){var c={};if(b.newCallParameters.headerParam){var d=b.newCallParameters.headerParam;if(d.length>0)for(var e=0;e<d.length;e++){var f=d[e],g=b.getEditCallParamProperties(f);if(a[f]){var h=g.nameInDB,i=a[f];c[h]=i}}}return c},b.getEditCallPostParams=function(a){var c="";if(b.newCallParameters.postParams){var d=b.newCallParameters.postParams;if(d.length>0){for(var e="",f=0;f<d.length;f++)a[d[f]]&&null!==a[d[f]]&&(e+=a[d[f]]+" ");c=e}}return c},b.getEditCallParamProperties=function(a){var c=b.newCallParameters.params,d={};if(c)for(var e=0;e<c.length;e++){var f=c[e];f.id===a&&(d=f)}return d},b.startZone()}]),angular.module("personalizerApp").directive("tabs",function(){return{templateUrl:"views/tabs.html",restrict:"E",controller:["$scope",function(a){a.isActive=function(b){return a.tab?a.tab===b?"active":"":void 0},a.isClientActive=function(){return a.activeClient?"active":""},a.logout=function(){var a=window.confirm("Êtes vous sûr de vouloir vous déconnecter ?");a&&(window.location.href="#/")}}]}}),angular.module("personalizerApp").controller("ClientCtrl",["$rootScope","$scope","mongoService",function(a,b,c){b.activeClient=!0,void 0===a.services&&(window.location.href="#/perso"),b.zones=[],b.tab="client",b.activeClient=!0,b.properties=[],b.showTime=[],b.calls=[],b.mapOrder=[],b.mapTime=[],b.requestTimeout=[],b.requestUrl=[],b.showSetTimeout=[],b.showSetRequest=[],b.mySelectedCallID=null,b.initZones=function(){for(var c in a.services)for(var d=a.services[c],e=0;e<d.length;e++){var f=d[e];b.zones.indexOf(f.zone)<0&&(b.zones.push(f.zone),b.getProperties(f.zone))}console.log("allZones"),console.log(b.zones)},b.initShowTime=function(a){for(var c in a)b.showTime[c]=!1},b.showTimeEdition=function(a){b.showTime[a]=b.showTime[a]?b.showTime[a]===!1?!0:!1:!0},b.initShowSetTimeout=function(a){b.showSetTimeout[a]=!1},b.showTimeoutEdition=function(a){b.showSetTimeout[a]=b.showSetTimeout[a]?b.showSetTimeout[a]===!1?!0:!1:!0},b.initShowSetRequest=function(a){b.showSetRequest[a]=!1},b.showRequestEdition=function(a){b.showSetRequest[a]=b.showSetRequest[a]?b.showSetRequest[a]===!1?!0:!1:!0},b.getProperties=function(a){c.getClientProperties(a).then(function(c){console.log(c),b.properties[a]=c,c.mapOrder&&(b.mapOrder[a]=c.mapOrder,b.initShowTime(b.mapOrder[a])),c.mapTime&&(b.mapTime[a]=c.mapTime),c.requestTimeout&&(b.requestTimeout[a]=c.requestTimeout,b.initShowSetTimeout(a)),c.requestUrl&&(b.requestUrl[a]=c.requestUrl,b.initShowSetRequest(a))},function(){window.alert("get propriétés de personalisation de "+a+" a échoué")})},b.setTime=function(d,e){if(b.mapTime[d]){var f=b.mapTime[d];if(f[e]){var g=f[e];b.showTime[e]=!1,c.setClientTime(a.token,d,e,g).then(function(a){console.log("set time "+e),console.log(a)},function(){window.alert("set time de  "+e+" a échoué")})}}},b.setCallIdsOrder=function(b,d){c.setCallIDOrder(a.token,b,d).then(function(a){console.log("set callIDs order "+b),console.log(a)},function(){window.alert("set order des callIDs de  "+b+" a échoué")})},b.setRequestTimeout=function(d,e,f){b.showSetTimeout[d]=!1,b.showSetRequest[d]=!1,c.setClientRequest(a.token,d,e,f).then(function(a){console.log("set client request "+d),console.log(a)},function(){window.alert("set request de "+d+" a échoué")})},b.sortDown=function(a,c){if(b.mapOrder[a]){var d=b.mapOrder[a];if(d[c]){var e=d[c],f=!1;for(var g in d){var h=d[g];h===e+1&&(d[g]=e,d[c]=h,f=!0)}f===!0&&(b.mapOrder[a]=d,b.setCallIdsOrder(a,d))}}console.log(c)},b.sortUp=function(a,c){if(b.mapOrder[a]){var d=b.mapOrder[a];if(d[c]){var e=d[c],f=!1;for(var g in d){var h=d[g];h===e-1&&(d[g]=e,d[c]=h,f=!0)}f===!0&&(b.mapOrder[a]=d,b.setCallIdsOrder(a,d))}}console.log(c)},b.isNotFirst=function(a){return a>0},b.sortMapByOrder=function(a){var c=[],d={};for(var e in a)c.push(a[e]);c.sort();for(var f=0;f<c.length;f++){var g=c[f],h=b.getCallIDOfOrder(g,a);""!==h&&(d[g]=h)}return d},b.getCallIDOfOrder=function(a,b){var c="";for(var d in b){var e=b[d];e===a&&(c=d)}return c},b.getFirstIndex=function(a){var c=0;if(b.mapOrder[a]){var d=b.mapOrder[a],e=0;for(var f in d){var g=d[f];0===e?c=g:c>=g&&(c=g),e+=1}}return c},b.hasTimeout=function(a){return b.requestTimeout[a]?!0:!1},b.hasRequestUrl=function(a){return b.requestUrl[a]?!0:!1},b.isNotLast=function(a,c){var d=!0;if(b.mapOrder[a]){var e=b.mapOrder[a],f=b.getLastIndex(a);if(e[c]){var g=e[c];g===f&&(d=!1)}}return d},b.getLastIndex=function(a){var c=0;if(b.mapOrder[a]){var d=b.mapOrder[a],e=0;for(var f in d){var g=d[f];0===e?c=g:g>=c&&(c=g),e+=1}}return c},b.startClient=function(){b.initZones()},b.startClient()}]);