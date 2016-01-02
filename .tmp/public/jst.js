this["JST"] = this["JST"] || {};

this["JST"]["assets/components/admin/admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div ui-view="details"></div>';

}
return __p
};

this["JST"]["assets/components/content/content.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div ui-view="grid"></div>\n<div ui-view="details"></div>\n<div ui-view="tabset"></div>';

}
return __p
};

this["JST"]["assets/components/details/details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<br>\n<div class="jumbotron" ></div>';

}
return __p
};

this["JST"]["assets/components/grid/grid.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div ui-grid="gridOptions" class="grid"></div>';

}
return __p
};

this["JST"]["assets/components/loginButton/loginButton.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a ui-sref="application.root" type="button" class="btn btn-primary">\n    Log In\n</a>';

}
return __p
};

this["JST"]["assets/components/loginModal/loginModal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-header">\n    <button class="close" type="button" ng-click="cancel()"> x </button>\n    <h3 class="modal-title">\n        Log In\n    </h3>\n</div>\n<div class="modal-body" style="text-align:center;">\n     <form name="userForm" >\n        <div class="control-group">\n            <label class="control-label">Name</label>\n            <div class="controls">\n                <input type="text" name="username" ng-model="user.username" required>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">Password</label>\n            <div class="controls">\n                <input type="text" name="password" ng-model="user.password" required>\n            </div>\n        </div>\n        <br>\n    </form>\n</div>\n<div class="modal-footer" style="text-align:center;">\n    <button class="btn btn-primary" ng-click="submit()">Submit</button>\n</div>\n';

}
return __p
};

this["JST"]["assets/components/navigationBar/navigationBar.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default navbar-static" role="navigation">\n    <div class="container-fluid">\n        <div class="navbar-header">\n            <button class="navbar-toggle" type="button" ng-click="isCollapsed = !isCollapsed">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a ui-sref="application.root" class="navbar-brand">\n                University of Winnipeg - ASIMS\n            </a>\n        </div>\n        <div uib-collapse="isCollapsed" class="navbar-collapse bs-js-navbar-collapse">\n            <ul class="nav navbar-nav">\n                <li><a ui-sref="application.professor">Professor</a></li>\n            </ul>\n        </div><!-- /.nav-collapse -->\n    </div><!-- /.container-fluid -->\n</nav>';

}
return __p
};

this["JST"]["assets/components/tabset/tabset.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<uib-tabset>\n    <uib-tab ng-repeat="tab in tabs" heading="{{tab.title}}" select="view.tabShown = !view.tabShown" deselect="view.tabShown = !view.tabShown">\n        <div ui-grid="tab.gridOptions"  ng-if="view.tabShown" class="grid"></div>\n    </uib-tab>\n</uib-tabset>';

}
return __p
};

this["JST"]["assets/views/application/application.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n    <div ui-view="navigationBar"></div>\n    <div ui-view></div>\n</div>';

}
return __p
};

this["JST"]["assets/views/index/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n    <div class="jumbotron text-center">\n        <img ng-src="/images/logo.png" alt="Logo"/>\n        <h2 align="center">\n            University of Winnipeg\n        </h2>\n        <hr>\n        <h3 align="center">\n            Academic Staff Information Management System\n        </h3>   \n        <div ui-view="loginModalButton"></div>\n    </div>\n</div>';

}
return __p
};