# Redux Cards

Redux Cards: An app for studying with custom flashcards, built with React/Redux.

# Getting Started

Redux Cards is built with React, Node/Express, and PostgreSQL/Sequelize.

1. `npm install` from the **root** directory

2. Create a database. The application is currently configured for PostgreSQL, but would also work with MySQL or SQLite3

3. Update the server/config/config.json file with your database settings

4. `npm run db:setup` to run database migrations

5. Create a env.js file inside the server directory, and add the following

```javascript
module.exports = {
  secret: 'UPDATE THIS WITH A UNIQUE STRING'
};
```

This secret key is necessary for the Passport.js JWT strategy to work properly

6. `npm run dev:server` to start the server

7. `npm run dev:client` to start the webpack dev server

8. Access the application locally on localhost:8080
