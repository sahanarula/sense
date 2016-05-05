angular.module('starter', [
  'ionic',
  'starter.FooterController',
  'starter.HeaderController',
  'starter.MapController',
  'starter.ListController',
  'starter.DetailsController',
  'starter.StatsController',
  'starter.directives',
  'ngCordova',
  'chart.js'
  ]
)

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/list')

  $stateProvider.state('map', {
    url: '/map/:latitude/:longitude/:bluetoothData',
    templateUrl: 'templates/map.html',
    controller: 'MapController'
  })

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListController'
  })

  $stateProvider.state('details', {
    templateUrl: 'templates/details.html',
    params: [
      'longitude',
      'latitude',
      'data'
    ],
    controller: 'DetailsController'
  })

  $stateProvider.state('stats', {
    url: '/stats',
    templateUrl: 'templates/stats.html',
    controller: 'StatsController'
  })


})

.run(function($ionicPlatform, $rootScope) {

  io.socket.get('/pollution', function(data){
    $rootScope.$broadcast(UPDATE_SERVER_DATA, data);
  })

  io.socket.on('pollution', function(data){
    console.log(data);
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Pollution Alert",
        text: "Location: " + data.data.location.address.formatted_address,
        data: { location: data.data }
    });
    cordova.plugins.notification.local.on("click", function (data) {
      console.log(location);
      $rootScope.$broadcast(CLICKED_NOTIFICATION, {data});
    });
  })

  $rootScope.sendSocketData = function(data) {
    io.socket.post('/pollution', data);
  }

  //
  // // Add a connect listener
  // socket.on('connect',function() {
  //   console.log('Client has connected to the server!');
  // });
  // // Add a connect listener
  // socket.on('message',function(data) {
  //   console.log('Received a message from the server!',data);
  // });
  // // Add a disconnect listener
  // socket.on('disconnect',function() {
  //   console.log('The client has disconnected!');
  // });

  // Sends a message to the server via sockets
  $rootScope.sendMessageToServer = function(message) {
    socket.send(message);
  };

  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      console.log(bluetoothSerial);
      bluetoothSerial.isEnabled(function() {
        bluetoothSerial.connect('98:D3:31:70:69:49', function(data){
          console.log('bluetooth device is ready');
          bluetoothSerial.subscribe('\n', function (data) {
            $rootScope.bluetoothData = data;
            $rootScope.$broadcast(UPDATE_BLUETOOTH_DATA, data);
            $rootScope.$broadcast(UPDATE_GRAPH, parseInt(data*100));
          }, function(err) {
            console.log('data is not ready');
          });
        }, function(err) {
          console.log('Unable to connect to the bluetooth device');
        });
      }, function() {
        alert('Please turn on your bluetooth');
      });

      StatusBar.styleDefault();
    }
  });
})
