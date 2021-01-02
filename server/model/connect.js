//database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://vue-shop:vue-shop@localhost:27017/vue-shop', {
// mongoose.connect(`mongodb://${config.get('db.user')}:${process.env.APP_PASSWORD}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }) 
  .then(() => {
    console.log('Database connect success')
  }).catch(() => {
    console.log('Database connect fail')
  })