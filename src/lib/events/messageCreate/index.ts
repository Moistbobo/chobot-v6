import { Message } from "discord.js";
import EnvConfig from "config/envConfig";
import GetFirstWordFromContent from "lib/utils/GetFirstWordFromContent";

async function handleMessageCreate(message: Message) {
  const { content } = message;
  // don't do anything if the first character of the message does not equal
  // the bot prefix
  if (content[0] !== EnvConfig.BOT_PREFIX) return;

  const processedCommand = GetFirstWordFromContent(content);
  console.log(processedCommand);
}

export default handleMessageCreate;
