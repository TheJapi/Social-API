const mongoose = require('mongoose');

//Keys for db connection
const db = require('./config/keys').mongoURI;

class Database{
  constructor(){
  }


  //dbconnection ('then' called if con is successful )
  connect(){
    mongoose
      .connect(db, {useNewUrlParser: true})
      .then(() => console.log('Connection to db successful'))
      .catch((err) => console.log(err));
  }

  disconnect(){
    mongoose.disconnect(err => {
      if(err) console.log(err);
      else{
        console.log('Disconnected');
      }
    })
  }

}

module.exports = new Database();