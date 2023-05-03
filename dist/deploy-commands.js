"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const commands = [];
const commandsPath = node_path_1.default.join(__dirname, 'commands');
const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
const rest = new discord_js_1.REST().setToken("MTEwMzA0ODc5NzYzNjAwNjAwOQ.GZL2V9.2MWOwjWz8Mg0CxOOdex8ye9B0-ISFgnKciFUmg");
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(discord_js_1.Routes.applicationGuildCommands("1103048797636006009", "1102896283049545758"), { body: commands });
        console.log(`Successfully reloaded ${data} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
})();
//# sourceMappingURL=deploy-commands.js.map