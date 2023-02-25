import { Client } from 'discord.js';

/**
 * An event handler for onReady events. {@link runBot}
 */
const handleReady = (client: Client<true>) => {
  console.log(`Logged in as ${client?.user?.tag}`);
};

export default handleReady;
