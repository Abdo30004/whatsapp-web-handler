const prefix="!";
module.exports = {
  name: "message_create",
  execute: async (client, message) => {
    if (message.body.indexOf(prefix) !== 0) return;
    const args = message.body.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if (!command) return;
    command.run(client, message, args);
  },
};
