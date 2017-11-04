import events from 'events'
import io from 'socket.io-client'

export const proxy = new events.EventEmitter();

const SOCKET_URL = "http://118.31.18.101:4000/"

global.proxyGlobal = proxy;

global.newSocket = () => {
  const socket = io(SOCKET_URL, {transports: ['websocket']})
  socket.on('connect', () => console.log(`new socket connection: ${socket.id}`))
  socket.on('connect_error', err => console.log(err))
  socket.on('disconnect', () => console.log('socket disconnect'))
  return socket
}
