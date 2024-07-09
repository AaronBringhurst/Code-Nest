import Handlebars from 'handlebars';

const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
};

// Register the helper with Handlebars
Handlebars.registerHelper('formatDate', formatDate);

export { formatDate };
