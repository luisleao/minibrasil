
	var map;
	var geocoder;

	var mapBounds;
	var markers = [];
	var infoWindows = [];
	var show_tip = {};




	// Enable the visual refresh
	google.maps.visualRefresh = true;



	var estados = [
		{ "sigla": "RS", "name": "Rio Grande do Sul", "location": { "lng": -51.229153, "lat": -30.033915 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SC", "name": "Santa Catarina", "location": { "lng": -48.543736, "lat": -27.593237 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PA", "name": "Paraná", "location": { "lng": -49.271469, "lat": -25.433170 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MS", "name": "Mato Grosso do Sul", "location": { "lng": -54.612236, "lat": -20.461720 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MT", "name": "Mato Grosso", "location": { "lng": -56.094894, "lat": -15.598917 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "GO", "name": "Goiás", "location": { "lng": -49.255032, "lat": -16.679920 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "DF", "name": "Distrito Federal", "location": { "lng": -47.863712, "lat": -15.799830 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MG", "name": "Minas Gerais", "location": { "lng": -43.940102, "lat": -19.918339 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "ES", "name": "Espirito Santo", "location": { "lng": -40.336296, "lat": -20.319933 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RJ", "name": "Rio de Janeiro", "location": { "lng": -43.177139, "lat": -22.908892 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SP", "name": "São Paulo", "location": { "lng": -46.633106, "lat": -23.550484 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PI", "name": "Piauí", "location": { "lng": -42.810154, "lat": -5.092628 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "CE", "name": "Ceará", "location": { "lng": -38.521778, "lat": -3.730536}, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RN", "name": "Rio Grande do Norte", "location": { "lng": -35.207977, "lat": -5.786403 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PB", "name": "Paraíba", "location": { "lng": -34.876209, "lat": -7.120034 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PE", "name": "Pernambuco", "location": { "lng": -34.881256, "lat": -8.054278 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AL", "name": "Alagoas", "location": { "lng": -35.737957, "lat": -9.667137 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SE", "name": "Sergipe", "location": { "lng": -37.053452, "lat": -10.912647 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "BA", "name": "Bahia", "location": { "lng": -38.512383, "lat": -12.970382 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RO", "name": "Rondônia", "location": { "lng": -63.903942, "lat": -8.764597 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AC", "name": "Acre", "location": { "lng": -67.812752, "lat": -9.972463 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AM", "name": "Amazonas", "location": { "lng": -60.020164, "lat": -3.133842 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RR", "name": "Roraima", "location": { "lng": -60.672062, "lat": 2.821734 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PA", "name": "Pará", "location": { "lng": -48.503071, "lat": -1.452005 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AP", "name": "Amapá", "location": { "lng": -51.050098, "lat": 0.039045 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "TO", "name": "Tocantins", "location": { "lng": -48.333652, "lat": -10.184567 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		//TODO: falta MARANHÃO!!!
	]



	var siglas = {
		"RS": {},
		"SC": {},
		"PA": {},
		"MS": {},
		"MT": {},
		"GO": {},
		"DF": {},
		"MG": {},
		"ES": {},
		"RIO DE JANEIRO": {},
		"SÃO PAULO": {},
		"PR": {},
		"PI": {},
		"CE": {},
		"RN": {},
		"PB": {},
		"PE": {},
		"AL": {},
		"SE": {},
		"BA": {},
		"RO": {},
		"AC": {},
		"AM": {},
		"RR": {},
		"PA": {},
		"AP": {},
		"TO": {},
		"MA": {}
	};


	for (sigla in siglas) {
		siglas[sigla].pib = Math.floor(Math.random() * 5000000);
	}



	var MY_MAPTYPE_ID = 'custom_style';
	var featureOpts = [
		{
		"featureType": "administrative.neighborhood",
		"stylers": [
		{ "visibility": "off" }
		]
		},{
		"featureType": "road",
		"stylers": [
		{ "visibility": "off" }
		]
		},{
		"featureType": "landscape",
		"stylers": [
		{ "visibility": "off" },
		{ "gamma": 1 }
		]
		},{
		"featureType": "water",
		"stylers": [
		{ "visibility": "simplified" }
		]
		},{
		"featureType": "administrative.locality",
		"stylers": [
		{ "visibility": "off" }
		]
		},/*{
		"featureType": "administrative.province",
		"elementType": "geometry.stroke",
		"stylers": [
		{ "visibility": "off" },
		{ "invert_lightness": true },
		{ "color": "#c46680" }
		]
		}*/
	];


	/*
	var heatMapData = [
		{location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
		new google.maps.LatLng(37.782, -122.445),
		{location: new google.maps.LatLng(37.782, -122.443), weight: 2},
		{location: new google.maps.LatLng(37.782, -122.441), weight: 3},
		{location: new google.maps.LatLng(37.782, -122.439), weight: 2},
		new google.maps.LatLng(37.782, -122.437),
		{location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

		{location: new google.maps.LatLng(37.785, -122.447), weight: 3},
		{location: new google.maps.LatLng(37.785, -122.445), weight: 2},
		new google.maps.LatLng(37.785, -122.443),
		{location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
		new google.maps.LatLng(37.785, -122.439),
		{location: new google.maps.LatLng(37.785, -122.437), weight: 2},
		{location: new google.maps.LatLng(37.785, -122.435), weight: 3}
	];

	*/



	jQuery(document).ready(function($) {

		$('.carousel').carousel({interval: false, wrap: true}).carousel(0);

		$('#carousel-desafios').on('slid.bs.carousel', function () {
			showDesafioTip();
		})

		$("#modal-start").modal({backdrop: "static", keyboard: false, show: true}).on('hidden.bs.modal', function () {
			$("#carousel-desafios").fadeIn("slow");
			showDesafioTip();
		})




	});



	function showDesafioTip(){
		var idx = $('#carousel-desafios').find('.carousel-inner .item.active').index();
		console.log(idx);

		if (!show_tip[idx]) {
			$("#desafio-tip").modal({backdrop: false, keyboard: false, show: true}).on('hidden.bs.modal', function () {
				//TODO: mostrar botao "AJUDA"
				show_tip[idx] = true;

			})
		}

	}


	function initializeMap() {


		var brazil = new google.maps.LatLng(-13.724711186422933, -47.29408309863281);
		var mapOptions = {
			maxZoom: 7, 
			minZoom: 5,
			zoom: 5,
			center: brazil,
			mapTypeControl: false,
			panControl: false,
			scaleControl: false,
			streetViewControl: false,
			//zoomControl: false,
			//mapTypeControlOptions: { mapTypeIds: [MY_MAPTYPE_ID]},
			mapTypeId: MY_MAPTYPE_ID,
			navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },

		}


		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		//desativar movimentação e zoom
		//map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

		geocoder = new google.maps.Geocoder();

		var customMapType = new google.maps.StyledMapType(featureOpts, { name: 'Mapa' });

		map.mapTypes.set(MY_MAPTYPE_ID, customMapType);



		//loadKml();
		//generateHeatmap();

		/*
		mapBounds = map.getBounds();
		for(var i=0; i<20; i++) {
		console.log("marker ", i);
		addMarker(10, new google.maps.LatLng(getRandom_position(mapBounds)));
		}
		*/



		google.maps.event.addDomListener(map, 'click', function(event){
			addMarker(Math.floor(Math.random() * 10)+1, event.latLng);
			for (idx in infoWindows) {
				infoWindows[idx].close();
			}
		});


		map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('carousel-desafios'));
		map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('desafios-itens'));


	}
	//{location: new google.maps.LatLng(37.785, -122.447), weight: 3}


	google.maps.event.addDomListener(window, 'load', initializeMap);




	var icon_green = "img/peao_ok.png"; //http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2&scale=1";
	var icon_red = "img/peao_erro.png"; //"https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1";
	var icon_grey = "img/peao_inativo.png"; 





  function addMarker(value, position) {
    console.log("marker value ", value);

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      //animation: google.maps.Animation.DROP,
      crossOnDrag: false,
      icon: icon_grey
      //flat: true,
    });

    marker.value = value;
    marker.infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'dragend', function(){
    	geocodeMarker(this);
    });
    google.maps.event.addListener(marker, 'click', function(event){
    	if (this.infoWindow) this.infoWindow.open(map, this);
    });
    geocodeMarker(marker);
    
    markers.push(marker);
    infoWindows.push(marker.infoWindow);
  }

  function markerMoved() {
    geocodeMarker(this);
    //alert("marcador selecionado tem " + this.value);
  }


  function geocodeMarker(marker) {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results.length >= 2) {
            //TODO: verificar se lista de estados esta OK
            //TODO: trocar cor do icone para OK ou ERRO

            var resultado = results[results.length - 2];
            console.log(results);

            var estado = resultado.address_components[0].long_name;
            var estado_sigla = resultado.address_components[0].short_name.toUpperCase();
            var txt = estado_sigla + " "; //"estado: " + estado + " - " + estado_sigla + "<br/>" + marker.value + "<br/>" + resultado.formatted_address + "<br/>";

            if (siglas[estado_sigla]) {
              txt += "" + siglas[estado_sigla].pib;
            	marker.setIcon(icon_green); //'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1');


            } else {
            	marker.setIcon(icon_red);
            	txt = "";
            }

            if (marker.infoWindow) {
              marker.infoWindow.setContent(txt);
              //marker.infoWindow.open(map, marker);
            }



          } else {
            //alert('No results found');
            if (marker.infoWindow) marker.infoWindow.close();
            marker.setIcon(icon_red); 
            //TODO: trocar cor do icone para ERRO
          }
        } else {
          if (marker.infoWindow) marker.infoWindow.close();
	      marker.setIcon(icon_red); 
          //alert('Geocoder failed due to: ' + status);
          //TODO: trocar cor do icone para ERRO
        }
      });    
  }










function getRandom_position(bounds) {
  var leftBottom=[bounds.getSouthWest().lat(),bounds.getSouthWest().lng()]
  var rightTop=[bounds.getNorthEast().lat(),bounds.getNorthEast().lng()]
  var latlng= [
    leftBottom[1]+Math.floor(Math.random() * (rightTop[1]-leftBottom[1])),
    leftBottom[0]+Math.floor(Math.random() * (rightTop[0]-leftBottom[0]))
    ];
  return latlng
 }













      function loadKml() {
        var ctaLayer = new google.maps.KmlLayer({
          url: 'http://apps.thacker.com.br/quentefrio/kml/estados_geocommons.kml?dmy=3',
          suppressInfoWindows: true,
          preserveViewport: true
        });
        ctaLayer.setMap(map);

        google.maps.event.addListener(ctaLayer, 'click', function(kmlEvent) {
          console.log(kmlEvent.featureData.name);
          window.kmlEvent = kmlEvent;
          var latLng = new google.maps.LatLng(kmlEvent.latLng)
          alert("Você escolheu " + kmlEvent.featureData.name + "\n" + kmlEvent.latLng.toUrlValue());
        });
      }


      function generateHeatmap() {
        heatmap = new google.maps.visualization.HeatmapLayer({
          radius: 150,
          maxIntensity: 5000000,
          opacity: .8
        });

        heatmap.setMap(map);
        
        changeHeatmap();
        setInterval(changeHeatmap, 200);

      }


      function changeHeatmap() {
          var heatMapData = [];
          for (idx in estados) {
            var estado = estados[idx];
            var location = new google.maps.LatLng(estado.location.lat, estado.location.lng);

            heatMapData.push({
              location: location,
              weight: Math.floor(Math.random()*5000000) //estado.pib
            })
          }
          heatmap.setData(heatMapData);
      }



      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      function changeGradient() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        heatmap.setOptions({
          gradient: heatmap.get('gradient') ? null : gradient
        });
      }

      function changeRadius() {
        heatmap.setOptions({radius: heatmap.get('radius') ? null : 20});
      }

      function changeOpacity() {
        heatmap.setOptions({opacity: heatmap.get('opacity') ? null : 0.2});
      }



//http://geocommons.com/maps/14061.kmz
//http://www.gmapas.com/poligonos-ibge/poligonos-estados-do-brasil
//http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html

//http://apps.thacker.com.br/quentefrio/kml/estados_geocommons.kmz



// https://sites.google.com/site/arletemeneguette/kml/Estados.kml?attredirects=0&d=1
//g090c3bc4a7de6fc2








function setRectangle(center){
    var scale = Math.pow(2,map.getZoom());
    var proj = map.getProjection();
    var wc = proj.fromLatLngToPoint(center);
    var bounds = new google.maps.LatLngBounds();
    var sw = new google.maps.Point(((wc.x * scale) - 50)/ scale, ((wc.y * scale) - 50)/ scale);
    bounds.extend(proj.fromPointToLatLng(sw));
    var ne = new google.maps.Point(((wc.x * scale) + 50)/ scale, ((wc.y * scale) + 50)/ scale);
    bounds.extend(proj.fromPointToLatLng(ne));
    var opts = {
        bounds: bounds,
        map: map,
        editable:true
    }
    var rect = new google.maps.Rectangle(opts);

}


