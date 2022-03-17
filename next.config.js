/** @type {import('next').NextConfig} */
// const { Markup, Telegraf } = require('telegraf')
// let token = process.env.NEXT_PUBLIC_BOT_TOKEN

// const bot = new Telegraf(token);

// bot.start((ctx) => {
//   ctx.reply('Hello ' + ctx.from.first_name + '!');
// });

// bot.help((ctx) => {
//   ctx.reply('Send /start to receive a greeting');
//   ctx.reply('Send /keyboard to receive a message with a keyboard');
//   ctx.reply('Send /quit to stop the bot');
// });

// bot.command('quit', (ctx) => {
//   // Explicit usage
//   ctx.telegram.leaveChat(ctx.message.chat.id);

//   // Context shortcut
//   ctx.leaveChat();
// });

// bot.command('keyboard', (ctx) => {
//   ctx.reply(
//     'Keyboard',
//     Markup.inlineKeyboard([
//       Markup.button.callback('First option', 'first'),
//       Markup.button.callback('Second option', 'second'),
//     ])
//   );
// });

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['yfwefgttotkxhbrohvck.supabase.in'],
  },
}
