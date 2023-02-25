import { CommandArgs } from 'lib/types';
import {
  calculateBaseSaleValue,
  calculateFameBonus,
  calculateValuePackBonus,
  cleanInput,
  extractArguments,
  formatNumberToHumanReadable,
  parseInputSaleAmount,
} from 'commands/BDO/value/utils/tools';
import { EmbedBuilder } from 'discord.js';
import i18next from 'i18next';
import { fameMap } from 'commands/BDO/value/utils/constants';
import _ from 'lodash';

/**
 * An action that calculates the amount of silver from selling an item in the BDO marketplace.
 * @param {CommandArgs} args - Arguments that provide additional context for the action.
 */
const action = (args: CommandArgs) => {
  const {
    message: { content, channel },
  } = args;

  const { t } = i18next;

  if (content.split(' ').length < 2) return;

  const saleParameters = extractArguments(content);
  const parsedSaleAmount = _.flow(cleanInput, parseInputSaleAmount)(saleParameters);

  const baseSellPrice = calculateBaseSaleValue(parsedSaleAmount);
  const valuePackBonus = calculateValuePackBonus(baseSellPrice);
  const fameBonus = calculateFameBonus(baseSellPrice, saleParameters.fameLevel);

  const embed = new EmbedBuilder().setTitle(t('value:title')).setDescription(
    t('value:response', {
      LISTING_PRICE: formatNumberToHumanReadable(parsedSaleAmount),
      BASE_PROFIT: formatNumberToHumanReadable(baseSellPrice + fameBonus),
      PROFIT_VP: formatNumberToHumanReadable(baseSellPrice + valuePackBonus + fameBonus),
    }),
  );

  if (saleParameters.saleValue)
    embed.setFooter({
      text: t('value:footer', {
        FAME_LEVEL: saleParameters.fameLevel,
        FAME_BONUS_PERCENT: fameMap[saleParameters.fameLevel],
      }),
    });

  return channel.send({ embeds: [embed] });
};

export default action;
