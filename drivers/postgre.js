const pg = require('pg');
const config = require('./configs/postgre_config');

const client = new pg.Client(config.connectionString);

module.exports = () => {
    client.connect((err) => {
        if (err) throw err;
    });

    let postgreDB = {};

    postgreDB.select = (table, values, params, callback) => {
        let queryString = `SELECT ${values} FROM ${table}`;
        
        if (params) {
            queryString +=  ` WHERE ${params}`;
        }

        client.query(queryString, (err, response) => {
            callback(err, response.rows);
        });
    };

    return postgreDB;
};