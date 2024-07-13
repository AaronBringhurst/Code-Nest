import Handlebars from 'handlebars';

const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
};

const truncate = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
};

// Register the helpers with Handlebars
Handlebars.registerHelper('formatDate', formatDate);
Handlebars.registerHelper('truncate', truncate);

export { formatDate, truncate };