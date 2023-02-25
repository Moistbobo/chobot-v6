import i18next from 'i18next';
import action from 'commands/system/status/action';
import { Command } from 'lib/types';

const { t } = i18next;

const COMMAND_NAME = 'status';

/**
 * Command definition for the Status command.
 */
const Status: Command = {
  id: 'SYSTEM_001',
  name: t(`${COMMAND_NAME}:name`),
  triggers: t(`${COMMAND_NAME}:triggers`, { returnObjects: true }),
  description: t(`${COMMAND_NAME}:description`),
  example: t(`${COMMAND_NAME}:example`),
  action,
};

export default Status;
