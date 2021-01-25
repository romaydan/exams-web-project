const mongoose = require('mongoose');

const fieldOfStudySchema = new mongoose.Schema({
  name: { type: String },
});

const FieldOfStudy = mongoose.model('FieldOfStudy', fieldOfStudySchema);

exports.fieldOfStudySchema = fieldOfStudySchema;
exports.FieldOfStudy = FieldOfStudy;
