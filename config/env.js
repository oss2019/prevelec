const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  db_url: 'mongodb+srv://admin123:ADMIN1234@cluster0.tfxzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  jwt_secret: 'abcd'
}
