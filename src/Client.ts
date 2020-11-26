import { EventEmitter } from 'events';
import Socket from './gateway/WebSocket';

export const client = new EventEmitter();
// eslint-disable-next-line comma-dangle
// Socket('token',  intents number. you can try 512 (GUILD_MESSAGES) );

Socket('NzY5MzUwODc1ODA1MTIyNjEw.X5Nv1g.DHFt0k3kmpB_det7Ir0-SPOyFxM', 512);

//  client.on('eventName', data = {
//    ...
//  })
