import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Lancer un dé à plusieurs faces")
    .addIntegerOption((option) =>
      option
        .setName("faces")
        .setDescription("Nombre de faces du dé")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(100)
    ),

  async execute(interaction) {
    const faces = interaction.options.getInteger("faces");
    const roll = Math.floor(Math.random() * faces) + 1;
    await interaction.reply(`Tu as fait ${roll} avec un dé à ${faces} faces.`);
  },
};
