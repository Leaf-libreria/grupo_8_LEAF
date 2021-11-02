var express = require('express');
var router = express.Router();

const { show,add,remove} = require('../../controllers/api/cartController');

// enpoint: /api/carts
router.get('/show',show)
router.get('/add/:id',add)
router.get('/remove/:id',remove)


module.exports = router;