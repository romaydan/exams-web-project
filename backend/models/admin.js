const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const { organizationSchema } = require('./organization');

const adminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  organizations: { type: [organizationSchema] },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    config.get('jwtPrivateKey')
  );
  return token;
};

const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(admin) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(admin);
}

exports.Admin = Admin;
exports.validate = validateAdmin;
