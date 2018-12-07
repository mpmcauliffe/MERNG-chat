const express                  = require('express'),
      graphqlHTTP              = require('express-graphql'),
      { graphql, buildSchema } = require('graphql'),
      app                      = express();


app.listen(3000, () => console.log('. . .up on 3000. . .'))

