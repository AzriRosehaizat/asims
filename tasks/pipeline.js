var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/angular-material/angular-material.css',
  'bower_components/angular-ui-grid/ui-grid.css',
  'components/**/*.css',
  'custom.css'
];

var jsFilesToInject = [
  'bower_components/lodash/dist/lodash.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-lodash-module/angular-lodash-module.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/angular-aria/angular-aria.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-material/angular-material.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-ui-grid/ui-grid.js',
  'bower_components/moment/moment.js',
  'bower_components/angular-moment/angular-moment.js',
  'bower_components/angular-sanitize/angular-sanitize.js',
  'bower_components/tv4/tv4.js',
  'bower_components/objectpath/lib/ObjectPath.js',
  'bower_components/angular-schema-form/dist/schema-form.js',
  'bower_components/angular-schema-form/dist/bootstrap-decorator.js',
  'bower_components/spin.js/spin.js',
  'bower_components/angular-spinner/angular-spinner.js',
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