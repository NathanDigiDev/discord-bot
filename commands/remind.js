import { SlashCommandBuilder } from 'discord.js';
import schedule from 'node-schedule';

export default {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription("Choisir le jour du JDR")
    .addStringOption(option =>
      option.setName('date')
        .setDescription('La date du rappel (JJ-MM-AAAA)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('time')
        .setDescription('Le temps du rappel (HH:MM)')
        .setRequired(true)),

  async execute(interaction) {
    const date = interaction.options.getString('date');
    const time = interaction.options.getString('time');

    const [day, month, year] = date.split('-');
    const [hour, minute] = time.split(':');

    const reminderDate = new Date(year, month - 1, day, hour, minute);

    schedule.scheduleJob(reminderDate, () => {
      interaction.channel.send(`@everyone Rappel ya session de JDR aujourd'hui`);
    });

    await interaction.reply(`Rappel votre ${date} à ${time}.`);
  }
};
