const { Router } = require("express");
const router = Router();

const controller = require('../../controllers/api/score.controller.api')

router.post('/score', controller.scoreData)

module.exports = router;