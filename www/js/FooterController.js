angular.module('starter.FooterController', [])

.controller('FooterController', function($scope, $rootScope, $state, $ionicLoading) {
  $scope.centerOnMe = function () {
     $rootScope.$emit(CALL_CENTER_ON_ME, {});
  };
});
