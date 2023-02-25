import { Message } from 'discord.js';
import EnvConfig from 'config/envConfig';
import GetFirstWordFromContent from 'lib/utils/GetFirstWordFromContent';
import { CommandArgs } from 'lib/types';
import FindMatchingCommand from 'lib/utils/FindMatchingCommand';

/**
 * An event handler for onMessageCreate events. {@link runBot}
 */
async function handleMessageCreate(message: Message) {
  const { content } = message;
  // don't do anything if the first character of the message does not equal
  // the bot prefix
  if (content[0] !== EnvConfig.BOT_PREFIX) return;

  const commandToSearch = GetFirstWordFromContent(content);

  const command = FindMatchingCommand(commandToSearch);

  // exit early if no matching command is found
  if (!command) return;

  // Build command args
  const commandArgs: CommandArgs = {
    message,
    messageContent: message.content.replace(`${EnvConfig.BOT_PREFIX}${commandToSearch}`, ''),
  };

  await command.action(commandArgs);
}

export default handleMessageCreate;
