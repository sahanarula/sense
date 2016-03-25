angular.module('starter', ['ionic', 'starter.FooterController', 'starter.HeaderController', 'starter.MapController', 'starter.ListController', 'starter.DetailsController', 'starter.directives', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/list')

  $stateProvider.state('map', {
    url: '/map/:latitude/:longitude',
    templateUrl: 'templates/map.html',
    controller: 'MapController'
  })

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListController'
  })

  $stateProvider.state('details', {
    url: '/details',
    templateUrl: 'templates/details.html',
    controller: 'DetailsController'
  })

})

.run(function($ionicPlatform, $rootScope) {

  $rootScope.bluetoothData = [];
  $rootScope.bluetoothData.push('330');
  setInterval(function() {
    $rootScope.$broadcast(UPDATE_BLUETOOTH_DATA, {saha: 'sahanarula'});
  }, 1000);
  $ionicPlatform.ready(function() {
    console.log(cordova)
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Pollution Alert",
        text: "Location: Bommanahalli",
        data: { meetingId:"123#fg8" }
    });
    if(window.StatusBar) {
      console.log(bluetoothSerial);
      // bluetoothSerial.connect('98:D3:31:70:69:49', function(data){
      //   console.log('bluetooth device is ready');
      //   bluetoothSerial.subscribe('\n', function (data) {
      //     $rootScope.$broadcast(UPDATE_BLUETOOTH_DATA, data);
      //     console.log(data);
      //   }, function(err) {
      //     console.log('data is not ready');
      //   });
      // }, function(err) {
      //   console.log('bluetooth device is not ready');
      // });
      StatusBar.styleDefault();
    }
  });
})
