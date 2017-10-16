'strict'

var js = {
	log: $log,
	event: $event
}
if ( typeof window === "object" && typeof window.document === "object" ) {
	window['js'] = js;
}
