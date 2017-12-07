import events from 'events'
import io from 'socket.io-client'
import { default as Web3} from 'web3';

export const proxy = new events.EventEmitter();



//production
// const SOCKET_URL = "wss://demo.atn.io/";
// global.ServerURL = 'https://demo.atn.io/graphql/';
//development
// const SOCKET_URL = "wss://bogong.atmatrix.org/";
// global.ServerURL = 'https://bogong.atmatrix.org/graphql/';
//locate
const SOCKET_URL = "ws://127.0.0.1:4000/";
global.ServerURL = 'http://127.0.0.1:4000/graphql/';


global.proxyGlobal = proxy;

global.newSocket = () => {
  const socket = io(SOCKET_URL, {transports: ['websocket'],path:'/wss'})
  socket.on('connect', () => console.log(`new socket connection: ${socket.id}`))
  socket.on('connect_error', err => console.log(err))
  socket.on('disconnect', () => console.log('socket disconnect'))
  return socket
}

global.getWeb3 = () => {
  window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  })
  return window.web3;
}
