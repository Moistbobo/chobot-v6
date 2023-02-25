import EnvConfig from '../../../config/envConfig';

/**
 * Gets the first word from a message content (or any string for that matter)
 * @param {string} content - The content to get the first word from
 */
const GetFirstWordFromContent = (content: string) => {
  return content.replace(EnvConfig.BOT_PREFIX, '').split(' ')[0].toLowerCase().trim();
};

export default GetFirstWordFromContent;
