var fs = require('fs'),
    path = require('path'),

    handlebars = require('handlebars'),

    templatesDir = path.join(__dirname, '..', 'templates');

function readTemplate(templatePath) {
  return fs.readFileSync(path.join(templatesDir, templatePath),
      { encoding: 'utf-8' }
  );
}

function compileTemplate(templatePath) {
  var template = readTemplate(templatePath);

  return handlebars.compile(template);
}

function rowHelper(context, options) {
  var className = '';

  if (context.severity === 2 || context.severity === 'error') {
    className = 'danger';
  } else if (context.severity === 1 || context.severity === 'warning') {
    className = 'warning';
  }

  if (className === '') {
    return '<tr>' + options.fn(this) + '</tr>';
  } else {
    return '<tr class="' + className + '">' + options.fn(this) + '</tr>';
  }
}

exports.applyTemplates = function(data) {
  // initialization
  if (!data) {
    throw new Error('Data is undefined');
  }

  handlebars.registerHelper('row', rowHelper);

  handlebars.registerPartial({
    css: compileTemplate('partials/css.hbs'),
    summary: compileTemplate('partials/summary.hbs'),
    fileBreakdown: compileTemplate('partials/file-breakdown.hbs')
  });

  var template = compileTemplate('reporter.hbs');

  return template(data);
};
