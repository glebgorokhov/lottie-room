import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function playgroundController(fastify: FastifyInstance) {
  fastify.post(
    "/create",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { body, server } = request;

      request.log.info(body);

      try {
        JSON.parse(body as string);
      } catch (e) {
        throw "Invalid json";
      }

      const playground = await server.prisma.playground.create({
        data: {
          json: request.body as string,
        },
      });

      reply.send(playground.id);
    },
  );

  fastify.get(
    "/:playgroundId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { server } = request;
      const { playgroundId } = request.params as Record<string, string>;

      const playground = await server.prisma.playground.findUnique({
        where: { id: playgroundId },
        include: {
          Message: {
            select: {
              id: true,
              username: true,
              text: true,
            },
          },
        },
      });

      if (!playground) {
        throw "Playground not found";
      }

      reply.send(playground);
    },
  );
}
