// Configuration carte t fond de carte
var map = L.map('map', {
center: [48.11, -1.65],
zoom: 13 });

// Ajouter des fonds de carte
var baselayers = {
  
    OrthoRM:L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',

{layers: 'raster:ortho2021', attribution : 'Rennes Métropole'}).addTo(map),
  
OSM: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
 
Topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
maxZoom: 17,
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}),
 
Cycle: L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
maxZoom: 20,
attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),

Geoportail: L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 19,
	format: 'image/jpeg',
	style: 'normal'
}),
  
 sombre : L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20

})};


//Fond unique
baselayers.OSM;


// Ajouter l'echelle cartographique
L.control.scale();

// contneu popup

var popupSIGAT = '<h1>Université Rennes 2 </h1> <br> <img src="https://esigat.wordpress.com/wp-content/uploads/2025/11/whatsapp-image-2025-09-19-a-15.39.53_ec27dad0.jpg?w=1024" width="350px">';

// dimension des popups

var customOptions = {'maxWidth': '500', 'className' : 'custom'}

// Ajout picto

var sigat2 = L.icon({
iconUrl: 'https://ville-saint-gobain.fr/wp-content/uploads/2023/02/logo-ecole.png',
iconSize: [50, 40] });

//contenu popup

var rennes2 = L.marker([48.119, -1.7013],{icon: sigat2}).bindPopup(popupSIGAT,customOptions);

// contneu popup 2

var popupSNCF = '<h1>Gare de Rennes </h1> <br> <img src="https://www.sncf-connect.com/assets/media/2021-09/tgv-inoui-train-gare.jpg" width="350px">  </a> <iframe width="350" height="315" src="https://www.youtube.com/embed/rZRnza6_Rjg?si=7YqiHXgWT97QoE6L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

// dimension des popups 2

var customOptions = {'maxWidth': '500', 'className' : 'custom'}

// Ajout picto 2 

var train = L.icon({
iconUrl: 'https://www.sncf-connect.com/assets/media/2021-09/tgv-inoui-train-gare.jpg',
iconSize: [50, 40] });

//contenu popup 2 

var sncf = L.marker([48.10348020140587, -1.6721195561333058],{icon: train}).bindPopup(popupSNCF,customOptions).addTo(map);

// déclarer les couches à affiche 
var Traffic = L.tileLayer.wms
('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{
  layers: 'trp_rout:v_rva_trafic_fcd',
  format: 'image/png',
  transparent: true
}
);

// déclarer les couches à affiche 2
var ICU = L.tileLayer.wms
('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{
  layers: 'raster:icu_intense_2022',
  format: 'image/png',
  transparent: true
}
);

// déclarer les couches à affiche 3
var trame = L.tileLayer.wms
('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{
  layers: 'res_eclai:trame_noire',
  format: 'image/png',
  transparent: true
}
);

// Ajout des Stations de vélos

var url = 'https://raw.githubusercontent.com/mastersigat/data/main/velostar.geojson';
$.getJSON(url, function (geojson) {
var velos = L.geoJson(geojson, {// Transformer les marqueurs en point
pointToLayer: function (geoJsonPoint, latlng) {
return L.circleMarker(latlng);
},
// Modifier la symbologie des points
style: function (geoJsonFeature) {
return {
fillColor: '#b7f24b',
radius: 6,
fillOpacity: 1,
stroke: false};
},
}).addTo(map);
  
  // Ajout Popup
velos.bindPopup(function(velos) {console.log(velos.feature.properties);
return "<h1> Station : "+velos.feature.properties.nom+"</h1>"+"<hr><h2>"
+velos.feature.properties.nombreemplacementstheorique+ "&nbsp; vélos</h2>" ;
});
  
});


var couches = {
  "Trafic en temps réel" : Traffic,
  "Ilot de chaleur urbain" : ICU,
  "Salle Sigat" : rennes2,
  "Gare" : sncf,
  "Trame noire" : trame
  };

// Ajouter le controleur de couches 2
L.control.layers(baselayers, couches, {position: 'topleft', collapsed : true }).addTo(map);