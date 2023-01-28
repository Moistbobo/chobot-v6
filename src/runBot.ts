import { Client, ClientEvents } from "discord.js";
import envConfig from "./config/envConfig";
import handleReady from "./lib/events/ready";
import handleMessageCreate from "./lib/events/messageCreate";

const events: { [index: string]: any } = {
  ready: handleReady,
  messageCreate: handleMessageCreate,
};

const runBot = () => {
  const client = new Client({ intents: [1, 2, 512] });

  Object.keys(events).forEach((e) => {
    console.log("[CHOBOT]: Registering", e);
    client.on(String(e), events[e]);
  });

  // mongodb.connect();
  return client.login(envConfig.BOT_TOKEN);
};

export default runBot;
