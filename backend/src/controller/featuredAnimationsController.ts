import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import client from "../graphql/client.js";
import {
  FeaturedAnimationsListResponseData,
  FeaturedAnimation,
} from "../types";

const { gql } = require("@apollo/client");

export default async function featuredAnimationsController(
  fastify: FastifyInstance,
) {
  fastify.get(
    "/",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { cursor } = request.query as Record<string, string>;
      const { data } = await client.query({
        query: gql`
          {
            featuredPublicAnimations(first: 12, after: ${cursor ? `"${cursor}"` : null}) {
              edges {
                cursor
                node {
                  id
                  gifUrl
                  name
                  likesCount
                  lottieUrl
                  url
                  jsonUrl
                  createdBy {
                    username
                    avatarUrl
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        `,
      });

      const edges = data.featuredPublicAnimations.edges as {
        node: FeaturedAnimation;
        cursor: string;
      }[];

      const mappedData: FeaturedAnimationsListResponseData = {
        nextCursor: edges[edges.length - 1].cursor,
        animations: edges.map((edge) => {
          const {
            id,
            gifUrl,
            name,
            likesCount,
            url,
            lottieUrl,
            jsonUrl,
            createdBy: { username, avatarUrl, firstName, lastName },
          } = edge.node;

          return {
            id,
            cursor,
            gifUrl,
            name,
            likesCount,
            url,
            lottieUrl,
            jsonUrl,
            createdBy: {
              username,
              avatarUrl,
              firstName,
              lastName,
            },
          };
        }),
      };

      request.log.info(mappedData.nextCursor);

      reply.send(mappedData);
    },
  );
}
