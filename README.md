# NYPL Emoji Bot

<a href='https://travis-ci.org/lolibrarian/NYPL-Emoji-Bot'>
  <img src='https://api.travis-ci.org/lolibrarian/NYPL-Emoji-Bot.png' alt='Travis CI build status' />
</a>

The source code for the [NYPL Emoji Bot](https://twitter.com/NYPLEmoji). This fork provides the same functionality, but as a Slack bot.

## Configuration

1. Install dependencies:

  ```shell
  npm install
  ```

2. Copy the example `.env` file:

  ```shell
  cp .env.example .env
  ```

2. [Get credentials for your bot](https://slack.com/apps/manage/custom-integrations) and complete the `.env`

## Usage

### To start the Slack bot

```shell
npm run slack
```

Then either start a direct message with your bot, or invite it to a channel and say, e.g. "@nyplemojibot :hand:".

## Contributing

Emoji additions, bug reports, fixes, and new features are welcomed. If you'd like to contribute code, please:

1. Fork the project

2. Start a branch named for your new feature or bug

3. Create a Pull Request
