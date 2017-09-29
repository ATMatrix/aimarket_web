import events from 'events'

export const proxy = new events.EventEmitter();


global.proxyGlobal = proxy;
