function Link(blank, path, level) {
    this.blank = blank;
    this.level = level || 0;
    this.error = null;

    if (path != null) {
        this.path = path;
    }
}

Link.prototype = {
    setLevel: function(level) {
        this.level = level;
    },
    setPath: function(path) {
        this.path = path;
    },
    setError: function(err) {
        this.error = err;
    }
};

module.exports = Link;