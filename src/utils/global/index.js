"use strict";
import events from 'events'
import io from 'socket.io-client'
import {
  default as Web3
} from 'web3';
import {
  MicroRaiden
} from '../../components/MicroRaiden/microraiden/microraiden';
import parameters from '../../components/MicroRaiden/microraiden/parameters.json'

export const proxy = new events.EventEmitter();

//production
// const SOCKET_URL = "wss://demo.atn.io/";
// global.ServerURL = 'https://demo.atn.io/graphql/';
//development
// const SOCKET_URL = "ws://118.31.18.101:4000/";
// global.ServerURL = 'http://118.31.18.101:4000/graphql/';
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
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  return window.web3;
}

if (!global.Cookies) global.Cookies = new Map();

global.initUraiden = () => {
    let cnt = 20;
    const pollingId = setInterval(() => {
      if (Cookies.get("RDN-Insufficient-Confirmations")) {
        Cookies.delete("RDN-Insufficient-Confirmations");
        clearInterval(pollingId);
        console.log("Waiting confirmations...")
      } else if (cnt < 0 || window.web3) {
        clearInterval(pollingId);
        try {
          global.uraiden = loadURaiden(parameters);
        } catch (error) {
          console.log(error)
        }
      } else {
        --cnt;
      }
    }, 200);
}

global.initUraiden();

function loadURaiden(json) {
  try {
    if (!window.uRaidenParams && Cookies.get("RDN-Price")) {
      window.uRaidenParams = {
        contract: Cookies.get("RDN-Contract-Address"),
        token: Cookies.get("RDN-Token-AddressRDN-Token-Address"),
        receiver: Cookies.get("RDN-Receiver-Address"),
        amount: +(Cookies.get("RDN-Price")),
      };
    } else if (!window.uRaidenParams) {
      window.uRaidenParams = {
        contract: json["contractAddr"],
        token: json["tokenAddr"],
        receiver: json["receiver"],
        amount: json["amount"],
      };
    }
    window.uraiden = new MicroRaiden(
      window.web3,
      uRaidenParams.contract,
      json["contractABI"],
      uRaidenParams.token,
      json["tokenABI"],
    );
    return window.uraiden;
  } catch (error) {
    throw error;
  }
};

