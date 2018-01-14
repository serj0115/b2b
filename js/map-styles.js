google.maps.event.addDomListener(window, 'load', init);

    function init() {

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(55.7709186,37.6653081), 
        styles: [
          {
            "featureType": "administrative"  },{
          }
        ]
    };
        var image = new google.maps.MarkerImage('images/pin_onmap_icon.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            new google.maps.Size(18, 31),
            // The origin for this image is 0,0.
            new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            new google.maps.Point(0,0)
        );
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.770102, 37.664545),
            map: map,
            icon: image
        });
    }