import type { SocketMessage } from "../types";
import { get, set } from "radash";
import { FastifyInstance } from "fastify";
import { WebSocket } from "@fastify/websocket";

const clients = new Map<string, Set<WebSocket>>();

export default async function playgroundSocket(fastify: FastifyInstance) {
  fastify.get(
    "/api/v1/playground/:playgroundId/ws",
    { websocket: true },
    async (socket, req) => {
      const { prisma } = req.server;
      const { playgroundId } = req.params as Record<string, string>;

      if (!clients.has(playgroundId)) {
        clients.set(playgroundId, new Set());
      }

      clients.get(playgroundId)?.add(socket);

      socket.on("message", async (message: string) => {
        const data = JSON.parse(message) as SocketMessage;

        // Chat message
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

        // Property update
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

        // Array item removal
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

        // Whole JSON update
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
}
