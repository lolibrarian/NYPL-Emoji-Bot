# NYPL Emoji Bot

<a href='https://travis-ci.org/lolibrarian/NYPL-Emoji-Bot'>
  <img src='https://api.travis-ci.org/lolibrarian/NYPL-Emoji-Bot.png' alt='Travis CI build status' />
</a>

The source code for the [NYPL Emoji Bot](https://twitter.com/NYPLEmoji)

## Configuration

1. Install dependencies:

  ```shell
  npm install
  ```

2. Copy the example `.env` file:

  ```shell
  cp .env.example .env
  ```

2. [Get credentials for your bot](https://dev.twitter.com/) and complete the `.env`. Note that `TWITTER_SCREEN_NAME` is case-sensitive.

## Usage

### To post a status

```shell
npm run status
```

### To reply to replies

```shell
npm run reply
```

### Testing

```shell
npm test
```

## Contributing

Emoji additions, bug reports, fixes, and new features are welcomed. If you'd like to contribute code, please:

1. Fork the project

2. Start a branch named for your new feature or bug

3. Create a Pull Request
