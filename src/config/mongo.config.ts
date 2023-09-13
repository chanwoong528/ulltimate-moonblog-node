module.exports = {
  url: process.env.MONGO_URL,
  options: {
    dbName: 'moonblog',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
