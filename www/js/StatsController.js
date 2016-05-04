angular.module('starter.StatsController', [])

.controller('StatsController', function($scope, $state, $ionicLoading, $rootScope, $interval) {
    $scope.series = ['Pollution PPM'];
    $scope.data = [[]];
    $scope.labels = [];

    var maximum = document.getElementById('chart-container').clientWidth / 50 || 300;
    console.log(maximum)
    $rootScope.$on(UPDATE_GRAPH, function(event, data) {
        if ($scope.data[0].length) {
          $scope.labels = $scope.labels.slice(1);
          $scope.data[0] = $scope.data[0].slice(1);
        }
        while ($scope.data[0].length < maximum) {
          var a = new Date();
          $scope.labels.push(a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds());
          console.log(data);
          $scope.data[0].push(data);
        }
        $scope.$apply()
    })

    $scope.options = {
      animation: false,
      // showScale: false,
      showTooltips: false,
      pointDot: false,
      datasetStrokeWidth: 0.5
    };

    // Update the dataset at 25FPS for a smoothly-animating chart
    // $interval(function () {
    //   getLiveChartData();
    // }, 40);
    //
    // function getLiveChartData () {
    //   if ($scope.data[0].length) {
    //     $scope.labels = $scope.labels.slice(1);
    //     $scope.data[0] = $scope.data[0].slice(1);
    //   }
    //   while ($scope.data[0].length < maximum) {
    //     $scope.labels.push('');
    //     $scope.data[0].push(getRandomValue($scope.data[0]));
    //   }
    // }

    function getRandomValue (data) {
        var l = data.length, previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 9 - 5;
        return y < 0 ? 0 : y > 9 ? 9 : y;
      }
});
