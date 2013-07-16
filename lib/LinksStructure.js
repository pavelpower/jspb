function LinksStructure() {
    this._hashLinks = {};
    this._minLevel = 0;
    this._maxLevel = 0;
}

LinksStructure.prototype = {

    create: function() {
        return new LinksStructure();
    },

    isExists: function(blank) {
        return this._hashLinks[blank] != null;
    },

    add: function(link) {
        if ( !this.isExists(link.blank) ) {

            this._hashLinks[link.blank] = link;
            this.updateLevel(link);

        } else
            this._hashLinks[link.blank].setLevel(link.level);
    },

    updateLevel: function(link) {
        if (this._minLevel > link.level) {
            this._minLevel = link.level;
        }

        if (this._maxLevel < link.level) {
            this._maxLevel = link.level;
        }
    },

    getNumberLevels: function() {
        return {
            min: this._minLevel,
            max: this._maxLevel
        }
    },

    getLevel: function (level) {
        var blank, link,
            hash = this._hashLinks,
            listLevel = [];

        for (blank in hash) {
            link = hash[blank];
            if (link.level != level) continue;
            listLevel.push(link);
        }

        return listLevel;
    },

    getList: function() {
        var level = this._maxLevel,
            minLevel = this._minLevel,
            list = [];

        for (; level >= minLevel; level-- )  {
            list = list.concat(this.getLevel(level));
        }

        return list;
    }
};

module.exports = LinksStructure;