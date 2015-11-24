$('[data-toggle="tooltip"]').tooltip();
var $b = $('#builder');
var options = {
  allow_empty: true,
  
  default_filter: 'state',
  
  optgroups: {
    core: {
      en: 'Core',
      fr: 'Coeur'
    }
  },
  plugins: {
    'bt-tooltip-errors': { delay: 100},
    'sortable': null,
    'filter-description': { mode: 'bootbox' },
    'bt-selectpicker': null,
    'unique-filter': null,
    'bt-checkbox': { color: 'primary' },
    'invert': null
  },
  filters: [
  /*
   * basic
   */
  {
    id: 'name',
    label: {
      en: 'Name',
      fr: 'Nom'
    },
    type: 'string',
    optgroup: 'core',
    default_value: 'Mistic',
    size: 30,
    unique: true
  },
  /*
   * textarea
   */
  {
    id: 'bson',
    label: 'BSON',
    type: 'string',
    input: 'textarea',
    operators: ['equal'],
    size: 30,
    rows: 3
  },
  /*
   * checkbox
   */
  {
    id: 'category',
    label: 'Category',
    type: 'integer',
    input: 'checkbox',
    optgroup: 'core',
    values: {
      1: 'Books',
      2: 'Movies',
      3: 'Music',
      4: 'Tools',
      5: 'Goodies',
      6: 'Clothes'
    },
    colors: {
      1: 'foo',
      2: 'warning',
      5: 'success'
    },
    operators: ['in', 'not_in', 'equal', 'not_equal', 'is_null', 'is_not_null']
  },
  /*
   * select
   */
  {
    id: 'continent',
    label: 'Continent',
    type: 'string',
    input: 'select',
    optgroup: 'core',
    placeholder: 'Select something',
    values: {
      'eur': 'Europe',
      'asia': 'Asia',
      'oce': 'Oceania',
      'afr': 'Africa',
      'na': 'North America',
      'sa': 'South America'
    },
    operators: ['equal', 'not_equal', 'is_null', 'is_not_null']
  },
  /*
   * Selectize
   */
  {
    id: 'state',
    label: 'State',
    type: 'string',
    input: 'select',
    multiple: true,
    plugin: 'selectize',
    plugin_config: {
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      sortField: 'name',
      options: [
        { id: "AL", name: "Alabama" },
        { id: "AK", name: "Alaska" },
        { id: "AZ", name: "Arizona" },
        { id: "AR", name: "Arkansas" },
        { id: "CA", name: "California" },
        { id: "CO", name: "Colorado" },
        { id: "CT", name: "Connecticut" },
        { id: "DE", name: "Delaware" },
        { id: "DC", name: "District of Columbia" },
        { id: "FL", name: "Florida" },
        { id: "GA", name: "Georgia" },
        { id: "HI", name: "Hawaii" },
        { id: "ID", name: "Idaho" }
      ]
    },
    valueSetter: function(rule, value) {
      rule.$el.find('.rule-value-container select')[0].selectize.setValue(value);
    }
  },
  /*
   * radio
   */
  {
    id: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    optgroup: 'plugin',
    values: {
      1: 'Yes',
      0: 'No'
    },
    operators: ['equal']
  },
  /*
   * double
   */
  {
    id: 'price',
    label: 'Price',
    type: 'double',
    size: 5,
    validation: {
      min: 0,
      step: 0.01
    },
    data: {
      class: 'com.example.PriceTag'
    }
  },
  /*
   * slider
   */
  {
    id: 'rate',
    label: 'Rate',
    type: 'integer',
    validation: {
      min: 0,
      max: 100
    },
    plugin: 'slider',
    plugin_config: {
      min: 0,
      max: 100,
      value: 0
    },
    onAfterSetValue: function(rule, value) {
      var input = rule.$el.find('.rule-value-container input');
      input.slider('setValue', value);
      input.val(value); // don't know why I need it
    }
  },
  /*
   * placeholder and regex validation
   */
  {
    id: 'id',
    label: 'Identifier',
    type: 'string',
    optgroup: 'plugin',
    placeholder: '____-____-____',
    size: 14,
    operators: ['equal', 'not_equal'],
    validation: {
      format: /^.{4}-.{4}-.{4}$/
    }
  },
  /*
   * custom input
   */
  {
    id: 'coord',
    label: 'Coordinates',
    type: 'string',
    default_value: 'C.5',
    description: 'The letter is the cadran identifier:\
<ul>\
  <li><b>A</b>: alpha</li>\
  <li><b>B</b>: beta</li>\
  <li><b>C</b>: gamma</li>\
</ul>',
    validation: {
      format: /^[A-C]{1}.[1-6]{1}$/
    },
    input: function(rule) {
      var $container = rule.$el.find('.rule-value-container');
      $container.on('change', '[name=coord_1]', function(){
        var h = '';
        switch ($(this).val()) {
          case 'A':
            h = '<option value="-1">-</option> <option value="1">1</option> <option value="2">2</option>';
            break;
          case 'B':
            h = '<option value="-1">-</option> <option value="3">3</option> <option value="4">4</option>';
            break;
          case 'C':
            h = '<option value="-1">-</option> <option value="5">5</option> <option value="6">6</option>';
            break;
        }
        $container.find('[name=coord_2]').html(h).toggle(h!='');
      });
      return '\
      <select name="coord_1" class="form-control"> \
        <option value="-1">-</option> \
        <option value="A">A</option> \
        <option value="B">B</option> \
        <option value="C">C</option> \
      </select> \
      <select name="coord_2" class="form-control" style="display:none;"></select>';
    },
    valueParser: function(rule, value) {
      return rule.$el.find('[name=coord_1]').val()
        +'.'+rule.$el.find('[name=coord_2]').val();
    },
    valueSetter: function(rule, value) {
      if (rule.operator.nb_inputs !== 0) {
        var val = value.split('.');
        rule.$el.find('[name=coord_1]').val(val[0]).trigger('change');
        rule.$el.find('[name=coord_2]').val(val[1]);
      }
    }
  }]
};
// init
$('#builder').queryBuilder(options);
$('#builder').on('afterCreateRuleInput.queryBuilder', function(e, rule) {
    if (rule.filter.plugin == 'selectize') {
        rule.$el.find('.rule-value-container').css('min-width', '200px')
          .find('.selectize-control').removeClass('form-control');
    }
});
// change language
$('[name=language]').selectpicker().on('change', function() {
  var lang = $(this).val();
  
  var done = function() {
    var rules = $b.queryBuilder('getRules');
    if (!$.isEmptyObject(rules)) {
      options.rules = rules;
    }
    options.lang_code = lang;
    $b.queryBuilder('destroy');
    $('#builder').queryBuilder(options);
  };
  
  if ($.fn.queryBuilder.regional[lang] === undefined) {
    $.getScript('../dist/i18n/query-builder.' + lang + '.js', done);
  }
  else {
    done();
  }
});
// change theme
$('.change-theme').on('click', function() {
    $('#qb-theme').replaceWith('<link rel="stylesheet" href="' + $(this).data('qb') + '" id="qb-theme">');
    $('#bt-theme').replaceWith('<link rel="stylesheet" href="' + $(this).data('bt') + '" id="bt-theme">');
});
// set rules
$('.set').on('click', function() {
  $('#builder').queryBuilder('setRules', {
    condition: 'AND',
    flags: {
      condition_readonly: true
    },
    rules: [{
      id: 'price',
      operator: 'between',
      value: [10.25, 15.52],
      flags: {
        no_delete: true,
        filter_readonly: true
      },
      data: {
        unit: '€'
      }
    }, {
      id: 'state',
      operator: 'equal',
      value: 'AK',
    }, {
      condition: 'OR',
      flags: {
        no_delete: true
      },
      rules: [{
        id: 'category',
        operator: 'equal',
        value: 2
      }, {
        id: 'coord',
        operator: 'equal',
        value: 'B.3'
      }]
    }]
  });
});
// set rules from MongoDB
$('.set-mongo').on('click', function() {
  $('#builder').queryBuilder('setRulesFromMongo', {
    "$and": [{
      "name": {
        "$regex": "^(?!Mistic)"
      }
    }, {
      "price": { "$gte": 0, "$lte": 100 }
    }, {
      "$or": [{
        "category": 2
      }, {
        "category": { "$in": [4, 5] }
      }]
    }]
  });
});
// set rules from SQL
$('.set-sql').on('click', function() {
  $('#builder').queryBuilder('setRulesFromSQL', 'name NOT LIKE "Mistic%" AND price BETWEEN 100 AND 200 AND (category IN(1, 2) OR rate <= 2)');
});
// reset builder
$('.reset').on('click', function() {
  $('#builder').queryBuilder('reset');
  $('#result').addClass('hide').find('pre').empty();
});
// get rules
$('.parse-json').on('click', function() {
  $('#result').removeClass('hide')
    .find('pre').html(JSON.stringify(
      $('#builder').queryBuilder('getRules'),
      undefined, 2
    ));
});
$('.parse-sql').on('click', function() {
  var res = $('#builder').queryBuilder('getSQL', $(this).data('stmt'), false);
  $('#result').removeClass('hide')
    .find('pre').html(
      res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, undefined, 2) : '')
    );
});
$('.parse-mongo').on('click', function() {
  $('#result').removeClass('hide')
    .find('pre').html(JSON.stringify(
      $('#builder').queryBuilder('getMongo'),
      undefined, 2
    ));
});
// set filters
$('.set-filters').on('click', function() {
  $(this).prop('disabled', true);
  $(this).tooltip('hide');
  
  // add a new filter after 'state'
  $('#builder').queryBuilder('addFilter',
    {
      id: 'new_one',
      label: 'New filter',
      type: 'string'
    },
    'state'
  );
  
  // remove filter 'coord'
  $('#builder').queryBuilder('removeFilter',
    ['coord', 'state', 'bson'],
    true
  );
  
  // also available : 'setFilters'
});