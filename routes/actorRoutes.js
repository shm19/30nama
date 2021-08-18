const express = require('express');

const actorController = require('../controller/actorController');

const router = express.Router();

router
  .route('/')
  .get(actorController.getAllActors)
  .post(actorController.createActor);

router
  .route('/:id')
  .get(actorController.getActor)
  .patch(actorController.updateActor)
  .delete(actorController.deleteActor);

module.exports = router;
