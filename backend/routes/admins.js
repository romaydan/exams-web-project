const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');
const { Admin, validate } = require('../models/admin');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-password');
  res.send(admin);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email });
  if (admin) return res.status(400).send('Admin already registered.');

  admin = new Admin(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(admin, ['_id', 'name', 'email']));
});

module.exports = router;
