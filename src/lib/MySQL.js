const pool = require('./database/connection');

class MySQL {
    
    GetOne(table, condition, id, callback) {
        pool.query(`SELECT * FROM ${table} WHERE ${condition} = ?`, [id], (err, row) => {
            if(err) {
                return console.log(err);
            }
            
            if(row) {
                callback(row);
            }
        });
    }

    GetMany(table, condition, id, callback) {
        pool.query(`SELECT * FROM ${table} WHERE ${condition} = ?`, [id], (err, rows) => {
            if(err) {
                return console.log(err);
            }

            if(rows) {
                callback(rows)
            }
        })
    }

    Create(table, data, callback) {

        pool.query(`INSERT INTO ${table} SET ?`, [data], (err, rowCreated) => {
            if(err){
                return console.log(err);
            }

            callback(rowCreated)

        })
    }

    Update(table, condition, data, id, callback) {
        pool.query(`UPDATE ${table} SET ? WHERE ${condition} = ?`, [data, id], (err, rowUpdated) => {
            if(err) {
                return console.log(err);
            }

            if(rowUpdated) {
                callback(rowUpdated)
            }
        });
    }

    Delete(table, condition, id, callback) {
        pool.query(`DELETE FROM ${table} WHERE ${condition} = ?`, [id], (err, rowDeleted) => {
            if(err) {
                return console.log(err);
            }

            if(rowDeleted) {
                callback(rowDeleted);
            }
        });
    }
}

module.exports = MySQL;