import Commands from "commands";

/**
 * Find the matching command from the user's input.
 * A matching command is found if the searchTerm matches either:
 * 1. The name of the command.
 * 2. A trigger of the command.
 * @param {string} searchTerm - The value to search for commands by.
 */
const FindMatchingCommand = (searchTerm: string) => {
  // search by command name
  const command = Commands.find((command) => {
    return (
      // matches name
      command.name.toLowerCase() === searchTerm ||
      // matches one of the triggers
      command.triggers.includes(searchTerm)
    );
  });

  return command;
};

export default FindMatchingCommand;
