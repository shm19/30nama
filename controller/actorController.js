const handleFactory = require('../controller/handleFactory');
const actorModel = require('../models/actorModel');

module.exports.getActor = handleFactory.getOne(actorModel);
module.exports.getAllActors = handleFactory.getAll(actorModel);
module.exports.updateActor = handleFactory.updateOne(actorModel);
module.exports.deleteActor = handleFactory.deleteOne(actorModel);
module.exports.createActor = handleFactory.createOne(actorModel);
