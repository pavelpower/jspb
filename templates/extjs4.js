
function _requires (content) {
    var rgx = /(?:requires|mixins)\s*:\s*\[([^\[\]]+)\]/gim,
        rgx_name = /['"]([^'",]*)['"]/gim,
        requires_lines = content.match(rgx),
        result = [];

    if (requires_lines) {
        requires_lines.forEach(function(l) {
            var names = l.match(rgx_name);
            if (names) {
                result = result.concat(names.map(function(p) {
                    return p.replace(/['"]*/gim,'').trim();
                }));
            }
        });
    }

    return result;
}

function _extend_requires (content) {
    var rgx = /(?:extend|requires|mixins)\s*:\s*['"]([^'"]*)['"]/gim,
        requires_line = content.match(rgx);

    if (requires_line == null)
        return [];

    return requires_line.map(function(l) {
        return l.replace(rgx, '$1');
    });
}

// for type
/*
 mixins: {
 observable: 'Ext.mixin.Observable'
 }
 */
function _mixmins_hash(content) {
    var rgx = /(?:mixins)\s*:\s*(\{[^\{\}]*\})/gim,
        rgx_name = /:\s['"]([^'"]+)['"]/gim,
        requires_line = content.match(rgx),
        result = [];

    if (requires_line != null) {

        requires_line.forEach(function(l) {
            var names = l.match(rgx_name);
            if (names) {
                result = result.concat(names.map(function(p) {
                    return p.replace(rgx_name,'$1').trim();
                }));
            }
        });
    }
    return result;
}

module.exports = {

    getPath: function(blank) {
        var path = blank.split('.'),
            folders;

        if (path.length > 0) {
            folders = path.slice(path.length - 2, path.length - 1 );
            return './' + folders.join('/').toLowerCase() + '/' + path[path.length - 1] + '.js';
        }

        return path + '.js';
    },

    getBlanks: function(content) {
        var blanks;
        blanks = _requires(content);
        blanks = blanks.concat(_extend_requires(content));
        blanks = blanks.concat(_mixmins_hash(content));
        return blanks;
    }
};