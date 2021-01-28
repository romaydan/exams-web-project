const mongoose = require('mongoose');

const auth = require('../../../middleware/auth');
const { Admin } = require('../../../models/admin');

describe('auth middleware', () => {
  it('should populate req.admin with the payload of a valid JWT', () => {
    const admin = {
      _id: mongoose.Types.ObjectId().toHexString(),
    };
    const token = new Admin(admin).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.admin).toMatchObject(admin);
  });
});
