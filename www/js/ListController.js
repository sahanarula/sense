angular.module('starter.ListController', [])

.controller('ListController', function($scope, $state, $ionicLoading, $rootScope) {
    $scope.geocoder = new google.maps.Geocoder();
    $scope.locations = [];
    $scope.addToList = function(locationWithData) {
      $scope.locations.push(locationWithData);
      $scope.$apply();
    }

    $rootScope.$on(UPDATE_BLUETOOTH_DATA, function(event, data) {
      getCurrentLocation($scope, data, function(locationWithData) {
        $scope.addToList(locationWithData)
      })
    })
});
