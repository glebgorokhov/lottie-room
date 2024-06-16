export type SocketTextMessage = {
  type: "message";
  id: string;
  playgroundId: string;
  username: string;
  text: string;
};

export type SocketUpdateMessage = {
  type: "update";
  json: string;
};

export type SocketUpdatePropMessage = {
  type: "updateProp";
  path: string;
  value: string;
};

export type SocketDeleteArrayItemMessage = {
  type: "deleteArrayItem";
  path: string;
  index: number;
};

export type SocketMessage = SocketUpdateMessage | SocketTextMessage | SocketUpdatePropMessage | SocketDeleteArrayItemMessage;
