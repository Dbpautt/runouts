mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZHJhbmQiLCJhIjoiY2prMHo0anYyMGM2ZjNyb2d3dnJzeGdwdyJ9.iqgOWymsgTo8GAxnO1oMCw';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: { lat: -34.397, lng: 150.644 },
    zoom: 14 // starting zoom
});


// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        map.setCenter(pos);
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
        })
        geocoder.on("result", (data) => {
            console.log(data)
            
            
        })
        
        
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

        geocoder.on('result', function (ev) {
            map.getSource('single-point').setData(ev.result.geometry);
            document.getElementById('place').value = ev.result.geometry.coordinates;
        });

        
        const place = document.getElementById('place').textContent.split(',');
        if(place) {
            let pos = {
                lat: place[1],
                lng: place[0]
            };

            map.setCenter(pos);
            map.flyTo({ center: [pos.lng, pos.lat] });
            map.scrollZoom.disable();
            map.dragPan.disable();
        }
    }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}

// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
map.on('load', function () {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });
    
    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });
    
    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
});
