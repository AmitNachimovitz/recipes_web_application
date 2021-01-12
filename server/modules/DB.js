require('dotenv').config();
const sql = require('mssql');

//config for your database
const config = {
  user: 'yaar_amit',
  password: 'Warmfood2020',
  server: 'yaar-amit-coronacipes.database.windows.net',
  database: 'coronacipes',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log('new connection pool Created'))
  .catch((err) => console.log(err));

exports.execQuery = async function(query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
};
