// Constants for use throughout app.
const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://mapmit.herokuapp.com' : 'http://localhost:3000';
// const BASE_URL = 'http://mapmit.herokuapp.com';

module.exports = {
    BASE_URL: BASE_URL
};