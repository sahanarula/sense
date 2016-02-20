angular.module('starter.HeaderController', [])

.controller('HeaderController', function($scope, $state, $ionicLoading, $window) {
  $scope.goBack = function() {
    $window.history.back();
  }
});
