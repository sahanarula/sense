angular.module('starter.MapController', [])

.controller('MapController', function($scope, $rootScope, $state, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
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

    $scope.markers = [];

    $scope.changeView = function(data) {
      $state.go('list');
    }

    $scope.addMarker = function (lat, lng) {
      var marker = new google.maps.Marker({
        map: $scope.map,
        position:  new google.maps.LatLng(lat, lng)
      });
      marker.addListener('click', $scope.changeView);
      $scope.markers.push(marker);
    };

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
