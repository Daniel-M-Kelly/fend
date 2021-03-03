# Project Architecture
## Architecture

* Start server with `npm run start` command
* Cloned repo for starter code.
* .gitignore file - added dist\ folder and .env file to file, removed reference to bower package manager.
* Used dotenv file for API Key variable
* Used cors package for testing web server on port 8081

## Configs

* Development configuration - webpack.dev.js
* Production configuration - webpack.prod.js
* Production build - `npm run build-prod` generates dist folder for production app
* Production server - `npm run start` runs production node server
* Dev Build - `npm run build-dev` uses webpack dev server and dev config
* Dev Server - `npm run start-dev` uses nodemon to automatically restart node server when files are changed.

## Content
* HTML File in src/client/views
* 2 Javascript Files
* Styles located in src/client/styles folder

# Functionality

## API

*Used Meaning Cloud Summarization API: https://www.meaningcloud.com/developer/summarization
*Note: Only non-authenticated HTTP and FTP url's are supported.
*Ex. URL: http://www.theregister.com/2021/03/03/nvidia_on_arm_licensing_model/