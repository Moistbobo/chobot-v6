import { GuildMember, Message } from "discord.js";

function findMemberInServer(msg: Message) {
  const { content, guild } = msg;

  if (!guild || !guild?.available) return null;

  const [hopefullyAUserName] = content.split(" ");

  const { members } = guild;

  const mentionedUser = msg.mentions.members && msg.mentions.members.first();

  // if no user was explicitly mentioned, try to find them from the list of users
  // by checking the username, nickname, or tag
  if (!mentionedUser) {
    return members.cache.find(
      (member: GuildMember) =>
        member.user.username.toLowerCase() ===
          hopefullyAUserName.toLowerCase() ||
        member.nickname?.toLowerCase() === hopefullyAUserName ||
        member.user.tag === hopefullyAUserName
    );
  }

  return mentionedUser;
}

export default findMemberInServer;
