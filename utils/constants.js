// Constants for use throughout app.
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://mapmit.herokuapp.com' : 'http://localhost:3000';

module.exports = {
    BASE_URL: BASE_URL
};