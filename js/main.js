
	var map;
	var geocoder;

	var mapBounds;
	var markers = [];
	var infoWindows = [];
	var show_tip = {};


	var desafio_atual = null;

	// Enable the visual refresh
	google.maps.visualRefresh = true;



	//OK: incluir zoom, minZoom, maxZoom e center em cada desafio

	//TODO: conteudo da infoWindow do marcador
	//TODO: na #base incluir item "desafio concluído" para os com 100% de acerto
	//TODO: incluir resultado final do jogo (qual Estado mais errou, qual acertou, tempo de jogo)

//x.setAnimation(google.maps.Animation.BOUNCE); x.setIcon(icon_red);









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


	function loadChallenge(challenge_url) {

		for (idx in markers) {
			markers[idx].setMap(null);
		}
		markers = [];

		$('#desafios-titulo, #desafios-itens').html("&nbsp;");


		jQuery.getJSON(challenge_url, function(data){
			desafios = data;
			preparaInterface();

			$("#modal-start").modal("hide");
		});

	}

	jQuery(document).ready(function($) {



		//inicializar mapa
		//exibir tela inicial com descrição do game
		//carregar dados do game
		//gerar controles dos desafios


		google.maps.event.addDomListener(window, 'load', initializeMap);

		$('.carousel').carousel({interval: false, wrap: true}).carousel(0);


		/* MODAIS */

		$("#modal-start").modal({backdrop: "static", keyboard: false, show: false}).on('hidden.bs.modal', function () {
			map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('desafios-titulo'));
			map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('desafios-itens'));
			$("#carousel-desafios").fadeIn("slow");
			$("#desafios-titulo, #desafios-itens").fadeIn("slow");
			$("#base").fadeIn("slow");

			definirDesafio();
		});
		$("#desafio-dica").modal({backdrop: false, keyboard: false, show: false}).on('hidden.bs.modal', function () {
			//TODO: mostrar botao "AJUDA" que abre esse modal novamente.
			//desafio_atual.exibiu_dica = true;
		});
		$("#desafio-resultado").modal({backdrop: false, keyboard: true, show: false});
		$("#desafio-resposta").modal({backdrop: false, keyboard: true, show: false});



		// carregar lista de desafios disponiveis
		jQuery.getJSON("js/desafios.json", function(data){
			lista_desafios = data;

			$("#lista_desafios").empty();
			for (idx in lista_desafios) {
				var desafio_item = lista_desafios[idx]
				var item = $(document.createElement("a"));
				item.addClass("btn btn-mediun btn-info btn-block").text(desafio_item.nome);
				item.click(function(e) {
					e.preventDefault();
					loadChallenge(desafio_item.url)
				});

				$("#lista_desafios").append(item);
			}
			$("#modal-start").modal("show");
		});







		//carregar desafio padrão
		//loadChallenge("js/data.json");

		// carregar desafio via url em input de texto
		$("#btn_carregardesafio").click(function(e) {
			e.preventDefault();
			if ($("#txt_desafiourl").val() == "")
				return;

			loadChallenge($("#txt_desafiourl").val());
		});





		$("#btnFinalizarDesafio").click(function(e){
			e.preventDefault();

			$("#mensagem_ok, #mensagem_erro").hide();

			if (!desafio_atual) return;

			for (idx in desafio_atual.valores) {
				desafio_atual.valores[idx].marcador_selecionado = 0;
			}

			for (idx in desafio_atual.marcadores) {
				var marker = desafio_atual.marcadores[idx];
				if (!marker.geocoded) {
					$("#mensagem_erro h3").text("Você precisa posicionar os marcadores em vermelho!");
					$(".btn_verresultado").hide();
					$("#mensagem_erro").show();
					$("#desafio-resultado").modal("show");
					return;
				}
				if (marker.selecao && desafio_atual.valores[marker.selecao])
					desafio_atual.valores[marker.selecao].marcador_selecionado ++;
			}

			var errou = false;
			var itens_errados = 0;

			for (idx in desafio_atual.valores) {
				var item = desafio_atual.valores[idx];
				item.erro = Math.abs(item.marcador_total - item.marcador_selecionado) > 0;
				if (Math.abs(item.marcador_total - item.marcador_selecionado) > 0) {
					errou = true;
					itens_errados++;
				}
			}


			var percentual_acerto = (Object.keys(desafio_atual.valores).length - itens_errados) / Object.keys(desafio_atual.valores).length * 100;
			if (percentual_acerto >= 50) {
				//permitir ver resultado
				$("#mensagem_erro h3").text("Alguns itens estão posicionados incorretamente! Você pode ver a resposta agora ou corrigir e tentar acertar.");
				//$(".btn_verresultado").show();

			} else {
				//não permitir ver resultado
				$("#mensagem_erro h3").text("Muitos itens estão errados. Não desanime! Você pode tentar novamente.");
				//$(".btn_verresultado").hide();
			}
			$(".btn_verresultado").show();

			if (itens_errados == 0) $("#mensagem_ok").show();
			if (itens_errados != 0) $("#mensagem_erro").show();

			$("#desafio-resultado").modal("show");
		})


	});




	function mostrarResultadoFinal() {
		//TODO: tela final com resultados
	}

	function mostrarResultadoDesafioAtual() {
		//listar dados de cada Estado e mostrar na tabela
		if (!desafio_atual)
			return;

		$("#desafio-resposta h1").text(desafio_atual.nome);
		$("#desafio-resposta table tbody").empty();

		for (idx in desafio_atual.valores) {
			var item = desafio_atual.valores[idx];

			var row = $("<tr/>");
			row.append($("<td/>").text(item.nome));
			row.append($("<td/>").text(item.valor_real + " " + desafio_atual.medida));
			row.append($("<td/>").text(item.marcador_selecionado));
			row.addClass(item.erro ? "danger" : "success");

			$("#desafio-resposta table tbody").append(row);

		}


		$("#desafio-resposta").modal("show");

	}






	// incluir comandos para os botoes .btn_proximodesafio #btn_corrigir e #btn_verresultado
	$("#btn_corrigir").click(function(e) {
		e.preventDefault();
		$("#desafio-resultado").modal("hide");
	});

	$(".btn_proximodesafio").click(function(e) {
		e.preventDefault();
		$("#desafio-resultado").modal("hide");

		var eh_ultimo_desafio = desafios.current + 1 == desafios.lista.length;
		if (eh_ultimo_desafio) {
			//TODO: EXIBIR RESULTADO FINAL!!!

			//XXX

			mostrarResultadoFinal();


		} else {
			// exibir próximo desafio
			desafios.current++;
			definirDesafio();
		}
	});

	$(".btn_verresultado").click(function(e){ 
		e.preventDefault();
		mostrarResultadoDesafioAtual()
	});


	function definirDesafio() {

		desafio_atual = desafios.lista[desafios.current];

		var eh_ultimo_desafio = desafios.current + 1 == desafios.lista.length;
		// .btn_proximodesafio precisa ser RESULTADO FINAL se for o ultimo desafio!
		$(".btn_proximodesafio").text(eh_ultimo_desafio ? "RESULTADO FINAL" : "PRÓXIMO DESAFIO");

		// exibir apenas marcadores do desafio atual
		if (desafio_atual) {
			for (idx in markers) {
				var marker = markers[idx];
				marker.setVisible(marker.desafio.id == desafio_atual.id);
				if (marker.infoWindow) marker.infoWindow.close();
			}
		}

		// verificar total de marcadores e exibir indicador da base com o total disponivel
		var total_marcadores = desafio_atual.marcador_total - desafio_atual.marcadores.length;
		if (total_marcadores > 0) {
			$("#marcadores_pendentes").text(total_marcadores + " x");
			if (!$("#base li").first().is(":visible")) {
				$("#base li").last().fadeOut(function(){
					$("#base li").first().fadeIn();
				});
			}
		} else {
			if (!$("#base li").last().is(":visible")) {
				$("#base li").first().fadeOut(function(){
					$("#base li").last().fadeIn();
				});
			}
		}

		if (desafio_atual.minZoom) map.setOptions({"minZoom": desafio_atual.minZoom});
		if (desafio_atual.maxZoom) map.setOptions({"maxZoom": desafio_atual.maxZoom});
		if (desafio_atual.zoom) map.setZoom(desafio_atual.zoom);
		if (desafio_atual.geo) setTimeout(function(){ //efeito de movimento
			map.panTo(new google.maps.LatLng(desafio_atual.geo[0], desafio_atual.geo[1]));
		}, 1000);



		$("#desafios-titulo, #desafio-dica h1").text(desafio_atual.nome);
		$("#desafio-dica #ajuda").text(desafio_atual.ajuda);

		$("#desafio-dica #fonte").text(desafio_atual.fonte).attr("href", desafio_atual.fonte);
		$("#desafio-dica #criadopor").text(desafio_atual.criadopor);
		$("#desafio-dica #tags").text(desafio_atual.tags);

		if ($("#desafios-itens .active").length > 0)
			$("#desafios-itens .active").removeClass("active");

		$($("#desafios-itens li").get(desafios.current)).addClass("active");
		$("#marcadores_pendentes").text(desafio_atual.marcador_total - desafio_atual.marcadores.length + " x");


		//mostrar dica
		if (!desafio_atual.exibiu_dica) {
			$("#desafio-dica").modal("show");
		}

	}


	function preparaInterface() {

		$("#desafios-itens").empty();

		for (idx in desafios.lista) {
			var desafio = desafios.lista[idx];
			var numero = parseInt(idx) + 1;
			var item = $(document.createElement("li")).text(numero).attr("data-content", desafio.nome); //.attr("data-content", desafio.nome.split(":")[1]);
			$("#desafios-itens").append(item);
		}


		$("#desafios-itens").on("click", "li", function() {
		    desafios.current = $(this).index();
		    definirDesafio();
		});

		$("#desafios-itens li").popover({placement: "right", trigger: "hover"});

		$("#base li").first().show();
		$("#desafios-titulo, #desafios-itens").hide();

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
		addMarker(10, new google.maps.LatLng(getRandom_position(mapBounds)));
		}
		*/


		google.maps.event.addDomListener(map, 'click', function(event){
			for (idx in infoWindows) {
				infoWindows[idx].close();
			}

			if (!desafios) return;
			var desafio_atual = desafios.lista[desafios.current];

			if (desafio_atual.marcadores.length < desafio_atual.marcador_total)
				addMarker(Math.floor(Math.random() * 10)+1, event.latLng);

			$("#marcadores_pendentes").text(desafio_atual.marcador_total - desafio_atual.marcadores.length + " x");

			if (desafio_atual.marcadores.length == desafio_atual.marcador_total) {
				//TODO inverter exibição da base
				$("#base li").first().fadeOut(function(){
					$("#base li").last().fadeIn();
				});

			}

		});




	}
	//{location: new google.maps.LatLng(37.785, -122.447), weight: 3}




	var icon_green = "img/peao_ok.png"; //http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2&scale=1";
	var icon_red = "img/peao_erro.png"; //"https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1";
	var icon_grey = "img/peao_inativo.png"; 
	var icon_sombra = "img/peao_sombra.png"; 





  function addMarker(value, position) {

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      //animation: google.maps.Animation.DROP,
      crossOnDrag: false,
      icon: icon_grey,
      shadow: icon_sombra
      //flat: true,
    });

    marker.value = value;
    marker.desafio = desafios.lista[desafios.current];
    marker.selecao = null;
    marker.infoWindow = new google.maps.InfoWindow();
    marker.geocoded = false;

    google.maps.event.addListener(marker, 'dragstart', function(){
    	marker.setIcon(icon_grey);
    });

    google.maps.event.addListener(marker, 'dragend', function(){
    	geocodeMarker(this);
    });
    google.maps.event.addListener(marker, 'click', function(event){
    	if (!marker.geocoded) {
    		geocodeMarker(marker);
    	} else {
    		//ocultar outras infoWindows abertas
    		for (idx in markers) {
    			if (markers[idx].infoWindow)
    				markers[idx].infoWindow.close();
    		}
			if (this.infoWindow) this.infoWindow.open(map, this);
    	}
    });
    geocodeMarker(marker);
    
    markers.push(marker);
    desafios.lista[desafios.current].marcadores.push(marker);
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
          	console.log("resultados GEOCODE: ", results);

            var resultado = results[results.length - 2];

            var estado = resultado.address_components[0].long_name;
            var estado_sigla = resultado.address_components[0].short_name.toUpperCase();
            var txt = "";

            if (desafio_atual.valores[estado_sigla]) {
            	//TODO: incluir texto correto!!!
              	txt += "" + desafio_atual.valores[estado_sigla].nome;
            	marker.setIcon(icon_green); //'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1');
    			marker.geocoded = true;
				marker.selecao = estado_sigla;

            } else {
            	marker.setIcon(icon_red);
            	marker.geocoded = false;
            	txt = "";
				marker.selecao = null;
            }

            if (marker.infoWindow) {
              marker.infoWindow.setContent(txt);
            }


          } else {
            //alert('No results found');
            if (marker.infoWindow) marker.infoWindow.close();
            marker.setIcon(icon_red); 
            marker.geocoded = false;
			marker.selecao = null;

          }
        } else {
          if (marker.infoWindow) marker.infoWindow.close();
	      marker.setIcon(icon_red); 
	      marker.geocoded = false;
		  marker.selecao = null;
          //alert('Geocoder failed due to: ' + status);

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









/*



      function loadKml() {
        var ctaLayer = new google.maps.KmlLayer({
          url: 'http://apps.thacker.com.br/quentefrio/kml/estados_geocommons.kml?dmy=3',
          suppressInfoWindows: true,
          preserveViewport: true
        });
        ctaLayer.setMap(map);

        google.maps.event.addListener(ctaLayer, 'click', function(kmlEvent) {
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

*/





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


