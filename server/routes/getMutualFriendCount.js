'use strict';
const express = require('express');
const router = express.Router();
const GetMutualFriendCountGraphDbController = require('../graphDbControllers').GetMutualFriendCount;

router.route('/')
  .get(GetMutualFriendCountGraphDbController.getMutualFriendCount)


module.exports = router;
