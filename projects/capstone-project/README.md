# Development Environment and Architecture
## Architecture

* Start server with `npm run start` command
* .gitignore file - added dist\ folder and .env file to file, removed reference to bower package manager.
* Used dotenv file for API Key variable
* Used cors package for testing web server on port 8081

## Webpack

* Development configuration - webpack.dev.js
* Production configuration - webpack.prod.js
* Production build - `npm run build-prod` generates dist folder for production app
* Production server - `npm run start-prod` runs production node server
* Dev Build - `npm run build-dev` uses webpack dev server and dev config
* Dev Server - `npm run start-dev` uses nodemon to automatically restart node server when files are changed.
* Note: Dev Webserver runs on port 8081

## Testing
* Jest installed, run with command `npm run test` each js file is tested.
* Used supertest library to test express server.
* Needed @babel/plugin-transform-runtime npm module for async function testing
## Offline Capabilities

* Implemented Service Workers in Prod environment only.

# HTML & CSS

# API and JS Integration

* Use dotenv package to hide API key from client, included the .env file in .gitignore so it wouldn't be posted on public github repo

# Optional Extension

* Implemented weather icons as optional extension.