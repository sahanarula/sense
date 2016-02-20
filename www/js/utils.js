var ADD_TO_LIST = 'ADD_TO_LIST';
var CALL_CENTER_ON_ME = 'CALL_CENTER_ON_ME';
var UPDATE_BLUETOOTH_DATA = 'UPDATE_BLUETOOTH_DATA';

var notInArray = function(scope, address) {
  for(var i=0; i<scope.locations.length; i++) {
    if(scope.locations[i].address.formatted_address === address) return false;
  }
  return true;
}

var getCurrentLocation = function (scope, data, callback) {
  navigator.geolocation.getCurrentPosition(function (position) {
    scope.geocoder.geocode({ 'latLng': {lat: position.coords.latitude, lng: position.coords.longitude} }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1] && notInArray(scope, results[1].formatted_address)) {
                callback({data: data, location: position, address: results[1]});
            }
        }
    });
  }, function (error) {
    alert('Unable to get location: ' + error.message);
  });
}
