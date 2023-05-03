import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

var token: string = process.env.DISCORD_TOKEN != undefined ? process.env.DISCORD_TOKEN : "";


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands("1103048797636006009", "1102896283049545758"),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();