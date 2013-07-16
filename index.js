#!/usr/bin/env node

var yaml   = require('js-yaml'),
    colors = require('colors');

var settings = require('./settings.yml');

// set them for console text
colors.setTheme(settings.colors_theme);

var _params = settings.default_params, key, pusher, params;

pusher = {
    '-i': {
        help: 'file name - the enter point.',
        read: function(p) {
            _params.file_name = p;
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
        if (/^-/.test(p)) {
            key = p;
        }

        if (key != null && key !== p && pusher[key]) {
           pusher[key].read(p);
        }
    });

    _params.temps_read =  _params.temps_read.map(function(p) {
        return require(p);
    });

    require('./jspb').parse(_params.temps_read, _params.temp_write, _params.file_name, function(result) {
        if (!_params.debug) {
            console.log(result);
            return;
        }
        showInfo(this);
    }, true);
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
        console.log('[' + link.level + ']-------------'.warn);
        console.log('blank:'.info, link.blank);
        console.log('path:'.info, link.path);
        console.log('level:'.info, link.level);
        console.log('error:'.info, link.error);
    })
}