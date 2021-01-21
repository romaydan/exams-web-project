const mongoose = require('mongoose');
const { fieldOfStudySchema } = require('./fieldOfStudy');

const organizationSchema = new mongoose.Schema({
  name: { type: String },
  fieldOfStudies: { type: [fieldOfStudySchema] },
});

const Organization = mongoose.model('Organization', organizationSchema);

exports.Organization = Organization;
