const CronJob = require('cron').CronJob;
const axios = require('axios');

var getMatchesCron = function(){
  // will date get-matches to return array
  var user_id = 4;
  var matchesArr = [[2,1],[6,2],[9,3]]

  var promises = [];

  for (var i=0; i< matchesArr.length; i++) {
    var matchID = matchesArr[i][0];
    promises.push(
      axios.all([
        axios.get('http://localhost:3000/get-profile', {
          params: {id: matchID}
        }),
        axios.get('http://localhost:3000/experience', {
          params: {name: 'professional', users_id: matchID}
        }),
        axios.get('http://localhost:3000/experience', {
          params: {name: 'education', users_id: matchID}
        }),
        axios.get('http://localhost:3000/experience', {
          params: {name: 'projects', users_id: matchID}
        })
      ])
    )
  }

  axios.all(promises)
  .then(function(profiles) {
    var dailyMatchesArr = [];
    profiles.forEach(function(arrayItem) {
      var resObj = {};
      resObj.profile = arrayItem[0].data;
      resObj.profExp = arrayItem[1].data;
      resObj.eduExp = arrayItem[2].data;
      resObj.projExp = arrayItem[3].data;
      dailyMatchesArr.push(resObj);
    })
    return dailyMatchesArr;
  })
  .then( (dailyMatchesArr) => {
    axios.post('http://localhost:3000/get-profile/post-daily-profiles', {
      daily_all_matches: JSON.stringify(dailyMatchesArr),
      id: user_id
    })
    .then( (result) => {
      console.log('daily_all_matches updated');
    })
  });
}

// updates every minute
var cron = new CronJob({
  cronTime: '*/1 * * * *',
  onTick: getMatchesCron,
  start: true,
  timeZone: 'America/Los_Angeles'
});
