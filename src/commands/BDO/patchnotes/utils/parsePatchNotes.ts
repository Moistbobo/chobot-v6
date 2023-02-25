import _ from 'lodash';
import { Element } from 'cheerio';

/**
 * An interface that represents the patch notes details that are parsed from the patch notes page.
 */
interface PatchNoteDetails {
  /**
   * The title of the patch note content.
   */
  title?: string;

  /**
   * The description of the patch notes.
   */
  description: string;

  /**
   * The date of the patch notes.
   */
  date: string;

  /**
   * A hyperlink that points to the details page of the patch notes.
   */
  link: string;
}

/**
 * Extract the full patch notes details from a given HTML element.
 * @param {Element[]} elements - An array of html elements that represents an anchor link to the patch notes details.
 * @returns {PatchNoteDetails[]} - An array of {@link PatchNoteDetails} objects.
 */
const extractPatchNotesDetails = (elements: Element[]): PatchNoteDetails[] => {
  const extractFunction = (_e: Element) => ({
    title: _.get(_e, 'children[3].children[1].children[3].children[0].data'),
    description: _.get(_e, 'children[3].children[1].children[5].children[0].data', ''),
    date: _.get(_e, 'children[3].children[1].children[7].children[0].data', ''),
    link: _.get(_e, 'attribs.href', ''),
  });

  return elements.map(extractFunction);
};

/**
 * Filter an array of {@link PatchNoteDetails} objects by verifying each object has a title and is a patch notes content.
 * @returns {PatchNoteDetails[]} - An array of filtered {@link PatchNoteDetails} objects.
 */
const filterPatchNotes = (patchnoteDetails: PatchNoteDetails[]) =>
  patchnoteDetails.filter(x => x.title && x.title?.toLowerCase().includes('patch notes'));

/**
 * A function that parses patch notes from an array of HTML elements into a human-readable form.
 * @param {Element[]} elements - An array of Html elements containing the patch notes details.
 * @param {number} limit - The max number of patch notes to retrieve.
 *
 * @returns {String[]} - A string representing the patch notes details.
 * {@link action}
 */
const parsePatchNotes = (elements: Element[], limit: number) => {
  const patchnotesDetailsArray = extractPatchNotesDetails(elements);

  const filteredLinks = filterPatchNotes(patchnotesDetailsArray);

  // Apply limit by truncating the results array if it exceeds the limit param.
  filteredLinks.length = Math.min(limit || filteredLinks.length);

  return filteredLinks.map(x => `${x.title}\n${x.description}\n${x.link}`).join('\n\n');
};

export default parsePatchNotes;
