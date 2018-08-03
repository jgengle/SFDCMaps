({
    displayMap: function(component) {

        
        
        var objRecord = component.get("v.simpleRecord");
        var strRecordId = component.get("v.recordId");
        var ObjectName = component.get("v.ObjectName");
        strRecordId = 'w3rwe';
        ObjectName = 'Site__c';
        objRecord = 'test';
        var geoData = [];

        function BuildData(MyObjects) {
            var geoData = [];
            var action;
            var GeoJsonType = '';
            var sFeatureName = MyObjects;
            var strRecordId = '';
            var sFeatureColor = '';
            var fStyle;

            switch (MyObjects) {
                case 'Site':
                    break;
                case 'Well':
                    action = component.get("c.getWell");
                    GeoJsonType = 'MultiLineString';
                    sFeatureColor = 'black';
                    var fStyle = {
                        "style": {
                            "color": sFeatureColor,
                            "weight": 2,
                            "FillOpacity": .01,
                            "fillColor": sFeatureColor
                        }
                    };
                    break;
                case 'Unit':
                    action = component.get("c.getUnit");
                    GeoJsonType = 'MultiPolygon';
                    sFeatureColor = 'white';
                    var fStyle = {
                        "style": {
                            "color": sFeatureColor,
                            "opacity": 1,
                            "FillOpacity": 1,
                            "fillColor": sFeatureColor,
                            "weight": .9
                        }
                    };
                    break;
                case 'Tract':
                    action = component.get("c.getTracts");
                    GeoJsonType = 'MultiPolygon';
                    sFeatureColor = 'yellow';
                    var fStyle = {
                        "style": {
                            "color": sFeatureColor,
                            "opacity": 1,
                            "FillOpacity": 1,
                            "fillColor": sFeatureColor,
                            "weight": .9
                        }
                    };
                    break;
                default:

            }

            action.setParams({
                recordId: strRecordId
            });
            console.log("RowID=>", strRecordId);
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {

                    var MyData = [];

                    MyData.push(response.getReturnValue());
                    geoData = [];
                    console.log('mydata', MyData);

                    if (MyData.length = 1) {

                        _BuildGeoJSon(MyData[0].ArrayGeoJson.SFDCjson);
                    } else {


                    }




                }


                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "title": sFeatureName,
                    },

                    "geometry": {
                        "type": GeoJsonType,
                        "coordinates": geoData
                    }

                };
                console.log('geojson', geojsonFeature);
                window.L.geoJSON(geojsonFeature, fStyle).addTo(map);

                function _BuildGeoJSon(myAr) {
                    for (var i = 0; i < myAr.length; i++) {

                        if (myAr[i].GIS_GEODATA__c != undefined) {
                            var ilength = myAr[i].GIS_GEODATA__c.split(', ').length;
                            var arLine = [];
                            var arPoly = [];
                            for (var x = 0; x < ilength; x++) {

                                var lat = parseFloat(myAr[i].GIS_GEODATA__c.split(', ')[x].split(' ')[1]);
                                var lng = parseFloat(myAr[i].GIS_GEODATA__c.split(', ')[x].split(' ')[0]);
                                arLine.push([lat, lng]);
                            }
                            if (GeoJsonType = 'MultiPolygon') {
                                arPoly.push(arLine);

                                geoData.push(arPoly);

                            } else {
                                geoData.push(arLine);
                            }
                        }

                    }
                }




            });
            $A.enqueueAction(action);




        }




        console.log("helper");

        var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        var grayscale = window.L.tileLayer(mbUrl, {
                id: 'mapbox.light',
                attribution: 'Shalennial Group'
            }),
            satellite = window.L.tileLayer(mbUrl, {
                id: 'mapbox.streets-satellite',
                attribution: 'Shalennial Group'
            }),
            streets = window.L.tileLayer(mbUrl, {
                id: 'mapbox.streets',
                attribution: 'Shalennial Group'
            }),
            Terrain = window.L.tileLayer(mbUrl, {
                id: 'mapbox.pirates',
                attribution: 'Shalennial Group'
            });

        var baseLayers = {
            "Grayscale": grayscale,
            "Satellite": satellite,
            "Streets": streets,
            "Pirate": Terrain
        };

        var map = component.get("v.map");

        console.log("map => ", map);

        if (!map) {

            console.log("ObjectName =>", ObjectName);

            if (objRecord != null) {
                var latitude = 0;
                var longitude = 0;
                console.log("In Object");
                if (objRecord.GIS_GEODATA__c != null) {
                    var str = objRecord.GIS_GEODATA__c;
                    var layer = objRecord.GIS_LayerType__c;
                    var StartPoint = "40.140550610780416 -80.044882659169659";
                    var coords = [];
                    console.log("GEODATA => ", str);
                    console.log("Layer => ", layer);
                    console.log("StartPoint => ", StartPoint);




                    var str_array = StartPoint.split(' ');

                    if (str_array[0] != null && str_array[1] != null) {
                        latitude = str_array[0];
                        longitude = str_array[1];
                    }
                    console.log("latitude => ", latitude);
                    console.log("longitude => ", longitude);
                }
                latitude = 40.1740;
                longitude = -80.2462

                var mapElement = component.find("map").getElement();
                map = window.L.map(mapElement, {

                    zoomControl: true,
                    zoomAnimation: false,
                    fadeAnimation: true,
                    markerZoomAnimation: true,
                    tap: true
                }).setView([latitude, longitude], 8);



                window.L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    attribution: 'Shalennial Group'
                }).addTo(map);

                

                component.set("v.map", map);
