/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Based on the sample bot from http://howdy.ai/botkit


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

require('dotenv').config();
var Botkit = require('botkit');

const Images = require('../src/images');

if (!process.env.SLACKBOT_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
  debug: true
});

controller.spawn({
  token: process.env.SLACKBOT_TOKEN
}).startRTM();


// use existing hello/shutdown commands from Botkit
controller.hears([ 'hello', 'hi' ], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function(err) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });
});

controller.hears([ 'shutdown', 'goodbye' ], 'direct_message,direct_mention,mention', function(bot, message) {

  bot.startConversation(message, function(err, convo) {

    convo.ask('Are you sure you want me to shutdown?', [
      {
        pattern: bot.utterances.yes,
        callback: function(response, convo) {
          convo.say('Bye!');
          convo.next();
          setTimeout(function() {
            process.exit();
          }, 3000);
        }
      },
      {
        pattern: bot.utterances.no,
        default: true,
        callback: function(response, convo) {
          convo.say('*Phew!*');
          convo.next();
        }
      }
    ]);
  });
});

// listen for any shortcode in the Images list
controller.hears(new Images().shortcodeRegex(), 'direct_message,direct_mention,mention', function(bot, message) {
  var e_name = message.match[0].split(':')[1];  
  var image = new Images().getFromName(e_name);
  if (!image) { return; }
  bot.reply(message, image.toString());
});