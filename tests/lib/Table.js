/**
 * Created with JetBrains WebStorm.
 * User: pavpow
 * Date: 12.07.13
 * Time: 17:21
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Table', {

    mixins: {
        observer: "Observer"
    },

    requires: [
        'Ext.grid.Table',
        'Row'
    ]
});