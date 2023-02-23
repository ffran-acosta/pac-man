const {Router} = require("express");
const router = Router();
const controller = require('../controllers/pacman.controller');

router.get('/', controller.home)
router.get('/play', controller.pacman)
router.get("/score", controller.score)
// router.post('/score/save', controller.scoreSave)
router.get("/exit", controller.exit)

module.exports = router