import fastify from "fastify";
import router from "./router";
import prismaPlugin from "./plugins/prisma";
import fastifyWebsocket from "@fastify/websocket";
import cors from "@fastify/cors";
import playgroundSocket from "./sockets/playgroundSocket";

const server = fastify({
  logger: true,
});

// CORS
server.register(cors, {
  origin: true,
});

// Middleware: Router
server.register(router);
server.register(prismaPlugin);
server.register(fastifyWebsocket);

// Sockets
server.register(playgroundSocket);

export default server;
