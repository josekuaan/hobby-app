/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcrypt")

module.exports = {

  attributes: {

      username:{
      type:'string',
      required:true,
  
     },
      email:{type:'string',
      required:true,

      },
      password:{
          type:'string',
          required:true,
      
       },
       number:{
          type:'string',
          required:true,
          
       }

  },

  customToJSON : function(){
    return _.omit(this,["password"])
  },

  beforeCreate : function(user,cb){
  
      bcrypt.genSalt(10,function(err,salt){
        if(err){
          return cb(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash){
          if (err) {
            return cb(err);
          }
          user.password = hash;
          console.log(user)
         return  cb();
        })
      })
    
  },

 
    


    //authenticate input against database
authenticate : function (data, cb) {
  return  Users.findOne({ email: data.email }).then((user)=>{
    if(err) return cb(err);
   if (!user) {
     var err = new Error('User not found.');
     err.status = 401;
     return cb(err);
   }
  
     bcrypt.compare(data.password, user.password, function (err, result) {
      if(err) return cb(null, false, { message: 'Invalid Password' });
       if (result) {
       return cb(user)
        
       } 
       
     })
   })

     
 },
    
  

  connectoiun:'mongodb'

};

