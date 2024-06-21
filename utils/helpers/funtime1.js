

module.exports = {
    formatDate: function (date, format) {
        const moment = require('moment');
        return moment(date).format(format);
    },
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    lowerCase: function (str) {
        return str.toLowerCase();
    },
    debug: function (obj) {
        return JSON.stringify(obj, null, 2);
    }
};
