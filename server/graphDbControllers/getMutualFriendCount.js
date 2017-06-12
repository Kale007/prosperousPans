const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));
const query = require('./obtainQuery.js')

module.exports.getMutualFriendCount = (req, res, next) => {
  let userId = req.query.id || 2
  let userIdB = 4

  let queryEnding = `WITH (\`${userId}\`) as me
    MATCH (me:Users)-[:Connection]-(connected:Users)-[:Connection]-(\`${userIdB}\`)
    WHERE (me)-[:MATCHED]-(connected)
    AND NOT (me)-[:Connection]-(\`${userIdB}\`)
    AND NOT (connected)-[:Connection {status:'reject'}]->(\`${userIdB}\`)
    AND NOT (connected)<-[:Connection {status:'reject'}]-(\`${userIdB}\`)
    RETURN count(\`${userIdB}\`) as PotentientialMatch, (\`${userIdB}\`).id as Suggested_User_Id
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
          result.forEach(function(match) {
            if ( String(match[1]) !== userIdB ) {
              res.status(200).send([String(match[1])], match[0].low)
            } else {
              res.send('No mutual connections')
            }
          });
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
