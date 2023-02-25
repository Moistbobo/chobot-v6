import { GuildMember, Message } from 'discord.js';

/**
 * An interface representing the search parameters to find a given user in a server.
 */
type SearchParams = {
  member: GuildMember;

  searchTerms: string;
};

function FindById(params: SearchParams) {
  return params.member.id === params.searchTerms;
}

function FindByUsername(params: SearchParams) {
  return params.member.user.username.toLowerCase() === params.searchTerms;
}

function FindByTag(params: SearchParams) {
  return params.member.user.tag === params.searchTerms;
}

function FindByNickname(params: SearchParams) {
  return params.member.nickname === params.searchTerms;
}

/**
 * A function that attempts to find a mentioned user in a given message.
 * @param {Message} msg - A discord message.
 */
async function findMemberInServer(msg: Message) {
  const { content, guild } = msg;

  if (!guild || !guild?.available) return null;

  const [hopefullyAUsername] = content.split(' ');

  const members = await guild.members.fetch({ force: true });
  const mentionedUser = msg.mentions.members && msg.mentions.members.first();

  // if discord mention object is found, try to the user by checking the username, nickname, or tag
  if (!mentionedUser) {
    return members.find((member: GuildMember) => {
      const _params: SearchParams = {
        member,
        searchTerms: hopefullyAUsername,
      };
      return (
        FindByTag(_params) ||
        FindByNickname(_params) ||
        FindByUsername(_params) ||
        FindById(_params)
      );
    });
  }

  return mentionedUser;
}

export default findMemberInServer;
