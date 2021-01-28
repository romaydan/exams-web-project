const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const { Admin } = require('../../../models/admin');

describe('admin.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const admin = new Admin(payload);
    const token = admin.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
