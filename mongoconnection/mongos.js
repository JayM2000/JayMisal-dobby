const mon = require('mongoose');
const { uris } = require('../config');
const conn = uris;

module.exports = async () => {
    await mon.connect(conn)
        .then(x => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`,
            );
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });
    return mon;
};