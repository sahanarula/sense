angular.module('starter.MapController', [])

.controller('MapController', function($scope, $rootScope, $state, $ionicLoading, $stateParams) {
  $scope.markers = [];

  $rootScope.$on(CLICKED_NOTIFICATION, function(event, data){
    console.log(JSON.parse(data.data.data));
    $scope.setMarkerOnSelectedLocation(parseFloat(JSON.parse(data.data.data).location.location.latitude), parseFloat(JSON.parse(data.data.data).location.location.longitude))
  });

  $scope.changeView = function (state) {
    $state.go(state, { latitude: $stateParams.latitude, longitude: $stateParams.longitude, data: $stateParams.bluetoothData});
  }

  $scope.setMarkerOnSelectedLocation = function (latitude, longitude) {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting selected Location...',
      showBackdrop: false
    });

    $scope.options = {scrollwheel: true};

    $scope.map.setCenter(new google.maps.LatLng(latitude, longitude));
    $scope.loading.hide();
    $scope.addMarker(latitude, longitude);

  }

  $scope.mapCreated = function(map) {
    $scope.map = map;

    $scope.addMarker = function (lat, lng) {
      var marker = new google.maps.Marker({
        map: $scope.map,
        position:  new google.maps.LatLng(lat, lng)
      });
      marker.addListener('click', function() {
        $scope.changeView('details');
      });
      $scope.markers.push(marker);
    };

    $scope.setMarkerOnSelectedLocation($stateParams.latitude, $stateParams.longitude);
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    $scope.options = {scrollwheel: true};

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
      $scope.addMarker(pos.coords.latitude, pos.coords.longitude);
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
  $rootScope.$on(CALL_CENTER_ON_ME, function(){
     $scope.centerOnMe();
  });
});
