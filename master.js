function include(file) {

	let script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;

	document.getElementsByTagName('head').item(0).appendChild(script);

}

/* Include Many js files */
include('maps/mapAltishka.js');
include('maps/mapAbdul.js');
include("maps/mapThisara.js");
include('maps/mapAdheeksha.js');
include('maps/mikhail-map.js');
include('maps/map.js');
include('items.js');
include('script.js');


