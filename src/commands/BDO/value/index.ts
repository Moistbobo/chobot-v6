import i18next from 'i18next';
import { Command } from 'lib/types';
import action from './action';

const { t } = i18next;

/**
 * Command definition for the BDO value command.
 */
const COMMAND_NAME = 'value';

const Value: Command = {
  id: 'BDO_003',
  name: t(`${COMMAND_NAME}:name`),
  triggers: t(`${COMMAND_NAME}:triggers`, { returnObjects: true }),
  description: t(`${COMMAND_NAME}:description`),
  example: t(`${COMMAND_NAME}:example`),
  action,
};

export default Value;
