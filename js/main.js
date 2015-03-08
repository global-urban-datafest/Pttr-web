smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true,
    callbackBefore: function(toggle, anchor) {},
    callbackAfter: function(toggle, anchor) {}
});
var wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    duration: 14, //duration of chosen animation
    offset: 200, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
    }
});
wow.init();
$(document).ready(function() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
});
//Maps api variables
var map;
var service;
// provides markers for the results of the search and places it on the map
function handleSearchResults(results, status) {
    console.log(results);

    for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker({
            position: results[i].geometry.location,
            map: map,
            icon: results[i].icon
        });
    }
}
//search function that displays what content to show on map.
function performSearch() {
    var request = {
        bounds: map.getBounds(),
        name: "shelters"
    }
    service.nearbySearch(request, handleSearchResults);
}
//main function to show map and utilize nmap with markers and location
function initialize(location) {
    console.log(location);

    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    var mapOptions = {
        center: currentLocation,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map
    });

    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

    $('#refresh').click(performSearch);

}
//retieves your current position
$(document).ready(function() {

    navigator.geolocation.getCurrentPosition(initialize);

});
