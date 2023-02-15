import "dotenv/config";

const EnvConfig = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_PREFIX: process.env.BOT_PREFIX || ".",
  NADEKO_DB_PATH: process.env.NADEKO_DB_PATH || "",
};

export default EnvConfig;
