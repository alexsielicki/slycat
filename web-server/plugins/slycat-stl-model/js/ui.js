define('slycat-stl-model', ['slycat-web-client', 'knockout', 'knockout-mapping', 'URI', 'domReady!'], function(client, ko, mapping, URI) {
  ko.applyBindings({}, document.getElementById('slycat-3d-viewer-container'));
});