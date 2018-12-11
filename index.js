const express                  = require('express'),
      graphqlHTTP              = require('express-graphql'),
      { graphql, buildSchema } = require('graphql'),
      crypto                   = require('crypto'),
      app                      = express();


db = {
    users: [
        { id: '1', email: 'bear@snuggy.com', name: 'Jimbo', avatarUrl: 'https://giantBear.com' },
        { id: '2', email: 'cuteBear@bear.com', name: 'Maddy', avatarUrl: 'https://prettyBear.com' },
        { id: '3', email: 'bossBear@bear.com', name: 'Leo', avatarUrl: 'https://funnyBear.com' }
    ],
    messages: [
        { id: '1', userId: '1', body: 'I want cake', createdAt: Date.now() },
        { id: '2', userId: '1', body: 'I want attention', createdAt: Date.now() },
        { id: '3', userId: '1', body: 'I want my ball', createdAt: Date.now() }
    ]
}

class User {
    constructor (user) {
        Object.assign(this, user)
    }

    messages () {
        return db.messages.filter(message => message.userId === this.id)
    }
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
        user(id: ID!): User
        messages: [Message!]!
    }
    type Mutation {
        addUser(email: String!, name: String): User
    }
    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
        messages: [Message!]!
    }
    type Message {
        id: ID!
        body: String!
        createdAt: String
    }
`)

const rootValue = {
    users: () => db.users.map(user => new User(user)),
    user: args => db.users.find(user => user.id === args.id),
    messages: () => db.messages,
    addUser: ({ email, name }) => {
        const user = {
            id:  crypto.randomBytes(10).toString('hex'),
            email,
            name
        }
        db.users.push(user)
        
        return user
    }
}


app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('. . .up on 3000. . .'))
