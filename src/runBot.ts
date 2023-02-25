import { Client } from 'discord.js';
import EnvConfig from 'config/envConfig';
import handleReady from 'lib/events/ready';
import handleMessageCreate from 'lib/events/messageCreate';

export const client = new Client({ intents: [1, 2, 512, 32768] });

const events: { [index: string]: any } = {
  ready: handleReady,
  messageCreate: handleMessageCreate,
};

const runBot = () => {
  Object.keys(events).forEach(e => {
    console.log('[CHOBOT]: Registering', e);
    client.on(String(e), events[e]);
  });

  // mongodb.connect();
  return client.login(EnvConfig.BOT_TOKEN);
};

export default runBot;
