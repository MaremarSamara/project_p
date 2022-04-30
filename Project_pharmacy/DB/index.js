const mysql = require('mysql');
const { promisify } = require("util");
const databaseConfig = {
        host: 'localhost',
        user: 'root',
        password: 'maremar2001',
        database: 'pharmaceutical'
    }
    //  create pool connection with DB
const pool = mysql.createPool(databaseConfig)
    //  convert normal query to promise instead of callbacks
const promiseQuery = promisify(pool.query).bind(pool)
class Database {
    async getDrugsNames() {
        try {
            let query = `SELECT pharmaceuticalName FROM pharmaceutical.drugs;`;
            let result = await promiseQuery(query);
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject({
                status: 400,
                message: "failed to list Drugs names"
            })
        }
    }

    // get drug by name
    async getDrugsByName(drugName) {
        try {
            let query = `SELECT * FROM drugs JOIN pharmacy ON drugs.pharmacy_id = pharmacy.idpharmacy WHERE drugs.pharmaceuticalName = '${drugName}';
            '`
            let result = await promiseQuery(query);
            return Promise.resolve(result[0]);
        } catch (err) {
            console.log(err);
            return Promise.reject({
                status: 400,
                message: "failed to get Drug"
            })
        }
    }
}
const DB = new Database();




module.exports = DB;