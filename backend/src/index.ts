import app from "./app";

const FASTIFY_PORT = Number(process.env.PORT || 8080);

app.listen({ port: FASTIFY_PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

module.exports = app;
