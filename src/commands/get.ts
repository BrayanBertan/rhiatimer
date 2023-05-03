import { SlashCommandBuilder } from "discord.js";
import { PrismaClient } from '@prisma/client'
import { getMin } from '../utils'

const prisma = new PrismaClient()

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('get')
		.setDescription('get')
		.addIntegerOption(option =>
			option.setName('boss')
				.setDescription('boss')
				.setRequired(true)
				.addChoices(
					{ name: '170', value: 1 },
					{ name: '180', value: 2 },
					{ name: '150', value: 3 },
					{ name: '155', value: 4 },
					{ name: '160', value: 5 },
					{ name: '165', value: 6 },
					{ name: 'Eye', value: 7 },
					{ name: 'Swampie', value: 8 },
					{ name: 'Chained', value: 9 },
					{ name: 'Grom', value: 10 },
					{ name: 'Pyrus', value: 11 },
					{ name: 'Woody', value: 12 },
					{ name: 'Copp', value: 13 },
					{ name: 'Rock', value: 14 },
				)),
	async execute(interaction:any) {
		const bossId = interaction.options.getInteger('boss');
		const bossTimer = await prisma.boss.findFirst({
			where:{
				id:bossId,
			},
		});
		if (bossTimer?.timed != null) {
			var minutes = getMin(bossTimer);
	
			await interaction.reply(`${bossTimer?.name} in ${minutes} minute(s)`);
			return;
		}
		
		await interaction.reply(`${bossTimer?.name} isn't timed`);
	},
};