
// create the map, the icon and the marker
var map = L.map('map').setView([0, 0], 3);

var myIcon = L.icon({
    iconUrl: 'myMarker.jpg',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

var marker = L.marker([0,0],{icon: myIcon}).addTo(map);


// download the map image
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// request the iss information
const apiURL = "https://api.wheretheiss.at/v1/satellites/25544";
let latitude, longitude;

async function getData() {

    let prevLat = latitude;
    let prevLng = longitude;

    const response = await fetch(apiURL);
    const data = await response.json();
    latitude = data.latitude;
    longitude = data.longitude;

    // render map and marker position
    map.setView([latitude, longitude]);
    marker.setLatLng([latitude,longitude]);

    if (cont!=0 && ( cont==1 || cont%21==0) ) {
        var circle = L.circle([prevLat,prevLng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10
        }).addTo(map);
    }

    // render iss information
    document.getElementById("lat").innerText = latitude.toFixed(2);
    document.getElementById("lon").innerText = longitude.toFixed(2);

    cont++;
}

let cont = 0;
getData();
setInterval(getData,1000);


