// retrieving matches
module.exports.users = require('./users');
module.exports.getProfile = require('./getProfile');
module.exports.experience = require('./experience');

// inserting response
module.exports.insertConnection = require('./insertConnection');
module.exports.checkMatch = require('./checkMatch');
module.exports.insertReason = require('./insertReason');

// chat
module.exports.chat = require('./chat');
module.exports.profile = require('./profile');
module.exports.login = require('./login');

// dashboard
module.exports.getConnect = require('./getConnect');

// graphDB
module.exports.createGraphDB = require('./createGraphDB');
module.exports.populateFullGraphDB = require('./populateFullGraphDB');
module.exports.recommendation = require('./recommendation');
module.exports.priorityRecommendation = require('./priorityRecommendation');

module.exports.getMatches = require('./getMatches');

module.exports.getMutualFriendCount = require('./getMutualFriendCount');
