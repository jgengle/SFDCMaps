({



    
  displayMap: function(component) {

      
      
      
          window.onbeforeunload = function() {
   
   // console.log('windowUnload');
    // localStorage.setItem(name, $('#inputName').val());
   // localStorage.setItem(email, $('#inputEmail').val());
   // localStorage.setItem(phone, $('#inputPhone').val());
   // localStorage.setItem(subject, $('#inputSubject').val());
   // localStorage.setItem(detail, $('#inputDetail').val());
   // // ...
}
      

var MapRecordID;
    var objRecord = component.get("v.simpleRecord");
    var strRecordId = component.get("v.recordId");
    var ObjectName = component.get("v.ObjectName");
   // strRecordId = 'w3rwe';
   // ObjectName = 'Site__c';
    //objRecord = 'test';
    var geoData = [];
var StrPt;



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
  
    //console.log("map => ", map);

    if (!map) {

      //console.log("ObjectName =>", ObjectName);




      var mapElement = component.find("map").getElement();
      console.log(StrPt);
        if (!StrPt)
        {
            console.log("no zoom");
      map = window.L.map(mapElement, {
        zoomControl: true,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true,
        tap: true
      }).setView([38.642763, -98.327818 ], 4.5);

        }
        else{
            
            console.log("animate zoom");
      //   map.setView([-98.08799676, 35.81547203], map.getZoom(), {
 // "animate": true,
 // "pan": {
  //  "duration": 10
 // }
//});   
            
        }
            
   //window.L.control.layers.addBaseLayer(streets, "streets");

      window.L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Shalennial Group'
      }).addTo(map);



      component.set("v.map", map);

      var GitHub = 'https://jgengle.github.io/SFDCMaps/';

      //----------BASIN
      //
      //
      //localStorage.setItem("dataCache", "s");
      //
      // LoadLayer("Basin.geojson", "yellow");
      //LoadLayer("DemoLaterals.geojson", "green");  
      //         LoadLayer("DealTypeArea.geojson","red");
      //       LoadLayer("DemoTracts.geojson","purple");
      //  window.setTimeout(function(){LoadLayer("Basin.geojson", "yellow");}, 1);         
      // window.setTimeout(function(){LoadLayer("DemoLaterals.geojson", "green");}, 1); 
      // window.setTimeout(function(){LoadLayer("DealTypeArea.geojson","red");}, 1); 
      // window.setTimeout(function(){LoadLayer("DemoTracts.geojson","purple");}, 1); 
      // 
      // 

      // async function(){LoadLayer("DemoLaterals.geojson", "green");}

      //  var p1 = new Promise(function(resolve, reject) {
      //   console.log(Date.now());
      //    async function(){LoadLayer("DemoLaterals.geojson", "green");}
      //  });
      //  var p2 = new Promise(function(resolve, reject) {
      //       console.log(Date.now());
      //     LoadLayer("Basin.geojson", "yellow");
      //    });                      


      //  Promise.all([

      // LoadLayer("Basin.geojson", "yellow");
      //await Promise.all([LoadLayer("DemoLaterals.geojson", "green"),  LoadLayer("Basin.geojson", "yellow")]);
      //])    
      var layerControl = window.L.control.layers(null, null, {
        collapsed: false
      }).addTo(map);
                  

                  
                  
      setTimeout(function() {        LoadLayer("Basin.geojson", "#808080", "basin", true);      }, 1000);
      setTimeout(function() {        LoadLayer("Formations.geojson", "#FF7FED", "formation", true);      }, 2000);
      //setTimeout(function() {        LoadLayer("DemoLaterals.geojson", "#404040");      }, 3000);      
      setTimeout(function() {        LoadLayer("DealTypeArea.geojson", "#FF5B5B", "Name", true);      }, 3100);
      setTimeout(function() {        LoadLayer("DemoTracts.geojson", "#4CA300", "uid",  true);      }, 3500);
      //setTimeout(function() {        LoadLayer("Pads.geojson", "#4CA300");      }, 3250);
      //setTimeout(function() {        LoadLayer("Units.geojson", "#4CA300");      }, 3750);
             setTimeout(function() {        ZoomTo();      }, 4000);      



      function LoadLayer(LayerGeoJson, MyColor, Label, addToMap) {
            
        var Title = LayerGeoJson.replace('.geojson', '');
        var CachedJson = (localStorage[LayerGeoJson] == "true");
        if (!CachedJson) {

          var request = new XMLHttpRequest();
            var LayerBasin;
          var BasinUrl = GitHub + LayerGeoJson;
          request.open("GET", BasinUrl, false);
          request.send(null)
          var BasinJson = JSON.parse(request.responseText);
          //localStorage[LayerGeoJson] = BasinJson;
            localStorage.setItem(LayerGeoJson, BasinJson);
            console.log("not Cached");
        } else {
          var BasinJson = CachedJson;
console.log("Cached");
        }
        //layer style
        var startStyle = {
          color: MyColor,
          weight: 1
        };

        if (!Label) {
          LayerBasin = window.L.geoJSON(BasinJson, {
            style: startStyle
          });
        } else {
          LayerBasin = window.L.geoJSON(BasinJson, {
            style: startStyle,
            onEachFeature: onEachFeatureClosure(Label, Title)
          });

            
            if(addToMap) {LayerBasin.addTo(map);}
            
        }

        layerControl.addOverlay(LayerBasin, Title);

      }

      function onEachFeatureClosure(_Label, _tile) {
       
        return function onEachFeature(feature, layer) {
          if (feature.properties) {
         //console.log("Label=>",_Label);
         // console.log("Title=>",_tile);
            //layer.bindTooltip("Test");
            
             // layer.bindTooltip(lab);
             // layer.on('click', function (e) {
                //  alert(feature.properties.UID);
                                             
               //                              });
              
              layer.on('click', function(e){
                  console.log(e);
                //  target.options.style.weight = 4;
                  var lab;
              lab  = '<b>' + _tile + '</b> ' + feature.properties[_Label];
                  if (feature.properties.UID) { lab = lab + '<br><b>UID</b> ' + feature.properties.UID }
                       var foo;
                  console.log('before call', MapRecordID);
                  //GetUrl(feature.properties.UID);
                  var ListGuid='';
                 
                  switch (feature.properties[_Label]) {
                      case 'Gulf Coast 1' :
                          ListGuid ='00Bq000000183OPEAY';
                          break;
                      case 'Delaware 2':
                          ListGuid ='00Bq000000183OKEAY';
                          break;
                      case 'Delaware 1':
                          ListGuid ='00Bq000000183OFEAY';
                          break;
                      case 'STACK 1':
                          ListGuid ='00Bq000000183OAEAY';
                          break;
                      case 'Denver 1':
                          ListGuid ='00Bq000000183O0EAI';
                          break;
                  }
                  
                  
                  if (ListGuid){
                      lab = lab + '<br><a href="https://shalennialpool--machoman.lightning.force.com/lightning/o/Deal__c/list?filterName='+ ListGuid +'" class="speciallink">View Deals</a>';
                  }
                  
                  console.log(lab);
                   var popup = L.popup()
   						.setLatLng(e.latlng) 
   						.setContent(lab)
   						.openOn(map);
                  
                 
             
         
                
                  
           
                  
              });
              
              
              function GetUrl (_uid){
                  	 var action = component.get("c.getRecordId");
                      $A.enqueueAction(action);
                      //  console.log("teset",_uid);
                  //String UID, String ObjectName
                 action.setParams({
                UID: _uid, 
                                  ObjectName: 'Deal_Type_Area__c'
            });
                 
                  var CALL = action.setCallback(this, function(response) {
                    //  console.log(response.getReturnValue());
                    //  
                      MapRecordID = '';
                      MapRecordID = response.getReturnValue();
console.log('call', MapRecordID);
                      
                  
                  });

  
                                      
                  
               
              }
          //  layer.bindTooltip(lab,  {permanent: false, direction:"center", style :{color : "green"}});
           // 
             //layer.label = 'test';
              
              //feature.properties[_Label]
          }
        }
      }

      
        function ZoomTo(){
            console.log('zoom');
            console.log(ObjectName);
            var action = component.get("c.getStartPoint");
                 $A.enqueueAction(action);
                 switch (ObjectName){
                  case 'Tract__c':
                  
                   
               
                      //  console.log("teset",_uid);
                  //String UID, String ObjectName
                 action.setParams({
                RowID: strRecordId, 
                                  ObjectName: 'Tract__c'
            });
                 
                  action.setCallback(this, function(response) {
                    //  console.log(response.getReturnValue());
                    //  
                      StrPt = response.getReturnValue();
                  console.log(StrPt);
              //    
              
                      
var latitude = StrPt.split(" ")[1];
var longitude = StrPt.split(" ")[0];
                      
                      map.flyTo([latitude, longitude], 12, {
   animate: true,
        duration: 2.5
});
      
                  
                //  
                  }  );
                 }
      
            
            
        }      
      //------------END BASIN
      //
      //------------COUNTY
      //  var CountyRequest = new XMLHttpRequest();
      //  var CountyUrl = 'https://jgengle.github.io/SFDCMaps/UsCounty.geojson';
      // CountyRequest.open("GET", CountyUrl, false);
      // CountyRequest.send(null)
      // var CountyJson = JSON.parse(CountyRequest.responseText);
      // console.log(CountyJson);//
      //var LayerCounty = window.L.geoJSON(CountyJson, {
      // style: {
      //              color: "yellow",
      //          //    weight: .5
      //   }
      // }).addTo(map);

      //------------END COUNTY

      // var overlays = {
      //    'County': LayerCounty,
      //  'Basin': LayerBasin

      // };


      //window.L.control.Layers.addOverlay(LayerCounty, 'County');

      //http://www.digital-geography.com/geojson-with-qgis-and-leaflet-from-data-to-map/
      var options = {
        modal: true,
        title: "Box area zoom"
      };

      var control = L.control.zoomBox(options);
      map.addControl(control);
 

    }






  }

});
//zOOM BOX DOC
//https://github.com/consbio/Leaflet.ZoomBox
//
//https://leaflet-extras.github.io/leaflet-providers/preview/
