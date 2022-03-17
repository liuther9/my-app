const { Markup, Telegraf, Telegram } = require('telegraf')
let token = '5095347305:AAHUpQYNmkqlYIj2-UEq-8FjNZvrVnru-9s';

const bot = new Telegraf(token);

// const chatId = process.env.CHAT_ID;

bot.start((ctx) => {
  ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
  ctx.reply('Send /start to receive a greeting');
  ctx.reply('Send /keyboard to receive a message with a keyboard');
  ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Context shortcut
  ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
  ctx.reply(
    'Keyboard',
    Markup.inlineKeyboard([
      Markup.button.callback('First option', 'first'),
      Markup.button.callback('Second option', 'second'),
    ])
  );
});

// bot.on('text', (ctx) => {
//   ctx.reply(
//     'You choose the ' +
//       (ctx.message.text === 'first' ? 'First' : 'Second') +
//       ' Option!'
//   );

//   if (chatId) {
//     telegram.sendMessage(
//       chatId,
//       'This message was sent without your interaction!'
//     );
//   }
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
