var fs = require('fs'),
    path = require('path'),

    templateUtils = require('hairballs/src/js/template-utils'),

    files = {};

function getFileData(file) {
    return files[file] || {
        path: file,
        errors: 0,
        warnings: 0,
        messages: []
    };
}

function summarizeData(files) {
    var errors = 0,
        warnings = 0,
        summary = Object.keys(files).map(function(filename) {
            var data = files[filename];

            errors += data.errors;
            warnings += data.warnings;

            return data;
        });

    return {
        files: summary,
        fileSummary: {
            errors: errors,
            warnings: warnings,
            total: errors + warnings
        }
    };
}

module.exports = function (message, done) {
    var cache = this.cache;
    var options = this.config.reporterOptions || {};

    if (done === 'done') {
        var reportPath = path.resolve(options.reportPath || 'stylint-html-report.html');

        var data = summarizeData(files);

        data.fullReport = true;
        data.pageTitle = 'Stylint report';

        fs.writeFileSync(reportPath, templateUtils.applyTemplates(data));

        return this.done();
    }

    var severity = this.state.severity.toLowerCase(),

        fileData = getFileData(cache.file);

    fileData[severity == 'warning' ? 'warnings' : 'errors']++;

    fileData.messages.push({
        message: message,
        line: cache.lineNo || 0,
        column: cache.col || 0,
        ruleId: cache.rule,
        formatSeverity: severity
    });

    files[cache.file] = fileData;
};
