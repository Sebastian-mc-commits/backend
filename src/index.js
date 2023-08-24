import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema.js";
import pool from "./database/index.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {pool}
});

server.listen().then(({url}) => console.log(`Server on ${url}`));