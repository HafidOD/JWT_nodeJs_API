const mongoose = require('mongoose');

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("Database: Connected");
}

module.exports = { connect };