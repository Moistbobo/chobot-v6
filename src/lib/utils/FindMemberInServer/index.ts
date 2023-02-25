import { GuildMember, Message } from 'discord.js';

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

async function findMemberInServer(msg: Message) {
  const { content, guild } = msg;

  if (!guild || !guild?.available) return null;

  const [hopefullyAUsername] = content.split(' ');

  const members = await guild.members.fetch({ force: true });
  const mentionedUser = msg.mentions.members && msg.mentions.members.first();

  // if no user was explicitly mentioned, try to find them from the list of users
  // by checking the username, nickname, or tag
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
