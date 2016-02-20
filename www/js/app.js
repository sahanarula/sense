angular.module('starter', ['ionic', 'starter.FooterController', 'starter.HeaderController', 'starter.MapController', 'starter.ListController', 'starter.directives'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/list')

  $stateProvider.state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapController'
  })

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListController'
  })

})

.run(function($ionicPlatform, $rootScope) {
  getCurrentLocation();
  $rootScope.bluetoothData = [];
  $rootScope.bluetoothData.push('330');
  setInterval(function() {
    $rootScope.$broadcast(UPDATE_BLUETOOTH_DATA, {saha: 'sahanarula'});
  }, 1000);
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      console.log(bluetoothSerial);
      bluetoothSerial.connect('98:D3:31:70:69:49', function(data){
        console.log('bluetooth device is ready');
        bluetoothSerial.subscribe('\n', function (data) {
          console.log(data);
          $rootScope.$broadcast(UPDATE_BLUETOOTH_DATA, data);
        }, function(err) {
          console.log('data is not ready');
        });
      }, function(err) {
        console.log('bluetooth device is not ready');
      });
      StatusBar.styleDefault();
    }
  });
})
