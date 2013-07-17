#!/usr/bin/env node

var yaml   = require('js-yaml'),
    colors = require('colors');

var settings = require('./settings.yml');

// set them for console text
colors.setTheme(settings.colors_theme);

(function() {

    if (require.main == module) {

        var fname, params, _params = settings.params;

        // read params
        params = process.argv.slice(2);

        if (params.indexOf('-s') > -1) {
            fname = params[params.indexOf('-s') + 1];

            try {
                _params = require(require('path').resolve(fname)).params;
            } catch (e) {
                console.log('error with read module "' + fname + '" ' + e);
                return;
            }
        }

        if (_params.debug) {
            showSettings(_params)
        }

        _params.temp_write = _params.temp_write.replace(/\\r/gim, '\r').replace(/\\n/gim, '\n');

        require('./jspb').parse(_params.temps_read, _params.temp_write, _params.file_path, function(result) {
            if (!_params.debug) {
                console.log(result);
                return;
            }
            showInfo(this);
        }, true);
    }
}).call(this);

function showSettings(_params) {
    console.log('Settings:'.cyan);
    console.log('file_path:'.cyan, _params.file_path);
    console.log('temp_write:'.cyan, _params.temp_write);
    console.log('temps_read:'.cyan, '\r\n -' + _params.temps_read.join('\r\n -'));
    console.log('debub:'.cyan, _params.debug);
    console.log();
}

function showInfo(links) {
    links.forEach(function(link) {
        console.log(('[' + link.level + ']-------------').warn);
        console.log('blank:'.info, link.blank);
        console.log('path:'.info, link.path);
        console.log('level:'.info, link.level);
        console.log('error:'.info, link.error);
    })
}