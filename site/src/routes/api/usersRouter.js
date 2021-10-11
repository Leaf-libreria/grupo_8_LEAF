const express = require('express');
const router = express.Router();

const {getEmails} = require('../../controllers/api/userController');

//endpoints: /api/users
router
    .get('/emails', getEmails)


    module.exports = router;