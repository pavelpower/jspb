var FilesParser = require('./lib/FilesParser.js');

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

exports.parse = function(tmpsRead, tmpWrite, fname, callback, withRoot) {
    new FilesParser(tmpsRead).read(fname, withRoot, function(links) {

        var result = links.map(function(link) {
            return spplant(tmpWrite, link);
        }).join('\r\n');

        callback.call(links, result);

    });
};
