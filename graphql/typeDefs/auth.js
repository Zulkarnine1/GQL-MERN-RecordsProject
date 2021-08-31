module.exports = `

    input createUserInput {
        email:String!
        password:String!
        name:String!
    }

    type Auth {
        token:String!
        tokenExpiration:Int!
        user:User!
    }
`;
