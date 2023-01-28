import { Message } from "discord.js";
import findMemberInServer from "../../utils/FindMemberInServer";

async function handleMessageCreate(message: Message) {
  console.log("found user", await findMemberInServer(message));
}

export default handleMessageCreate;
