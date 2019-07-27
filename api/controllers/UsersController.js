/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const _ = require("lodash")
 const passport = require("passport")
module.exports = {
   


    login(req, res,next) {
        const allowed =[ "username","email","number","password"]
        const data = _.pick(req.body,allowed)
        
        Users.authenticate(data, function(user){
          if( !user) {
              
            return res.send({
                success:false,
                 message: 'Invalid Password' 
            
            });
          }
         return res.send({
            success:true,
            userData:user
    })
    
        });
      },


   async signup(req,res){

    try{
    const {username,email,password,number} = req.body

    if( !username || !email || !password || !number){
        res.json({
            success:false,
            error: 'INVALID INPUT'
        })
    }
    const allowed =[ "username","email","number","password"]
    const data = _.pick(req.body,allowed)
   const user = await Users.create(data).fetch()
      return res.json({success:true,userData:user})
    
       } catch(err){
        return res.send({
          success:false,
          err:err,
          message:"Invalid"
      })
  }
}

};

