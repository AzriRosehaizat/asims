var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/angular-ui-grid/ui-grid.css',
  'components/**/*.css'
];

var jsFilesToInject = [
  'dependencies/sails.io.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-ui-grid/ui-grid.js',
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