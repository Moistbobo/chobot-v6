import { Client } from "discord.js";

const handleReady = (client: Client<true>) => {
  console.log(`Logged in as ${client?.user?.tag}`);
};

export default handleReady;
