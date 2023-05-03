"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const token = "MTEwMzA0ODc5NzYzNjAwNjAwOQ.GZL2V9.2MWOwjWz8Mg0CxOOdex8ye9B0-ISFgnKciFUmg";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = node_path_1.default.join(__dirname, 'commands');
const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
client.once(Events.ClientReady, (c) => {
    console.log(`ready ${c.user.tag}`);
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
client.login(token);
//# sourceMappingURL=bot.js.map