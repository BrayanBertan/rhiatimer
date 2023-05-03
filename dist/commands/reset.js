"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const moment_1 = __importDefault(require("moment"));
const prisma = new client_1.PrismaClient();
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('reset')
        .setDescription('reset')
        .addIntegerOption(option => option.setName('boss')
        .setDescription('boss')
        .setRequired(true)
        .addChoices({ name: '170', value: 1 }, { name: '180', value: 2 }, { name: '150', value: 3 }, { name: '155', value: 4 }, { name: '160', value: 5 }, { name: '165', value: 6 }, { name: 'Eye', value: 7 }, { name: 'Swampie', value: 8 }, { name: 'Chained', value: 9 }, { name: 'Grom', value: 10 }, { name: 'Pyrus', value: 11 }, { name: 'Woody', value: 12 }, { name: 'Copp', value: 13 }, { name: 'Rock', value: 14 }))
        .addIntegerOption(option => option.setName('time')
        .setDescription('time')),
    async execute(interaction) {
        const bossId = interaction.options.getInteger('boss');
        const time = interaction.options.getInteger('time');
        var now = (0, moment_1.default)(new Date());
        if (time !== null) {
            now = now.subtract(time, "minutes");
        }
        const bossTimer = await prisma.boss.update({
            where: {
                id: bossId,
            },
            data: {
                timed: now.toDate(),
                by: interaction.user.nickname
            },
        });
        await interaction.reply(`${bossTimer.name} timed ${time ? time : ''}`);
    },
};
//# sourceMappingURL=reset.js.map