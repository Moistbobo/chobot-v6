import {
  cleanInput,
  extractArguments,
  formatNumberToHumanReadable,
  parseSaleParametersToNumber,
  startsWithNumber,
} from 'commands/BDO/value/utils/tools';

describe('value utils tests', () => {
  describe('extractArguments', () => {
    const mockInput = '.val 1bil 5';
    const mockInput2 = '.val 1000';

    it('extracts inputs with sale value and fame level', () => {
      expect(extractArguments(mockInput)).toEqual({
        saleValueString: '1bil',
        fameLevel: 5,
      });
    });

    it('extracts inputs with just sale value', () => {
      expect(extractArguments(mockInput2)).toEqual({
        saleValueString: '1000',
        fameLevel: undefined,
      });
    });
  });

  describe('cleanInput', () => {
    const mockSaleValue = {
      saleValueString: '1,000,000,000',
      fameLevel: undefined,
    };

    const mockSaleValue2 = {
      saleValueString: '1billion',
      fameLevel: undefined,
    };

    const mockSaleValue3 = {
      saleValueString: '1bil',
      fameLevel: undefined,
    };

    it('Formats numbers with comma separators', () => {
      expect(cleanInput(mockSaleValue)).toEqual({
        ...mockSaleValue,
        saleValueString: '1000000000',
      });
    });

    it('Formats numbers with full denominations (billion/million)', () => {
      expect(cleanInput(mockSaleValue2)).toEqual({
        ...mockSaleValue,
        saleValueString: '1b',
      });
    });

    it('Formats numbers with shorthand denominations (bil/mil)', () => {
      expect(cleanInput(mockSaleValue3)).toEqual({
        ...mockSaleValue,
        saleValueString: '1b',
      });
    });
  });

  describe('parseSaleParametersToNumber', () => {
    const mockSaleValue = {
      saleValueString: '1bil',
      fameLevel: undefined,
    };

    const mockSaleValue2 = {
      saleValueString: '1mil',
      fameLevel: undefined,
    };

    const mockSaleValue3 = {
      saleValueString: '1k',
      fameLevel: undefined,
    };

    it('Parses billions', () => {
      expect(parseSaleParametersToNumber(mockSaleValue)).toEqual(1000000000);
    });
    it('Parses millions', () => {
      expect(parseSaleParametersToNumber(mockSaleValue2)).toEqual(1000000);
    });
    it('Parses thousands', () => {
      expect(parseSaleParametersToNumber(mockSaleValue3)).toEqual(1000);
    });
  });

  describe('formatNumberToHumanReadable', () => {
    const mockInput = 3000000000;
    const mockInput2 = 1000000;
    const mockInput3 = 1000;

    it('Formats billions', () => {
      expect(formatNumberToHumanReadable(mockInput)).toEqual('3bil');
    });
    it('Formats millions', () => {
      expect(formatNumberToHumanReadable(mockInput2)).toEqual('1mil');
    });

    it('Formats thousands', () => {
      expect(formatNumberToHumanReadable(mockInput3)).toEqual('1,000');
    });
  });

  describe('startsWithNumber', () => {
    it('Checks if a string starts with a number', () => {
      expect(startsWithNumber('1bil')).toBeTruthy();
    });
  });
});
