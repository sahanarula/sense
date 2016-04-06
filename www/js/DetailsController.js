angular.module('starter.DetailsController', [])

.controller('DetailsController', function($scope, $rootScope, $state, $ionicLoading, $stateParams) {
  $scope.geocoder = new google.maps.Geocoder();
  console.log($stateParams)
  $scope.detailsData = $stateParams.data;
  
  $scope.sendAlert = function() {
    console.log($stateParams);
    console.log($rootScope);
    getCurrentLocationName($scope, {latitude: $stateParams.latitude, longitude: $stateParams.longitude}, function(location) {
      $rootScope.sendSocketData({location, $stateParams})
    })
  }
});
