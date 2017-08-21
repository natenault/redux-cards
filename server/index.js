const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const models = require('./models');
const morgan = require('morgan');

const app = express();

// DB setup
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successful');
  })
  .catch(error => {
    console.log('Error creating connection:', error);
  });

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('../public'));

// Routes

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Server setup
const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log('Server now listening on port:', port);
});
