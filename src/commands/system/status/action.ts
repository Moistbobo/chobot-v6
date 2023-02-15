/**
 * Action definition for the Status command
 */
import { CommandArgs } from "lib/types";

const action = async (args: CommandArgs) => {
  const {
    message: { channel },
  } = args;

  return channel.send(`I'm alive`);
};

export default action;
