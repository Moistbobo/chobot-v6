import { DENOMINATIONS, denomShorthandMap } from 'commands/BDO/value/utils/constants';

/**
 * An interface representing the inputs of the value command.
 */
interface SaleParameters {
  /**
   * The listing value of an item. It can contain a denomination or comma formatting as well.
   * eg 1bil, 1,000,000,000
   */
  saleValueString: string;

  /**
   * The fame bonus level to be calculated.
   */
  fameLevel?: number;
}

/**
 * A function that builds a {@link SaleParameters} object from the user's input.
 * @param {string} content - The contents of the user's message.
 */
export const extractArguments = (content: string): SaleParameters => {
  const [, saleValueString, fameLevel] = content.split(' ');

  return {
    saleValueString,
    fameLevel: fameLevel ? parseInt(fameLevel, 10) : undefined,
  };
};

/**
 * A function that removes unwanted characters from a user's input.
 * @param {SaleParameters} saleParameters - Sale parameters extracted from the message content.
 */
export const cleanInput = (saleParameters: SaleParameters) => {
  return {
    ...saleParameters,
    // remove all commas and -lion and -li suffixes for denominations
    saleValueString: saleParameters.saleValueString
      .replace(/,/g, '')
      .replace(/lion/g, '')
      .replace(/il/g, ''),
  };
};

/**
 * Parses the saleParameter object into a number value for further calculation.
 * @param {SaleParameters} cleanedSaleParameters - a SaleParameters object that has been cleaned by the {@link cleanInput} function
 */
export const parseSaleParametersToNumber = (cleanedSaleParameters: SaleParameters) => {
  const { saleValueString } = cleanedSaleParameters;

  const saleValueToLower = saleValueString.toLowerCase();

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

  return parseInt(saleValueString, 10);
};

/**
 * Formats a number to a human-readable value by using commas to separate thousands or bil/mil shorthands.
 * @param {number} input - The number to human-readableize.
 */
export const formatNumberToHumanReadable = (input: number): string => {
  if (input >= 1000000000) {
    return `${input / 1000000000}bil`;
  }
  if (input >= 1000000) {
    return `${input / 1000000}mil`;
  }

  return parseFloat(input.toFixed(0)).toLocaleString('en-US');
};

/**
 * Check if a string starts with a number.
 */
export const startsWithNumber = (content: string): boolean => {
  const regex = /^[0-9]/;
  return regex.test(content);
};
