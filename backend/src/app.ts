import fastify from "fastify";
import router from "./router";
import prismaPlugin from "./plugins/prisma";
import fastifyWebsocket, { WebSocket } from "@fastify/websocket";

type SocketTextMessage = {
  type: "message";
  username: string;
  text: string;
};

type SocketUpdateMessage = {
  type: "update";
  json: string;
};

type SocketMessage = SocketUpdateMessage | SocketTextMessage;

const clients = new Map<string, Set<WebSocket>>();

const server = fastify({
  logger: true,
});

// Middleware: Router
server.register(router);
server.register(prismaPlugin);
server.register(fastifyWebsocket);

// Socket
server.register(async function (fastify) {
  fastify.get(
    "/api/v1/playground/:playgroundId/ws",
    { websocket: true },
    async (socket, req) => {
      const { prisma } = req.server;
      const { playgroundId } = req.params as Record<string, string>;

      console.log("Playground id", playgroundId);

      if (!clients.has(playgroundId)) {
        clients.set(playgroundId, new Set());
      }

      clients.get(playgroundId)?.add(socket);

      socket.on("message", async (message: string) => {
        const data = JSON.parse(message) as SocketMessage;

        if (data.type === "message") {
          await prisma.message.create({
            data: {
              username: data.username,
              text: data.text,
              playgroundId: playgroundId,
            },
          });
        }

        if (data.type === "update") {
          await prisma.playground.update({
            where: { id: playgroundId },
            data: { json: data.json },
          });
        }

        clients.get(playgroundId)?.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      });

      socket.on("close", () => {
        clients.get(playgroundId)?.delete(socket);
      });
    },
  );
});

export default server;
