function include(file) {

	let script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;

	document.getElementsByTagName('head').item(0).appendChild(script);

}

/* Include Many js files */
include('mapAbdul.js');
include("mapThisara.js");
include('mapAdheeksha.js');
include('mikhail-map.js');
include('map.js');
include('items.js');
include('script.js');


