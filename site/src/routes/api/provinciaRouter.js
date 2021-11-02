const express = require('express');
const { getProvincias } = require('../../controllers/api/provinciaController');
const router = express.Router();



//endpoints: /api/users
router
    .get('/', getProvincias)


    module.exports = router;