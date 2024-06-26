# YouTube Data Extraction and Parsing (Team "Echo")

## Table of Contents

- [Introduction](#introduction)
- [Team](#team)
- [Installation](#installation)

## Introduction

This project involves extracting data from YouTube, parsing the extracted data, and storing it for further analysis by the analytics team. Our team (Team "Echo") is responsible for building and maintaining the data extraction and storage process.

## Team

- **Project Lead:** Illia Kovalenko
- **Team Members:** Yevhenii Kyrychenko, Andrii Makarets, Illia Medvedev, Vladyslav Zraiko

## Installation

1. Clone the repository:
```
git clone git@github.com:YevheniiKyr/YoutubeTeamB.git
cd YoutubeTeamB
```
2. Set up `.env` file:
```
# App
APP_PORT=

# Cron
CRON_SCHEDULE=

# Database
DB_HOST= 
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE_NAME= 

# Deepgram
DEEPGRAM_API_KEY=

# YouTube
YOUTUBE_URL=
YOUTUBE_API_URL=
YOUTUBE_API_KEY= 

# Telegram
TELEGRAM_API=
```

3. Set up Cron
```
If you are using serverless cloud functions 
  Keep @Cron commented in src/modules/cron and use api/cron endpoint.
Else
  Uncomment @Cron
```
4. Set up in code configs in src/configs/config.ts
```
youtube: {
  channelList : [/*Your channels*/]
}
``` 
6. Make sure [Node.js](https://nodejs.org/en) and npm are installed on your machine.
Install npm packages:
```
npm run i
```
7. Run server with:
```
npm run start:dev
```
