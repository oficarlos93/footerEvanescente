// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})//Fin run

.config(function($stateProvider, $urlRouterProvider,$translateProvider) {
      for(lang in translations){
		$translateProvider.translations(lang, translations[lang]);
	}
	
	$translateProvider.preferredLanguage('es');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'index.html',
                controller: 'homeCtrl'
            })
            
        $urlRouterProvider.otherwise('/');
    })

.controller('homeCtrl',["$scope","$rootScope", "$ionicGesture","$ionicPopup","$http","$translate",
function($scope,$rootScope,$ionicGesture,$ionicPopup,$http,$translate){
  $scope.slide=false;
  $scope.gesture = {
    used: ''
  };
  
  //Gestos
  $scope.onGesture = function(gesture) {
    $scope.gesture.used = gesture;
    console.log(gesture);
    $scope.hidden = false;
    if(gesture=="Swipe Up"){
      $scope.showClass = "contenedor-menu-show"
      $scope.showCapaOscurecer = "capaoscurecer-show"
    }
    if(gesture=="Swipe Down"){
        $scope.showClass = "";
        $scope.showCapaOscurecer = ""
    }
  }
  $scope.cambiaIdioma = function(){
    if(window.localStorage.getItem("lang")=="es")
    window.localStorage.setItem("lang","en");
    else window.localStorage.setItem("lang","es");
    window.location.reload();
  }

  //Obtener datos JSON
  $scope.result = "";
  $http.get('json/datos.json')
  //$http.get('http://ofimenutesting.cloudapp.net/api/sincronizacion/sincronizacioninicial/88/000')
    .success(function(data, status, headers,config){
      
      $scope.result = data.Idiomas; // for UI
      
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });

  //Popup
 $scope.showPopup = function() {
 
  var myPopup = $ionicPopup.show({
    title :'Seleccione un Idioma',
    templateUrl : 'templates/popup.html',
    
    scope: $scope,
    buttons: [
      { text: 'Cancel',
       type: 'button-assertive'
     }
    ]
	});
    
}
//Banderas
$scope.flag="http://ofimenutesting.cloudapp.net/content/Images/flags/es.svg";
  $scope.seleccionarBandera = function(idioma,lang){
     
    console.log(idioma);
    $scope.flag=(idioma);
    console.log(lang);
    //ChangeLanguage(lang);
 $translate.use(lang);

  }
  
  $rootScope.ChangeLanguage = function (lang) {
		
   $translate.use(lang);
		
	}
  
}]); //Fin Controller
