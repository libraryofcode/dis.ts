import { EventEmitter } from 'events';
import Socket from './gateway/WebSocket';

export const client = new EventEmitter();
// eslint-disable-next-line comma-dangle
Socket('<token>', /* intents number. you can try 512 (GUILD_MESSAGES) */);

// client.on('eventName', data => {
//   ...
// })
