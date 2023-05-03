"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const utils_1 = require("../utils");
const prisma = new client_1.PrismaClient();
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('all')
        .setDescription('all'),
    async execute(interaction) {
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
        let retorno = ``;
        let key = '';
        bossTimers.forEach(function (bossTimer) {
            var minutes = (0, utils_1.getMin)(bossTimer);
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
//# sourceMappingURL=getAll.js.map