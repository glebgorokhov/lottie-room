import { FastifyInstance } from "fastify";
import featuredAnimationsController from "./controller/featuredAnimationsController";
import playgroundController from "./controller/playgroundController";

function getPrefixedRoute(url: string, version = 1) {
  return `/api/v${version}/${url}`;
}

export default async function router(fastify: FastifyInstance) {
  fastify.register(featuredAnimationsController, {
    prefix: getPrefixedRoute("featuredAnimations"),
  });

  fastify.register(playgroundController, {
    prefix: getPrefixedRoute("playground"),
  });
}
