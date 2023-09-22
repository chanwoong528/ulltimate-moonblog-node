import mongoose from "mongoose";
const mongoDbConfig = require("../config/mongo.config");
// mongoose.set("toJSON", {
//   virtuals: true,
//   transform: (doc, converted) => {
//     delete converted._id;
//   },
// });
module.exports = async function connectionFactory() {
  try {
    const conn = await mongoose.connect(
      mongoDbConfig.url,
      mongoDbConfig.options
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB Failed", error);
  }

  // conn.model('PageView', require('../schemas/pageView'));
};
