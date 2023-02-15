import { Message } from "discord.js";
import findMemberInServer from "../../utils/FindMemberInServer";
import EnvConfig from "../../../config/envConfig";
import GetFirstWordFromContent from "../../utils/GetFirstWordFromContent";

async function handleMessageCreate(message: Message) {
  const { content } = message;
  // don't do anything if the first character of the message does not equal
  // the bot prefix
  if (content[0] !== EnvConfig.BOT_PREFIX) return;

  const processedCommand = GetFirstWordFromContent(content);
}

export default handleMessageCreate;
