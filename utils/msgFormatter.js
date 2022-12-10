const moment = require('moment');

module.exports = function msgFormat(userName, text) {
    return {
        userName,
        text,
        time:moment().format('h:mm a')
    }
}


