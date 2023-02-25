import { CommandArgs } from 'lib/types';
import { EmbedBuilder } from 'discord.js';
import _ from 'lodash';
import getPatchNotesHtml from 'commands/BDO/patchnotes/utils/getPatchNotesHtml';
import extractPatchNotesElements from 'commands/BDO/patchnotes/utils/extractPatchNotesElements';
import parsePatchNotes from 'commands/BDO/patchnotes/utils/parsePatchNotes';
import { Element } from 'cheerio';

import i18next from 'i18next';

/**
 * Parse user input and get the max amount of patch notes to show.
 * @param {string} content - The contents of the user's input.
 */
const parseLimitFromInput = (content: string) => {
  const [, limit] = content.split(' ');

  // enforce a hard cap of 5 patchnotes, to reduce spam.
  return Math.min(parseInt(limit, 10) || 1, 5);
};

/**
 * Action implementation of the BDO Patchnotes command.
 * @param args {CommandArgs} - An object containing the input message and other contextual values to perform the action.
 */
const action = async (args: CommandArgs) => {
  const {
    message: { content, channel },
  } = args;

  const { t } = i18next;

  const result = await getPatchNotesHtml();

  // Show an error message if the fetch request fails.
  if (result.isErr())
    return channel.send(t('patchnotes:error', { ERR_CODE: result.error.message }) as string);

  // Get the max patch notes limit from user input.
  const limit = parseLimitFromInput(content);

  // Assemble the patch notes data, using _.flow to chain the functions together.
  const patchnotes = _.flow([
    extractPatchNotesElements,
    (elements: Element[]) => parsePatchNotes(elements, limit),
  ])(result.value.patchNotesHtml);

  // Build the embed message and send to the channel.
  const embed = new EmbedBuilder().setTitle(t('patchnotes:embedTitle')).setDescription(patchnotes);

  return channel.send({ embeds: [embed] });
};

export default action;
