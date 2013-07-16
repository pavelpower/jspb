var fs, path, Link, LinksStructure;

Link = require('./Link.js');
LinksStructure = require('./LinksStructure.js');
fs = require('fs');
path = require('path');

function FilesParser(templates) {
    var root;

    this.links = new LinksStructure;

    if (templates == null)
        throw 'Undefined templates';

    if (templates.length == null || templates.length === 0)
        throw 'templates is empty';


    this._done = function() {};
    this._promise = 0;
    this._root = root = './';

    this.templates = templates.map(function(tmp) {
        return typeof tmp === 'string' ? require(path.resolve(root, tmp)) : tmp;
    });

}

FilesParser.prototype = {

    _setRoot: function(dir) {
        this._root = fs.realpathSync(dir);
    },

    _incPromise: function() {
        this._promise++;
    },

    _decPromise: function() {
        this._promise--;
        if (this._promise === 0) {
            this._done(this.getListLinks());
        } else if (this._promise < 0) {
            throw 'error Promise increment';
        }
    },

    _setDone: function(fn) {
        this._done = fn;
    },

    read: function(filePath, withRoot, callback) {
        var me = this, rootLink = me._createLink(filePath);

        if (withRoot) {
            me.links.add(rootLink);
        }

        this._setDone(callback);

        this._setRoot(path.dirname(filePath));

        me._readFile(
            filePath,
            me._getLinks,
            rootLink.setError
        );
    },

    _getLinks: function(content) {
        var me = this;

        me.templates.forEach(function(template) {
            var blanks, maxLevel;

            blanks = template.getBlanks(content);

            if ( blanks.length === 0 ) return;

            maxLevel = me.links.getNumberLevels().max + 1;

            blanks.forEach(function(blank) {
                var link = me._createLink(blank, template, maxLevel);

                me.links.add(link);

                me._readFile(
                    link.path,
                    me._getLinks,
                    link.setError
                );
            });
        });
    },

    _getRealPath: function(filePath) {
        return path.resolve(this._root, filePath);
    },

    _createLink: function(blank, template, level) {

        if (template != null) {
            return new Link(blank, this._getRealPath(template.getPath(blank)), level);
        } else
            return new Link('root', this._getRealPath(blank), 0);  // this blank is path
    },

    _readFile: function(path, success, error) {
        var me = this;

        me._incPromise();

        fs.exists(path, function(exists) {
            if (exists) {
                fs.readFile(path, 'utf8', function (err, content) {

                    if (err != null) {
                        error.call(me, err);
                        return;
                    }

                    success.call(me, content);

                    me._decPromise();
                });

            } else {
                error.call(me, 'Path "' + path + '" not exists.');

                me._decPromise();
            }
        });
     },

    getListLinks: function() {
        return this.links.getList();
    }

};

module.exports = FilesParser;