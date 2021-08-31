const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const { typeDefs, resolvers } = require("./graphql/schema");
const { authenticationCheck } = require("./middlewares/authCheck");

const startServer = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req, res, next }) => {
      const { userId, isAuthenticated } = await authenticationCheck(req);
      return {
        isAuthenticated,
        userId,
      };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: "/graphql" });

  mongoose
    .connect(process.env.MONGO_KEY)
    .then(() => {
      console.log("Connected to database successfully");
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log("Server running on PORT => " + PORT);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

startServer();
