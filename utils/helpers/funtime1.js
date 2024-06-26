
import moment from 'moment';


const formatDate = (date, format) => {
    return moment(date).format(format);
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const lowerCase = (str) => {
    return str.toLowerCase();
};

const debug = (obj) => {
    return JSON.stringify(obj, null, 2);
};


export { formatDate, capitalize, lowerCase, debug };
