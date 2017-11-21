import events from 'events'
import io from 'socket.io-client'

export const proxy = new events.EventEmitter();



//production
const SOCKET_URL = "wss://demo.atn.io/";
global.ServerURL = 'https://demo.atn.io/graphql/';
//development
// const SOCKET_URL = "wss://bogong.atmatrix.org/";
// global.ServerURL = 'https://bogong.atmatrix.org/graphql/';
//locate
// const SOCKET_URL = "ws://127.0.0.1:4000/";
// global.ServerURL = 'http://127.0.0.1:4000/';


global.proxyGlobal = proxy;

global.newSocket = () => {
  const socket = io(SOCKET_URL, {transports: ['websocket'],path:'/wss'})
  socket.on('connect', () => console.log(`new socket connection: ${socket.id}`))
  socket.on('connect_error', err => console.log(err))
  socket.on('disconnect', () => console.log('socket disconnect'))
  return socket
}
