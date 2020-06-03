require('dotenv').config();

const app = require('./app');
const { connect } = require('./database');

(async function(){
  // Database Connection
  await connect();

  // Express Server
  await app.listen(3000);
  console.log("Server on port 3000: Connected");
})();