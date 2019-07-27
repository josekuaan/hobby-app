/**
 * HobbyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var ObjectId = require('mongodb').ObjectID;
const _ = require("lodash")
const twilio = require("twilio")
const sgMail = require('@sendgrid/mail')
const SEND_API_KEY ='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'
 sgMail.setApiKey(SEND_API_KEY)

// "concurrently \"npm run server\" \"npm run client\""
const TWILIO_ACCOUNT_SID = 'AC68509c8f50bd7a1ffc98fd8eb404b88c';
const TWILIO_AUTH_TOKEN = '1a754f887774229523f1d7752e461cf7';
const TWILIO_PHONE_NUMBER ='+12563056345'
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  
  async Createhobbies(req,res){
  
      

 try{
    const {text,email,number,userID} = req.body
    console.log(text,number,email,userID)
    var allowed = ['text','userID']
    if( !text || !email || !number || !userID ){
       return  res.json({
            success:false,
            error: 'INVALID INPUT'
        })
    }
    const data = _.pick(req.body,allowed)
    
    const hobby = await Hobby.create(data ).fetch() 
   console.log(hobby)
   client.messages.create({
    body:  text,
    from: TWILIO_PHONE_NUMBER,
    to: '+234' + number
  })
 .then(()=>{
    return  res.send(JSON.stringify({success:true}));
 })
 .catch(err =>{
   return res.send(JSON.stringify({success:false,message:err}))
})

///////////////////////
//sendgrid here
//////////////////////

const msg = {
    to:  email,
    from: 'test@example.com',
    subject: 'Hobby added',
    text:  text
    
  };
 sgMail.send(msg)
 return res.send({success:true,data:data})
    
    
   } catch (err){
    return res.send({success:false,message:err})
    }
   },

   //find hobby//

   async fetchAllHobbies(req,res){
       try{
           
        await Hobby.find((err,data)=>{
            if(err){
                return res.json({success:false,error:err})
            }
            res.send({success:true,data:data})
        })
       } catch (err){
           return res.send({success:false,message:err})
       }
   
   },

//    delete all hobby

   async deleteHobby(req,res){
       
        const id = req.params.id
        console.log(id)
        
         var destroyedRecords = await Hobby.destroy(id).fetch();
      
         if(!destroyedRecords){
                   return res.send({
                       success:false,
                       message:"unable to delete hobby"
                   })
               }
          return res.send({success:true,data:destroyedRecords})
        
         
   }
};

// console.log(destroyedRecords)
        //    
        // 
        
        
       
        