const async      = require('async');
const _          = require('lodash');
const path       = require('path');
const schemas    = require(path.join(__dirname, 'schemas'));
const connection = require(path.join(__dirname, 'connection'));

const getModel = function (collection) {
  'use strict';
  let Model = null;
  if (_.isEqual(collection, 'modules')) {
    Model = new connection.model('Module', schemas.moduleSchema);
  }
  return Model;
};

const find = function (collection, query, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.find(query, function (err, results) {
    results = _.map(results, function (result) {
      return _.get(result, '_doc');
    });
    callback(err, results);
  });
};

const update = function (collection, query, update, options, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.update(query, update, options, callback);
};


const closeConnection = function (callback) {
  console.log('Closing connection');
  connection.disconnect(callback);
};

module.exports = {
  find: find,
  closeConnection: closeConnection,
  update: update
};