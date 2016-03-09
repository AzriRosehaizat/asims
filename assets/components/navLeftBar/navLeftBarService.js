application
  .factory('menu', ['$location', '$rootScope', function($location) {

    // The object for storing structure of the menu is just an array named 
    // sections which allows us to visually see the structure easy and add items to really easy.
    var sections = [{
      name: 'Home',
      state: 'application.root',
      type: 'link'
    }];

    sections.push({
      name: 'Staff Management',
      type: 'toggle',
      pages: [{
        name: 'Regular Staff',
        type: 'link',
        state: 'application.regularStaff'
      }, {
        name: 'Contract Staff',
        state: 'application.contractStaff',
        type: 'link'
      }, {
        name: 'Leaves',
        type: 'link',
        state: 'application.leaves'
      }, {
        name: 'Research',
        state: 'application.research',
        type: 'link'
      }]
    });
    sections.push({
      name: 'Teaching Management',
      type: 'toggle',
      pages: [{
        name: 'Teaching Activities - CAS',
        state: 'application.teachingActivityCAS',
        type: 'link'
      }, {
        name: 'Teaching Activities - RAS',
        state: 'application.teachingActivityRAS',
        type: 'link'
      }]
    });
    sections.push({
      name: 'Organization Management',
      type: 'toggle',
      pages: [{
        name: 'Faculty',
        type: 'link',
        state: 'application.faculty'
      }, {
        name: 'Department',
        state: 'application.department',
        type: 'link'
      }, {
        name: 'Rank',
        state: 'application.rank',
        type: 'link'
      }, {
        name: 'Course',
        state: 'application.course',
        type: 'link'
      }, {
        name: 'Section',
        state: 'application.section',
        type: 'link'
      }]
    });

    // sections.push({
    //   name: 'Report',
    //   type: 'toggle',
    //   pages: [{
    //     name: 'Faculty Load Chart',
    //     type: 'link',
    //     state: 'application.FLC'
    //   }, {
    //     name: 'Leave Entitlement Chart',
    //     state: 'application.LEC',
    //     type: 'link'
    //   }]
    // });

    var adminSection = {
      name: 'Admin',
      type: 'link',
      state: 'application.admin'
    };

    var self;
    var isAdmin = false;

    return self = {
      sections: sections,

      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },

      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        page && page.url && $location.path(page.url);
        self.currentSection = section;
        self.currentPage = page;
      },

      showAdmin: function() {
        isAdmin = true;
        sections.push(adminSection);
      },

      hideAdmin: function() {
        if (isAdmin) {
          isAdmin = false;
          sections.pop();
        }
      }
    };

  }])
  //take all whitespace out of string
  .filter('nospace', function() {
    return function(value) {
      return (!value) ? '' : value.replace(/ /g, '');
    };
  })
  //transform object to to readable links
  .filter('humanizeDoc', function() {
    return function(doc) {
      if (!doc) return;
      if (doc.type === 'directive') {
        return doc.name.replace(/([A-Z])/g, function($1) {
          return '-' + $1.toLowerCase();
        });
      }
      return doc.label || doc.name;
    };
  });
