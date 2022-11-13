const mongoose = require('mongoose');
const crypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const modeldb = new Schema({
  em:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(val){
      if(!validator.isEmail(val)){
        throw ('Invalid Email !!!!!');
      }
    }
  },
  pass:{
    type:String,
    required:true,
    trim:true,
    minLength:7,
    validate(val){
      if(val.toLowerCase().includes('password')){
        throw ('Password cannot be taken take another !!!');
      }
    }

  }
},{
  timestamps: true
});

modeldb.virtual('ttask', {
  ref: 'imgdbs',
  localField: '_id',
  foreignField: 'owner'
});


modeldb.statics.logindet = async function(em,pass) {
    const users =await userss.findOne({em:em});

    if(!users){
      throw  'Invalid credientials....';
    }

    // password encrypted checking with that is in database
    // encrytping pass(1st parameter) and checking with users.pass(second parameter)
    const userpass = await crypt.compare(pass,users.pass); 
    if(!userpass){
      throw  'Invalid EMAIL or PASSWORD...  #%';
    }

    return users;
};

// password encrypting
modeldb.pre('save',async function(next){
  const user = this;
  if(user.isModified('pass')){
    user.pass = await crypt.hash(user.pass,8);
  }
  next();
});

const userss = mongoose.model("userdbs", modeldb);
module.exports = userss;