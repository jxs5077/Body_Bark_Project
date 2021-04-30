var myMap = L.map("map", {
    center: [39.7392, -104.9903],
    zoom: 10
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoianhzNTA3NyIsImEiOiJja242dXhrbnowaHpmMnBsZzh5dTMyZ3JsIn0.74d8rK1nIz_ftE7KPsCieQ"
}).addTo(myMap);

d3.csv('resources/zipsheatmap.csv').then(function(data) {
     console.log(data)



    var heatArray = []
    data.forEach(function(one_sale) {
        heatArray.push([one_sale.lat, one_sale.lng, one_sale.num])
        
    })
    console.log(heatArray)
    L.heatLayer(heatArray, {
        radius: 100,
        blur: 35,
        maxIntensity: 88,
        opacity: 1,
        dissipating: true
        
    })
    .addTo(myMap)

});
