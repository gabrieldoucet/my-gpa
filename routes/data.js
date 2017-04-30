const express  = require('express');
const router   = new express.Router();
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));
const async    = require('async');
const _        = require('lodash');

/* GET data from mongodb instance */
router.get('/:name', function (req, res) {
  'use strict';
  let collection = req.params.name;
  let query      = req.body;
  dbHelper.find(collection, query, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

/* GET data from mongodb instance */
router.post('/:name', function (req, res) {
  'use strict';
  let collection = req.params.name;
  let data       = req.body;
  async.each(data, function (module, callback) {
    let obj = _.pick(module, ['gpa', 'band', 'components', 'name', 'weight']);
    let id  = _.get(module, '_id');
    dbHelper.update('modules', {_id: id}, obj, {}, callback);
  }, function () {
    console.log('data updated');
  });
  res.json('Data has been saved');
});

module.exports = router;