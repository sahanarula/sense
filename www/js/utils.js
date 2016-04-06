var ADD_TO_LIST = 'ADD_TO_LIST';
var CALL_CENTER_ON_ME = 'CALL_CENTER_ON_ME';
var UPDATE_BLUETOOTH_DATA = 'UPDATE_BLUETOOTH_DATA';
var CLICKED_NOTIFICATION = 'CLICKED_NOTIFICATION';
var UPDATE_SERVER_DATA = 'UPDATE_SERVER_DATA';

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
            if (results[0] && notInArray(scope, results[1].formatted_address)) {
                callback({data: data, location: position, address: results[1]});
            }
        }
    });
  }, function (error) {
    alert('Unable to get location: ' + error.message);
  });
}

var getCurrentLocationName = function(scope, pos, callback) {
  scope.geocoder.geocode({ 'latLng': {lat: parseFloat(pos.latitude), lng: parseFloat(pos.longitude)} }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
              callback({ location: pos, address: results[0]});
          }
      }
  })
}
