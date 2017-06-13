const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
const query = require('./obtainQuery.js')

module.exports.getPriorityRecommendation = (req, res, next) => {
  let userId = req.query.id || 2
  let queryEnding = `WITH (\`${userId}\`) as me
    MATCH (me:Users)-[:Connection]-(connected:Users)
    WHERE (connected)-[:Connection {status:"accept"}]->(me)
    AND NOT (connected)<-[:Connection {status:"reject"}]-(me)
    AND NOT (connected)-[:MATCHED]->(me)
    RETURN count(connected) as PotentientialMatch, connected.id as Suggested_User_Id
    ORDER BY PotentientialMatch DESC`;

  let result = [];
  let sent = false;
  let session = driver.session();
    session
      .run(query.query + queryEnding)
      .subscribe({
        onNext: function(record) {
         result.push(record._fields)
        },
        onCompleted: function() {
          let resultLength = result[0].length
          let RandResultIndex = Math.floor(Math.random() * result.length)
          if ( RandResultIndex >= 2 && sent === false) {
            sent = true;
            session.close();
            res.status(200).send([result[RandResultIndex], {'Priority Result Length': result.length}]);
          } else {
            res.status(200).send('null');
          }
          if ( sent === false ) {
            session.close();
            next();
          }
        },
        onError: function(error) {
          console.log(error);
        }
      });
};
