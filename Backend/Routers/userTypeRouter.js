const express = require('express');
const auth = require('../Utilities/auth');
const router = express.Router();
const userTypeController = require('../Controllers/userTypeController');

router.post('/',auth.authMW,userTypeController.createUserType);
router.get('/',auth.authMW,userTypeController.getUserTypes);

module.exports= router;