import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import client from "../graphql/client.js";
import {
  FeaturedAnimationsListResponseData,
  FeaturedAnimation,
} from "../../../types/featuredAnimations.js";

const { gql } = require("@apollo/client");

export default async function featuredAnimationsController(
  fastify: FastifyInstance,
) {
  // GET /api/v1/featuredAnimations
  fastify.get(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      const { data } = await client.query({
        query: gql`
          {
            featuredPublicAnimations(first: 12) {
              edges {
                cursor
                node {
                  id
                  gifUrl
                  name
                  likesCount
                  lottieUrl
                  url
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

      const mappedData: FeaturedAnimationsListResponseData = {
        animations: data.featuredPublicAnimations.edges.map(
          (edge: { node: FeaturedAnimation }) => {
            const {
              id,
              gifUrl,
              name,
              likesCount,
              url,
              lottieUrl,
              createdBy: { username, avatarUrl, firstName, lastName },
            } = edge.node;

            return {
              id,
              gifUrl,
              name,
              likesCount,
              url,
              lottieUrl,
              createdBy: {
                username,
                avatarUrl,
                firstName,
                lastName,
              },
            };
          },
        ),
      };

      reply.send(mappedData);
    },
  );
}
