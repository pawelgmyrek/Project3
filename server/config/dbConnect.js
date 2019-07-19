import { MONGODB_URI, MONGODB_LOCATION } from '../constants';

const mongoose = require('mongoose');

async function connect() {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  // localhost/mongooseDatabase
  await mongoose.connect(MONGODB_URI || MONGODB_LOCATION, options);
  console.log('Connected to MongoDB');
}
exports.connect = connect;
