const router = require('express').Router();

const indexController = require('../controllers/indexController');
const autController = require('../controllers/authController');

//meddleware para validacion de token
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, indexController.index);

router.post('/signin', autController.signin);
router.post('/signup', autController.signup);
router.get('/me', verifyToken, autController.me);

module.exports = router;
