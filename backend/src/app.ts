import fastify from "fastify";
import router from "./router";
import prismaPlugin from "./plugins/prisma";
import fastifyWebsocket, { WebSocket } from "@fastify/websocket";
import type { SocketMessage } from "./types";
import { get, set } from "radash";
import cors from "@fastify/cors";

const clients = new Map<string, Set<WebSocket>>();

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
          prisma.message
            .create({
              data: {
                username: data.username,
                text: data.text,
                playgroundId: playgroundId,
              },
            })
            .then(() => {});
        }

        if (data.type === "updateProp") {
          prisma.playground
            .findUnique({
              where: { id: playgroundId },
            })
            .then((currentPlayground) => {
              let currentJSON = currentPlayground
                ? JSON.parse(currentPlayground.json)
                : undefined;

              if (currentJSON) {
                currentJSON = set(
                  currentJSON,
                  data.path,
                  JSON.parse(data.value),
                );

                prisma.playground
                  .update({
                    where: { id: playgroundId },
                    data: { json: JSON.stringify(currentJSON, null, 0) },
                  })
                  .then(() => {});
              }
            });
        }

        if (data.type === "deleteArrayItem") {
          prisma.playground
            .findUnique({
              where: { id: playgroundId },
            })
            .then((currentPlayground) => {
              let currentJSON = currentPlayground
                ? JSON.parse(currentPlayground.json)
                : undefined;

              if (currentJSON) {
                currentJSON = set(
                  currentJSON,
                  data.path,
                  (get(currentJSON, data.path) as any[]).filter(
                    (_, i) => i !== data.index,
                  ),
                );
                prisma.playground
                  .update({
                    where: { id: playgroundId },
                    data: { json: JSON.stringify(currentJSON) },
                  })
                  .then(() => {});
              }
            });
        }

        if (data.type === "update") {
          prisma.playground
            .update({
              where: { id: playgroundId },
              data: { json: data.json },
            })
            .then(() => {});
        }

        clients.get(playgroundId)?.forEach((client) => {
          if (data.type === "message" || client !== socket) {
            client.send(JSON.stringify(data));
          }
        });
      });

      socket.on("close", () => {
        clients.get(playgroundId)?.delete(socket);
      });
    },
  );
});

export default server;
