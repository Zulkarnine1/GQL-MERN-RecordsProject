const { gql } = require("apollo-server-express");

// Types
const userType = require("./typeDefs/user");
const recordType = require("./typeDefs/record");
const authType = require("./typeDefs/auth");

// Resolvers
const authResolvers = require("./resolvers/auth");

const typeDefs = gql`
  ${userType}
  ${recordType}
  ${authType}

  type Query {
    login(email: String!, password: String!): Auth!
    checkLogin: String!
  }

  type Mutation {
    createUser(user: createUserInput): Auth!
  }
`;

const resolvers = {
  Query: {
    login: authResolvers.login,
    checkLogin: (_, args, context) => {
      console.log(context);
      return context.isAuthenticated ? "Logged in - " + context.userId : "Not logged in";
    },
  },
  Mutation: {
    createUser: authResolvers.createUser,
  },
};

module.exports = { typeDefs, resolvers };
