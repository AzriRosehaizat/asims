var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/angular-ui-grid/ui-grid.css',
  'bower_components/angular-xeditable/dist/css/xeditable.css',
  'components/**/*.css'
];

var jsFilesToInject = [
  'dependencies/sails.io.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/angular-ui-grid/ui-grid.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/moment/min/moment.min.js',
  'bower_components/angular-moment/angular-moment.min.js',
  'bower_components/angular-xeditable/dist/js/xeditable.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/tv4/tv4.js',
  'bower_components/objectpath/lib/ObjectPath.js',
  'bower_components/angular-schema-form/dist/schema-form.min.js',
  'bower_components/angular-schema-form/dist/bootstrap-decorator.min.js',
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