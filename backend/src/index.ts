import app from "./app";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

app.listen({ port: FASTIFY_PORT });

module.exports = app;
