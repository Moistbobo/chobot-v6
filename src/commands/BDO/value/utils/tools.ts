import {
  baseSaleModifier,
  DENOMINATIONS,
  denomShorthandMap,
  fameMap,
  valuePackBonus,
} from 'commands/BDO/value/utils/constants';

interface SaleParameters {
  saleValue: string;

  fameLevel: number;
}

export const extractArguments = (content: string): SaleParameters => {
  const [, saleValue, fameLevel] = content.split(' ');

  return {
    saleValue,
    fameLevel: parseInt(fameLevel, 10),
  };
};

export const cleanInput = (saleParameters: SaleParameters) => {
  return {
    ...saleParameters,
    saleValue: saleParameters.saleValue.replace(/,/g, '').replace(/lion/g, '').replace(/il/g, ''),
  };
};

export const parseInputSaleAmount = (saleParameters: SaleParameters) => {
  const { saleValue } = saleParameters;

  const saleValueToLower = saleValue.toLowerCase();

  if (
    saleValueToLower.includes('b') ||
    saleValueToLower.includes('m') ||
    saleValueToLower.includes('k')
  ) {
    if (saleValueToLower.split(denomShorthandMap[DENOMINATIONS.BILLION]).length > 1) {
      return (
        parseInt(saleValueToLower.split(denomShorthandMap[DENOMINATIONS.BILLION])[0], 10) *
        1000000000
      );
    }
    if (saleValueToLower.split(denomShorthandMap[DENOMINATIONS.MILLION]).length > 1) {
      return (
        parseInt(saleValueToLower.split(denomShorthandMap[DENOMINATIONS.MILLION])[0], 10) * 1000000
      );
    }
    if (saleValueToLower.split(denomShorthandMap[DENOMINATIONS.THOUSAND]).length > 1) {
      return (
        parseInt(saleValueToLower.split(denomShorthandMap[DENOMINATIONS.THOUSAND])[0], 10) * 1000
      );
    }
  }

  return parseInt(saleValue, 10);
};

export const calculateBaseSaleValue = (listingAmount: number) => listingAmount * baseSaleModifier;

export const calculateValuePackBonus = (sellingPrice: number) => sellingPrice * valuePackBonus;

export const calculateFameBonus = (sellingPrice: number, fameLevel?: number) => {
  if (!fameLevel) return 0;
  return sellingPrice * fameMap[fameLevel];
};

export const startsWithNumber = (content: string): boolean => {
  const regex = /^[0-9]/;
  return regex.test(content);
};

export const formatNumberToHumanReadable = (num: number): string => {
  if (num >= 1000000000) {
    return `${num / 1000000000}bil`;
  }
  if (num >= 1000000) {
    return `${num / 1000000}mil`;
  }

  return parseFloat(num.toFixed(0)).toLocaleString('en-US');
};
