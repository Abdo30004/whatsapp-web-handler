const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const client = new Client({
  authStrategy: new LocalAuth(),
});
client.commands = new Map();

fs.readdir("./commands/", (err, categories) => {
  if (err) return console.log(err);
  for (const category of categories) {
    fs.readdir(`./commands/${category}`, (err, files) => {
      if (err) return console.log(err);
      const commandsFiles = files.filter((file) => file.endsWith(".js"));
      for (const file of commandsFiles) {
        const command = require(`./commands/${category}/${file}`);
        if (!command.name) {
          console.log(`Command ${file} does not have a name`);
          continue;
        }
        client.commands.set(command.name, command);
      }
    });
  }
});


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  const eventsFiles = files.filter((file) => file.endsWith(".js"));
  for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    if (!event.name) {
      console.log(`I can not find the name of the event ${file}`);

      continue;
    }
    if (event.once) {
      client.once(event.name, event.execute.bind(null, client));
    } else {
      client.on(event.name, event.execute.bind(null, client));
    }
  }
});
client.initialize();
