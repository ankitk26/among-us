import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "@/graphql/context";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/typeDefs";
import dbConnect from "@/lib/dbConnect";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});
const cors = Cors();

const startServer = server.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "OPTIONS") {
      res.end();
      return;
    }

    await dbConnect();

    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
  } catch (err) {
    console.error(err.message);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
