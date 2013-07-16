#!/usr/bin/env node

if (require.main == module) {
    var include,
        tmps = [],
        key,
        pusher,
        params = process.argv.slice(2),
        strParams = params.join(' ');

    // show help
    if (strParams.indexOf('-h') > -1 || strParams.indexOf('--help') > -1) {
        console.log('help: show help');
    } else {

        pusher = {
            '-i': function(p) {
                include = p
            },
            '-p': function(p) {
                tmps.push(p);
            }
        };

        params.forEach(function (p) {
            if (/^-/.test(p)) {
                key = p;
            }

            if (key != null && key !== p) {
               pusher[key](p);
            }
        });

        var templates = [], list, filesParser, FilesParser = require('./lib/FilesParser.js');

        tmps.forEach(function(tmp) {
            templates.push(require(tmp));
        });

        if (templates.length === 0) {
            templates = [require('./templates/extjs4.js')];
        }

        filesParser = new FilesParser(templates);

        filesParser.read(include, true, function() {
            var links = filesParser.getListLinks();

            console.log('links.length:', links.length);

            if (links) {
                links.forEach(function(link) {
                    console.log('-----link--------');
                    console.log('blank:', link.blank);
                    console.log('path:', link.path);
                    console.log('level:', link.level);
                    console.log('error:', link.error);
                });
            } else {
                console.log('links is NULL:', links);
            }
        });



    }

}