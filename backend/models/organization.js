const mongoose = require('mongoose');

const { fieldOfStudySchema } = require('./fieldOfStudy');

const organizationSchema = new mongoose.Schema({
  name: { type: String },
  fieldsOfStudy: { type: [fieldOfStudySchema] },
});

const Organization = mongoose.model('Organization', organizationSchema);

exports.organizationSchema = organizationSchema;
exports.Organization = Organization;
