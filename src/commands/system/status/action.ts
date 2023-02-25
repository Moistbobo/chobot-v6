/**
 * Action definition for the Status command
 */
import { CommandArgs } from 'lib/types';

/**
 * Action implementation of the Status command.
 * @param args {CommandArgs} -  An object containing the input message and other contextual values to perform the action.
 */
const action = async (args: CommandArgs) => {
  const {
    message: { channel },
  } = args;

  return channel.send(`I'm alive`);
};

export default action;
