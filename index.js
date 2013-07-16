#!/usr/bin/env node

var yaml   = require('js-yaml'),
    colors = require('colors');

var settings = require('./settings.yml');

// set them for console text
colors.setTheme(settings.colors_theme);

var _params = settings.default_params, pusher, params;

pusher = {
    '-i': {
        help: 'file path - the enter point.',
        read: function(p) {
            _params.file_path = p;
        }
    },
    '-r': {
        help: 'templates for read.',
        read:  function(p) {
            if (_params.temps_read === settings.default_params.temps_read) {
                _params.temps_read = [];
            }

            _params.temps_read.push(p);
        }
    },
    '-w': {
        help: 'template for write path (from blank) to output.',
        read: function(p) {
            _params.temp_write = p;
        }
    },
    '-d': {
        help: 'flag on debug.',
        without_param: true,
        read: function() {
            _params.debug = true;
        }
    }
};

if (require.main == module) {
    // read params
    params = process.argv.slice(2);

    // show help
    if (params.indexOf('-h') > -1) {
        showHelp();
        return
    }

    params.forEach(function (p) {
        var key = /^-/.test(p) ? p : key;
        if (key != null && pusher[key] && ( pusher[key].without_param || key !== p )) {
           pusher[key].read(p);
        }
    });

    if (_params.debug) {
        showSettings(_params)
    }

    require('./jspb').parse(_params.temps_read, _params.temp_write, _params.file_path, function(result) {
        if (!_params.debug) {
            console.log(result);
            return;
        }
        showInfo(this);
    }, true);
}

function showSettings(_params) {
    console.log('Settings:'.cyan);

    console.log('file_path:'.cyan, _params.file_path);
    console.log('temp_write:'.cyan, _params.temp_write);
    console.log('temps_read:'.cyan, '\r\n -' + _params.temps_read.join('\r\n -'));
    console.log('debub:'.cyan, _params.debug);
    console.log();
}

function showHelp() {
    var param;
    console.log('Mini help:'.info);
    for (p in pusher) {
        param = pusher[p];
        console.log(p.warn, param.help.info);
    }
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