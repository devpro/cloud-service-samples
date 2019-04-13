# MongoDB Stitch Node.js client example

## Introduction

Example taken from [MongoDB Stitch Server SDK](https://docs.mongodb.com/stitch-sdks/js-server/4/index.html).

## Getting started

- Check the pre-requisites: git, [Node.js](https://nodejs.org)

- Install the required packages

```bash
npm install
```

- Create an .env file (from a copy of .env.dist file) and edit the files with your secrets
  - STITCH_API_KEY must be created from MongoDB Stitch Users > Providers web page (look for "API Keys")
  - STITCH_APPLICATION_ID can be found in MongoDB Stitch Settings web page (look for "Application ID")

- Run the script

```bash
node src/index.js
```
