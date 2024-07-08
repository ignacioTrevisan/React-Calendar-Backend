const moment = require('moment');

const IsDate = (value, { req, location, path }) => {
    if (!value) {
        return false;
    }
    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    IsDate,
} 