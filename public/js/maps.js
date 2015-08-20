function initialize() {
  var myLatlng = new google.maps.LatLng(31.339562, -113.541470);
  var mapOptions = {
    scrollwheel: false,
    zoom: 6,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Desertech </h1>' +

      '<div id="bodyContent">'+
      '<p><b>Desertech </b> Puerto Peñasco, Sonora México</b>' +
      '<div id="siteNotice">'+
      '</div>'+
      'Avenida Constitución entre ' +
      'callejón Cabrales y Figueroa, ' +
      'CP. 83552, #385-B. '+
      '</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Oficina'
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

