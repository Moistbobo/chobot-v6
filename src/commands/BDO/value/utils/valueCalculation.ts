import { baseSaleModifier, fameMap, valuePackBonus } from 'commands/BDO/value/utils/constants';

/**
 * Calculate the base selling value of a given listing amount.
 * @param {number} listValue - The amount of silver an item was listed for.
 */
export const calculateBaseSaleValue = (listValue: number) => listValue * baseSaleModifier;

/**
 * Calculate the value pack bonus of a marketplace sale.
 * @param {number} sellingPrice - The amount of silver an item was sold for.
 */
export const calculateValuePackBonus = (sellingPrice: number) => sellingPrice * valuePackBonus;

/**
 * Calculate the fame bonus of a marketplace sale.
 * @param {number} sellingPrice - The amount of silver an item was sold for.
 * @param {number} fameLevel - The fameLevel of the user.
 */
export const calculateFameBonus = (sellingPrice: number, fameLevel?: number) => {
  if (!fameLevel) return 0;
  return sellingPrice * fameMap[fameLevel];
};
