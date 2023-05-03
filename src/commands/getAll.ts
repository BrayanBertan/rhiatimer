import { SlashCommandBuilder } from "discord.js";
import { PrismaClient } from '@prisma/client'
import { getMin, groupBy } from '../utils'

const prisma = new PrismaClient()

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('all')
		.setDescription('all'),
	async execute(interaction:any) {
		let bossTimers = await prisma.boss.findMany({
			orderBy: [
				{
				  armor: 'desc',
				},
				{
					name: 'asc',
				},
			  ],
		});
		let retorno:string = ``; 
		let key = '';

		
		bossTimers.forEach( function(bossTimer) {
			var minutes = getMin(bossTimer);
			var minutesText = `in  ${minutes} minute(s)`;
			if (isNaN(minutes) || minutes < -30) {
				minutesText = 'not timed';
			}
			if (bossTimer.armor != key) {
				key = bossTimer.armor;
				retorno += `============${key}============\n`;
			}
			retorno += `	${bossTimer.name} ${minutesText}\n`;
		});

		await interaction.reply(`${retorno}`);
	},
};