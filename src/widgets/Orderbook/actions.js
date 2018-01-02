export const types = {
  CONNECT_SOCKET: 'CONNECT_SOCKET',
  CLOSE_SOCKET: 'CLOSE_SOCKET',
  ERROR_SOCKET: 'ERROR_SOCKET',
  ORDER_UPDATED: 'ORDER_UPDATED',
  INSTRUMENT_UPDATED: 'INSTRUMENT_UPDATED',
  OTHERS_UPDATED: 'OTHERS_UPDATED',
};

export function connectSocket() {
  return {
    type: types.CONNECT_SOCKET,
  };
}

export function closeSocket() {
  return {
    type: types.CLOSE_SOCKET,
  };
}

export function errorSocket() {
  return {
    type: types.ERROR_SOCKET,
  };
}
