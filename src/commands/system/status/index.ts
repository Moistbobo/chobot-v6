import i18next from "i18next";
import action from "commands/system/status/action";
import { Command } from "lib/types";

const { t } = i18next;

const COMMAND_NAME = "status";

const Status: Command = {
  name: t(`${COMMAND_NAME}:name`),
  triggers: t(`${COMMAND_NAME}:triggers`, { returnObjects: true }),
  description: t(`${COMMAND_NAME}:description`),
  example: t(`${COMMAND_NAME}:example`),
  action,
};

export default Status;
