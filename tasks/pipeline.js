var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/angular-material/angular-material.min.css',
  'bower_components/angular-ui-grid/ui-grid.min.css',
  'components/**/*.css',
  'custom.css'
];

var jsFilesToInject = [
  'bower_components/lodash/dist/lodash.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-lodash-module/angular-lodash-module.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-material/angular-material.min.js',
  'bower_components/angular-messages/angular-messages.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/angular-ui-grid/ui-grid.min.js',
  'bower_components/moment/min/moment.min.js',
  'bower_components/angular-moment/angular-moment.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/tv4/tv4.js',
  'bower_components/objectpath/lib/ObjectPath.js',
  'bower_components/angular-schema-form/dist/schema-form.min.js',
  'bower_components/angular-schema-form/dist/bootstrap-decorator.min.js',
  'bower_components/spin.js/spin.js',
  'bower_components/angular-spinner/angular-spinner.min.js',
  'bower_components/angular-loading-spinner/angular-loading-spinner.js',
  'app.js',
  'components/**/*.js'
];

var templateFilesToInject = [
  '**/*.html'
];

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});