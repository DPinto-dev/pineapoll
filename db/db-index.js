// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/dbParams");
const pool = new Pool(dbParams);

module.exports = pool;
