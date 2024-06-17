<img src="./logo_light.svg#gh-light-mode-only" alt="logo" width="200" />
<img src="./logo_dark.svg#gh-dark-mode-only" alt="logo" width="200" />

# Lottie Room

This project allows Lottie users to play with some animation settings, see and discuss changes made by any room visitor in the realtime.

## Live demo

https://lottie-room-frontend.vercel.app/

## Core technologies

### Frontend

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Radash](https://radash-docs.vercel.app/docs/getting-started)
- [Tanstack Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)

### Backend

- [Fastify](https://fastify.dev/)
- WebSockets via [Fastify Websocket](https://github.com/fastify/fastify-websocket)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo GraphQL Client](https://www.apollographql.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Radash](https://radash-docs.vercel.app/docs/getting-started)

## Additional information

It took around 20 hours to build the project and 5 to deploy (yeah, I know)

## Todos:

- [ ] Support for editing gradients
- [ ] Support for selecting shapes
- [ ] Timestamps to socket events
- [ ] History for JSON changes
- [ ] Some kind of authentication
- [ ] Display outlines for selected/hovered layers/shapes
- [ ] Optimize socket event sending query
