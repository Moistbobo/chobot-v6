import cheerio from 'cheerio';

/**
 * Extract all HTML elements with the matching anchor tag as the patchnotes are nested under them.
 * @param {String} patchNotesHtml - The HTML of the patchnotes page.
 */
const extractPatchNotesElements = (patchNotesHtml: string) => {
  const cheerioResult = cheerio.load(patchNotesHtml);
  return cheerioResult('a[name=btnDetail]').toArray();
};

export default extractPatchNotesElements;
