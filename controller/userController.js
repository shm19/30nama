const userModel = require('../models/userModel');
const handleFactory = require('./handleFactory');

module.exports.getAllUsers = handleFactory.getAll(userModel);
module.exports.getUser = handleFactory.getOne(userModel);
module.exports.createUser = handleFactory.createOne(userModel);
module.exports.deleteUser = handleFactory.deleteOne(userModel);
module.exports.updateUser = handleFactory.updateOne(userModel);
