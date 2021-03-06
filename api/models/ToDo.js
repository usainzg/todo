/**
* ToDo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      title: {
        type: 'string',
        required: true
      },

      description: {
        type: 'string'
      },

      done: {
        type: 'boolean',
        defaultsTo: false
      },

      user: {
        model: 'User'
      },

      private:{
        type: 'boolean',
        defaultsTo: false
      },

      likes: {
        collection: 'UserLikes',
        via: 'todo'
      }

  }
};
