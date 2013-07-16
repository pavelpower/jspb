#!/usr/bin/env node

function spplant(str, o) {
    return str.replace(/{([^{}]*)}/g,
        function(a, b) {
            var r = o[b];

            if (r == null)
                return '';

            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

if (require.main == module) {
    var include,
        output = 'output.js',
        // sample template for borschik
        // http://en.bem.info/articles/borschik/
        temp_output = '//[{level}] {blank} {error}\r\n/*borschik:include:{path}*/',
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
            },
            '-o': function(p) {
                output = p;
            },
            '-t': function(p) {
                temp_output = p;
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

        var templates = [], filesParser, FilesParser = require('./lib/FilesParser.js');

        tmps.forEach(function(tmp) {
            templates.push(require(tmp));
        });

        if (templates.length === 0) {
            templates = [require('./templates/extjs4.js')];
        }

        filesParser = new FilesParser(templates);

        filesParser.read(include, true, function() {
            var output_content, links = filesParser.getListLinks();

            console.log('links.length:', links.length);

            if (links) {

                output_content = links.map(function(link) {
                    console.log('-----link--------');
                    console.log('blank:', link.blank);
                    console.log('path:', link.path);
                    console.log('level:', link.level);
                    console.log('error:', link.error);

                    return spplant(temp_output, link);
                }).join('\r\n');

                if (output != null) {
                    require('fs').writeFile(output, output_content, function (err) {
                        if (err) throw err;
                        console.log('It\'s saved to ', output);
                    });
                }

            } else {
                console.log('links is NULL:', links);
            }
        });



    }

}