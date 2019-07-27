/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

   '/': { assets: 'src/index' },
  'post /api/signup' : {
    cors: {
       origin: '*',
       headers: 'Content-Type, Authorization'  
    },
    controller: 'UsersController',
    action: 'signup'
},
'post /api/login' : {
  cors: {
     origin: '*',
     headers: 'Content-Type, Authorization'  
  },
  controller: 'UsersController',
  action: 'login'
},
'GET /api/hobby' : {
  cors: {
     origin: '*',
     headers: 'Content-Type, Authorization'  
  },
  controller: 'HobbyController',
  action: 'fetchAllHobbies'
},
'POST /api/hobby' : {
  cors: {
     origin: '*',
     headers: 'Content-Type, Authorization'  
  },
  controller: 'HobbyController',
  action: 'Createhobbies'
},
'DELETE /api/delete/:id' : {
  cors: {
     origin: '*',
     headers: 'Content-Type, Authorization'  
  },
  controller: 'HobbyController',
  action: 'deleteHobby'
},



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
   