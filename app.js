db = {
    users: [
        { id: '1', email: 'bear@snuggy.com', name: 'Jimbo' },
        { id: '2', email: 'cuteBear@bear.com', name: 'Maddy' },
        { id: '3', email: 'bossBear@bear.com', name: 'Leo' }
    ]
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }
    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`)

const rootValue = {
    users: () => db.users
}

graphql(
    schema,
    `
        {
            users {
                id
                email
            }
        }
    `,
    rootValue
).then(
    res => console.dir(res, { depth: null })
).catch(
    console.error
)