//----------BASIN
                  var request = new XMLHttpRequest();
                var BasinUrl = $A.get('$Resource.geojsonMaps') + '/Basin.geojson';
   request.open("GET", BasinUrl, false);
   request.send(null)
   var BasinJson = JSON.parse(request.responseText);
                //console.log(my_JSON_object);
          var LayerBasin = window.L.geoJSON(BasinJson, {
        onEachFeature: onEachFeature
    } ).addTo(map);      
                //location = JSON.parse(location);
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup("<b>" + feature.properties.basin + "</b>");
        layer.setStyle({color: "blue", weight: .5});
    }
}
        //https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/expr_resource_value_provider.htm
        //create build on thread
        //        
                //------------END BASIN
                //
                //------------COUNTY
                   var CountyRequest = new XMLHttpRequest();
                var CountyUrl = 'https://jgengle.github.io/SFDCMaps/UsCounty.geojson';
   CountyRequest.open("GET", CountyUrl, false);
   CountyRequest.send(null)               
    var CountyJson = JSON.parse(CountyRequest.responseText);
           console.log(CountyJson)     ;
                var LayerCounty = window.L.geoJSON(CountyJson, {style: {color: "yellow", weight: .5}}).addTo(map);
                
                //------------END COUNTY
                //
                //
                var overlays ={
                    'County' : LayerCounty,
                    'Basin' : LayerBasin
                    
                };
                
                window.L.control.layers(baseLayers, overlays).addTo(map);
                //window.L.control.Layers.addOverlay(LayerCounty, 'County');
              
