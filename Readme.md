## __Technical Assignment For Sr QA Engineer__

# Testing [Netlify App](https://mystifying-beaver-ee03b5.netlify.app/ ) using Cypress



## __Prerequisites__
1. Install [NodeJS](https://nodejs.org)
2. Install [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Install-binary)
3. Have Chrome installed

## [Test Plan](testplan.txt)

## __Installing Dependencies__
1. Install Cypress
````
npm install --save-dev cypress
````
2. To open the Cypress Application use the command
````
npx cypress open
````

3. To run Cypress Headless use the command
````
npx cypress run
````

4. To run Cypress Headless on specific browser use the command
````
npx cypress run --browser {browser name}
````

## Project Structure
````

├── cypress
|   |
|   |
|   ├── actions
|   |   └── e2e-actions.js
│   ├── fixtures
│   │   └── elements.js
|   |   └── testData.js
│   ├── integration
│   │   └── e2e.js
│   │      
│   ├── plugins
│   │   └── index.js
│   └── support
│       ├── commands.js
│       └── index.js
└─── cypress.json

````
