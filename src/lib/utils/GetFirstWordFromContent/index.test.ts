import GetFirstWordFromContent from './index';

describe('lib: GetFirstWordFromContent', () => {
  it('returns the first word (in lowercase) of a given string, with bot prefix removed', () => {
    const stringToTest = '.FiRst second third';
    expect(GetFirstWordFromContent(stringToTest)).toEqual('first');
  });
});
