/**
 * Created by Gabriel on 30/03/2017.
 */

const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: String,
  gpa: Number,
  band: String,
  weight: Number
});

const moduleSchema = new mongoose.Schema({
  name: String,
  components: [componentSchema],
  gpa: Number,
  weight: Number,
  band: String
});

module.exports = {
  moduleSchema: moduleSchema
};