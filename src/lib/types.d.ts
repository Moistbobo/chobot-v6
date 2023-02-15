import { Message } from "discord.js";

export interface CommandArgs {
  /**
   * The message object.
   */
  message: Message;

  /**
   * The message content with bot prefix and command removed.
   */
  messageContent: string;
}

export interface Command {
  /**
   * The name of the command.
   */
  name: string;

  /**
   * Shorthand triggers that can also start the command.
   */
  triggers: string[];

  /**
   * A brief description of what the command does.
   */
  description: string;

  /**
   * An example of how to use the command and it's expected output.
   */
  example: string;

  /**
   * The main logic of the command.
   * @param {CommandArgs} args - The arguments to provide additional context for the command to function.
   */
  action: (args: CommandArgs) => any;
}
