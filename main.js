
// const data = require('./meteorite-strike-data.json');
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

// let marker = L.marker([0, 0]).addTo(map);  
    
window.onload= function() {
    Particles.
    init
    ({
      
    // normal options
      selector: '.background' ,
      maxParticles: 450,
      connectParticles:true,
      
    // options for breakpoints
    responsive: [
        {
          breakpoint:768,
          options: {
            maxParticles: 200,
            color: '#97ff7d',
            connectParticles: false
          }
        },
        {
          breakpoint: 425,
          options: {
            maxParticles: 100,
            connectParticles: true
          }
        },
        {
         breakpoint: 320,
          options: {
            maxParticles: 0
    // disables particles.js
          }
        }
      ]
    });
};






const api_url="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";


var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature,layer) {
    const lat = feature.properties.reclat;
    const long = feature.properties.reclong;
    const name = feature.properties.name;
    const mass = feature.properties.mass;
    const fall = feature.properties.fall;
    const nametype = feature.properties.nametype;
    const recclass = feature.properties.recclass;
    const year = feature.properties.year;
    layer.bindPopup('Name: '+name+'<br>'+'Mass: '+mass+'<br>'+'Fall: '+fall+'<br>'+'Nametype: '+nametype+'<br>'+'Recclass: '+recclass+'<br>'+'Reclat: '+lat+'<br>'+'Reclong: '+long+'<br>'+'Year: '+year);
    layer.on('mouseover', function (e) {
        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });

}

$.getJSON(api_url, function(data) {
    L.geoJSON(data.features,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: Math.sqrt(parseInt(feature.properties.mass))/100 +3,
                fillColor: "#fffc33",
                color: "#000",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.6
            });
        },
        onEachFeature: onEachFeature
    }).addTo(map);
    // for(objects in data){
    // }
});