//http://www.digital-geography.com/geojson-with-qgis-and-leaflet-from-data-to-map/
                var options = {
                    modal: true,
                    title: "Box area zoom"
                };

                var control = L.control.zoomBox(options);
                map.addControl(control);
				//L.control.shapefile({ position: 'topleft' }).addTo(map);
				//
				//window.L.geoJSON(GeoData).addTo(map);

                function GotoCurLoc() {



                    map.locate({
                            setView: true,
                            watch: false
                        })
                        .on('locationfound', function(e) {
                            var marker = L.marker([e.latitude, e.longitude]);
                            var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
                                weight: 1,
                                color: 'blue',
                                fillColor: '#cacaca',
                                fillOpacity: 0.2
                            });
                            map.addLayer(marker);
                            map.addLayer(circle);
                        })
                        .on('locationerror', function(e) {
                            console.log(e);
                            alert("Location access denied.");
                        });

                }


                //
                //-------------------




                //FULLSCREEN DATA
                // map.addControl(new L.Control.Fullscreen());
                // map.on('fullscreenchange', function() {
                //  console.log('fullscreen function');
                //  if (map.isFullscreen()) {
                //   console.log('entered fullscreen');
                //} else {
                //  console.log('exited fullscreen');
                // }
                // });
                //FULLSCREEN END    


                //----------TESTTING----------
                //getRelatedItems
                //String recordId, String SourceObject
                console.log("----------DEBUG----------------");

                //not working ?
                var actions = component.get("c.getRelatedItems");
                actions.setParams({
                    recordId: component.get("v.recordId"),
                    SourceObject: component.get("v.ObjectName")
                });
                console.log("-----------TEST---------------", actions);
                actions.setCallback(this, function(response) {
                    console.log("-----------IN TEST---------------");
                    console.log("Not Firing", response);
                    var state = response.getState();
                    console.log("test STATE", state);
                    if (state === "SUCCESS") {

                        var MyData = [];
                        var strGeoData;
                        var GeoData;

                        var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
                        
                        MyData.push(response.getReturnValue());
var str_array = MyData[0].StartPoint.split(' ');

map.setView([str_array[1], str_array[0]], 13);                        
                        //GeoStartingPoint(MyData[0].GeoStartingPoint);
                        console.log(MyData[0]);
                        strGeoData = JSON.stringify(MyData[0].Well_features);
                        strGeoData = '{\"type\": \"FeatureCollection\",\"features\": [' + strGeoData + '] }';
                        strGeoData = strGeoData.split("|\",\"|").join(",");
                        strGeoData = strGeoData.split("\",\"|").join("");
                        strGeoData = strGeoData.split("\[\"|").join("");
                        strGeoData = strGeoData.split("|\"\]").join("");
                        strGeoData = strGeoData.split("\\").join("");
                        GeoData = JSON.parse(strGeoData);
                        console.log("well features", GeoData);
                        window.L.geoJSON(GeoData, {style: {color: "red", weight: 1.5}}).addTo(map);
                        
                        strGeoData = JSON.stringify(MyData[0].Site_features);
                        strGeoData = '{\"type\": \"FeatureCollection\",\"features\": [' + strGeoData + '] }';
                        strGeoData = strGeoData.split("|\",\"|").join(",");
                        strGeoData = strGeoData.split("\",\"|").join("");
                        strGeoData = strGeoData.split("\[\"|").join("");
                        strGeoData = strGeoData.split("|\"\]").join("");
                        strGeoData = strGeoData.split("\\").join("");
                        GeoData = JSON.parse(strGeoData);
                        console.log("site features", GeoData);
                        window.L.geoJSON(GeoData).addTo(map);


                        strGeoData = JSON.stringify(MyData[0].Unit_features);
                        strGeoData = '{\"type\": \"FeatureCollection\",\"features\": [' + strGeoData + '] }';
                        strGeoData = strGeoData.split("|\",\"|").join(",");
                        strGeoData = strGeoData.split("\",\"|").join("");
                        strGeoData = strGeoData.split("\[\"|").join("");
                        strGeoData = strGeoData.split("|\"\]").join("");
                        strGeoData = strGeoData.split("\\").join("");
                        console.log("Unit String", strGeoData);
                        GeoData = JSON.parse(strGeoData);
                        console.log("Unit features", GeoData);
                        window.L.geoJSON(GeoData, {style: {color: "yellow", weight: 1}}).addTo(map);                     
                        //geojson style : https://leafletjs.com/examples/geojson/
                        //
//var mapElement = component.find("map").getElement();


                        
                    } else {
                        console.log("err", response.getError());

                    }
                });
                //var tGeo = [];

                console.log("--------------------------");
               //uncommnet to get data froms server
                // $A.enqueueAction(actions);

                //
                //----------END----------


            }
        }
    }
})
//zOOM BOX DOC
//https://github.com/consbio/Leaflet.ZoomBox
//
//https://leaflet-extras.github.io/leaflet-providers/preview/
