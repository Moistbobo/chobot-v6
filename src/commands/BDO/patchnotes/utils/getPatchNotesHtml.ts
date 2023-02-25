import { err, ok, Result } from 'neverthrow';
import fetch from 'node-fetch';

/**
 * An interface representing the success response of the {@link getPatchNotesHtml} function.
 */
interface ResponseData {
  patchNotesHtml: string;
}

/**
 * Retrieve the raw html value of BDO patchnotes page.
 * @returns {Promise<Result<ResponseData, Error>>} A promise object containing either a ResponseData object or Error
 */
const getPatchNotesHtml = async (): Promise<Result<ResponseData, Error>> => {
  const UPDATES_URL = 'https://www.naeu.playblackdesert.com/en-US/News/Notice?boardType=2';

  const fetchResult = await fetch(UPDATES_URL);
  if (fetchResult.status !== 200) {
    return err(new Error(`Invalid response from server: ${fetchResult.status}`));
  }

  const resultString = await fetchResult.text();

  return ok({ patchNotesHtml: resultString });
};

export default getPatchNotesHtml;
