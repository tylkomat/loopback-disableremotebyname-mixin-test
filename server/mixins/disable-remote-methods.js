'use strict';

module.exports = function (Model, options) {

  if(Model && Model.sharedClass) {
    // wait for all models to be attached so sharedClass.methods() returns all methods
    Model.on('attached', function (server) {
      server.on('started', function () {
        Model.disableRemoteMethodByName('deleteById');
      });
    });
  }
};
