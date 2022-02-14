
// create the map, the icon and the marker
var map = L.map('map').setView([0, 0], 3);

var myIcon = L.icon({
    iconUrl: 'ISS_logo.svg',
    iconSize: [40, 80],
    iconAnchor: [20, 40]
});

var marker = L.marker([0,0],{icon: myIcon}).addTo(map);


// download the map image
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// request the iss information
const apiURL = "https://api.wheretheiss.at/v1/satellites/25544";
let latitude, longitude, altitude, velocity;

async function getData() {

    let prevLat = latitude;
    let prevLng = longitude;

    const response = await fetch(apiURL);
    const data = await response.json();
    latitude = data.latitude;
    longitude = data.longitude;
    altitude = data.altitude;
    velocity = data.velocity;

    // render map and marker position
    map.setView([latitude, longitude]);
    marker.setLatLng([latitude,longitude]);

    if ( cont!=0 && ( cont==1 || cont%21==0) ) {
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
    document.getElementById("alt").innerText = Math.trunc(altitude);
    document.getElementById("vel").innerText = Math.trunc(velocity);

    cont++;
}

let cont = 0;
setSizeMap();
getData();
setInterval(getData,1000);

// resize map when window size changes

window.addEventListener("resize", () => {
    setSizeMap();
});

function setSizeMap() {
    if (window.innerWidth < 530) {
        if (window.innerWidth < window.innerHeight) { 
            // vertical position
            document.querySelector("#map").style.width = "calc( 100% )";
            document.querySelector("#map").style.height = "calc( ( 100vw - 30px ) * 3 / 5 )";
        } else {
            // landed
            document.querySelector("#map").style.width = "calc( 100% - 30px )";
            document.querySelector("#map").style.height = "calc( ( 100vw - 30px - 30px ) * 3 / 5 )";
        }
    } else {
        document.querySelector("#map").style.width = "calc( 500px )";
        document.querySelector("#map").style.height = "calc( 300px )";
    }
}
