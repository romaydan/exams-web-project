const mongoose = require('mongoose');

const fieldOfStudySchema = new mongoose.Schema({
  name: { type: String },
  questions: {
    type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Question' }],
  },
  exams: {
    type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Exam' }],
  },
});

const FieldOfStudy = mongoose.model('FieldOfStudy', fieldOfStudySchema);

exports.fieldOfStudySchema = fieldOfStudySchema;
exports.FieldOfStudy = FieldOfStudy;
