import { CommandArgs } from 'lib/types';
import {
  cleanInput,
  extractArguments,
  formatNumberToHumanReadable,
  parseSaleParametersToNumber,
  startsWithNumber,
} from 'commands/BDO/value/utils/tools';

import {
  calculateBaseSaleValue,
  calculateFameBonus,
  calculateValuePackBonus,
} from 'commands/BDO/value/utils/valueCalculation';

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

  const saleParameters = extractArguments(content);

  // Exit early if the first argument (the sale amount) does not start with a number.
  if (!startsWithNumber(saleParameters.saleValueString)) return;

  // Clean and parse user input into a {@link SaleParameters} object.
  const parsedSaleAmount = _.flow(cleanInput, parseSaleParametersToNumber)(saleParameters);

  // Calculate all relevant sale amounts and bonuses.
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

  // Add fame level data to footer if it was included in the input
  if (saleParameters.fameLevel)
    embed.setFooter({
      text: t('value:footer', {
        FAME_LEVEL: saleParameters.fameLevel,
        FAME_BONUS_PERCENT: fameMap[saleParameters.fameLevel],
      }),
    });

  return channel.send({ embeds: [embed] });
};

export default action;
